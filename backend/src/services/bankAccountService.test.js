import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../database/prisma.js", () => ({
  default: {
    conta: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    usuario: {
      findUnique: vi.fn(),
    },
    lancamento: {
      count: vi.fn(),
    },
  },
}));

import prisma from "../database/prisma.js";
import BankAccountService from "./bankAccountService.js";

describe("BankAccountService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("listarPorUsuario", () => {
    it("deve retornar o saldo atual calculado pelos lançamentos da conta", async () => {
      prisma.conta.findMany.mockResolvedValue([
        {
          id: "conta-1",
          idUsuario: "usuario-1",
          nome: "Nubank",
          tipo: "CONTA_CORRENTE",
          saldoInicial: "1000.00",
          modeloCartao: "NUBANK",
          ativa: true,
          lancamentos: [
            { valor: "250.00", tipo: "RECEITA" },
            { valor: "80.50", tipo: "DESPESA" },
          ],
        },
      ]);

      const contas = await BankAccountService.listarPorUsuario("usuario-1");

      expect(prisma.conta.findMany).toHaveBeenCalledWith({
        where: {
          idUsuario: "usuario-1",
          ativa: true,
        },
        include: {
          lancamentos: {
            select: {
              valor: true,
              tipo: true,
            },
          },
        },
        orderBy: {
          nome: "asc",
        },
      });

      expect(contas).toEqual([
        expect.objectContaining({
          id: "conta-1",
          saldoInicial: "1000.00",
          saldoAtual: "1169.50",
        }),
      ]);
      expect(contas[0]).not.toHaveProperty("lancamentos");
    });
  });
});
