import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import AlertTooltip from "./AlertTooltip";
import {
  dashboardTypography,
  formatarMoeda,
  formatarPercentual,
  limitarPercentual,
  paraNumero,
} from "./dashboard-utils";

export default function CategoryRankingCard({ categorias, carregando }) {
  const categoriasOrdenadas = useMemo(
    () =>
      [...(categorias || [])]
        .sort(
          (a, b) =>
            paraNumero(b.projecaoFutura ?? b.total) -
            paraNumero(a.projecaoFutura ?? a.total),
        )
        .slice(0, 5),
    [categorias],
  );
  const maiorValor = Math.max(
    ...categoriasOrdenadas.map((categoria) =>
      paraNumero(categoria.projecaoFutura ?? categoria.total),
    ),
    0,
  );

  return (
    <Card className="min-h-[360px] rounded-2xl border-0 bg-white py-0 shadow-lg ring-0">
      <CardHeader className="px-5 pb-2 pt-5">
        <CardTitle className={dashboardTypography.cardTitle}>
          Ranking de categorias
        </CardTitle>
        <CardDescription className={dashboardTypography.cardDescription}>
          Principais despesas do período selecionado.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        {carregando ? (
          <div className="space-y-4 pt-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} className="h-8 w-full" />
            ))}
          </div>
        ) : categoriasOrdenadas.length === 0 ? (
          <div
            className={`flex h-[260px] items-center justify-center rounded-xl border border-dashed border-zinc-300 ${dashboardTypography.emptyState}`}
          >
            Nenhuma despesa por categoria encontrada para este período.
          </div>
        ) : (
          <div className="space-y-4 pt-3">
            <div className="space-y-3">
              {categoriasOrdenadas.map((categoria) => {
                const valor = paraNumero(categoria.projecaoFutura ?? categoria.total);
                const largura = maiorValor ? (valor / maiorValor) * 100 : 0;
                const percentual = categoria.percentual ?? categoria.percentualOrcamento;
                const alerta =
                  categoria.risco === "ALTO"
                    ? "Categoria com risco alto de ultrapassar o limite."
                      : categoria.risco === "MEDIO"
                        ? "Categoria exige atenção neste período."
                        : "";
                const riscoClassName =
                  categoria.risco === "ALTO"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : categoria.risco === "MEDIO"
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : "border-emerald-200 bg-emerald-50 text-emerald-700";

                return (
                  <div
                    key={categoria.idCategoria || categoria.nome}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className={`truncate ${dashboardTypography.itemTitle}`}>
                          {categoria.nome || "Categoria"}
                        </span>
                        <AlertTooltip mensagem={alerta} />
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {percentual !== undefined && (
                          <Badge variant="outline" className={riscoClassName}>
                            {formatarPercentual(percentual)}
                          </Badge>
                        )}
                        <span className={dashboardTypography.itemMeta}>
                          {formatarMoeda(valor)}
                        </span>
                      </div>
                    </div>

                    <Progress
                      value={limitarPercentual(largura)}
                      className="h-3 rounded-full bg-zinc-100"
                      indicatorClassName="bg-[#2f9e92]"
                    />
                  </div>
                );
              })}
            </div>

            <div className="border-t border-zinc-200 pt-4">
              <p className={dashboardTypography.itemTitle}>
                Categorias com maior impacto no período selecionado
              </p>
              <p className={`mt-2 ${dashboardTypography.body}`}>
                O ranking usa os totais e projeções retornados pela análise
                preditiva.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
