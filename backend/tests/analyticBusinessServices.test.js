import { beforeEach, describe, expect, it, vi } from "vitest";

const prismaMock = vi.hoisted(() => ({
  analyticJob: {
    create: vi.fn(),
    update: vi.fn(),
  },
  financialAlert: {
    createMany: vi.fn(),
  },
  insight: {
    createMany: vi.fn(),
  },
}));

vi.mock("../src/database/prisma.js", () => ({
  default: prismaMock,
}));

import AnalyticJobService from "../src/services/analyticJobService.js";
import FinancialAlertService from "../src/services/financialAlertService.js";
import InsightService from "../src/services/insightService.js";

describe("AnalyticJobService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-18T12:00:00.000Z"));
  });

  it("deve registrar início com status processing e payload informado", async () => {
    const job = { id: "job-1" };
    prismaMock.analyticJob.create.mockResolvedValue(job);

    const resultado = await AnalyticJobService.registrarInicio({
      idUsuario: "usuario-1",
      tipo: "financial_analysis",
      payload: { entityId: "l1" },
    });

    expect(resultado).toBe(job);
    expect(prismaMock.analyticJob.create).toHaveBeenCalledWith({
      data: {
        idUsuario: "usuario-1",
        tipo: "financial_analysis",
        status: "processing",
        payload: { entityId: "l1" },
        iniciadoEm: new Date("2026-06-18T12:00:00.000Z"),
      },
    });
  });

  it("deve registrar sucesso com resultado informado ou objeto vazio", async () => {
    prismaMock.analyticJob.update
      .mockResolvedValueOnce({ id: "job-1", status: "completed" })
      .mockResolvedValueOnce({ id: "job-2", status: "completed" });

    await AnalyticJobService.registrarSucesso("job-1", { total: 2 });
    await AnalyticJobService.registrarSucesso("job-2");

    expect(prismaMock.analyticJob.update).toHaveBeenNthCalledWith(1, {
      where: { id: "job-1" },
      data: {
        status: "completed",
        resultado: { total: 2 },
        erro: null,
        finalizadoEm: new Date("2026-06-18T12:00:00.000Z"),
      },
    });
    expect(prismaMock.analyticJob.update).toHaveBeenNthCalledWith(2, {
      where: { id: "job-2" },
      data: expect.objectContaining({
        status: "completed",
        resultado: {},
        erro: null,
      }),
    });
  });

  it("deve registrar falha usando mensagem de Error, string e fallback nulo", async () => {
    prismaMock.analyticJob.update.mockResolvedValue({ id: "job-1" });

    await AnalyticJobService.registrarFalha("job-1", new Error("analytics fora"));
    await AnalyticJobService.registrarFalha("job-2", "falha textual");
    await AnalyticJobService.registrarFalha("job-3", null);

    expect(prismaMock.analyticJob.update).toHaveBeenNthCalledWith(1, {
      where: { id: "job-1" },
      data: expect.objectContaining({
        status: "failed",
        erro: "analytics fora",
      }),
    });
    expect(prismaMock.analyticJob.update).toHaveBeenNthCalledWith(2, {
      where: { id: "job-2" },
      data: expect.objectContaining({
        status: "failed",
        erro: "falha textual",
      }),
    });
    expect(prismaMock.analyticJob.update).toHaveBeenNthCalledWith(3, {
      where: { id: "job-3" },
      data: expect.objectContaining({
        status: "failed",
        erro: "Erro desconhecido.",
      }),
    });
  });

  it("deve propagar rejeições do Prisma", async () => {
    prismaMock.analyticJob.update.mockRejectedValue(new Error("db down"));

    await expect(
      AnalyticJobService.registrarSucesso("job-1", {}),
    ).rejects.toThrow("db down");
  });
});

