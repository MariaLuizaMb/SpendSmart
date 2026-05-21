import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock } = vi.hoisted(() => {
  const prismaMock = {
    usuario: {
      findUnique: vi.fn(),
    },

    categoria: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },

    conta: {
      findFirst: vi.fn(),
    },

    lancamento: {
      create: vi.fn(),
      count: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
    },

    orcamento: {
      count: vi.fn(),
    },
  };

  return { prismaMock };
});

vi.mock("../database/prisma.js", () => ({
  default: prismaMock,
}));

import LaunchService from "../services/launchService.js";
import CategoryService from "../services/categoryService.js";

describe("US02 - Gestão de gastos", () => {
  const usuarioId = "usuario-1";
  const outroUsuarioId = "usuario-2";
  const categoriaId = "categoria-1";

  const usuarioValido = {
    id: usuarioId,
    nome: "Maria Luiza",
    email: "maria@email.com",
  };

  const categoriaValida = {
    id: categoriaId,
    idUsuario: usuarioId,
    nome: "Mercado",
    tipo: "DESPESA",
    ehPadrao: false,
  };

  const dadosLancamentoValido = {
    idUsuario: usuarioId,
    idCategoria: categoriaId,
    valor: 120.5,
    dataTransacao: "2026-05-01",
    tipo: "DESPESA",
    descricao: "Compra no mercado",
    recorrencia: "NENHUMA",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Validação de inputs", () => {
    it("deve rejeitar lançamento com valor negativo", async () => {
      const dadosInvalidos = {
        ...dadosLancamentoValido,
        valor: -50,
      };

      await expect(LaunchService.cadastrar(dadosInvalidos)).rejects.toThrow(
        /valor|positivo/i,
      );

      expect(prismaMock.lancamento.create).not.toHaveBeenCalled();
    });

    it("deve rejeitar lançamento com string em campo numérico", async () => {
      const dadosInvalidos = {
        ...dadosLancamentoValido,
        valor: "120.50",
      };

      await expect(LaunchService.cadastrar(dadosInvalidos)).rejects.toThrow(
        /valor|número|positivo/i,
      );

      expect(prismaMock.lancamento.create).not.toHaveBeenCalled();
    });

    it("deve rejeitar lançamento com data em formato inválido", async () => {
      const dadosInvalidos = {
        ...dadosLancamentoValido,
        dataTransacao: "data-invalida",
      };

      await expect(LaunchService.cadastrar(dadosInvalidos)).rejects.toThrow(
        /data|inválida/i,
      );

      expect(prismaMock.lancamento.create).not.toHaveBeenCalled();
    });
  });

  describe("Consistência de categoria", () => {
    it("deve impedir a criação de gasto com categoria inexistente", async () => {
      prismaMock.usuario.findUnique.mockResolvedValue(usuarioValido);
      prismaMock.categoria.findFirst.mockResolvedValue(null);

      await expect(
        LaunchService.cadastrar(dadosLancamentoValido),
      ).rejects.toThrow(/categoria|não encontrada|não pertence/i);

      expect(prismaMock.lancamento.create).not.toHaveBeenCalled();
    });

    it("deve impedir a criação de gasto com categoria pertencente a outro usuário", async () => {
      prismaMock.usuario.findUnique.mockResolvedValue(usuarioValido);

      prismaMock.categoria.findFirst.mockImplementation(async ({ where }) => {
        const categoriaDeOutroUsuario = {
          id: categoriaId,
          idUsuario: outroUsuarioId,
          nome: "Mercado",
          tipo: "DESPESA",
          ehPadrao: false,
        };

        const usuarioPermitido = where.OR.some(
          (condicao) =>
            condicao.idUsuario === categoriaDeOutroUsuario.idUsuario,
        );

        const categoriaPadraoPermitida = where.OR.some(
          (condicao) => condicao.ehPadrao === categoriaDeOutroUsuario.ehPadrao,
        );

        if (
          where.id === categoriaDeOutroUsuario.id &&
          (usuarioPermitido || categoriaPadraoPermitida)
        ) {
          return categoriaDeOutroUsuario;
        }

        return null;
      });

      await expect(
        LaunchService.cadastrar(dadosLancamentoValido),
      ).rejects.toThrow(/categoria|não encontrada|não pertence/i);

      expect(prismaMock.lancamento.create).not.toHaveBeenCalled();
    });

    it("deve permitir a criação de gasto quando a categoria existe e pertence ao usuário", async () => {
      const lancamentoCriado = {
        id: "lancamento-1",
        ...dadosLancamentoValido,
        dataTransacao: new Date(Date.UTC(2026, 4, 1)),
      };

      prismaMock.usuario.findUnique.mockResolvedValue(usuarioValido);
      prismaMock.categoria.findFirst.mockResolvedValue(categoriaValida);
      prismaMock.lancamento.create.mockResolvedValue(lancamentoCriado);

      const resultado = await LaunchService.cadastrar(dadosLancamentoValido);

      expect(resultado).toEqual(lancamentoCriado);

      expect(prismaMock.lancamento.create).toHaveBeenCalledTimes(1);

      expect(prismaMock.lancamento.create).toHaveBeenCalledWith({
        data: {
          idUsuario: usuarioId,
          idCategoria: categoriaId,
          idConta: null,
          valor: 120.5,
          dataTransacao: new Date(Date.UTC(2026, 4, 1)),
          tipo: "DESPESA",
          descricao: "Compra no mercado",
          recorrencia: "NENHUMA",
        },
        include: {
          categoria: true,
          conta: true,
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
        },
      });
    });

    it("deve impedir a criação de gasto quando o tipo da categoria não corresponde ao tipo do lançamento", async () => {
      prismaMock.usuario.findUnique.mockResolvedValue(usuarioValido);

      prismaMock.categoria.findFirst.mockResolvedValue({
        ...categoriaValida,
        tipo: "RECEITA",
      });

      await expect(
        LaunchService.cadastrar(dadosLancamentoValido),
      ).rejects.toThrow(/categoria selecionada|tipo/i);

      expect(prismaMock.lancamento.create).not.toHaveBeenCalled();
    });

    it("deve impedir edição que deixe tipo e categoria incompatíveis", async () => {
      prismaMock.lancamento.findFirst.mockResolvedValue({
        id: "lancamento-1",
        idUsuario: usuarioId,
        idCategoria: categoriaId,
        tipo: "DESPESA",
      });
      prismaMock.categoria.findFirst.mockResolvedValue(categoriaValida);

      await expect(
        LaunchService.editar("lancamento-1", usuarioId, {
          tipo: "RECEITA",
        }),
      ).rejects.toThrow(/categoria selecionada|tipo/i);

      expect(prismaMock.lancamento.update).not.toHaveBeenCalled();
    });
  });

  describe("Filtros de lançamentos", () => {
    it("deve combinar filtros incluindo lançamentos sem conta e data final inclusiva", async () => {
      prismaMock.usuario.findUnique.mockResolvedValue(usuarioValido);
      prismaMock.lancamento.findMany.mockResolvedValue([]);

      await LaunchService.listar(usuarioId, {
        semConta: "true",
        tipo: "DESPESA",
        idCategoria: categoriaId,
        valorMinimo: "50",
        valorMaximo: "200",
        dataInicio: "2026-05-01",
        dataFim: "2026-05-31",
      });

      expect(prismaMock.lancamento.findMany).toHaveBeenCalledWith({
        where: {
          idUsuario: usuarioId,
          dataTransacao: {
            gte: new Date(Date.UTC(2026, 4, 1)),
            lt: new Date(Date.UTC(2026, 5, 1)),
          },
          idConta: null,
          tipo: "DESPESA",
          idCategoria: categoriaId,
          valor: {
            gte: 50,
            lte: 200,
          },
        },
        include: {
          categoria: true,
          conta: true,
        },
        orderBy: {
          dataTransacao: "desc",
        },
        take: undefined,
      });
    });

    it("deve rejeitar filtros conflitantes de conta específica e sem conta", async () => {
      prismaMock.usuario.findUnique.mockResolvedValue(usuarioValido);

      await expect(
        LaunchService.listar(usuarioId, {
          semConta: "true",
          idConta: "conta-1",
        }),
      ).rejects.toThrow(/conta específica|sem conta/i);

      expect(prismaMock.lancamento.findMany).not.toHaveBeenCalled();
    });

    it("deve rejeitar faixa de valor inválida", async () => {
      prismaMock.usuario.findUnique.mockResolvedValue(usuarioValido);

      await expect(
        LaunchService.listar(usuarioId, {
          valorMinimo: "200",
          valorMaximo: "50",
        }),
      ).rejects.toThrow(/valorMinimo|valorMaximo/i);

      expect(prismaMock.lancamento.findMany).not.toHaveBeenCalled();
    });
  });

  describe("Conta opcional em lançamentos", () => {
    it("deve permitir remover o vínculo de conta na edição", async () => {
      const lancamentoExistente = {
        id: "lancamento-1",
        idUsuario: usuarioId,
        idCategoria: categoriaId,
        idConta: "conta-1",
        tipo: "DESPESA",
      };
      const lancamentoAtualizado = {
        ...lancamentoExistente,
        idConta: null,
      };

      prismaMock.lancamento.findFirst.mockResolvedValue(lancamentoExistente);
      prismaMock.lancamento.update.mockResolvedValue(lancamentoAtualizado);

      const resultado = await LaunchService.editar("lancamento-1", usuarioId, {
        idConta: null,
      });

      expect(resultado).toEqual(lancamentoAtualizado);
      expect(prismaMock.conta.findFirst).not.toHaveBeenCalled();
      expect(prismaMock.lancamento.update).toHaveBeenCalledWith({
        where: {
          id: "lancamento-1",
        },
        data: {
          idConta: null,
        },
        include: {
          categoria: true,
          conta: true,
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
        },
      });
    });
  });

  describe("Integridade na eliminação de categorias", () => {
    it("deve impedir a remoção de categoria padrão do sistema", async () => {
      prismaMock.categoria.findFirst.mockResolvedValue(null);

      await expect(
        CategoryService.remover(categoriaId, usuarioId),
      ).rejects.toThrow(/categoria|padrão|não pertence/i);

      expect(prismaMock.categoria.delete).not.toHaveBeenCalled();
    });

    it("deve impedir a remoção de categoria que possui lançamentos associados", async () => {
      prismaMock.categoria.findFirst.mockResolvedValue(categoriaValida);
      prismaMock.lancamento.count.mockResolvedValue(2);

      await expect(
        CategoryService.remover(categoriaId, usuarioId),
      ).rejects.toThrow(/lançamentos associados/i);

      expect(prismaMock.categoria.delete).not.toHaveBeenCalled();
      expect(prismaMock.orcamento.count).not.toHaveBeenCalled();
    });

    it("deve impedir a remoção de categoria que possui orçamentos associados", async () => {
      prismaMock.categoria.findFirst.mockResolvedValue(categoriaValida);
      prismaMock.lancamento.count.mockResolvedValue(0);
      prismaMock.orcamento.count.mockResolvedValue(1);

      await expect(
        CategoryService.remover(categoriaId, usuarioId),
      ).rejects.toThrow(/orçamentos associados/i);

      expect(prismaMock.categoria.delete).not.toHaveBeenCalled();
    });

    it("deve permitir a remoção de categoria sem lançamentos e sem orçamentos associados", async () => {
      prismaMock.categoria.findFirst.mockResolvedValue(categoriaValida);
      prismaMock.lancamento.count.mockResolvedValue(0);
      prismaMock.orcamento.count.mockResolvedValue(0);

      prismaMock.categoria.delete.mockResolvedValue(categoriaValida);

      const resultado = await CategoryService.remover(categoriaId, usuarioId);

      expect(resultado).toEqual({
        id: categoriaId,
        mensagem: "Categoria removida com sucesso.",
      });

      expect(prismaMock.categoria.delete).toHaveBeenCalledTimes(1);

      expect(prismaMock.categoria.delete).toHaveBeenCalledWith({
        where: {
          id: categoriaId,
        },
      });
    });
  });
});
