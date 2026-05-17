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
    <Card className="rounded-2xl border-0 bg-white py-0 shadow-lg ring-0">
      <CardHeader className="px-5 pb-2 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className={dashboardTypography.cardTitle}>
              Saldo previsto
            </CardTitle>
            <CardDescription className={dashboardTypography.cardDescription}>
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

      <CardContent className="px-5 pb-5">
        {carregando ? (
          <Skeleton className="h-[260px] w-full" />
        ) : !temDados ? (
          <div
            className={`flex h-[260px] items-center justify-center rounded-xl border border-dashed border-zinc-300 ${dashboardTypography.emptyState}`}
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
            className="h-[260px] w-full"
          >
            <BarChart data={dados} margin={{ left: 0, right: 8, top: 10 }}>
              <CartesianGrid vertical={false} stroke="#e4e4e7" />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} />
              <YAxis
                width={40}
                axisLine={false}
                tickLine={false}
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
              <Legend content={<ChartLegendContent />} />
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
