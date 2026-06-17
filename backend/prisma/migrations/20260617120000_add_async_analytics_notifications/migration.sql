CREATE TABLE "AnalyticJob" (
    "id" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "resultado" JSONB,
    "erro" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "iniciadoEm" TIMESTAMP(3),
    "finalizadoEm" TIMESTAMP(3),

    CONSTRAINT "AnalyticJob_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Insight" (
    "id" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dados" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FinancialAlert" (
    "id" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "severidade" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "dados" JSONB,
    "lidoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FinancialAlert_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "canal" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dados" JSONB,
    "enviadaEm" TIMESTAMP(3),
    "lidaEm" TIMESTAMP(3),
    "erro" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AnalyticJob_idUsuario_idx" ON "AnalyticJob"("idUsuario");
CREATE INDEX "AnalyticJob_tipo_idx" ON "AnalyticJob"("tipo");
CREATE INDEX "AnalyticJob_status_idx" ON "AnalyticJob"("status");
CREATE INDEX "AnalyticJob_criadoEm_idx" ON "AnalyticJob"("criadoEm");

CREATE INDEX "Insight_idUsuario_idx" ON "Insight"("idUsuario");
CREATE INDEX "Insight_tipo_idx" ON "Insight"("tipo");
CREATE INDEX "Insight_criadoEm_idx" ON "Insight"("criadoEm");

CREATE INDEX "FinancialAlert_idUsuario_idx" ON "FinancialAlert"("idUsuario");
CREATE INDEX "FinancialAlert_tipo_idx" ON "FinancialAlert"("tipo");
CREATE INDEX "FinancialAlert_severidade_idx" ON "FinancialAlert"("severidade");
CREATE INDEX "FinancialAlert_criadoEm_idx" ON "FinancialAlert"("criadoEm");

CREATE INDEX "Notification_idUsuario_idx" ON "Notification"("idUsuario");
CREATE INDEX "Notification_tipo_idx" ON "Notification"("tipo");
CREATE INDEX "Notification_status_idx" ON "Notification"("status");
CREATE INDEX "Notification_criadoEm_idx" ON "Notification"("criadoEm");

ALTER TABLE "AnalyticJob"
ADD CONSTRAINT "AnalyticJob_idUsuario_fkey"
FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Insight"
ADD CONSTRAINT "Insight_idUsuario_fkey"
FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "FinancialAlert"
ADD CONSTRAINT "FinancialAlert_idUsuario_fkey"
FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Notification"
ADD CONSTRAINT "Notification_idUsuario_fkey"
FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
