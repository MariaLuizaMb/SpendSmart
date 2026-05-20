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
  const orcamentoDisponivel = Math.max(
    limiteMensal - (limiteMensal * percentualLimitado) / 100,
    0,
  );
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
    orcamento?.mensagemTemporal ||
    (percentual >= 100
      ? "Seu orçamento pode ser ultrapassado até o fim do mês."
      : percentual >= 80
        ? "Suas despesas previstas estão próximas do orçamento."
        : "");

  return (
    <Card className="@container/budget-status flex h-full flex-col rounded-2xl border-0 bg-white py-0 shadow-lg ring-0">
      <CardHeader className="px-[clamp(1rem,5cqw,1.25rem)] pb-0 pt-[clamp(1rem,5cqw,1.25rem)] text-center">
        <div className="flex items-center justify-center gap-2">
          <CardTitle className="text-[clamp(1rem,5cqw,1.25rem)] font-bold text-zinc-950">
            Status do Orçamento
          </CardTitle>
          <AlertTooltip mensagem={mensagemAlerta} />
        </div>
        <CardDescription className="sr-only">
          Percentual utilizado do orçamento
        </CardDescription>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 px-[clamp(1rem,5cqw,1.25rem)] pb-[clamp(1rem,5cqw,1.25rem)]">
        {carregando ? (
          <Skeleton className="mx-auto min-h-56 flex-1 w-full" />
        ) : (
          <div className="flex min-h-full flex-1 flex-col items-center justify-between gap-[clamp(1rem,5cqw,1.5rem)]">
            <div className="relative flex w-full max-w-64 flex-1 items-center">
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

            <div className="w-full space-y-[clamp(0.5rem,3cqw,0.75rem)]">
              <div className="flex justify-center">
                <Badge variant="outline" className={statusConfig.className}>
                  {statusConfig.label}
                </Badge>
              </div>

              <p className="text-center text-[clamp(0.74rem,3.5cqw,0.875rem)] leading-relaxed text-zinc-600">
                {orcamento?.mensagem ||
                  "Acompanhe sua projeção para manter o orçamento sob controle."}
              </p>

              {orcamento?.mensagemTemporal && !orcamento?.semOrcamento && (
                <div
                  className={`rounded-xl border px-3 py-2 text-center text-[clamp(0.74rem,3.4cqw,0.875rem)] font-medium ${
                    orcamento.esgotaDentroDoMes
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-emerald-200 bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {orcamento.mensagemTemporal}
                </div>
              )}

              {limiteMensal > 0 ? (
                <div className="rounded-xl border border-zinc-200 px-3 py-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[clamp(0.74rem,3.4cqw,0.875rem)] text-zinc-500">Limite mensal</span>
                    <strong className="text-[clamp(0.74rem,3.4cqw,0.875rem)] font-semibold text-zinc-950">
                      {formatarMoeda(limiteMensal)}
                    </strong>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3 border-t border-zinc-100 pt-2">
                    <span className="text-[clamp(0.74rem,3.4cqw,0.875rem)] text-zinc-500">Disponível</span>
                    <strong className="text-[clamp(0.74rem,3.4cqw,0.875rem)] font-semibold text-zinc-950">
                      {formatarMoeda(orcamentoDisponivel)}
                    </strong>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[clamp(0.74rem,3.4cqw,0.875rem)] text-amber-700">
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
