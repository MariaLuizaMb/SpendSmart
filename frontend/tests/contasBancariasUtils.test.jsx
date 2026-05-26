import { describe, expect, it } from "vitest";

import {
  converterValorMonetarioParaNumero,
  criarFormularioPorConta,
  formatarData,
  formatarMoeda,
  formatarNumeroParaInputMoeda,
  formatarTipoConta,
  formatarValorMonetarioInput,
  normalizarContaParaFormulario,
  obterNomeConta,
  ordenarContas,
} from "../src/pages/contasBancarias";
import { MODELOS_CARTAO } from "../src/constants/cardsConta";

describe("contasBancarias helpers", () => {
  it("deve ordenar contas e formatar moeda para exibição e formulário", () => {
    const contas = [
      { id: "2", nome: "Zeta" },
      { id: "1", nome: "Ágora" },
      { id: "3", nome: "Banco" },
    ];

    expect(ordenarContas(contas).map((conta) => conta.nome)).toEqual([
      "Ágora",
      "Banco",
      "Zeta",
    ]);
    expect(contas.map((conta) => conta.nome)).toEqual(["Zeta", "Ágora", "Banco"]);
    expect(formatarMoeda(1234.5)).toBe("R$ 1.234,50");
    expect(formatarNumeroParaInputMoeda(10)).toBe("10,00");
    expect(formatarValorMonetarioInput("123456")).toBe("1.234,56");
    expect(formatarValorMonetarioInput("")).toBe("");
    expect(converterValorMonetarioParaNumero("R$ 1.234,56")).toBe(1234.56);
    expect(converterValorMonetarioParaNumero("")).toBe(0);
  });

  it("deve resolver nomes de cartões, tipos e datas amigáveis", () => {
    expect(obterNomeConta(MODELOS_CARTAO.NUBANK, "")).toBe("Nubank");
    expect(obterNomeConta(MODELOS_CARTAO.DEFAULT, "  Carteira  ")).toBe(
      "Carteira",
    );
    expect(obterNomeConta("MODELO_DESCONHECIDO", "")).toBe("Conta");
    expect(formatarTipoConta("CONTA_CORRENTE")).toBe("Conta corrente");
    expect(formatarTipoConta("OUTRA")).toBe("Outra");
    expect(formatarTipoConta("INVALIDO")).toBe("Conta");
    expect(formatarData("2026-05-20T00:00:00.000Z")).toBe("20/05/2026");
    expect(formatarData()).toBe("Nenhuma movimentação");
  });

  it("deve criar e normalizar estado de formulário de conta", () => {
    expect(criarFormularioPorConta()).toEqual({
      nome: "",
      tipo: "CONTA_CORRENTE",
      saldoInicial: "0,00",
      modeloCartao: MODELOS_CARTAO.NUBANK,
      descricao: "",
    });
    expect(
      criarFormularioPorConta({
        nome: "Carteira",
        tipo: "CARTEIRA_DINHEIRO",
        saldoAtual: "25.5",
        modeloCartao: MODELOS_CARTAO.DEFAULT,
      }),
    ).toEqual({
      nome: "Carteira",
      tipo: "CARTEIRA_DINHEIRO",
      saldoInicial: "25,50",
      modeloCartao: MODELOS_CARTAO.DEFAULT,
      descricao: "",
    });
    expect(normalizarContaParaFormulario({ id: "1", saldoInicial: "10.00" })).toEqual({
      id: "1",
      saldoInicial: "10.00",
      saldoAtual: "10.00",
    });
    expect(normalizarContaParaFormulario({ id: "2", saldoAtual: "5.00" })).toEqual({
      id: "2",
      saldoAtual: "5.00",
    });
  });
});
