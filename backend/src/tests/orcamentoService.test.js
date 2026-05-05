import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock } = vi.hoisted(() => {
  const prismaMock = {
    usuario: {
      findUnique: vi.fn(),
    },
    categoria: {
      findFirst: vi.fn(),
    },
    orcamento: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  return { prismaMock };
});

vi.mock("../database/prisma.js", () => ({
  default: prismaMock,
}));

import OrcamentoService from "../services/orcamentoService.js";

describe("OrcamentoService", () => {
  const usuarioId = "usuario-1";
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

  const categoriaReceita = {
    id: "categoria-receita",
    idUsuario: usuarioId,
    nome: "Salário",
    tipo: "RECEITA",
    ehPadrao: false,
  };

  const categoriaPadraoDespesa = {
    id: "categoria-padrao-despesa",
    idUsuario: null,
    nome: "Alimentação",
    tipo: "DESPESA",
    ehPadrao: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve cadastrar orçamento geral mensal", async () => {
    const orcamentoCriado = {
      id: "orcamento-1",
      idUsuario: usuarioId,
      idCategoria: null,
      valor: "1200.00",
      mes: 5,
      ano: 2026,
      descricao: "Maio",
      categoria: null,
    };

    prismaMock.usuario.findUnique.mockResolvedValue(usuarioValido);
    prismaMock.orcamento.findFirst.mockResolvedValue(null);
    prismaMock.orcamento.create.mockResolvedValue(orcamentoCriado);

    const resultado = await OrcamentoService.cadastrar({
      idUsuario: usuarioId,
      valor: 1200,
      mes: 5,
      ano: 2026,
      descricao: "Maio",
    });

    expect(resultado).toEqual(orcamentoCriado);
    expect(prismaMock.categoria.findFirst).not.toHaveBeenCalled();
    expect(prismaMock.orcamento.create).toHaveBeenCalledWith({
      data: {
        idUsuario: usuarioId,
        valor: "1200.00",
        mes: 5,
        ano: 2026,
        idCategoria: null,
        descricao: "Maio",
      },
      include: {
        categoria: true,
      },
    });
  });

  it("deve cadastrar orçamento por categoria de despesa visível ao usuário", async () => {
    const orcamentoCriado = {
      id: "orcamento-2",
      idUsuario: usuarioId,
      idCategoria: categoriaId,
      valor: "500.00",
      mes: 5,
      ano: 2026,
      categoria: categoriaValida,
    };

    prismaMock.usuario.findUnique.mockResolvedValue(usuarioValido);
    prismaMock.categoria.findFirst.mockResolvedValue(categoriaValida);
    prismaMock.orcamento.findFirst.mockResolvedValue(null);
    prismaMock.orcamento.create.mockResolvedValue(orcamentoCriado);

    const resultado = await OrcamentoService.cadastrar({
      idUsuario: usuarioId,
      valor: "500",
      mes: "5",
      ano: "2026",
      idCategoria: categoriaId,
    });

    expect(resultado).toEqual(orcamentoCriado);
    expect(prismaMock.categoria.findFirst).toHaveBeenCalledWith({
      where: {
        id: categoriaId,
        OR: [{ idUsuario: usuarioId }, { ehPadrao: true }],
      },
    });
  });

  it("deve cadastrar orçamento por categoria padrão de despesa", async () => {
    const orcamentoCriado = {
      id: "orcamento-padrao",
      idUsuario: usuarioId,
      idCategoria: categoriaPadraoDespesa.id,
      valor: "300.00",
      mes: 5,
      ano: 2026,
      categoria: categoriaPadraoDespesa,
    };

    prismaMock.usuario.findUnique.mockResolvedValue(usuarioValido);
    prismaMock.categoria.findFirst.mockResolvedValue(categoriaPadraoDespesa);
    prismaMock.orcamento.findFirst.mockResolvedValue(null);
    prismaMock.orcamento.create.mockResolvedValue(orcamentoCriado);

    const resultado = await OrcamentoService.cadastrar({
      idUsuario: usuarioId,
      valor: 300,
      mes: 5,
      ano: 2026,
      idCategoria: categoriaPadraoDespesa.id,
    });

    expect(resultado).toEqual(orcamentoCriado);
    expect(prismaMock.orcamento.create).toHaveBeenCalled();
  });

  it("deve impedir cadastro de orçamento por categoria de receita", async () => {
    prismaMock.usuario.findUnique.mockResolvedValue(usuarioValido);
    prismaMock.categoria.findFirst.mockResolvedValue(categoriaReceita);

    await expect(
      OrcamentoService.cadastrar({
        idUsuario: usuarioId,
        valor: 500,
        mes: 5,
        ano: 2026,
        idCategoria: categoriaReceita.id,
      }),
    ).rejects.toThrow(
      "Orçamentos por categoria só podem ser vinculados a categorias de despesa.",
    );

    expect(prismaMock.orcamento.findFirst).not.toHaveBeenCalled();
    expect(prismaMock.orcamento.create).not.toHaveBeenCalled();
  });

  it("deve impedir orçamento duplicado para o mesmo período e categoria", async () => {
    prismaMock.usuario.findUnique.mockResolvedValue(usuarioValido);
    prismaMock.categoria.findFirst.mockResolvedValue(categoriaValida);
    prismaMock.orcamento.findFirst.mockResolvedValue({
      id: "orcamento-existente",
    });

    await expect(
      OrcamentoService.cadastrar({
        idUsuario: usuarioId,
        valor: 500,
        mes: 5,
        ano: 2026,
        idCategoria: categoriaId,
      }),
    ).rejects.toThrow(/já existe um orçamento/i);

    expect(prismaMock.orcamento.create).not.toHaveBeenCalled();
  });

  it("deve listar apenas orçamentos do usuário autenticado com filtros", async () => {
    const orcamentos = [{ id: "orcamento-1", idUsuario: usuarioId }];

    prismaMock.usuario.findUnique.mockResolvedValue(usuarioValido);
    prismaMock.orcamento.findMany.mockResolvedValue(orcamentos);

    const resultado = await OrcamentoService.listar(usuarioId, {
      mes: "5",
      ano: "2026",
      idCategoria: "null",
    });

    expect(resultado).toEqual(orcamentos);
    expect(prismaMock.orcamento.findMany).toHaveBeenCalledWith({
      where: {
        idUsuario: usuarioId,
        mes: 5,
        ano: 2026,
        idCategoria: null,
      },
      include: {
        categoria: true,
      },
      orderBy: [
        { ano: "desc" },
        { mes: "desc" },
        { categoria: { nome: "asc" } },
        { criadoEm: "desc" },
      ],
    });
  });

  it("deve impedir acesso a orçamento de outro usuário", async () => {
    prismaMock.orcamento.findFirst.mockResolvedValue(null);

    await expect(
      OrcamentoService.buscarPorId("orcamento-1", usuarioId),
    ).rejects.toThrow(/não encontrado|não pertence/i);
  });

  it("deve permitir transformar orçamento por categoria em orçamento geral", async () => {
    const orcamentoAtual = {
      id: "orcamento-1",
      idUsuario: usuarioId,
      idCategoria: categoriaId,
      valor: "500.00",
      mes: 5,
      ano: 2026,
    };

    const orcamentoAtualizado = {
      ...orcamentoAtual,
      idCategoria: null,
      categoria: null,
    };

    prismaMock.orcamento.findFirst
      .mockResolvedValueOnce(orcamentoAtual)
      .mockResolvedValueOnce(null);
    prismaMock.orcamento.update.mockResolvedValue(orcamentoAtualizado);

    const resultado = await OrcamentoService.editar("orcamento-1", usuarioId, {
      idCategoria: null,
    });

    expect(resultado).toEqual(orcamentoAtualizado);
    expect(prismaMock.categoria.findFirst).not.toHaveBeenCalled();
    expect(prismaMock.orcamento.update).toHaveBeenCalledWith({
      where: { id: "orcamento-1" },
      data: {
        idCategoria: null,
      },
      include: {
        categoria: true,
      },
    });
  });

  it("deve permitir trocar orçamento para outra categoria de despesa", async () => {
    const novaCategoriaId = "categoria-2";
    const novaCategoriaDespesa = {
      ...categoriaValida,
      id: novaCategoriaId,
      nome: "Transporte",
    };
    const orcamentoAtual = {
      id: "orcamento-1",
      idUsuario: usuarioId,
      idCategoria: categoriaId,
      valor: "500.00",
      mes: 5,
      ano: 2026,
    };
    const orcamentoAtualizado = {
      ...orcamentoAtual,
      idCategoria: novaCategoriaId,
      categoria: novaCategoriaDespesa,
    };

    prismaMock.orcamento.findFirst
      .mockResolvedValueOnce(orcamentoAtual)
      .mockResolvedValueOnce(null);
    prismaMock.categoria.findFirst.mockResolvedValue(novaCategoriaDespesa);
    prismaMock.orcamento.update.mockResolvedValue(orcamentoAtualizado);

    const resultado = await OrcamentoService.editar("orcamento-1", usuarioId, {
      idCategoria: novaCategoriaId,
    });

    expect(resultado).toEqual(orcamentoAtualizado);
    expect(prismaMock.categoria.findFirst).toHaveBeenCalledWith({
      where: {
        id: novaCategoriaId,
        OR: [{ idUsuario: usuarioId }, { ehPadrao: true }],
      },
    });
    expect(prismaMock.orcamento.update).toHaveBeenCalledWith({
      where: { id: "orcamento-1" },
      data: {
        idCategoria: novaCategoriaId,
      },
      include: {
        categoria: true,
      },
    });
  });

  it("deve impedir trocar orçamento para categoria de receita", async () => {
    const orcamentoAtual = {
      id: "orcamento-1",
      idUsuario: usuarioId,
      idCategoria: categoriaId,
      valor: "500.00",
      mes: 5,
      ano: 2026,
    };

    prismaMock.orcamento.findFirst.mockResolvedValueOnce(orcamentoAtual);
    prismaMock.categoria.findFirst.mockResolvedValue(categoriaReceita);

    await expect(
      OrcamentoService.editar("orcamento-1", usuarioId, {
        idCategoria: categoriaReceita.id,
      }),
    ).rejects.toThrow(
      "Orçamentos por categoria só podem ser vinculados a categorias de despesa.",
    );

    expect(prismaMock.orcamento.update).not.toHaveBeenCalled();
  });
});
