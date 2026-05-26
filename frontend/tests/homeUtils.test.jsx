import { describe, expect, it } from "vitest";

import {
  calcularVariacaoPercentual,
  calcularVariacaoPercentualPorDiferenca,
  converterInputParaData,
  converterValorMonetarioParaNumero,
  criarEscalaEixoY,
  criarFormularioLancamentoInicial,
  filtrarLancamentosPorIntervalo,
  formatarData,
  formatarDataParaInput,
  formatarMoeda,
  formatarPercentualAbsoluto,
  formatarValorEixoGrafico,
  formatarValorMonetarioInput,
  normalizarNomeCategoria,
  obterCategoriaComMaiorDespesa,
  obterContaInicialLancamento,
  obterIntervaloMesAnterior,
  obterIntervaloPorPeriodo,
  obterLimiteOrcamentoMensal,
  obterNomeCategoria,
  obterValorLancamento,
  somarLancamentosPorTipo,
} from "../src/pages/Home";

const lancamentos = [
  {
    id: "1",
    tipo: "DESPESA",
    valor: "120.50",
    dataTransacao: "2026-05-05T00:00:00.000Z",
    categoria: { nome: "Mercado" },
  },
  {
    id: "2",
    tipo: "DESPESA",
    valor: 79.5,
    dataTransacao: "2026-05-12T00:00:00.000Z",
    nomeCategoria: "mercado",
  },
  {
    id: "3",
    tipo: "RECEITA",
    valor: 500,
    dataTransacao: "2026-04-20T00:00:00.000Z",
    nomeCategoria: "Salário",
  },
];

describe("Home helpers", () => {
  it("deve formatar moeda, valores monetários e datas", () => {
    expect(formatarMoeda(1234.5)).toBe("R$ 1.234,50");
    expect(formatarValorMonetarioInput("123456")).toBe("1.234,56");
    expect(formatarValorMonetarioInput("")).toBe("");
    expect(converterValorMonetarioParaNumero("R$ 1.234,56")).toBe(1234.56);
    expect(converterValorMonetarioParaNumero("")).toBe(0);
    expect(formatarData("2026-05-05T00:00:00.000Z")).toBe("05/05/2026");
    expect(formatarData()).toBe("00/00/0000");
    expect(formatarValorEixoGrafico(1500)).toBe("R$ 1.500");
    expect(formatarPercentualAbsoluto(-12.6)).toBe("13%");
  });

  it("deve calcular totais e categoria de maior despesa", () => {
    expect(obterValorLancamento(lancamentos[0])).toBe(120.5);
    expect(obterNomeCategoria(lancamentos[2])).toBe("Salário");
    expect(obterNomeCategoria({})).toBe("Categoria");
    expect(normalizarNomeCategoria("Alimentação")).toBe("alimentação");
    expect(somarLancamentosPorTipo(lancamentos, "DESPESA")).toBe(200);
    expect(somarLancamentosPorTipo(lancamentos, "RECEITA")).toBe(500);
    expect(
      obterCategoriaComMaiorDespesa(lancamentos),
    ).toEqual({
      nome: "Mercado",
      total: 200,
    });
    expect(obterCategoriaComMaiorDespesa([])).toEqual({
      nome: "Nenhuma categoria",
      total: 0,
    });
  });

  it("deve calcular orçamento, variações e escala do gráfico", () => {
    expect(
      obterLimiteOrcamentoMensal([
        { idCategoria: null, valor: 1000 },
        { idCategoria: "cat-1", valor: 300 },
      ]),
    ).toBe(1000);
    expect(
      obterLimiteOrcamentoMensal([
        { idCategoria: "cat-1", valor: 300 },
        { idCategoria: "cat-2", valor: 200 },
      ]),
    ).toBe(500);
    expect(calcularVariacaoPercentual(50, 0)).toBe(100);
    expect(calcularVariacaoPercentual(0, 0)).toBe(0);
    expect(calcularVariacaoPercentual(75, 100)).toBe(-25);
    expect(calcularVariacaoPercentualPorDiferenca(-50, -100)).toBe(50);
    expect(calcularVariacaoPercentualPorDiferenca(-10, 0)).toBe(-100);
    expect(criarEscalaEixoY(0)).toEqual({
      limiteSuperior: 300,
      ticks: [50, 100, 150, 200, 250, 300],
    });
    expect(criarEscalaEixoY(900, 3)).toEqual({
      limiteSuperior: 1500,
      ticks: [500, 1000, 1500],
    });
  });

  it("deve calcular intervalos e filtrar lançamentos por período", () => {
    const referencia = new Date(Date.UTC(2026, 4, 13));
    const semana = obterIntervaloPorPeriodo("semana", referencia);
    const mes = obterIntervaloPorPeriodo("mes", referencia);
    const ano = obterIntervaloPorPeriodo("ano", referencia);

    expect(semana.inicio.toISOString()).toBe("2026-05-11T00:00:00.000Z");
    expect(mes.inicio.toISOString()).toBe("2026-05-01T00:00:00.000Z");
    expect(ano.inicio.toISOString()).toBe("2026-01-01T00:00:00.000Z");
    expect(obterIntervaloPorPeriodo("todos", referencia)).toBeNull();
    expect(obterIntervaloMesAnterior(referencia).inicio.toISOString()).toBe(
      "2026-04-01T00:00:00.000Z",
    );
    expect(
      filtrarLancamentosPorIntervalo(lancamentos, mes).map((item) => item.id),
    ).toEqual(["1", "2"]);
  });

  it("deve formatar datas de input e criar estado inicial do formulário", () => {
    expect(formatarDataParaInput(new Date(2026, 4, 6))).toBe("2026-05-06");
    expect(formatarDataParaInput()).toBe("");
    expect(converterInputParaData("2026-05-06")).toEqual(
      new Date(2026, 4, 6),
    );
    expect(converterInputParaData("")).toBeUndefined();
    expect(converterInputParaData("data-invalida")).toBeUndefined();
    expect(criarFormularioLancamentoInicial("conta-1")).toEqual(
      expect.objectContaining({
        tipo: "DESPESA",
        idConta: "conta-1",
        recorrencia: "NENHUMA",
      }),
    );
    expect(obterContaInicialLancamento("__sem_conta__", [])).toBe("");
    expect(obterContaInicialLancamento("", [{ id: "conta-1" }])).toBe(
      "conta-1",
    );
  });
});
