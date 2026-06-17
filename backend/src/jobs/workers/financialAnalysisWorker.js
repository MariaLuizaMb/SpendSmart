import "dotenv/config.js";
import { Worker } from "bullmq";

import AnalyticJobService from "../../services/analyticJobService.js";
import AnalyticsService from "../../services/analyticsService.js";
import FinancialAlertService from "../../services/financialAlertService.js";
import InsightService from "../../services/insightService.js";
import {
  FINANCIAL_ANALYSIS_QUEUE,
} from "../../queues/financialQueues.js";
import {
  getQueuePrefix,
  getRedisConnectionOptions,
  logQueueWarning,
} from "../../queues/redisConnection.js";
import {
  getCurrentAnalyticsPeriod,
  getJobPayload,
  isMainModule,
} from "./workerUtils.js";

export async function processFinancialAnalysisJob(job) {
  const payload = getJobPayload(job);
  const idUsuario = payload.userId;

  if (!idUsuario) {
    throw new Error("Job de análise financeira sem userId.");
  }

  let analyticJob = null;

  try {
    analyticJob = await AnalyticJobService.registrarInicio({
      idUsuario,
      tipo: FINANCIAL_ANALYSIS_QUEUE,
      payload,
    });

    const periodo = getCurrentAnalyticsPeriod();
    const analyticsResult = await AnalyticsService.obterAnalisePreditiva({
      idUsuario,
      mes: periodo.mes,
      ano: periodo.ano,
    });

    const [insights, alertas] = await Promise.all([
      InsightService.salvarInsightsDaAnalise({
        idUsuario,
        analyticsResult,
      }),
      FinancialAlertService.salvarAlertasDaAnalise({
        idUsuario,
        analyticsResult,
      }),
    ]);

    await AnalyticJobService.registrarSucesso(analyticJob.id, {
      analyticsResult,
      insightsPersistidos: insights.length,
      alertasPersistidos: alertas.length,
    });

    return {
      analyticJobId: analyticJob.id,
      insightsPersistidos: insights.length,
      alertasPersistidos: alertas.length,
    };
  } catch (error) {
    if (analyticJob?.id) {
      await AnalyticJobService.registrarFalha(analyticJob.id, error);
    }

    throw error;
  }
}

export function startFinancialAnalysisWorker() {
  const connection = getRedisConnectionOptions();

  if (!connection) {
    logQueueWarning("Worker de análise financeira não iniciado sem Redis");
    return null;
  }

  const worker = new Worker(
    FINANCIAL_ANALYSIS_QUEUE,
    processFinancialAnalysisJob,
    {
      connection,
      prefix: getQueuePrefix(),
    },
  );

  worker.on("completed", (job) => {
    console.log(`[worker:${FINANCIAL_ANALYSIS_QUEUE}] job ${job.id} concluído.`);
  });

  worker.on("failed", (job, error) => {
    logQueueWarning(
      `Job ${job?.id || "desconhecido"} de análise financeira falhou`,
      error,
    );
  });

  return worker;
}

if (isMainModule(import.meta.url)) {
  startFinancialAnalysisWorker();
}
