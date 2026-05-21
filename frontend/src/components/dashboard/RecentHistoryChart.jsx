import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import {
  dashboardTypography,
  formatarMoeda,
  mapearHistorico,
} from "./dashboard-utils";

const opcoesPeriodoHistorico = [
  { value: "3", label: "Últimos 3 meses" },
  { value: "6", label: "Últimos 6 meses" },
  { value: "12", label: "Últimos 12 meses" },
];

export default function RecentHistoryChart({
  historico,
  periodo,
  onPeriodoChange,
  carregando,
}) {
  const dados = useMemo(
    () => mapearHistorico(historico, Number(periodo || 6)),
    [historico, periodo],
  );

  return (
    <Card className="@container/recent-history flex h-full min-h-[320px] flex-col rounded-2xl border-0 bg-white py-0 shadow-lg ring-0">
      <CardHeader className="grid gap-[clamp(0.75rem,2.5cqw,1rem)] px-[clamp(1rem,2.4cqw,1.25rem)] pb-2 pt-[clamp(1rem,2.4cqw,1.25rem)] sm:grid-cols-[1fr_minmax(180px,220px)] sm:items-start">
        <div>
          <CardTitle className="text-[clamp(1.05rem,2.35cqw,1.25rem)] font-bold text-zinc-950">
            Histórico Recente
          </CardTitle>
          <CardDescription className="mt-1 text-[clamp(0.78rem,1.6cqw,0.875rem)] text-zinc-500">
            Receitas e Despesas dos últimos meses
          </CardDescription>
        </div>

        <Select value={periodo} onValueChange={onPeriodoChange}>
          <SelectTrigger className="h-[clamp(2.25rem,4.5cqw,2.5rem)] w-full rounded-lg text-[clamp(0.78rem,1.7cqw,0.875rem)]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent align="end">
            {opcoesPeriodoHistorico.map((opcao) => (
              <SelectItem key={opcao.value} value={opcao.value}>
                {opcao.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 px-[clamp(1rem,2.4cqw,1.25rem)] pb-[clamp(1rem,2.4cqw,1.25rem)]">
        {carregando ? (
          <Skeleton className="h-[300px] w-full sm:h-[340px] xl:h-[400px]" />
        ) : dados.length === 0 ? (
          <div
            className={`flex h-[300px] items-center justify-center rounded-xl border border-dashed border-zinc-300 sm:h-[340px] xl:h-[400px] ${dashboardTypography.emptyState}`}
          >
            Sem histórico suficiente para montar o gráfico.
          </div>
        ) : (
          <ChartContainer
            config={{
              receitas: { label: "Receitas", color: "#2f9e92" },
              despesas: { label: "Despesas", color: "#ef6748" },
            }}
            className="h-[300px] w-full aspect-auto sm:h-[340px] xl:h-[400px]"
          >
            <AreaChart data={dados} margin={{ left: 8, right: 8, top: 16 }}>
              <defs>
                <linearGradient id="receitasDashboard" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2f9e92" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2f9e92" stopOpacity={0.04} />
                </linearGradient>
                <linearGradient id="despesasDashboard" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef6748" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#ef6748" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#e4e4e7" />
              <XAxis
                dataKey="mes"
                axisLine={false}
                tickLine={false}
                tickMargin={12}
              />
              <YAxis
                width={72}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                tickFormatter={(valor) => formatarMoeda(valor).replace("R$", "")}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => (
                      <div className="flex min-w-36 items-center justify-between gap-4">
                        <span className="text-zinc-500">
                          {name === "receitas" ? "Receitas" : "Despesas"}
                        </span>
                        <span className="font-semibold text-zinc-950">
                          {formatarMoeda(value)}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <Legend content={<ChartLegendContent />} />
              <Area
                type="monotone"
                dataKey="receitas"
                stroke="var(--color-receitas)"
                fill="url(#receitasDashboard)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="despesas"
                stroke="var(--color-despesas)"
                fill="url(#despesasDashboard)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
