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

  it("deve cadastrar orçamento por categoria visível ao usuário", async () => {
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
});
