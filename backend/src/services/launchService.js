import prisma from "../database/prisma.js";

import {
  ValidationError,
  ConflictError,
} from "../errors/AppError.js";

class LaunchService {
  static async cadastrar({ idUsuario, idCategoria, valor, dataTransacao, tipo, descricao, recorrencia = "NENHUMA" }) {
    
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
