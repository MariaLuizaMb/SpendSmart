import {
  FINANCIAL_ANALYSIS_QUEUE,
  getFinancialAnalysisQueue,
} from "../../queues/financialQueues.js";
import { logQueueWarning } from "../../queues/redisConnection.js";
import {
  buildFinancialJobPayload,
  validateFinancialJobPayload,
} from "./financialJobPayload.js";

export async function enqueueFinancialAnalysisJob(input) {
  const payload = buildFinancialJobPayload(input);

  if (!validateFinancialJobPayload(payload)) {
    logQueueWarning("Job de análise financeira ignorado por payload inválido");
    return { enqueued: false, reason: "invalid_payload", payload };
  }

  try {
    const queue = getFinancialAnalysisQueue();

    if (!queue) {
      return { enqueued: false, reason: "queue_disabled", payload };
    }

    const job = await queue.add(FINANCIAL_ANALYSIS_QUEUE, payload);

    return { enqueued: true, jobId: job.id, payload };
  } catch (error) {
    logQueueWarning("Falha ao enfileirar análise financeira", error);
    return { enqueued: false, reason: "enqueue_failed", payload, error };
  }
}
