ALTER TABLE "Orcamento"
ADD CONSTRAINT "Orcamento_valor_positive_check" CHECK ("valor" > 0);

ALTER TABLE "Orcamento"
ADD CONSTRAINT "Orcamento_mes_range_check" CHECK ("mes" BETWEEN 1 AND 12);

ALTER TABLE "Orcamento"
ADD CONSTRAINT "Orcamento_ano_valid_check" CHECK ("ano" BETWEEN 1900 AND 9999);

CREATE UNIQUE INDEX "Orcamento_usuario_periodo_geral_key"
ON "Orcamento"("idUsuario", "mes", "ano")
WHERE "idCategoria" IS NULL;

CREATE UNIQUE INDEX "Orcamento_usuario_periodo_categoria_key"
ON "Orcamento"("idUsuario", "mes", "ano", "idCategoria")
WHERE "idCategoria" IS NOT NULL;
