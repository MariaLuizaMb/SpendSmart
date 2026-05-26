import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import AnalyticsService from "../src/services/analyticsService.js";

describe("AnalyticsService", () => {
  const envAnterior = process.env.ANALYTICS_API_URL;

  beforeEach(() => {
    process.env.ANALYTICS_API_URL = "http://analytics.local";
    global.fetch = vi.fn();
  });

  afterEach(() => {
    process.env.ANALYTICS_API_URL = envAnterior;
    vi.restoreAllMocks();
  });

  it("deve chamar API de analytics e retornar JSON", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue(JSON.stringify({ resumo: { total: 10 } })),
    });

    const resultado = await AnalyticsService.obterAnalisePreditiva({
      idUsuario: "u1",
      mes: 5,
      ano: 2026,
    });

    expect(resultado).toEqual({ resumo: { total: 10 } });
    expect(global.fetch).toHaveBeenCalledWith(
      "http://analytics.local/analytics/predict/monthly",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idUsuario: "u1", mes: 5, ano: 2026 }),
      },
    );
  });

  it("deve retornar null quando a resposta de sucesso vier sem corpo", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      status: 204,
      text: vi.fn().mockResolvedValue(""),
    });

    await expect(
      AnalyticsService.obterAnalisePreditiva({
        idUsuario: "u1",
        mes: 5,
        ano: 2026,
      }),
    ).resolves.toBeNull();
  });

  it("deve exigir configuração da URL do serviço", async () => {
    delete process.env.ANALYTICS_API_URL;

    await expect(
      AnalyticsService.obterAnalisePreditiva({
        idUsuario: "u1",
        mes: 5,
        ano: 2026,
      }),
    ).rejects.toMatchObject({
      message: "Serviço de analytics não configurado.",
      statusCode: 500,
      code: "ANALYTICS_NOT_CONFIGURED",
    });
  });

  it("deve mapear erro de cliente retornado pela API", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 422,
      text: vi.fn().mockResolvedValue(JSON.stringify({ detail: "Mês inválido." })),
    });

    await expect(
      AnalyticsService.obterAnalisePreditiva({
        idUsuario: "u1",
        mes: 13,
        ano: 2026,
      }),
    ).rejects.toMatchObject({
      message: "Mês inválido.",
      statusCode: 422,
      code: "ANALYTICS_SERVICE_ERROR",
    });
  });

  it("deve mapear erro 5xx e falha de rede como indisponibilidade upstream", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: vi.fn().mockResolvedValue("{}"),
    });

    await expect(
      AnalyticsService.obterAnalisePreditiva({
        idUsuario: "u1",
        mes: 5,
        ano: 2026,
      }),
    ).rejects.toMatchObject({
      statusCode: 502,
      code: "ANALYTICS_SERVICE_ERROR",
    });

    global.fetch.mockRejectedValueOnce(new Error("ECONNREFUSED"));

    await expect(
      AnalyticsService.obterAnalisePreditiva({
        idUsuario: "u1",
        mes: 5,
        ano: 2026,
      }),
    ).rejects.toMatchObject({
      message: "Serviço de analytics indisponível.",
      statusCode: 503,
      code: "ANALYTICS_SERVICE_UNAVAILABLE",
    });
  });
});
