import prisma from "../database/prisma.js";

import { ValidationError } from "../errors/AppError.js";

function converterDataTransacao(dataTransacao) {
  if (
    typeof dataTransacao === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(dataTransacao)
  ) {
    const [ano, mes, dia] = dataTransacao.split("-").map(Number);

    return new Date(Date.UTC(ano, mes - 1, dia));
  }

  return new Date(dataTransacao);
}

function obterIntervaloPorPeriodo(periodo) {
  const agora = new Date();

  const anoAtual = agora.getUTCFullYear();
  const mesAtual = agora.getUTCMonth();
  const diaAtual = agora.getUTCDate();

  if (periodo === "semana") {
    const inicio = new Date(Date.UTC(anoAtual, mesAtual, diaAtual));
    const diaSemana = inicio.getUTCDay();
    const distanciaSegunda = diaSemana === 0 ? -6 : 1 - diaSemana;

    inicio.setUTCDate(inicio.getUTCDate() + distanciaSegunda);

    const fim = new Date(inicio);
    fim.setUTCDate(fim.getUTCDate() + 7);

    return { gte: inicio, lt: fim };
  }

  if (periodo === "mes") {
    const inicio = new Date(Date.UTC(anoAtual, mesAtual, 1));
    const fim = new Date(Date.UTC(anoAtual, mesAtual + 1, 1));

    return { gte: inicio, lt: fim };
  }

  if (periodo === "ano") {
    const inicio = new Date(Date.UTC(anoAtual, 0, 1));
    const fim = new Date(Date.UTC(anoAtual + 1, 0, 1));

    return { gte: inicio, lt: fim };
  }

  return null;
}

function obterIntervaloPorDatas(dataInicio, dataFim) {
  if (!dataInicio && !dataFim) return null;

  const intervalo = {};

  if (dataInicio) {
    const inicio = converterDataTransacao(dataInicio);

    if (isNaN(inicio.getTime())) {
      throw new ValidationError("Data inicial inválida.");
    }

    intervalo.gte = inicio;
  }

  if (dataFim) {
    const fim = converterDataTransacao(dataFim);

    if (isNaN(fim.getTime())) {
      throw new ValidationError("Data final inválida.");
    }

    intervalo.lt = fim;
  }

  return intervalo;
}

