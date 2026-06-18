import { describe, expect, it, vi, beforeEach } from "vitest";

const WorkerOnMock = vi.fn();

vi.mock("bullmq", () => {
  return {
    Worker: function WorkerMock(name, processor, options) {
      const handlers = {
        completed: null,
        failed: null,
      };

      const worker = {
        name,
        processor,
        options,
        on: vi.fn((event, cb) => {
          WorkerOnMock(event);
          handlers[event] = cb;
          return worker;
        }),
        __handlers: handlers,
      };

      return worker;
    },
  };
});

vi.mock("../src/queues/redisConnection.js", () => ({
  getRedisConnectionOptions: vi.fn(),
  getQueuePrefix: vi.fn(() => "spendsmart"),
  logQueueWarning: vi.fn(),
}));

import { getRedisConnectionOptions } from "../src/queues/redisConnection.js";

import { startBudgetAlertWorker } from "../src/jobs/workers/budgetAlertWorker.js";
import { startFinancialAnalysisWorker } from "../src/jobs/workers/financialAnalysisWorker.js";

import { logQueueWarning } from "../src/queues/redisConnection.js";

describe("workers start functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    WorkerOnMock.mockClear();
  });

  it("startBudgetAlertWorker deve retornar null quando sem Redis", () => {
    getRedisConnectionOptions.mockReturnValue(null);

    const w = startBudgetAlertWorker();
    expect(w).toBeNull();
    expect(logQueueWarning).toHaveBeenCalled();
  });

  it("startFinancialAnalysisWorker deve retornar null quando sem Redis", () => {
    getRedisConnectionOptions.mockReturnValue(null);

    const w = startFinancialAnalysisWorker();
    expect(w).toBeNull();
    expect(logQueueWarning).toHaveBeenCalled();
  });

  it("startBudgetAlertWorker deve registrar handlers completed/failed quando Redis existe", () => {
    getRedisConnectionOptions.mockReturnValue({
      host: "localhost",
      port: 6379,
    });

    const w = startBudgetAlertWorker();
    expect(w).not.toBeNull();

    // a implementação sempre registra completed e failed
    expect(WorkerOnMock).toHaveBeenCalledWith("completed");
    expect(WorkerOnMock).toHaveBeenCalledWith("failed");
  });
});
