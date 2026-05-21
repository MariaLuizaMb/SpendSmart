import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

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
import { Skeleton } from "@/components/ui/skeleton";

import AlertTooltip from "./AlertTooltip";
import {
  criarDadosSaldoPrevisto,
  dashboardTypography,
  formatarMoeda,
} from "./dashboard-utils";

export default function PredictedBalanceCard({
  saldo,
  projecoes,
  alerta,
  carregando,
}) {
  const dados = criarDadosSaldoPrevisto(saldo, projecoes);
  const temDados = dados.some(
    (item) => item.receitas || item.despesas || item.saldo,
  );

  return (
    <Card className="@container/predicted-balance flex h-full flex-col rounded-2xl border-0 bg-white py-0 shadow-lg ring-0">
      <CardHeader className="px-[clamp(1rem,5cqw,1.25rem)] pb-2 pt-[clamp(1rem,5cqw,1.25rem)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-[clamp(1rem,5cqw,1.25rem)] font-bold text-zinc-950">
              Saldo previsto
            </CardTitle>
            <CardDescription className="mt-1 text-[clamp(0.74rem,3.2cqw,0.875rem)] text-zinc-500">
              Projeção baseada nas contas e lançamentos.
            </CardDescription>
          </div>
          <AlertTooltip
            mensagem={
              alerta?.descricao || "Há risco de saldo negativo nos próximos meses."
            }
            className={alerta ? "" : "hidden"}
          />
        </div>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 px-[clamp(1rem,5cqw,1.25rem)] pb-[clamp(1rem,5cqw,1.25rem)]">
        {carregando ? (
          <Skeleton className="h-full min-h-[260px] w-full" />
        ) : !temDados ? (
          <div
            className={`flex h-full min-h-[260px] items-center justify-center rounded-xl border border-dashed border-zinc-300 ${dashboardTypography.emptyState}`}
          >
            Sem dados suficientes para projetar o saldo.
          </div>
        ) : (
          <ChartContainer
            config={{
              receitas: { label: "Receitas previstas", color: "#2f9e92" },
              despesas: { label: "Despesas previstas", color: "#ef6748" },
              saldo: { label: "Saldo projetado", color: "#18181b" },
            }}
            className="h-full min-h-[260px] w-full"
          >
            <BarChart data={dados} margin={{ left: 8, right: 8, top: 10 }}>
              <CartesianGrid vertical={false} stroke="#e4e4e7" />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} />
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
                      <div className="flex min-w-40 items-center justify-between gap-4">
                        <span className="text-zinc-500">
                          {name === "receitas"
                            ? "Receitas"
                            : name === "despesas"
                              ? "Despesas"
                              : "Saldo"}
                        </span>
                        <span className="font-semibold text-zinc-950">
                          {formatarMoeda(value)}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <Legend
                content={
                  <ChartLegendContent className="text-[clamp(0.65rem,2.8cqw,0.75rem)]" />
                }
              />
              <Bar dataKey="receitas" fill="var(--color-receitas)" radius={5} />
              <Bar dataKey="despesas" fill="var(--color-despesas)" radius={5} />
              <Bar dataKey="saldo" fill="var(--color-saldo)" radius={5} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
