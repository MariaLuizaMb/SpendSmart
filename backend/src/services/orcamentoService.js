import prisma from "../database/prisma.js";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../errors/appError.js";

const INCLUDE_CATEGORIA = {
  categoria: true,
};

function validarValorObrigatorio(valor) {
  if (valor === undefined || valor === null || valor === "") {
    throw new ValidationError("O valor do orçamento é obrigatório.");
  }

  const valorNumerico = Number(valor);

  if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
    throw new ValidationError("O valor do orçamento deve ser maior que zero.");
  }

  return valorNumerico.toFixed(2);
}

function validarValorOpcional(valor) {
  if (valor === undefined) return undefined;

  return validarValorObrigatorio(valor);
}

function validarMesObrigatorio(mes) {
  if (mes === undefined || mes === null || mes === "") {
    throw new ValidationError("O mês do orçamento é obrigatório.");
  }

  const mesNumerico = Number(mes);

  if (
    !Number.isInteger(mesNumerico) ||
    mesNumerico < 1 ||
    mesNumerico > 12
  ) {
    throw new ValidationError("O mês deve estar entre 1 e 12.");
  }

  return mesNumerico;
}

function validarMesOpcional(mes) {
  if (mes === undefined) return undefined;

  return validarMesObrigatorio(mes);
}

function validarAnoObrigatorio(ano) {
  if (ano === undefined || ano === null || ano === "") {
    throw new ValidationError("O ano do orçamento é obrigatório.");
  }

  const anoNumerico = Number(ano);

  if (
    !Number.isInteger(anoNumerico) ||
    anoNumerico < 1900 ||
    anoNumerico > 9999
  ) {
    throw new ValidationError("O ano do orçamento é inválido.");
  }

  return anoNumerico;
}

function validarAnoOpcional(ano) {
  if (ano === undefined) return undefined;

  return validarAnoObrigatorio(ano);
}

function normalizarIdCategoria(idCategoria) {
  if (idCategoria === undefined) return undefined;

  if (idCategoria === null) return null;

  if (typeof idCategoria !== "string") {
    throw new ValidationError("A categoria informada é inválida.");
  }

  const idCategoriaLimpo = idCategoria.trim();

  if (!idCategoriaLimpo || idCategoriaLimpo.toLowerCase() === "null") {
    return null;
  }

  return idCategoriaLimpo;
}

async function validarUsuario(idUsuario) {
  if (!idUsuario) {
    throw new ValidationError("Usuário é obrigatório.");
  }

  const usuario = await prisma.usuario.findUnique({
    where: { id: idUsuario },
  });

  if (!usuario) {
    throw new ValidationError("Usuário não encontrado.");
  }
}

async function validarCategoriaVisivel(idCategoria, idUsuario) {
  if (!idCategoria) return;

  const categoria = await prisma.categoria.findFirst({
    where: {
      id: idCategoria,
      OR: [{ idUsuario }, { ehPadrao: true }],
    },
  });

  if (!categoria) {
    throw new ValidationError(
      "Categoria não encontrada ou não pertence ao usuário.",
    );
  }
}

async function buscarDuplicidade({
  idUsuario,
  mes,
  ano,
  idCategoria,
  ignorarId,
}) {
  const where = {
    idUsuario,
    mes,
    ano,
    idCategoria,
  };

  if (ignorarId) {
    where.NOT = { id: ignorarId };
  }

  return prisma.orcamento.findFirst({ where });
}

function tratarErroPrismaDuplicidade(error) {
  if (error?.code === "P2002") {
    throw new ConflictError(
      "Já existe um orçamento cadastrado para este usuário, mês, ano e categoria.",
    );
  }

  throw error;
}

class OrcamentoService {
  static async cadastrar({ idUsuario, valor, mes, ano, idCategoria, descricao }) {
    await validarUsuario(idUsuario);

    const valorValidado = validarValorObrigatorio(valor);
    const mesValidado = validarMesObrigatorio(mes);
    const anoValidado = validarAnoObrigatorio(ano);
    const idCategoriaNormalizado = normalizarIdCategoria(idCategoria ?? null);

    await validarCategoriaVisivel(idCategoriaNormalizado, idUsuario);

    const orcamentoExistente = await buscarDuplicidade({
      idUsuario,
      mes: mesValidado,
      ano: anoValidado,
      idCategoria: idCategoriaNormalizado,
    });

    if (orcamentoExistente) {
      throw new ConflictError(
        "Já existe um orçamento cadastrado para este usuário, mês, ano e categoria.",
      );
    }

    try {
      return await prisma.orcamento.create({
        data: {
          idUsuario,
          valor: valorValidado,
          mes: mesValidado,
          ano: anoValidado,
          idCategoria: idCategoriaNormalizado,
          descricao: descricao?.trim() || null,
        },
        include: INCLUDE_CATEGORIA,
      });
    } catch (error) {
      tratarErroPrismaDuplicidade(error);
    }
  }

