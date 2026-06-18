import { Queue } from "bullmq";

import {
  getQueuePrefix,
  getRedisConnectionOptions,
  logQueueWarning,
} from "./redisConnection.js";

export const FINANCIAL_ANALYSIS_QUEUE = "financial-analysis";
export const BUDGET_ALERTS_QUEUE = "budget-alerts";

export const defaultJobOptions = {
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 5000,
  },
  removeOnComplete: {
    age: 24 * 60 * 60,
    count: 1000,
  },
  removeOnFail: {
    age: 7 * 24 * 60 * 60,
  },
};

const queues = new Map();

function createQueue(name) {
  const connection = getRedisConnectionOptions();

  if (!connection) {
    return null;
  }

  return new Queue(name, {
    connection,
    prefix: getQueuePrefix(),
    defaultJobOptions,
  });
}

export function getQueue(name) {
  if (queues.has(name)) {
    return queues.get(name);
  }

  try {
    const queue = createQueue(name);
    queues.set(name, queue);
    return queue;
  } catch (error) {
    logQueueWarning(`Não foi possível inicializar a fila ${name}`, error);
    queues.set(name, null);
    return null;
  }
}

export function getFinancialAnalysisQueue() {
  return getQueue(FINANCIAL_ANALYSIS_QUEUE);
}

export function getBudgetAlertsQueue() {
  return getQueue(BUDGET_ALERTS_QUEUE);
}

export async function closeQueues() {
  await Promise.all(
    Array.from(queues.values())
      .filter(Boolean)
      .map((queue) => queue.close()),
  );

  queues.clear();
}
