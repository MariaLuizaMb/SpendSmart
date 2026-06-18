import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  registrarInicioMock,
  registrarSucessoMock,
  registrarFalhaMock,
  obterAnalisePreditivaMock,
  salvarInsightsDaAnaliseMock,
  salvarAlertasDaAnaliseMock,
  processarNotificacoesDaAnaliseMock,
} = vi.hoisted(() => ({
  registrarInicioMock: vi.fn(),
  registrarSucessoMock: vi.fn(),
  registrarFalhaMock: vi.fn(),
  obterAnalisePreditivaMock: vi.fn(),
  salvarInsightsDaAnaliseMock: vi.fn(),
  salvarAlertasDaAnaliseMock: vi.fn(),
  processarNotificacoesDaAnaliseMock: vi.fn(),
}));

vi.mock("../src/services/analyticJobService.js", () => ({
  default: {
    registrarInicio: registrarInicioMock,
    registrarSucesso: registrarSucessoMock,
    registrarFalha: registrarFalhaMock,
  },
}));

vi.mock("../src/services/analyticsService.js", () => ({
  default: {
    obterAnalisePreditiva: obterAnalisePreditivaMock,
  },
}));

vi.mock("../src/services/insightService.js", () => ({
  default: {
    salvarInsightsDaAnalise: salvarInsightsDaAnaliseMock,
  },
}));

vi.mock("../src/services/financialAlertService.js", () => ({
  default: {
    salvarAlertasDaAnalise: salvarAlertasDaAnaliseMock,
  },
}));

vi.mock("../src/services/notificationService.js", () => ({
  default: {
    processarNotificacoesDaAnalise: processarNotificacoesDaAnaliseMock,
  },
}));

import { processBudgetAlertJob } from "../src/jobs/workers/budgetAlertWorker.js";
import { processFinancialAnalysisJob } from "../src/jobs/workers/financialAnalysisWorker.js";

describe("financial workers", () => {
  const payload = {
    userId: "usuario-1",
    eventType: "created",
    entityType: "launch",
    entityId: "l1",
    occurredAt: "2026-06-17T12:00:00.000Z",
  };
  const analyticsResult = {
    alertas: [{ tipo: "SALDO_NEGATIVO", severidade: "ALTA" }],
    insights: { dadosInsuficientes: true },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    registrarInicioMock.mockResolvedValue({ id: "job-db-1" });
    registrarSucessoMock.mockResolvedValue({});
    registrarFalhaMock.mockResolvedValue({});
    obterAnalisePreditivaMock.mockResolvedValue(analyticsResult);
    salvarInsightsDaAnaliseMock.mockResolvedValue([{ tipo: "dados" }]);
    salvarAlertasDaAnaliseMock.mockResolvedValue([{ tipo: "SALDO_NEGATIVO" }]);
    processarNotificacoesDaAnaliseMock.mockResolvedValue({
      created: 1,
      sent: 1,
    });
  });

  it("worker de análise deve chamar analytics e persistir sucesso, insights e alertas", async () => {
    const resultado = await processFinancialAnalysisJob({ data: payload });

    expect(obterAnalisePreditivaMock).toHaveBeenCalledWith({
      idUsuario: "usuario-1",
      mes: expect.any(Number),
      ano: expect.any(Number),
    });
    expect(salvarInsightsDaAnaliseMock).toHaveBeenCalledWith({
      idUsuario: "usuario-1",
      analyticsResult,
    });
    expect(salvarAlertasDaAnaliseMock).toHaveBeenCalledWith({
      idUsuario: "usuario-1",
      analyticsResult,
    });
    expect(registrarSucessoMock).toHaveBeenCalledWith(
      "job-db-1",
      expect.objectContaining({
        insightsPersistidos: 1,
        alertasPersistidos: 1,
      }),
    );
    expect(resultado).toMatchObject({
      analyticJobId: "job-db-1",
      insightsPersistidos: 1,
      alertasPersistidos: 1,
    });
  });

  it("worker de análise deve persistir falha e relançar erro", async () => {
    const erro = new Error("analytics fora");
    obterAnalisePreditivaMock.mockRejectedValueOnce(erro);

    await expect(processFinancialAnalysisJob({ data: payload })).rejects.toThrow(
      "analytics fora",
    );

    expect(registrarFalhaMock).toHaveBeenCalledWith("job-db-1", erro);
  });

  it("worker de alertas deve persistir notificações e status de sucesso", async () => {
    const resultado = await processBudgetAlertJob({ data: payload });

    expect(processarNotificacoesDaAnaliseMock).toHaveBeenCalledWith({
      idUsuario: "usuario-1",
      analyticsResult,
    });
    expect(registrarSucessoMock).toHaveBeenCalledWith(
      "job-db-1",
      expect.objectContaining({
        alertasPersistidos: 1,
        notificacoes: { created: 1, sent: 1 },
      }),
    );
    expect(resultado.notificacoes).toEqual({ created: 1, sent: 1 });
  });

  it("worker de alertas deve persistir erro em caso de falha", async () => {
    const erro = new Error("smtp falhou");
    processarNotificacoesDaAnaliseMock.mockRejectedValueOnce(erro);

    await expect(processBudgetAlertJob({ data: payload })).rejects.toThrow(
      "smtp falhou",
    );

    expect(registrarFalhaMock).toHaveBeenCalledWith("job-db-1", erro);
  });
});
