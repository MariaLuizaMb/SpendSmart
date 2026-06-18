import {
  BUDGET_ALERTS_QUEUE,
  getBudgetAlertsQueue,
} from "../../queues/financialQueues.js";
import { logQueueWarning } from "../../queues/redisConnection.js";
import {
  buildFinancialJobPayload,
  validateFinancialJobPayload,
} from "./financialJobPayload.js";

export async function enqueueBudgetAlertJob(input) {
  const payload = buildFinancialJobPayload(input);

  if (!validateFinancialJobPayload(payload)) {
    logQueueWarning("Job de alerta financeiro ignorado por payload inválido");
    return { enqueued: false, reason: "invalid_payload", payload };
  }

  try {
    const queue = getBudgetAlertsQueue();

    if (!queue) {
      return { enqueued: false, reason: "queue_disabled", payload };
    }

    const job = await queue.add(BUDGET_ALERTS_QUEUE, payload);

    return { enqueued: true, jobId: job.id, payload };
  } catch (error) {
    logQueueWarning("Falha ao enfileirar alerta financeiro", error);
    return { enqueued: false, reason: "enqueue_failed", payload, error };
  }
}
