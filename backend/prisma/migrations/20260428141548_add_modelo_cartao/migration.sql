-- CreateEnum
CREATE TYPE "ModeloCartao" AS ENUM ('NUBANK', 'MERCADO_PAGO', 'CAIXA', 'PICPAY', 'DEFAULT');

-- AlterTable
ALTER TABLE "Conta" ADD COLUMN     "modeloCartao" "ModeloCartao" NOT NULL DEFAULT 'DEFAULT';
