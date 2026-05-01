import prisma from "../database/prisma.js";

import { ValidationError, ConflictError } from "../errors/AppError.js";

function calcularSaldoAtual(conta) {
  const saldoInicial = Number(conta.saldoInicial || 0);
  const lancamentos = conta.lancamentos || [];

  return lancamentos.reduce((saldo, lancamento) => {
    const valor = Number(lancamento.valor || 0);

    if (lancamento.tipo === "RECEITA") {
      return saldo + valor;
    }

    if (lancamento.tipo === "DESPESA") {
      return saldo - valor;
    }

    return saldo;
  }, saldoInicial);
}

function adicionarSaldoAtual(conta) {
  const { lancamentos, ...dadosConta } = conta;

  return {
    ...dadosConta,
    saldoAtual: calcularSaldoAtual(conta).toFixed(2),
  };
}

class BankAccountService {
  static async listarPorUsuario(idUsuario) {
    if (!idUsuario) {
      throw new ValidationError("Usuário é obrigatório.");
    }

    const contas = await prisma.conta.findMany({
      where: {
        idUsuario,
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

    return contas.map(adicionarSaldoAtual);
  }

  static async cadastrar({
    idUsuario,
    nome,
    tipo,
    saldoInicial,
    modeloCartao,
    descricao,
  }) {
    if (
      !idUsuario ||
      !tipo ||
      saldoInicial === undefined ||
      saldoInicial === null
    ) {
      throw new ValidationError(
        "Todos os campos obrigatórios devem ser fornecidos: tipo e saldoInicial.",
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

    const nomesPorModeloCartao = {
      NUBANK: "Nubank",
      MERCADO_PAGO: "Mercado Pago",
      CAIXA: "Caixa",
      PICPAY: "PicPay",
      DEFAULT: null,
    };
    const modelosValidos = Object.keys(nomesPorModeloCartao);
    const modeloCartaoFormatado = modeloCartao || "DEFAULT";

    if (!modelosValidos.includes(modeloCartaoFormatado)) {
      throw new ValidationError(
        "Modelo de cartão inválido. Use: NUBANK, MERCADO_PAGO, CAIXA, PICPAY ou DEFAULT.",
      );
    }

    const nomeFormatado =
      modeloCartaoFormatado === "DEFAULT"
        ? nome?.trim() || ""
        : nomesPorModeloCartao[modeloCartaoFormatado];

    if (nomeFormatado.length < 2) {
      throw new ValidationError(
        "O nome da conta deve ter pelo menos 2 caracteres.",
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
        modeloCartao: modeloCartaoFormatado,
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

    return {
      ...conta,
      saldoAtual: Number(conta.saldoInicial || 0).toFixed(2),
    };
  }

  static async editar(id, idUsuario, dados) {
    // Validar se a conta existe e pertence ao usuário
    const conta = await prisma.conta.findFirst({
      where: {
        id,
        idUsuario,
      },
    });

    if (!conta) {
      throw new ValidationError("Conta não encontrada ou não pertence ao usuário.");
    }

    // Preparar dados a serem atualizados
    const dadosAtualizacao = {};

    // Validar e adicionar campo nome se fornecido
    if (dados.nome !== undefined) {
      const nomeFormatado = dados.nome.trim();

      if (nomeFormatado.length < 2) {
        throw new ValidationError(
          "O nome da conta deve ter pelo menos 2 caracteres."
        );
      }

      // Verificar se já existe outra conta com esse nome
      const contaComMesmoNome = await prisma.conta.findFirst({
        where: {
          idUsuario,
          nome: nomeFormatado,
          NOT: { id }, // Excluir a própria conta
        },
      });

      if (contaComMesmoNome) {
        throw new ConflictError("Você já possui outra conta com esse nome.");
      }

      dadosAtualizacao.nome = nomeFormatado;
    }

    // Validar e adicionar campo tipo se fornecido
    if (dados.tipo !== undefined) {
      const tiposValidos = [
        "CONTA_CORRENTE",
        "POUPANCA",
        "CARTEIRA_DINHEIRO",
        "CARTEIRA_DIGITAL",
        "OUTRA",
      ];

      if (!tiposValidos.includes(dados.tipo)) {
        throw new ValidationError(
          "Tipo de conta inválido. Use: CONTA_CORRENTE, POUPANCA, CARTEIRA_DINHEIRO, CARTEIRA_DIGITAL ou OUTRA."
        );
      }

      dadosAtualizacao.tipo = dados.tipo;
    }

    // Validar e adicionar campo saldoInicial se fornecido
    if (dados.saldoInicial !== undefined) {
      const saldoNumerico = Number(dados.saldoInicial);

      if (!Number.isFinite(saldoNumerico) || saldoNumerico < 0) {
        throw new ValidationError(
          "O saldo inicial deve ser um número maior ou igual a zero."
        );
      }

      dadosAtualizacao.saldoInicial = saldoNumerico.toFixed(2);
    }

    // Adicionar campo descricao se fornecido
    if (dados.descricao !== undefined) {
      dadosAtualizacao.descricao = dados.descricao?.trim() || null;
    }

    // Validar e adicionar campo ativa se fornecido
    if (dados.ativa !== undefined) {
      if (typeof dados.ativa !== "boolean") {
        throw new ValidationError("O campo 'ativa' deve ser um valor booleano (true ou false).");
      }

      dadosAtualizacao.ativa = dados.ativa;
    }

    // Se nenhum campo foi fornecido para atualização
    if (Object.keys(dadosAtualizacao).length === 0) {
      throw new ValidationError(
        "Nenhum campo foi fornecido para atualização."
      );
    }

    // Atualizar conta
    const contaAtualizada = await prisma.conta.update({
      where: { id },
      data: dadosAtualizacao,
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

    return adicionarSaldoAtual(contaAtualizada);
  }

  static async remover(id, idUsuario) {
    // Validar se a conta existe e pertence ao usuário
    const conta = await prisma.conta.findFirst({
      where: {
        id,
        idUsuario,
      },
    });

    if (!conta) {
      throw new ValidationError("Conta não encontrada ou não pertence ao usuário.");
    }

    // Verificar se a conta está sendo usada em lançamentos
    const lancamentosUsandoConta = await prisma.lancamento.count({
      where: {
        idConta: id,
      },
    });

    // Se tem lançamentos associados, fazer soft delete
    if (lancamentosUsandoConta > 0) {
      await prisma.conta.update({
        where: { id },
        data: {
          ativa: false,
        },
      });

      return { id, mensagem: "Conta desativada com sucesso (possui lançamentos associados)." };
    }

    // Se não tem lançamentos, fazer delete permanente
    await prisma.conta.delete({
      where: { id },
    });

    return { id, mensagem: "Conta removida com sucesso." };
  }
}

export default BankAccountService;
