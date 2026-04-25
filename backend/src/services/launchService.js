import prisma from "../database/prisma.js";

import {
  ValidationError,
  ConflictError,
} from "../errors/AppError.js";

class LaunchService {
  static async cadastrar({ idUsuario, idCategoria, valor, dataTransacao, tipo, descricao, recorrencia = "NENHUMA" }) {
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

    const lancamento = await prisma.lancamento.create({
      data: {
        idUsuario,
        idCategoria,
        valor: valorNumerico,
        dataTransacao: data,
        tipo,
        descricao: descricao?.trim() || null,
        recorrencia,
      },
      include: {
        categoria: true,
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
}

export default LaunchService;
