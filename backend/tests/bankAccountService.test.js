import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/database/prisma.js", () => ({
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

import prisma from "../src/database/prisma.js";
import BankAccountService from "../src/services/bankAccountService.js";

describe("BankAccountService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("listarPorUsuario", () => {
    it("deve exigir usuário para listar contas", async () => {
      await expect(BankAccountService.listarPorUsuario("")).rejects.toThrow(
        "Usuário é obrigatório.",
      );

      expect(prisma.conta.findMany).not.toHaveBeenCalled();
    });

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

  describe("cadastrar", () => {
    const dadosValidos = {
      idUsuario: "usuario-1",
      nome: "Carteira",
      tipo: "CONTA_CORRENTE",
      saldoInicial: "100",
      modeloCartao: "DEFAULT",
      descricao: " Principal ",
    };

    it("deve cadastrar conta default com nome informado", async () => {
      prisma.usuario.findUnique.mockResolvedValue({ id: "usuario-1" });
      prisma.conta.findFirst.mockResolvedValue(null);
      prisma.conta.create.mockResolvedValue({
        id: "conta-1",
        nome: "Carteira",
        saldoInicial: "100.00",
      });

      const resultado = await BankAccountService.cadastrar(dadosValidos);

      expect(resultado).toEqual({
        id: "conta-1",
        nome: "Carteira",
        saldoInicial: "100.00",
        saldoAtual: "100.00",
      });
      expect(prisma.conta.create).toHaveBeenCalledWith({
        data: {
          idUsuario: "usuario-1",
          nome: "Carteira",
          tipo: "CONTA_CORRENTE",
          saldoInicial: "100.00",
          modeloCartao: "DEFAULT",
          descricao: "Principal",
          ativa: true,
        },
        include: {
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

    it("deve usar nome do modelo de cartão quando modelo não for default", async () => {
      prisma.usuario.findUnique.mockResolvedValue({ id: "usuario-1" });
      prisma.conta.findFirst.mockResolvedValue(null);
      prisma.conta.create.mockResolvedValue({
        id: "conta-2",
        nome: "Nubank",
        saldoInicial: "0.00",
      });

      await BankAccountService.cadastrar({
        ...dadosValidos,
        nome: "",
        saldoInicial: 0,
        modeloCartao: "NUBANK",
        descricao: "",
      });

      expect(prisma.conta.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            nome: "Nubank",
            modeloCartao: "NUBANK",
            descricao: null,
          }),
        }),
      );
    });

    it("deve validar campos obrigatórios, tipo, modelo, nome, saldo, usuário e duplicidade", async () => {
      await expect(BankAccountService.cadastrar({})).rejects.toThrow(
        /campos obrigatórios/i,
      );
      await expect(
        BankAccountService.cadastrar({ ...dadosValidos, tipo: "INVALIDO" }),
      ).rejects.toThrow(/Tipo de conta inválido/i);
      await expect(
        BankAccountService.cadastrar({ ...dadosValidos, modeloCartao: "XPTO" }),
      ).rejects.toThrow(/Modelo de cartão inválido/i);
      await expect(
        BankAccountService.cadastrar({ ...dadosValidos, nome: "A" }),
      ).rejects.toThrow(/pelo menos 2 caracteres/i);
      await expect(
        BankAccountService.cadastrar({ ...dadosValidos, saldoInicial: -1 }),
      ).rejects.toThrow(/maior ou igual a zero/i);

      prisma.usuario.findUnique.mockResolvedValueOnce(null);
      await expect(BankAccountService.cadastrar(dadosValidos)).rejects.toThrow(
        "Usuário não encontrado.",
      );

      prisma.usuario.findUnique.mockResolvedValueOnce({ id: "usuario-1" });
      prisma.conta.findFirst.mockResolvedValueOnce({ id: "conta-existente" });
      await expect(BankAccountService.cadastrar(dadosValidos)).rejects.toThrow(
        "Você já possui uma conta com esse nome.",
      );
    });
  });

  describe("editar", () => {
    const contaExistente = {
      id: "conta-1",
      idUsuario: "usuario-1",
      nome: "Carteira",
      tipo: "CONTA_CORRENTE",
    };

    it("deve editar campos e recalcular saldo atual", async () => {
      prisma.conta.findFirst
        .mockResolvedValueOnce(contaExistente)
        .mockResolvedValueOnce(null);
      prisma.conta.update.mockResolvedValue({
        ...contaExistente,
        nome: "Mercado Pago",
        saldoInicial: "200.00",
        lancamentos: [
          { valor: "50.00", tipo: "RECEITA" },
          { valor: "25.00", tipo: "DESPESA" },
        ],
      });

      const resultado = await BankAccountService.editar(
        "conta-1",
        "usuario-1",
        {
          modeloCartao: "MERCADO_PAGO",
          tipo: "POUPANCA",
          saldoInicial: 200,
          descricao: " Atualizada ",
          ativa: false,
        },
      );

      expect(resultado).toEqual(
        expect.objectContaining({
          nome: "Mercado Pago",
          saldoAtual: "225.00",
        }),
      );
      expect(resultado).not.toHaveProperty("lancamentos");
      expect(prisma.conta.update).toHaveBeenCalledWith({
        where: { id: "conta-1" },
        data: {
          modeloCartao: "MERCADO_PAGO",
          nome: "Mercado Pago",
          tipo: "POUPANCA",
          saldoInicial: "200.00",
          descricao: "Atualizada",
          ativa: false,
        },
        include: {
          lancamentos: {
            select: {
              valor: true,
              tipo: true,
            },
          },
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

    it("deve validar existência, dados inválidos, duplicidade e ausência de campos", async () => {
      prisma.conta.findFirst.mockResolvedValueOnce(null);
      await expect(
        BankAccountService.editar("conta-1", "usuario-1", { nome: "Carteira" }),
      ).rejects.toThrow(/não encontrada/i);

      prisma.conta.findFirst.mockResolvedValue(contaExistente);
      await expect(
        BankAccountService.editar("conta-1", "usuario-1", { modeloCartao: "XPTO" }),
      ).rejects.toThrow(/Modelo de cartão inválido/i);
      await expect(
        BankAccountService.editar("conta-1", "usuario-1", { nome: "A" }),
      ).rejects.toThrow(/pelo menos 2 caracteres/i);

      prisma.conta.findFirst
        .mockResolvedValueOnce(contaExistente)
        .mockResolvedValueOnce({ id: "conta-2" });
      await expect(
        BankAccountService.editar("conta-1", "usuario-1", { nome: "Duplicada" }),
      ).rejects.toThrow(/outra conta/i);

      prisma.conta.findFirst.mockResolvedValue(contaExistente);
      await expect(
        BankAccountService.editar("conta-1", "usuario-1", { tipo: "INVALIDO" }),
      ).rejects.toThrow(/Tipo de conta inválido/i);
      await expect(
        BankAccountService.editar("conta-1", "usuario-1", { saldoInicial: -5 }),
      ).rejects.toThrow(/maior ou igual a zero/i);
      await expect(
        BankAccountService.editar("conta-1", "usuario-1", { ativa: "sim" }),
      ).rejects.toThrow(/boole/i);
      await expect(
        BankAccountService.editar("conta-1", "usuario-1", {}),
      ).rejects.toThrow(/Nenhum campo/i);
    });
  });

  describe("remover", () => {
    it("deve desativar conta com lançamentos associados", async () => {
      prisma.conta.findFirst.mockResolvedValue({ id: "conta-1" });
      prisma.lancamento.count.mockResolvedValue(2);

      const resultado = await BankAccountService.remover("conta-1", "usuario-1");

      expect(resultado).toEqual({
        id: "conta-1",
        mensagem: "Conta desativada com sucesso (possui lançamentos associados).",
      });
      expect(prisma.conta.update).toHaveBeenCalledWith({
        where: { id: "conta-1" },
        data: { ativa: false },
      });
      expect(prisma.conta.delete).not.toHaveBeenCalled();
    });

    it("deve remover definitivamente conta sem lançamentos", async () => {
      prisma.conta.findFirst.mockResolvedValue({ id: "conta-1" });
      prisma.lancamento.count.mockResolvedValue(0);

      const resultado = await BankAccountService.remover("conta-1", "usuario-1");

      expect(resultado).toEqual({
        id: "conta-1",
        mensagem: "Conta removida com sucesso.",
      });
      expect(prisma.conta.delete).toHaveBeenCalledWith({
        where: { id: "conta-1" },
      });
    });

    it("deve rejeitar remoção de conta inexistente", async () => {
      prisma.conta.findFirst.mockResolvedValue(null);

      await expect(
        BankAccountService.remover("conta-1", "usuario-1"),
      ).rejects.toThrow(/não encontrada/i);

      expect(prisma.lancamento.count).not.toHaveBeenCalled();
    });
  });
});
