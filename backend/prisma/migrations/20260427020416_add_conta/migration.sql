-- CreateEnum
CREATE TYPE "TipoContaBancaria" AS ENUM ('CONTA_CORRENTE', 'POUPANCA', 'CARTEIRA_DINHEIRO', 'CARTEIRA_DIGITAL', 'OUTRA');

-- AlterTable
ALTER TABLE "Lancamento" ADD COLUMN     "idConta" TEXT;

-- CreateTable
CREATE TABLE "Conta" (
    "id" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoContaBancaria" NOT NULL,
    "saldoInicial" DECIMAL(12,2) NOT NULL,
    "descricao" TEXT,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Conta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Conta_idUsuario_idx" ON "Conta"("idUsuario");

-- CreateIndex
CREATE INDEX "Conta_tipo_idx" ON "Conta"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Conta_idUsuario_nome_key" ON "Conta"("idUsuario", "nome");

-- CreateIndex
CREATE INDEX "Lancamento_idConta_idx" ON "Lancamento"("idConta");

-- AddForeignKey
ALTER TABLE "Conta" ADD CONSTRAINT "Conta_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_idConta_fkey" FOREIGN KEY ("idConta") REFERENCES "Conta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
