import prisma from "../database/prisma.js";
import { ValidationError } from "../errors/appError.js";

const TIPOS_VALIDOS = ["DESPESA", "RECEITA"];

class CategoryService {
  static async listarPorUsuario(idUsuario) {
    return prisma.categoria.findMany({
      where: {
        OR: [{ idUsuario }, { ehPadrao: true }],
      },
      orderBy: [{ tipo: "asc" }, { nome: "asc" }],
    });
  }

  static async cadastrarPersonalizada({ idUsuario, nome, tipo }) {
    if (!idUsuario || !nome || !tipo) {
      throw new ValidationError("Nome e tipo da categoria são obrigatórios.");
    }

    const nomeLimpo = nome.trim().replace(/\s+/g, " ");
    const tipoNormalizado = tipo.toUpperCase();

    if (!nomeLimpo) {
      throw new ValidationError("Nome da categoria é obrigatório.");
    }

    if (!TIPOS_VALIDOS.includes(tipoNormalizado)) {
      throw new ValidationError("Tipo deve ser 'DESPESA' ou 'RECEITA'.");
    }

    const categoriaVisivelExistente = await prisma.categoria.findFirst({
      where: {
        nome: {
          equals: nomeLimpo,
          mode: "insensitive",
        },
        tipo: tipoNormalizado,
        OR: [{ idUsuario }, { ehPadrao: true }],
      },
    });

    if (categoriaVisivelExistente) {
      return categoriaVisivelExistente;
    }

    return prisma.categoria.create({
      data: {
        idUsuario,
        nome: nomeLimpo,
        tipo: tipoNormalizado,
        ehPadrao: false,
      },
    });
  }
}

export default CategoryService;
