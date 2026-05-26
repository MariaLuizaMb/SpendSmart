import { describe, expect, it, vi } from "vitest";

import {
  converterInputParaData,
  converterValorMonetarioParaNumero,
  criarFormularioDetalhes,
  criarFormularioOrcamentoInicial,
  criarMapaCodigosTransacao,
  formatarData,
  formatarDataHora,
  formatarDataParaBusca,
  formatarDataParaInput,
  formatarMoeda,
  formatarTipo,
  formatarValorMonetarioInput,
  lancamentoTemContaDesativada,
  obterCodigoTransacao,
  obterNomeCategoria,
  obterNomeConta,
  obterPrefixoCodigoTransacao,
  obterTimestamp,
  obterValor,
  ordenarLancamentos,
} from "../src/pages/Transacoes";

const lancamentos = [
  {
    id: "l2",
    tipo: "DESPESA",
    valor: 250.5,
    dataTransacao: "2026-05-12T00:00:00.000Z",
    categoria: { nome: "Mercado" },
    conta: { id: "conta-2", nome: "Nubank", ativa: false },
    recorrencia: "MENSAL",
    descricao: "Compras",
  },
  {
    id: "l1",
    tipo: "RECEITA",
    valor: "1000",
    dataTransacao: "2026-05-01T00:00:00.000Z",
    nomeCategoria: "Salário",
    nomeConta: "Carteira",
  },
  {
    id: "l3",
    tipo: "OUTRO",
    valor: 15,
    dataTransacao: "data-invalida",
  },
];

describe("Transacoes helpers", () => {
  it("deve formatar valores, datas e tipos de transação", () => {
    expect(formatarMoeda(1234.5)).toBe("R$ 1.234,50");
    expect(formatarValorMonetarioInput("123456")).toBe("1.234,56");
    expect(formatarValorMonetarioInput("")).toBe("");
    expect(converterValorMonetarioParaNumero("R$ 1.234,56")).toBe(1234.56);
    expect(converterValorMonetarioParaNumero("")).toBe(0);
    expect(formatarData("2026-05-12T00:00:00.000Z")).toBe("12/05/2026");
    expect(formatarData()).toBe("00/00/0000");
    expect(formatarDataParaInput("2026-05-12T00:00:00.000Z")).toBe(
      "2026-05-12",
    );
    expect(formatarDataParaBusca("2026-05-12T00:00:00.000Z")).toBe(
      "2026-05-12",
    );
    expect(formatarDataParaBusca()).toBe("");
    expect(formatarDataHora()).toBe("Não informado");
    expect(converterInputParaData("2026-05-12")).toEqual(
      new Date(2026, 4, 12),
    );
    expect(converterInputParaData("")).toBeUndefined();
    expect(converterInputParaData("data-invalida")).toBeUndefined();
    expect(formatarTipo("receita")).toBe("Receita");
    expect(formatarTipo("despesa")).toBe("Despesa");
    expect(formatarTipo("investimento")).toBe("Investimento");
    expect(formatarTipo()).toBe("Transação");
  });

  it("deve extrair nomes, valores e dados normalizados do lançamento", () => {
    expect(obterNomeCategoria(lancamentos[0])).toBe("Mercado");
    expect(obterNomeCategoria(lancamentos[1])).toBe("Salário");
    expect(obterNomeCategoria({})).toBe("Categoria");
    expect(obterNomeConta(lancamentos[0])).toBe("Nubank (desativada)");
    expect(obterNomeConta(lancamentos[1])).toBe("Carteira");
    expect(obterNomeConta({})).toBe("Sem conta");
    expect(lancamentoTemContaDesativada(lancamentos[0])).toBe(true);
    expect(lancamentoTemContaDesativada(lancamentos[1])).toBe(false);
    expect(obterTimestamp(lancamentos[0])).toBe(
      new Date("2026-05-12T00:00:00.000Z").getTime(),
    );
    expect(obterTimestamp(lancamentos[2])).toBe(0);
    expect(obterValor(lancamentos[1])).toBe(1000);
  });

  it("deve gerar códigos sequenciais por tipo com ordenação estável", () => {
    const mapa = criarMapaCodigosTransacao(lancamentos);

    expect(obterPrefixoCodigoTransacao("RECEITA")).toBe("R");
    expect(obterPrefixoCodigoTransacao("DESPESA")).toBe("D");
    expect(obterPrefixoCodigoTransacao("INVESTIMENTO")).toBe("T");
    expect(obterCodigoTransacao(lancamentos[1], mapa)).toBe("R01");
    expect(obterCodigoTransacao(lancamentos[0], mapa)).toBe("D01");
    expect(obterCodigoTransacao(lancamentos[2], mapa)).toBe("T01");
    expect(obterCodigoTransacao({ id: "x", tipo: "DESPESA" }, mapa)).toBe(
      "D00",
    );
  });

  it("deve ordenar por data e valor sem alterar a lista original", () => {
    expect(ordenarLancamentos(lancamentos, "recentes").map((item) => item.id)).toEqual([
      "l2",
      "l1",
      "l3",
    ]);
    expect(ordenarLancamentos(lancamentos, "antigas").map((item) => item.id)).toEqual([
      "l3",
      "l1",
      "l2",
    ]);
    expect(
      ordenarLancamentos(lancamentos, "maior-valor").map((item) => item.id),
    ).toEqual(["l1", "l2", "l3"]);
    expect(
      ordenarLancamentos(lancamentos, "menor-valor").map((item) => item.id),
    ).toEqual(["l3", "l2", "l1"]);
    expect(lancamentos.map((item) => item.id)).toEqual(["l2", "l1", "l3"]);
  });

  it("deve criar formulários iniciais para detalhe e orçamento", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-26T12:00:00.000Z"));

    expect(criarFormularioDetalhes(lancamentos[0])).toEqual({
      tipo: "DESPESA",
      idCategoria: "",
      idConta: "conta-2",
      valor: "250,50",
      dataTransacao: "2026-05-12",
      recorrencia: "MENSAL",
      descricao: "Compras",
    });
    expect(criarFormularioDetalhes({ categoria: { id: "cat-1" } })).toEqual(
      expect.objectContaining({
        tipo: "DESPESA",
        idCategoria: "cat-1",
        recorrencia: "NENHUMA",
      }),
    );
    expect(criarFormularioOrcamentoInicial()).toEqual({
      valor: "",
      mes: "5",
      ano: "2026",
      idCategoria: "__orcamento_geral__",
      descricao: "",
    });
  });
});
