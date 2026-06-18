import { beforeEach, describe, expect, it, vi } from "vitest";

const { addMock, getFinancialAnalysisQueueMock, getBudgetAlertsQueueMock } =
  vi.hoisted(() => ({
    addMock: vi.fn(),
    getFinancialAnalysisQueueMock: vi.fn(),
    getBudgetAlertsQueueMock: vi.fn(),
  }));

vi.mock("../src/queues/financialQueues.js", () => ({
  FINANCIAL_ANALYSIS_QUEUE: "financial-analysis",
  BUDGET_ALERTS_QUEUE: "budget-alerts",
  getFinancialAnalysisQueue: getFinancialAnalysisQueueMock,
  getBudgetAlertsQueue: getBudgetAlertsQueueMock,
}));

vi.mock("../src/queues/redisConnection.js", () => ({
  logQueueWarning: vi.fn(),
}));

import { enqueueBudgetAlertJob } from "../src/jobs/producers/budgetAlertProducer.js";
import { enqueueFinancialAnalysisJob } from "../src/jobs/producers/financialAnalysisProducer.js";

describe("financial producers", () => {
  const payloadBase = {
    userId: "usuario-1",
    eventType: "created",
    entityType: "launch",
    entityId: "lancamento-1",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    addMock.mockResolvedValue({ id: "job-1" });
    getFinancialAnalysisQueueMock.mockReturnValue({ add: addMock });
    getBudgetAlertsQueueMock.mockReturnValue({ add: addMock });
  });

  it("deve enfileirar análise financeira com payload correto", async () => {
    const resultado = await enqueueFinancialAnalysisJob(payloadBase);

    expect(resultado.enqueued).toBe(true);
    expect(addMock).toHaveBeenCalledWith(
      "financial-analysis",
      expect.objectContaining(payloadBase),
    );
    expect(addMock.mock.calls[0][1].occurredAt).toEqual(expect.any(String));
  });

  it("deve enfileirar alerta financeiro com payload correto", async () => {
    const resultado = await enqueueBudgetAlertJob({
      ...payloadBase,
      entityType: "budget",
      entityId: "orcamento-1",
    });

    expect(resultado.enqueued).toBe(true);
    expect(addMock).toHaveBeenCalledWith(
      "budget-alerts",
      expect.objectContaining({
        userId: "usuario-1",
        eventType: "created",
        entityType: "budget",
        entityId: "orcamento-1",
      }),
    );
  });

  it("não deve quebrar quando a fila estiver desativada", async () => {
    getFinancialAnalysisQueueMock.mockReturnValue(null);

    const resultado = await enqueueFinancialAnalysisJob(payloadBase);

    expect(resultado).toMatchObject({
      enqueued: false,
      reason: "queue_disabled",
    });
    expect(addMock).not.toHaveBeenCalled();
  });

  it("não deve propagar falha ao enfileirar", async () => {
    addMock.mockRejectedValue(new Error("redis offline"));

    await expect(enqueueBudgetAlertJob(payloadBase)).resolves.toMatchObject({
      enqueued: false,
      reason: "enqueue_failed",
    });
  });
});
