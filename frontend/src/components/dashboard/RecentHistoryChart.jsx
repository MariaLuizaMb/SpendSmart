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
    <Card className="min-h-[360px] rounded-2xl border-0 bg-white py-0 shadow-lg ring-0">
      <CardHeader className="grid gap-4 px-5 pb-2 pt-5 sm:grid-cols-[1fr_220px] sm:items-start">
        <div>
          <CardTitle className={dashboardTypography.cardTitle}>
            Histórico Recente
          </CardTitle>
          <CardDescription className={dashboardTypography.cardDescription}>
            Receitas e Despesas dos últimos meses
          </CardDescription>
        </div>

        <Select value={periodo} onValueChange={onPeriodoChange}>
          <SelectTrigger className="h-10 w-full rounded-lg">
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

      <CardContent className="px-5 pb-5">
        {carregando ? (
          <Skeleton className="h-[270px] w-full" />
        ) : dados.length === 0 ? (
          <div
            className={`flex h-[270px] items-center justify-center rounded-xl border border-dashed border-zinc-300 ${dashboardTypography.emptyState}`}
          >
            Sem histórico suficiente para montar o gráfico.
          </div>
        ) : (
          <ChartContainer
            config={{
              receitas: { label: "Receitas", color: "#2f9e92" },
              despesas: { label: "Despesas", color: "#ef6748" },
            }}
            className="h-[270px] w-full"
          >
            <AreaChart data={dados} margin={{ left: 0, right: 8, top: 16 }}>
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
                width={38}
                axisLine={false}
                tickLine={false}
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
