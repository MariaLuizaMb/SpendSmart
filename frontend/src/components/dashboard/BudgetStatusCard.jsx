import { AlertTriangle } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

import AlertTooltip from "./AlertTooltip";
import {
  dashboardTypography,
  formatarMoeda,
  formatarPercentual,
  limitarPercentual,
  paraNumero,
} from "./dashboard-utils";

export default function BudgetStatusCard({ resumo, orcamento, alerta, carregando }) {
  const percentual = paraNumero(
    orcamento?.percentualProjetado ?? resumo?.percentualComprometimentoRenda,
  );
  const percentualLimitado = limitarPercentual(percentual);
  const limiteMensal = paraNumero(orcamento?.limiteMensal);
  const dados = [
    { name: "Utilizado", value: percentualLimitado },
    { name: "Disponível", value: Math.max(100 - percentualLimitado, 0) },
  ];
  const cor = percentual >= 100 ? "#dc2626" : percentual >= 80 ? "#f59e0b" : "#ef6748";
  const statusConfig =
    percentual >= 100
      ? {
          label: "Risco",
          className: "border-red-200 bg-red-50 text-red-700",
        }
      : percentual >= 80
        ? {
            label: "Atenção",
            className: "border-amber-200 bg-amber-50 text-amber-700",
          }
        : {
            label: "Dentro do orçamento",
            className: "border-emerald-200 bg-emerald-50 text-emerald-700",
          };
  const mensagemAlerta =
    alerta?.descricao ||
    (percentual >= 100
      ? "Seu orçamento pode ser ultrapassado até o fim do mês."
      : percentual >= 80
        ? "Suas despesas previstas estão próximas do orçamento."
        : "");

  return (
    <Card className="rounded-2xl border-0 bg-white py-0 shadow-lg ring-0">
      <CardHeader className="px-5 pb-0 pt-5 text-center">
        <div className="flex items-center justify-center gap-2">
          <CardTitle className={dashboardTypography.cardTitle}>
            Status do Orçamento
          </CardTitle>
          <AlertTooltip mensagem={mensagemAlerta} />
        </div>
        <CardDescription className="sr-only">
          Percentual utilizado do orçamento
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        {carregando ? (
          <Skeleton className="mx-auto h-56 w-full" />
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-64">
              <ChartContainer
                config={{
                  utilizado: { label: "Utilizado", color: cor },
                  disponivel: { label: "Disponível", color: "#e5e7eb" },
                }}
                className="h-56 w-full"
              >
                <PieChart>
                  <Pie
                    data={dados}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={64}
                    outerRadius={84}
                    startAngle={210}
                    endAngle={-150}
                    paddingAngle={2}
                  >
                    <Cell fill={cor} />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                </PieChart>
              </ChartContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className={dashboardTypography.metricValue}>
                  {formatarPercentual(percentual)}
                </span>
                <span className={`mt-1 ${dashboardTypography.detailLabel}`}>
                  utilizado
                </span>
              </div>
            </div>

            <div className="w-full space-y-3">
              <div className="flex justify-center">
                <Badge variant="outline" className={statusConfig.className}>
                  {statusConfig.label}
                </Badge>
              </div>

              <p className={`text-center ${dashboardTypography.body}`}>
                {orcamento?.mensagem ||
                  "Acompanhe sua projeção para manter o orçamento sob controle."}
              </p>

              {limiteMensal > 0 ? (
                <div className="flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2">
                  <span className="text-zinc-500">Limite mensal</span>
                  <strong className={dashboardTypography.itemTitle}>
                    {formatarMoeda(limiteMensal)}
                  </strong>
                </div>
              ) : (
                <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                  <AlertTriangle className="mt-0.5 shrink-0" size={16} />
                  Nenhum orçamento mensal foi definido para este período.
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
