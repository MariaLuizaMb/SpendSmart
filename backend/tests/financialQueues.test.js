import { beforeEach, describe, expect, it, vi } from "vitest";

const queueCloseMock = vi.fn();
const queueCtorMock = vi.fn();

vi.mock("bullmq", () => ({
  Queue: function MockQueue(name, options) {
    queueCtorMock(name, options);
    this.name = name;
    this.options = options;
    this.close = queueCloseMock;
  },
}));

vi.mock("../src/queues/redisConnection.js", () => {
  return {
    getRedisConnectionOptions: vi.fn(),
    getQueuePrefix: vi.fn(),
    logQueueWarning: vi.fn(),
  };
});

import {
  getRedisConnectionOptions,
  getQueuePrefix,
} from "../src/queues/redisConnection.js";

import {
  getFinancialAnalysisQueue,
  getBudgetAlertsQueue,
  closeQueues,
  FINANCIAL_ANALYSIS_QUEUE,
  BUDGET_ALERTS_QUEUE,
  getQueue,
} from "../src/queues/financialQueues.js";

describe("financialQueues", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queueCtorMock.mockClear();
    queueCloseMock.mockClear();

    getQueuePrefix.mockReturnValue("spendsmart");
    getRedisConnectionOptions.mockReturnValue({
      host: "localhost",
      port: 6379,
    });
  });

  it("getFinancialAnalysisQueue deve retornar queue quando Redis existe", () => {
    const q = getFinancialAnalysisQueue();
    expect(q).not.toBeNull();
    expect(queueCtorMock).toHaveBeenCalledWith(
      FINANCIAL_ANALYSIS_QUEUE,
      expect.objectContaining({ prefix: "spendsmart" }),
    );
  });

  it("getBudgetAlertsQueue deve retornar queue e usar cache", () => {
    const q1 = getBudgetAlertsQueue();
    const q2 = getBudgetAlertsQueue();

    expect(q1).toBe(q2);
    expect(queueCtorMock).toHaveBeenCalledTimes(1);
  });

  it("closeQueues deve chamar close nos queues existentes", async () => {
    const qa = getQueue(FINANCIAL_ANALYSIS_QUEUE);
    const qb = getQueue(BUDGET_ALERTS_QUEUE);

    expect(qa).not.toBeNull();
    expect(qb).not.toBeNull();

    await closeQueues();

    expect(queueCloseMock).toHaveBeenCalledTimes(2);
  });
});
