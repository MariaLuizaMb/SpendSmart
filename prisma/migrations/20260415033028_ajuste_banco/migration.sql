-- CreateEnum
CREATE TYPE "TipoCategoria" AS ENUM ('DESPESA', 'RECEITA');

-- CreateEnum
CREATE TYPE "TipoLancamento" AS ENUM ('DESPESA', 'RECEITA');

-- CreateEnum
CREATE TYPE "TipoRecorrencia" AS ENUM ('NENHUMA', 'DIARIA', 'SEMANAL', 'MENSAL', 'ANUAL');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "idUsuario" TEXT,
    "nome" TEXT NOT NULL,
    "tipo" "TipoCategoria" NOT NULL,
    "ehPadrao" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lancamento" (
    "id" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "idCategoria" TEXT NOT NULL,
    "valor" DECIMAL(12,2) NOT NULL,
    "dataTransacao" TIMESTAMP(3) NOT NULL,
    "recorrencia" "TipoRecorrencia" NOT NULL DEFAULT 'NENHUMA',
    "tipo" "TipoLancamento" NOT NULL,
    "descricao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lancamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orcamento" (
    "id" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "idCategoria" TEXT,
    "valor" DECIMAL(12,2) NOT NULL,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "descricao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orcamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Categoria_idUsuario_idx" ON "Categoria"("idUsuario");

-- CreateIndex
CREATE INDEX "Categoria_tipo_idx" ON "Categoria"("tipo");

-- CreateIndex
CREATE INDEX "Lancamento_idUsuario_idx" ON "Lancamento"("idUsuario");

-- CreateIndex
CREATE INDEX "Lancamento_idCategoria_idx" ON "Lancamento"("idCategoria");

-- CreateIndex
CREATE INDEX "Lancamento_dataTransacao_idx" ON "Lancamento"("dataTransacao");

-- CreateIndex
CREATE INDEX "Lancamento_tipo_idx" ON "Lancamento"("tipo");

-- CreateIndex
CREATE INDEX "Orcamento_idUsuario_idx" ON "Orcamento"("idUsuario");

-- CreateIndex
CREATE INDEX "Orcamento_idCategoria_idx" ON "Orcamento"("idCategoria");

-- CreateIndex
CREATE INDEX "Orcamento_mes_ano_idx" ON "Orcamento"("mes", "ano");

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orcamento" ADD CONSTRAINT "Orcamento_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