  static async listar(idUsuario, filtros = {}) {
    await validarUsuario(idUsuario);

    const where = { idUsuario };

    if (filtros.mes !== undefined) {
      where.mes = validarMesObrigatorio(filtros.mes);
    }

    if (filtros.ano !== undefined) {
      where.ano = validarAnoObrigatorio(filtros.ano);
    }

    if (filtros.idCategoria !== undefined) {
      where.idCategoria = normalizarIdCategoria(filtros.idCategoria);
    }

    return prisma.orcamento.findMany({
      where,
      include: INCLUDE_CATEGORIA,
      orderBy: [
        { ano: "desc" },
        { mes: "desc" },
        { categoria: { nome: "asc" } },
        { criadoEm: "desc" },
      ],
    });
  }

  static async buscarPorId(id, idUsuario) {
    const orcamento = await prisma.orcamento.findFirst({
      where: {
        id,
        idUsuario,
      },
      include: INCLUDE_CATEGORIA,
    });

    if (!orcamento) {
      throw new NotFoundError(
        "Orçamento não encontrado ou não pertence ao usuário.",
      );
    }

    return orcamento;
  }

  static async editar(id, idUsuario, dados) {
    const orcamento = await prisma.orcamento.findFirst({
      where: {
        id,
        idUsuario,
      },
    });

    if (!orcamento) {
      throw new NotFoundError(
        "Orçamento não encontrado ou não pertence ao usuário.",
      );
    }

    const dadosAtualizacao = {};

    const valorValidado = validarValorOpcional(dados.valor);
    if (valorValidado !== undefined) {
      dadosAtualizacao.valor = valorValidado;
    }

    const mesValidado = validarMesOpcional(dados.mes);
    if (mesValidado !== undefined) {
      dadosAtualizacao.mes = mesValidado;
    }

    const anoValidado = validarAnoOpcional(dados.ano);
    if (anoValidado !== undefined) {
      dadosAtualizacao.ano = anoValidado;
    }

    if (dados.idCategoria !== undefined) {
      const idCategoriaNormalizado = normalizarIdCategoria(dados.idCategoria);

      await validarCategoriaVisivel(idCategoriaNormalizado, idUsuario);

      dadosAtualizacao.idCategoria = idCategoriaNormalizado;
    }

    if (dados.descricao !== undefined) {
      dadosAtualizacao.descricao = dados.descricao?.trim() || null;
    }

    if (Object.keys(dadosAtualizacao).length === 0) {
      throw new ValidationError("Nenhum campo foi fornecido para atualização.");
    }

    const mesFinal = dadosAtualizacao.mes ?? orcamento.mes;
    const anoFinal = dadosAtualizacao.ano ?? orcamento.ano;
    const idCategoriaFinal =
      dadosAtualizacao.idCategoria !== undefined
        ? dadosAtualizacao.idCategoria
        : orcamento.idCategoria;

    const alterouChaveUnica =
      mesFinal !== orcamento.mes ||
      anoFinal !== orcamento.ano ||
      idCategoriaFinal !== orcamento.idCategoria;

    if (alterouChaveUnica) {
      const orcamentoExistente = await buscarDuplicidade({
        idUsuario,
        mes: mesFinal,
        ano: anoFinal,
        idCategoria: idCategoriaFinal,
        ignorarId: id,
      });

      if (orcamentoExistente) {
        throw new ConflictError(
          "Já existe um orçamento cadastrado para este usuário, mês, ano e categoria.",
        );
      }
    }

    try {
      return await prisma.orcamento.update({
        where: { id },
        data: dadosAtualizacao,
        include: INCLUDE_CATEGORIA,
      });
    } catch (error) {
      tratarErroPrismaDuplicidade(error);
    }
  }

  static async remover(id, idUsuario) {
    const orcamento = await prisma.orcamento.findFirst({
      where: {
        id,
        idUsuario,
      },
    });

    if (!orcamento) {
      throw new NotFoundError(
        "Orçamento não encontrado ou não pertence ao usuário.",
      );
    }

    await prisma.orcamento.delete({
      where: { id },
    });

    return { id, mensagem: "Orçamento removido com sucesso." };
  }
}

export default OrcamentoService;
