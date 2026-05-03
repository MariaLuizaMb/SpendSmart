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

  static async editar(id, idUsuario, dados) {
    // Validar se a categoria existe e pertence ao usuário
    const categoria = await prisma.categoria.findFirst({
      where: {
        id,
        idUsuario,
        ehPadrao: false, // Só permite editar categorias personalizadas
      },
    });

    if (!categoria) {
      throw new ValidationError("Categoria não encontrada, não pertence ao usuário ou é uma categoria padrão do sistema.");
    }

    // Preparar dados a serem atualizados
    const dadosAtualizacao = {};

    // Validar e adicionar campos se fornecidos
    if (dados.nome !== undefined) {
      const nomeLimpo = dados.nome.trim().replace(/\s+/g, " ");
      if (!nomeLimpo) {
        throw new ValidationError("Nome da categoria é obrigatório.");
      }
      dadosAtualizacao.nome = nomeLimpo;
    }

    if (dados.tipo !== undefined) {
      const tipoNormalizado = dados.tipo.toUpperCase();
      if (!TIPOS_VALIDOS.includes(tipoNormalizado)) {
        throw new ValidationError("Tipo deve ser 'DESPESA' ou 'RECEITA'.");
      }
      dadosAtualizacao.tipo = tipoNormalizado;
    }

    // Se nenhum campo foi fornecido para atualização
    if (Object.keys(dadosAtualizacao).length === 0) {
      throw new ValidationError("Nenhum campo foi fornecido para atualização.");
    }

    // Verificar se já existe uma categoria com o mesmo nome e tipo (se nome ou tipo foram alterados)
    if (dadosAtualizacao.nome || dadosAtualizacao.tipo) {
      const nomeVerificar = dadosAtualizacao.nome || categoria.nome;
      const tipoVerificar = dadosAtualizacao.tipo || categoria.tipo;

      const categoriaExistente = await prisma.categoria.findFirst({
        where: {
          nome: {
            equals: nomeVerificar,
            mode: "insensitive",
          },
          tipo: tipoVerificar,
          OR: [{ idUsuario }, { ehPadrao: true }],
          NOT: { id }, // Excluir a própria categoria da verificação
        },
      });

      if (categoriaExistente) {
        throw new ValidationError("Já existe uma categoria com este nome e tipo.");
      }
    }

    // Atualizar categoria
    const categoriaAtualizada = await prisma.categoria.update({
      where: { id },
      data: dadosAtualizacao,
    });

    return categoriaAtualizada;
  }

  static async remover(id, idUsuario) {
    // Validar se a categoria existe, pertence ao usuário e não é padrão
    const categoria = await prisma.categoria.findFirst({
      where: {
        id,
        idUsuario,
        ehPadrao: false, // Só permite remover categorias personalizadas
      },
    });

    if (!categoria) {
      throw new ValidationError("Categoria não encontrada, não pertence ao usuário ou é uma categoria padrão do sistema.");
    }

    // Verificar se a categoria está sendo usada em lançamentos
    const lancamentosUsandoCategoria = await prisma.lancamento.count({
      where: {
        idCategoria: id,
      },
    });

    if (lancamentosUsandoCategoria > 0) {
      throw new ValidationError("Não é possível remover uma categoria que possui lançamentos associados.");
    }

    // Verificar se a categoria está sendo usada em orçamentos
    const orcamentosUsandoCategoria = await prisma.orcamento.count({
      where: {
        idCategoria: id,
      },
    });

    if (orcamentosUsandoCategoria > 0) {
      throw new ValidationError("Não é possível remover uma categoria que possui orçamentos associados.");
    }

    // Remover categoria
    await prisma.categoria.delete({
      where: { id },
    });

    return { id, mensagem: "Categoria removida com sucesso." };
  }
}

export default CategoryService;
