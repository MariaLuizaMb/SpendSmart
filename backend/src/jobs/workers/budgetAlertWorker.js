import "dotenv/config.js";
import { Worker } from "bullmq";

import AnalyticJobService from "../../services/analyticJobService.js";
import AnalyticsService from "../../services/analyticsService.js";
import FinancialAlertService from "../../services/financialAlertService.js";
import NotificationService from "../../services/notificationService.js";
import {
  BUDGET_ALERTS_QUEUE,
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

export async function processBudgetAlertJob(job) {
  const payload = getJobPayload(job);
  const idUsuario = payload.userId;

  if (!idUsuario) {
    throw new Error("Job de alerta financeiro sem userId.");
  }

  let analyticJob = null;

  try {
    analyticJob = await AnalyticJobService.registrarInicio({
      idUsuario,
      tipo: BUDGET_ALERTS_QUEUE,
      payload,
    });

    const periodo = getCurrentAnalyticsPeriod();
    const analyticsResult = await AnalyticsService.obterAnalisePreditiva({
      idUsuario,
      mes: periodo.mes,
      ano: periodo.ano,
    });

    const alertas = await FinancialAlertService.salvarAlertasDaAnalise({
      idUsuario,
      analyticsResult,
    });
    const notificacoes =
      await NotificationService.processarNotificacoesDaAnalise({
        idUsuario,
        analyticsResult,
      });

    await AnalyticJobService.registrarSucesso(analyticJob.id, {
      alertasPersistidos: alertas.length,
      notificacoes,
    });

    return {
      analyticJobId: analyticJob.id,
      alertasPersistidos: alertas.length,
      notificacoes,
    };
  } catch (error) {
    if (analyticJob?.id) {
      await AnalyticJobService.registrarFalha(analyticJob.id, error);
    }

    throw error;
  }
}

export function startBudgetAlertWorker() {
  const connection = getRedisConnectionOptions();

  if (!connection) {
    logQueueWarning("Worker de alertas financeiros não iniciado sem Redis");
    return null;
  }

  const worker = new Worker(BUDGET_ALERTS_QUEUE, processBudgetAlertJob, {
    connection,
    prefix: getQueuePrefix(),
  });

  worker.on("completed", (job) => {
    console.log(`[worker:${BUDGET_ALERTS_QUEUE}] job ${job.id} concluído.`);
  });

  worker.on("failed", (job, error) => {
    logQueueWarning(
      `Job ${job?.id || "desconhecido"} de alerta financeiro falhou`,
      error,
    );
  });

  return worker;
}

if (isMainModule(import.meta.url)) {
  startBudgetAlertWorker();
}