class LaunchService {
  static async cadastrar({
    idUsuario,
    idCategoria,
    idConta,
    valor,
    dataTransacao,
    tipo,
    descricao,
    recorrencia = "NENHUMA",
  }) {
    // Validações básicas
    if (!idUsuario || !idCategoria || !valor || !dataTransacao || !tipo) {
      throw new ValidationError(
        "Todos os campos obrigatórios devem ser fornecidos: idUsuario, idCategoria, valor, dataTransacao, tipo.",
      );
    }

    // Validar valor
    if (typeof valor !== "number" || Number.isNaN(valor) || valor <= 0) {
      throw new ValidationError("O valor deve ser um número positivo.");
    }

    const valorNumerico = valor;

    // Validar data
    const data = converterDataTransacao(dataTransacao);
    if (isNaN(data.getTime())) {
      throw new ValidationError("Data de transação inválida.");
    }

    // Validar tipo
    if (!["DESPESA", "RECEITA"].includes(tipo)) {
      throw new ValidationError("Tipo deve ser 'DESPESA' ou 'RECEITA'.");
    }

    // Validar recorrencia
    const recorrenciasValidas = [
      "NENHUMA",
      "DIARIA",
      "SEMANAL",
      "MENSAL",
      "ANUAL",
    ];
    if (!recorrenciasValidas.includes(recorrencia)) {
      throw new ValidationError("Recorrência inválida.");
    }

    // Verificar se usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: idUsuario },
    });
    if (!usuario) {
      throw new ValidationError("Usuário não encontrado.");
    }

    // Verificar se categoria existe e pertence ao usuário
    const categoria = await prisma.categoria.findFirst({
      where: {
        id: idCategoria,
        OR: [
          { idUsuario: idUsuario }, // categoria do usuário
          { ehPadrao: true }, // ou categoria padrão
        ],
      },
    });
    if (!categoria) {
      throw new ValidationError(
        "Categoria não encontrada ou não pertence ao usuário.",
      );
    }

    // Verificar se o tipo da categoria corresponde ao tipo do lançamento
    if (categoria.tipo !== tipo) {
      throw new ValidationError(
        `A categoria selecionada é do tipo ${categoria.tipo}, mas o lançamento é do tipo ${tipo}.`,
      );
    }

    if (idConta) {
      const conta = await prisma.conta.findFirst({
        where: {
          id: idConta,
          idUsuario,
          ativa: true,
        },
      });

      if (!conta) {
        throw new ValidationError(
          "Conta não encontrada ou não pertence ao usuário.",
        );
      }
    }

    const lancamento = await prisma.lancamento.create({
      data: {
        idUsuario,
        idCategoria,
        idConta: idConta || null,
        valor: valorNumerico,
        dataTransacao: data,
        tipo,
        descricao: descricao?.trim() || null,
        recorrencia,
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

    return lancamento;
  }

  static async editar(id, idUsuario, dados) {
    // Validar se o lançamento existe e pertence ao usuário
    const lancamento = await prisma.lancamento.findFirst({
      where: {
        id,
        idUsuario,
      },
    });

    if (!lancamento) {
      throw new ValidationError(
        "Lançamento não encontrado ou não pertence ao usuário.",
      );
    }

    // Preparar dados a serem atualizados
    const dadosAtualizacao = {};

    // Validar e adicionar campos se fornecidos
    if (dados.valor !== undefined) {
      const valorNumerico = parseFloat(dados.valor);
      if (isNaN(valorNumerico) || valorNumerico <= 0) {
        throw new ValidationError("O valor deve ser um número positivo.");
      }
      dadosAtualizacao.valor = valorNumerico;
    }

    if (dados.dataTransacao !== undefined) {
      const data = converterDataTransacao(dados.dataTransacao);
      if (isNaN(data.getTime())) {
        throw new ValidationError("Data de transação inválida.");
      }
      dadosAtualizacao.dataTransacao = data;
    }

    if (dados.tipo !== undefined) {
      if (!["DESPESA", "RECEITA"].includes(dados.tipo)) {
        throw new ValidationError("Tipo deve ser 'DESPESA' ou 'RECEITA'.");
      }
      dadosAtualizacao.tipo = dados.tipo;
    }

    if (dados.recorrencia !== undefined) {
      const recorrenciasValidas = [
        "NENHUMA",
        "DIARIA",
        "SEMANAL",
        "MENSAL",
        "ANUAL",
      ];
      if (!recorrenciasValidas.includes(dados.recorrencia)) {
        throw new ValidationError("Recorrência inválida.");
      }
      dadosAtualizacao.recorrencia = dados.recorrencia;
    }

    if (dados.descricao !== undefined) {
      dadosAtualizacao.descricao = dados.descricao?.trim() || null;
    }

    // Validar categoria se fornecida
    if (dados.idCategoria !== undefined) {
      const categoria = await prisma.categoria.findFirst({
        where: {
          id: dados.idCategoria,
          OR: [{ idUsuario: idUsuario }, { ehPadrao: true }],
        },
      });

      if (!categoria) {
        throw new ValidationError(
          "Categoria não encontrada ou não pertence ao usuário.",
        );
      }

      // Verificar compatibilidade de tipo
      const tipoAtual = dados.tipo || lancamento.tipo;
      if (categoria.tipo !== tipoAtual) {
        throw new ValidationError(
          `A categoria selecionada é do tipo ${categoria.tipo}, mas o lançamento é do tipo ${tipoAtual}.`,
        );
      }

      dadosAtualizacao.idCategoria = dados.idCategoria;
    }

    // Validar conta se fornecida
    if (dados.idConta !== undefined) {
      if (dados.idConta !== null) {
        const conta = await prisma.conta.findFirst({
          where: {
            id: dados.idConta,
            idUsuario,
            ativa: true,
          },
        });

        if (!conta) {
          throw new ValidationError(
            "Conta não encontrada ou não pertence ao usuário.",
          );
        }
      }
      dadosAtualizacao.idConta = dados.idConta;
    }

    // Se nenhum campo foi fornecido para atualização
    if (Object.keys(dadosAtualizacao).length === 0) {
      throw new ValidationError("Nenhum campo foi fornecido para atualização.");
    }

    // Atualizar lançamento
    const lancamentoAtualizado = await prisma.lancamento.update({
      where: { id },
      data: dadosAtualizacao,
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

    return lancamentoAtualizado;
  }

  static async remover(id, idUsuario) {
    // Validar se o lançamento existe e pertence ao usuário
    const lancamento = await prisma.lancamento.findFirst({
      where: {
        id,
        idUsuario,
      },
    });

    if (!lancamento) {
      throw new ValidationError(
        "Lançamento não encontrado ou não pertence ao usuário.",
      );
    }

    // Remover lançamento
    await prisma.lancamento.delete({
      where: { id },
    });

    return { id, mensagem: "Lançamento removido com sucesso." };
  }

  static async listar(idUsuario, filtros = {}) {
    // Verificar se usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: idUsuario },
    });

    if (!usuario) {
      throw new ValidationError("Usuário não encontrado.");
    }

    const where = { idUsuario };
    const { periodo, idConta, limite, dataInicio, dataFim } = filtros;
    const intervalo =
      obterIntervaloPorDatas(dataInicio, dataFim) ||
      obterIntervaloPorPeriodo(periodo);
    const deveLogarFiltroMes = periodo === "mes";

    if (deveLogarFiltroMes) {
      console.log("[Backend][Lancamentos][Filtro mes] filtros recebidos:", {
        idUsuario,
        periodo,
        idConta,
        limite,
        dataInicio,
        dataFim,
      });

      console.log("[Backend][Lancamentos][Filtro mes] intervalo calculado:", {
        inicio: intervalo?.gte?.toISOString(),
        fim: intervalo?.lt?.toISOString(),
      });
    }

    if (intervalo) {
      where.dataTransacao = intervalo;
    }

    if (idConta) {
      where.idConta = idConta;
    }

    const quantidade = Number(limite);
    const take =
      Number.isInteger(quantidade) && quantidade > 0 ? quantidade : undefined;

    // Buscar todos os lançamentos do usuário
    const lancamentos = await prisma.lancamento.findMany({
      where,
      include: {
        categoria: true,
        conta: true,
      },
      orderBy: {
        dataTransacao: "desc",
      },
      take,
    });

    if (deveLogarFiltroMes) {
      console.log(
        "[Backend][Lancamentos][Filtro mes] quantidade encontrada:",
        lancamentos.length,
      );
      console.log(
        "[Backend][Lancamentos][Filtro mes] datas encontradas:",
        lancamentos.map((lancamento) => ({
          id: lancamento.id,
          tipo: lancamento.tipo,
          valor: lancamento.valor,
          dataTransacao: lancamento.dataTransacao?.toISOString(),
          categoria: lancamento.categoria?.nome,
          conta: lancamento.conta?.nome,
        })),
      );
    }

    return lancamentos;
  }
}

export default LaunchService;
