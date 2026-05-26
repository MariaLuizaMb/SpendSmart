import { describe, expect, it, vi } from "vitest";

import {
  criarDadosSaldoPrevisto,
  criarMapaCodigosTransacao,
  filtrarLancamentos,
  formatarData,
  formatarMoeda,
  formatarPercentual,
  formatarTipo,
  limitarPercentual,
  mapearHistorico,
  obterAlertasPorTipo,
  obterCodigoTransacao,
  obterNomeCategoria,
  obterNomeConta,
  obterNomeMesCurto,
  obterPeriodoAtual,
  ordenarLancamentos,
  paraNumero,
  resumoTemDados,
} from "../src/components/dashboard/dashboard-utils";

const lancamentos = [
  {
    id: "1",
    tipo: "DESPESA",
    valor: 30,
    descricao: "Mercado",
    dataTransacao: "2026-05-10T00:00:00.000Z",
    categoria: { nome: "Alimentação" },
    conta: { nome: "Banco", ativa: true },
  },
  {
    id: "2",
    tipo: "RECEITA",
    valor: 100,
    descricao: "Salário",
    dataTransacao: "2026-05-01T00:00:00.000Z",
    nomeCategoria: "Renda",
    conta: { nome: "Carteira", ativa: false },
  },
  {
    id: "3",
    tipo: "OUTRO",
    valor: 10,
    descricao: "Ajuste",
    dataTransacao: "data-invalida",
    nomeConta: "Sem conta",
  },
];

describe("dashboard-utils", () => {
  it("deve formatar números, moeda, percentual, datas e nomes", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-26T12:00:00.000Z"));

    expect(obterPeriodoAtual()).toEqual({ mes: "5", ano: "2026" });
    expect(paraNumero("10.5")).toBe(10.5);
    expect(paraNumero("abc", 7)).toBe(7);
    expect(formatarMoeda(1234.5)).toBe("R$ 1.234,50");
    expect(formatarPercentual(12.34, 1)).toBe("12,3%");
    expect(formatarData("2026-05-10T00:00:00.000Z")).toBe("10/05/2026");
    expect(formatarData()).toBe("00/00/0000");
    expect(limitarPercentual(-5)).toBe(0);
    expect(limitarPercentual(125)).toBe(100);
    expect(obterNomeMesCurto("2026-05")).toBe("Mai");
    expect(obterNomeMesCurto()).toBe("Mês");
  });

  it("deve obter nomes, tipos, ordenação e códigos de transações", () => {
    expect(obterNomeCategoria(lancamentos[0])).toBe("Alimentação");
    expect(obterNomeCategoria({})).toBe("Categoria");
    expect(obterNomeConta(lancamentos[1])).toBe("Carteira (desativada)");
    expect(obterNomeConta(lancamentos[2])).toBe("Sem conta");
    expect(formatarTipo("receita")).toBe("Receita");
    expect(formatarTipo("investimento")).toBe("Investimento");
    expect(formatarTipo()).toBe("Transação");

    expect(ordenarLancamentos(lancamentos, "antigas").map((item) => item.id)).toEqual([
      "3",
      "2",
      "1",
    ]);
    expect(
      ordenarLancamentos(lancamentos, "maior-valor").map((item) => item.id),
    ).toEqual(["2", "1", "3"]);
    expect(
      ordenarLancamentos(lancamentos, "menor-valor").map((item) => item.id),
    ).toEqual(["3", "1", "2"]);

    const codigos = criarMapaCodigosTransacao(lancamentos);
    expect(obterCodigoTransacao(lancamentos[0], codigos)).toBe("D01");
    expect(obterCodigoTransacao(lancamentos[1], codigos)).toBe("R01");
    expect(obterCodigoTransacao({ id: "novo", tipo: "x" }, codigos)).toBe(
      "T00",
    );
  });

  it("deve filtrar lançamentos por campos exibidos", () => {
    expect(filtrarLancamentos(lancamentos, "").map((item) => item.id)).toEqual([
      "1",
      "2",
      "3",
    ]);
    expect(
      filtrarLancamentos(lancamentos, "alimentação").map((item) => item.id),
    ).toEqual(["1"]);
    expect(filtrarLancamentos(lancamentos, "receita").map((item) => item.id)).toEqual([
      "2",
    ]);
    expect(filtrarLancamentos(lancamentos, "sem conta").map((item) => item.id)).toEqual([
      "3",
    ]);
  });

  it("deve mapear histórico, saldo previsto, alertas e presença de dados", () => {
    expect(
      mapearHistorico({
        meses: [
          { mes: "2026-04", receitas: "100", despesas: "50" },
          { mes: "2026-05", receitas: 200, despesas: 70 },
        ],
      }),
    ).toEqual([
      { mes: "Abr", receitas: 100, despesas: 50 },
      { mes: "Mai", receitas: 200, despesas: 70 },
    ]);

    expect(
      criarDadosSaldoPrevisto(
        { saldoAtual: 1000, saldoPrevisto30Dias: 900 },
        { receitaProjetada: 3000, despesaProjetada: 2100 },
      )[1],
    ).toEqual({
      mes: "30 dias",
      receitas: 3000,
      despesas: 2100,
      saldo: 900,
    });

    const alertas = [{ tipo: "SALDO_NEGATIVO" }, { tipo: "OUTRO" }];
    expect(obterAlertasPorTipo(alertas, ["SALDO_NEGATIVO"])).toEqual(
      alertas[0],
    );
    expect(resumoTemDados({ resumo: {}, projecoes: {}, saldo: {}, categorias: [] })).toBe(
      false,
    );
    expect(
      resumoTemDados({
        resumo: { totalGastoAtual: 10 },
        projecoes: {},
        saldo: {},
        categorias: [],
      }),
    ).toBe(true);
  });
});
