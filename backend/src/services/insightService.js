import prisma from "../database/prisma.js";

function criarInsight({ tipo, titulo, descricao, dados }) {
  if (!titulo || !descricao) return null;

  return {
    tipo,
    titulo,
    descricao,
    dados: dados || {},
  };
}

function mapearInsights(analyticsResult = {}) {
  const insights = analyticsResult.insights || {};
  const mapped = [];

  if (insights.categoriaMaiorGasto) {
    const categoria = insights.categoriaMaiorGasto;
    mapped.push(
      criarInsight({
        tipo: "categoria_maior_gasto",
        titulo: "Categoria com maior gasto",
        descricao: `${categoria.nome || "Uma categoria"} concentra a maior projeção de despesas.`,
        dados: categoria,
      }),
    );
  }

  (insights.categoriasCriticas || []).forEach((categoria) => {
    mapped.push(
      criarInsight({
        tipo: "categoria_critica",
        titulo: `${categoria.nome || "Categoria"} exige atenção`,
        descricao:
          categoria.tendencia?.descricao ||
          "A categoria apresenta risco financeiro no período analisado.",
        dados: categoria,
      }),
    );
  });

  (insights.categoriasMaisCresceram || []).forEach((categoria) => {
    mapped.push(
      criarInsight({
        tipo: "categoria_em_crescimento",
        titulo: `${categoria.nome || "Categoria"} em crescimento`,
        descricao:
          categoria.tendencia?.descricao ||
          "A categoria está crescendo em relação ao histórico recente.",
        dados: categoria,
      }),
    );
  });

  if (insights.dadosInsuficientes) {
    mapped.push(
      criarInsight({
        tipo: "dados_insuficientes",
        titulo: "Histórico financeiro insuficiente",
        descricao:
          "Ainda não há histórico suficiente para gerar previsões com alta confiabilidade.",
        dados: analyticsResult.confiabilidade || {},
      }),
    );
  }

  return mapped.filter(Boolean);
}

class InsightService {
  static mapearInsightsDaAnalise(analyticsResult) {
    return mapearInsights(analyticsResult);
  }

  static async salvarInsightsDaAnalise({ idUsuario, analyticsResult }) {
    const insights = mapearInsights(analyticsResult);

    if (!insights.length) {
      return [];
    }

    await prisma.insight.createMany({
      data: insights.map((insight) => ({
        idUsuario,
        tipo: insight.tipo,
        titulo: insight.titulo,
        descricao: insight.descricao,
        dados: insight.dados,
      })),
    });

    return insights;
  }
}

export default InsightService;
