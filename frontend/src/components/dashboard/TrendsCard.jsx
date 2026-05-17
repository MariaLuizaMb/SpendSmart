import {
  ArrowDownRight,
  ArrowUpRight,
  CircleAlert,
  Minus,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import AlertTooltip from "./AlertTooltip";
import {
  dashboardTypography,
  formatarPercentual,
  paraNumero,
} from "./dashboard-utils";

const tendenciaConfig = {
  AUMENTO: {
    icon: ArrowUpRight,
    badge: "border-red-200 bg-red-50 text-red-700",
    label: "Aumento",
  },
  REDUCAO: {
    icon: ArrowDownRight,
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    label: "Queda",
  },
  MELHORA: {
    icon: ArrowUpRight,
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    label: "Melhora",
  },
  PIORA: {
    icon: ArrowDownRight,
    badge: "border-red-200 bg-red-50 text-red-700",
    label: "Piora",
  },
  ESTABILIDADE: {
    icon: Minus,
    badge: "border-zinc-200 bg-zinc-50 text-zinc-700",
    label: "Estável",
  },
  ESTAVEL: {
    icon: Minus,
    badge: "border-zinc-200 bg-zinc-50 text-zinc-700",
    label: "Estável",
  },
};

function obterConfig(direcao) {
  return tendenciaConfig[direcao] || tendenciaConfig.ESTABILIDADE;
}

function TrendItem({ titulo, tendencia, alerta }) {
  const direcao = tendencia?.direcao || "ESTABILIDADE";
  const config = obterConfig(direcao);
  const Icon = config.icon;
  const percentual = paraNumero(tendencia?.percentual);

  return (
    <div className="rounded-2xl border border-zinc-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <p className={`truncate ${dashboardTypography.itemLabel}`}>
            {titulo}
          </p>
          <AlertTooltip mensagem={alerta} />
        </div>

        <Badge
          variant="outline"
          className={cn(
            "rounded-lg px-2 py-1 font-semibold",
            config.badge,
          )}
        >
          <Icon size={14} />
          {percentual ? formatarPercentual(Math.abs(percentual), 1) : config.label}
        </Badge>
      </div>

      <p className={`mt-3 ${dashboardTypography.subMetricValue}`}>
        {config.label}
      </p>
      <p className={`mt-6 ${dashboardTypography.body}`}>
        {tendencia?.descricao || "Ainda não há tendência calculada para este indicador."}
      </p>
    </div>
  );
}

export default function TrendsCard({ tendencias, alertas, carregando }) {
  const itens = [
    {
      titulo: "Receitas",
      tendencia: tendencias?.tendenciaReceitas,
      alerta: "",
    },
    {
      titulo: "Despesas",
      tendencia: tendencias?.tendenciaDespesas,
      alerta: alertas?.find((alerta) => alerta.tipo === "AUMENTO_GASTOS")?.descricao,
    },
    {
      titulo: "Saldo",
      tendencia: tendencias?.tendenciaSaldo,
      alerta: alertas?.find((alerta) => alerta.tipo === "SALDO_NEGATIVO")?.descricao,
    },
    {
      titulo: "Tendência geral",
      tendencia: tendencias?.tendenciaGeral,
      alerta: alertas?.find((alerta) => alerta.severidade === "ALTA")?.descricao,
    },
  ];

  return (
    <Card className="rounded-2xl border-0 bg-white py-0 shadow-lg ring-0">
      <CardHeader className="px-5 pb-2 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className={dashboardTypography.cardTitle}>
              Tendências
            </CardTitle>
            <CardDescription className={dashboardTypography.cardDescription}>
              Comparação com a média histórica.
            </CardDescription>
          </div>
          {alertas?.length > 0 && (
            <CircleAlert className="mt-1 text-amber-600" size={20} />
          )}
        </div>
      </CardHeader>

      <CardContent className="grid max-h-[376px] gap-3 overflow-y-auto px-5 pb-5">
        {carregando
          ? [1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-40 w-full" />
            ))
          : itens.map((item) => (
              <TrendItem
                key={item.titulo}
                titulo={item.titulo}
                tendencia={item.tendencia}
                alerta={item.alerta}
              />
            ))}
      </CardContent>
    </Card>
  );
}