describe("FinancialAlertService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve mapear alertas válidos removendo nulos e aplicando defaults", () => {
    const resultado = FinancialAlertService.mapearAlertasDaAnalise({
      alertas: [
        null,
        {
          id: "saldo",
          severidade: "alta",
          mensagem: "Saldo negativo",
        },
        {
          tipo: "ORCAMENTO",
          titulo: "Orçamento",
          descricao: "Limite atingido",
          severidade: "",
        },
        {
          recomendacao: "Revise seus gastos",
        },
      ],
    });

    expect(resultado).toEqual([
      {
        tipo: "saldo",
        severidade: "ALTA",
        titulo: "Alerta financeiro",
        mensagem: "Saldo negativo",
        dados: expect.objectContaining({ id: "saldo" }),
      },
      {
        tipo: "ORCAMENTO",
        severidade: "BAIXA",
        titulo: "Orçamento",
        mensagem: "Limite atingido",
        dados: expect.objectContaining({ tipo: "ORCAMENTO" }),
      },
      {
        tipo: "ALERTA_FINANCEIRO",
        severidade: "BAIXA",
        titulo: "Alerta financeiro",
        mensagem: "Revise seus gastos",
        dados: expect.objectContaining({ recomendacao: "Revise seus gastos" }),
      },
    ]);
  });

  it("deve retornar vazio sem persistir quando não houver alertas", async () => {
    await expect(
      FinancialAlertService.salvarAlertasDaAnalise({
        idUsuario: "usuario-1",
        analyticsResult: {},
      }),
    ).resolves.toEqual([]);

    expect(prismaMock.financialAlert.createMany).not.toHaveBeenCalled();
  });

  it("deve persistir alertas mapeados para o usuário", async () => {
    prismaMock.financialAlert.createMany.mockResolvedValue({ count: 1 });

    const resultado = await FinancialAlertService.salvarAlertasDaAnalise({
      idUsuario: "usuario-1",
      analyticsResult: {
        alertas: [{ tipo: "SALDO_NEGATIVO", severidade: "critica" }],
      },
    });

    expect(resultado).toHaveLength(1);
    expect(prismaMock.financialAlert.createMany).toHaveBeenCalledWith({
      data: [
        {
          idUsuario: "usuario-1",
          tipo: "SALDO_NEGATIVO",
          severidade: "CRITICA",
          titulo: "Alerta financeiro",
          mensagem: "Há um alerta financeiro importante para revisar.",
          dados: { tipo: "SALDO_NEGATIVO", severidade: "critica" },
        },
      ],
    });
  });

  it("deve propagar falha ao persistir alertas", async () => {
    prismaMock.financialAlert.createMany.mockRejectedValue(new Error("db"));

    await expect(
      FinancialAlertService.salvarAlertasDaAnalise({
        idUsuario: "usuario-1",
        analyticsResult: { alertas: [{ tipo: "A" }] },
      }),
    ).rejects.toThrow("db");
  });
});

describe("InsightService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve mapear todos os tipos de insights com fallbacks", () => {
    const resultado = InsightService.mapearInsightsDaAnalise({
      confiabilidade: { qualidadeDosDados: "BAIXA" },
      insights: {
        categoriaMaiorGasto: { nome: "", valor: 200 },
        categoriasCriticas: [
          { nome: "Mercado", tendencia: { descricao: "Gastos acelerados" } },
          { nome: "", tendencia: null },
        ],
        categoriasMaisCresceram: [
          { nome: "Lazer", tendencia: { descricao: "Cresceu 30%" } },
          { nome: "", tendencia: null },
        ],
        dadosInsuficientes: true,
      },
    });

    expect(resultado).toEqual([
      expect.objectContaining({
        tipo: "categoria_maior_gasto",
        titulo: "Categoria com maior gasto",
        descricao: "Uma categoria concentra a maior projeção de despesas.",
      }),
      expect.objectContaining({
        tipo: "categoria_critica",
        titulo: "Mercado exige atenção",
        descricao: "Gastos acelerados",
      }),
      expect.objectContaining({
        tipo: "categoria_critica",
        titulo: "Categoria exige atenção",
        descricao: "A categoria apresenta risco financeiro no período analisado.",
      }),
      expect.objectContaining({
        tipo: "categoria_em_crescimento",
        titulo: "Lazer em crescimento",
        descricao: "Cresceu 30%",
      }),
      expect.objectContaining({
        tipo: "categoria_em_crescimento",
        titulo: "Categoria em crescimento",
        descricao: "A categoria está crescendo em relação ao histórico recente.",
      }),
      expect.objectContaining({
        tipo: "dados_insuficientes",
        dados: { qualidadeDosDados: "BAIXA" },
      }),
    ]);
  });

  it("deve retornar vazio e não persistir quando não houver insights", async () => {
    expect(InsightService.mapearInsightsDaAnalise()).toEqual([]);

    await expect(
      InsightService.salvarInsightsDaAnalise({
        idUsuario: "usuario-1",
        analyticsResult: { insights: {} },
      }),
    ).resolves.toEqual([]);

    expect(prismaMock.insight.createMany).not.toHaveBeenCalled();
  });

  it("deve persistir insights mapeados", async () => {
    prismaMock.insight.createMany.mockResolvedValue({ count: 1 });

    const resultado = await InsightService.salvarInsightsDaAnalise({
      idUsuario: "usuario-1",
      analyticsResult: {
        insights: {
          dadosInsuficientes: true,
        },
      },
    });

    expect(resultado).toHaveLength(1);
    expect(prismaMock.insight.createMany).toHaveBeenCalledWith({
      data: [
        {
          idUsuario: "usuario-1",
          tipo: "dados_insuficientes",
          titulo: "Histórico financeiro insuficiente",
          descricao:
            "Ainda não há histórico suficiente para gerar previsões com alta confiabilidade.",
          dados: {},
        },
      ],
    });
  });

  it("deve propagar falha ao persistir insights", async () => {
    prismaMock.insight.createMany.mockRejectedValue(new Error("db"));

    await expect(
      InsightService.salvarInsightsDaAnalise({
        idUsuario: "usuario-1",
        analyticsResult: { insights: { dadosInsuficientes: true } },
      }),
    ).rejects.toThrow("db");
  });
});
