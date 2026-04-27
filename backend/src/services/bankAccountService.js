import prisma from "../database/prisma.js";

import { ValidationError, ConflictError } from "../errors/AppError.js";

class BankAccountService {
  static async listarPorUsuario(idUsuario) {
    if (!idUsuario) {
      throw new ValidationError("Usuário é obrigatório.");
    }

    return prisma.conta.findMany({
      where: {
        idUsuario,
        ativa: true,
      },
      orderBy: {
        nome: "asc",
      },
    });
  }

  static async cadastrar({ idUsuario, nome, tipo, saldoInicial, descricao }) {
    if (
      !idUsuario ||
      !nome ||
      !tipo ||
      saldoInicial === undefined ||
      saldoInicial === null
    ) {
      throw new ValidationError(
        "Todos os campos obrigatórios devem ser fornecidos: nome, tipo e saldoInicial.",
      );
    }

    const nomeFormatado = nome.trim();

    if (nomeFormatado.length < 2) {
      throw new ValidationError(
        "O nome da conta deve ter pelo menos 2 caracteres.",
      );
    }

    const tiposValidos = [
      "CONTA_CORRENTE",
      "POUPANCA",
      "CARTEIRA_DINHEIRO",
      "CARTEIRA_DIGITAL",
      "OUTRA",
    ];

    if (!tiposValidos.includes(tipo)) {
      throw new ValidationError(
        "Tipo de conta inválido. Use: CONTA_CORRENTE, POUPANCA, CARTEIRA_DINHEIRO, CARTEIRA_DIGITAL ou OUTRA.",
      );
    }

    const saldoNumerico = Number(saldoInicial);

    if (!Number.isFinite(saldoNumerico) || saldoNumerico < 0) {
      throw new ValidationError(
        "O saldo inicial deve ser um número maior ou igual a zero.",
      );
    }

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: idUsuario,
      },
    });

    if (!usuario) {
      throw new ValidationError("Usuário não encontrado.");
    }

    const contaExistente = await prisma.conta.findFirst({
      where: {
        idUsuario,
        nome: nomeFormatado,
      },
    });

    if (contaExistente) {
      throw new ConflictError("Você já possui uma conta com esse nome.");
    }

    const conta = await prisma.conta.create({
      data: {
        idUsuario,
        nome: nomeFormatado,
        tipo,
        saldoInicial: saldoNumerico.toFixed(2),
        descricao: descricao?.trim() || null,
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

    return conta;
  }
}

export default BankAccountService;
