import prisma from "../database/prisma.js";

import { ValidationError } from "../errors/AppError.js";

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
      throw new ValidationError("Todos os campos obrigatórios devem ser fornecidos: idUsuario, idCategoria, valor, dataTransacao, tipo.");
    }

    // Validar valor
    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      throw new ValidationError("O valor deve ser um número positivo.");
    }

    // Validar data
    const data = new Date(dataTransacao);
    if (isNaN(data.getTime())) {
      throw new ValidationError("Data de transação inválida.");
    }

    // Validar tipo
    if (!["DESPESA", "RECEITA"].includes(tipo)) {
      throw new ValidationError("Tipo deve ser 'DESPESA' ou 'RECEITA'.");
    }

    // Validar recorrencia
    const recorrenciasValidas = ["NENHUMA", "DIARIA", "SEMANAL", "MENSAL", "ANUAL"];
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
      throw new ValidationError("Categoria não encontrada ou não pertence ao usuário.");
    }

    // Verificar se o tipo da categoria corresponde ao tipo do lançamento
    if (categoria.tipo !== tipo) {
      throw new ValidationError(`A categoria selecionada é do tipo ${categoria.tipo}, mas o lançamento é do tipo ${tipo}.`);
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
        throw new ValidationError("Conta não encontrada ou não pertence ao usuário.");
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
      throw new ValidationError("Lançamento não encontrado ou não pertence ao usuário.");
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
      const data = new Date(dados.dataTransacao);
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
      const recorrenciasValidas = ["NENHUMA", "DIARIA", "SEMANAL", "MENSAL", "ANUAL"];
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
          OR: [
            { idUsuario: idUsuario },
            { ehPadrao: true },
          ],
        },
      });

      if (!categoria) {
        throw new ValidationError("Categoria não encontrada ou não pertence ao usuário.");
      }

      // Verificar compatibilidade de tipo
      const tipoAtual = dados.tipo || lancamento.tipo;
      if (categoria.tipo !== tipoAtual) {
        throw new ValidationError(`A categoria selecionada é do tipo ${categoria.tipo}, mas o lançamento é do tipo ${tipoAtual}.`);
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
          throw new ValidationError("Conta não encontrada ou não pertence ao usuário.");
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
      throw new ValidationError("Lançamento não encontrado ou não pertence ao usuário.");
    }

    // Remover lançamento
    await prisma.lancamento.delete({
      where: { id },
    });

    return { id, mensagem: "Lançamento removido com sucesso." };
  }

  static async listar(idUsuario) {
    // Verificar se usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: idUsuario },
    });

    if (!usuario) {
      throw new ValidationError("Usuário não encontrado.");
    }

    // Buscar todos os lançamentos do usuário
    const lancamentos = await prisma.lancamento.findMany({
      where: { idUsuario },
      include: {
        categoria: true,
        conta: true,
      },
      orderBy: {
        dataTransacao: "desc",
      },
    });

    return lancamentos;
  }
}

export default LaunchService;
