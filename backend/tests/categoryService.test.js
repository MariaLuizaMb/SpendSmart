import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../src/database/prisma.js", () => ({
  default: {
    categoria: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    lancamento: {
      count: vi.fn(),
    },
    orcamento: {
      count: vi.fn(),
    },
  },
}));

import prisma from "../src/database/prisma.js";
import CategoryService from "../src/services/categoryService.js";

describe("CategoryService", () => {
  const idUsuario = "usuario-1";
  const categoria = {
    id: "cat-1",
    idUsuario,
    nome: "Mercado",
    tipo: "DESPESA",
    ehPadrao: false,
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("deve listar categorias do usuário e categorias padrão ordenadas", async () => {
    prisma.categoria.findMany.mockResolvedValue([categoria]);

    const resultado = await CategoryService.listarPorUsuario(idUsuario);

    expect(resultado).toEqual([categoria]);
    expect(prisma.categoria.findMany).toHaveBeenCalledWith({
      where: {
        OR: [{ idUsuario }, { ehPadrao: true }],
      },
      orderBy: [{ tipo: "asc" }, { nome: "asc" }],
    });
  });

  it("deve cadastrar categoria personalizada normalizando nome e tipo", async () => {
    prisma.categoria.findFirst.mockResolvedValue(null);
    prisma.categoria.create.mockResolvedValue({
      ...categoria,
      nome: "Mercado do mês",
    });

    const resultado = await CategoryService.cadastrarPersonalizada({
      idUsuario,
      nome: "  Mercado   do mês  ",
      tipo: "despesa",
    });

    expect(resultado.nome).toBe("Mercado do mês");
    expect(prisma.categoria.findFirst).toHaveBeenCalledWith({
      where: {
        nome: {
          equals: "Mercado do mês",
          mode: "insensitive",
        },
        tipo: "DESPESA",
        OR: [{ idUsuario }, { ehPadrao: true }],
      },
    });
    expect(prisma.categoria.create).toHaveBeenCalledWith({
      data: {
        idUsuario,
        nome: "Mercado do mês",
        tipo: "DESPESA",
        ehPadrao: false,
      },
    });
  });

  it("deve reaproveitar categoria visível existente em vez de duplicar", async () => {
    prisma.categoria.findFirst.mockResolvedValue(categoria);

    const resultado = await CategoryService.cadastrarPersonalizada({
      idUsuario,
      nome: "Mercado",
      tipo: "DESPESA",
    });

    expect(resultado).toEqual(categoria);
    expect(prisma.categoria.create).not.toHaveBeenCalled();
  });

  it("deve validar dados obrigatórios, nome vazio e tipo inválido no cadastro", async () => {
    await expect(CategoryService.cadastrarPersonalizada({})).rejects.toThrow(
      "Nome e tipo da categoria são obrigatórios.",
    );
    await expect(
      CategoryService.cadastrarPersonalizada({
        idUsuario,
        nome: "   ",
        tipo: "DESPESA",
      }),
    ).rejects.toThrow("Nome da categoria é obrigatório.");
    await expect(
      CategoryService.cadastrarPersonalizada({
        idUsuario,
        nome: "Mercado",
        tipo: "INVESTIMENTO",
      }),
    ).rejects.toThrow("Tipo deve ser 'DESPESA' ou 'RECEITA'.");
    expect(prisma.categoria.create).not.toHaveBeenCalled();
  });

  it("deve editar nome e tipo quando categoria pertence ao usuário", async () => {
    prisma.categoria.findFirst
      .mockResolvedValueOnce(categoria)
      .mockResolvedValueOnce(null);
    prisma.categoria.update.mockResolvedValue({
      ...categoria,
      nome: "Supermercado",
      tipo: "RECEITA",
    });

    const resultado = await CategoryService.editar("cat-1", idUsuario, {
      nome: " Supermercado ",
      tipo: "receita",
    });

    expect(resultado).toEqual(
      expect.objectContaining({
        nome: "Supermercado",
        tipo: "RECEITA",
      }),
    );
    expect(prisma.categoria.update).toHaveBeenCalledWith({
      where: { id: "cat-1" },
      data: {
        nome: "Supermercado",
        tipo: "RECEITA",
      },
    });
  });

  it("deve validar edição inexistente, sem campos, nome, tipo e duplicidade", async () => {
    prisma.categoria.findFirst.mockResolvedValueOnce(null);
    await expect(
      CategoryService.editar("cat-1", idUsuario, { nome: "Mercado" }),
    ).rejects.toThrow(/não encontrada|padrão/i);

    prisma.categoria.findFirst.mockResolvedValue(categoria);
    await expect(
      CategoryService.editar("cat-1", idUsuario, {}),
    ).rejects.toThrow("Nenhum campo foi fornecido para atualização.");
    await expect(
      CategoryService.editar("cat-1", idUsuario, { nome: "  " }),
    ).rejects.toThrow("Nome da categoria é obrigatório.");
    await expect(
      CategoryService.editar("cat-1", idUsuario, { tipo: "INVALIDO" }),
    ).rejects.toThrow("Tipo deve ser 'DESPESA' ou 'RECEITA'.");

    prisma.categoria.findFirst
      .mockResolvedValueOnce(categoria)
      .mockResolvedValueOnce({ id: "cat-2" });
    await expect(
      CategoryService.editar("cat-1", idUsuario, { nome: "Feira" }),
    ).rejects.toThrow("Já existe uma categoria com este nome e tipo.");

    expect(prisma.categoria.update).not.toHaveBeenCalled();
  });
});
