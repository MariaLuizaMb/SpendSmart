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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import AlertTooltip from "./AlertTooltip";
import {
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

function obterMensagemContextoGeral(tendencias) {
  const percentualReceitas = paraNumero(tendencias?.tendenciaReceitas?.percentual);
  const percentualDespesas = paraNumero(tendencias?.tendenciaDespesas?.percentual);
  const direcaoReceitas = tendencias?.tendenciaReceitas?.direcao;
  const direcaoDespesas = tendencias?.tendenciaDespesas?.direcao;
  const direcaoSaldo = tendencias?.tendenciaSaldo?.direcao;

  if (!tendencias) {
    return "As tendências resumem como sua vida financeira está se movendo em relação ao seu histórico recente.";
  }

  if (
    direcaoDespesas === "AUMENTO" &&
    percentualDespesas > Math.max(percentualReceitas, 0)
  ) {
    return "Contexto geral: suas despesas estão acelerando mais do que as receitas, então vale revisar gastos recorrentes antes que isso pressione o saldo.";
  }

  if (direcaoSaldo === "REDUCAO" || direcaoSaldo === "PIORA") {
    return "Contexto geral: o saldo mostra perda de fôlego em relação ao histórico, mesmo que algumas métricas isoladas pareçam positivas.";
  }

  if (
    (direcaoReceitas === "AUMENTO" || direcaoReceitas === "MELHORA") &&
    (direcaoDespesas === "REDUCAO" || direcaoDespesas === "ESTABILIDADE")
  ) {
    return "Contexto geral: receitas em alta com despesas controladas indicam uma tendência mais confortável para o período.";
  }

  if (Math.abs(percentualReceitas) <= 5 && Math.abs(percentualDespesas) <= 5) {
    return "Contexto geral: suas métricas estão próximas da média histórica, então pequenas mudanças nos próximos lançamentos podem alterar a leitura.";
  }

  return "Contexto geral: leia as tendências em conjunto, porque receitas, despesas e saldo explicam melhor sua situação quando comparados entre si.";
}

function TrendItem({ titulo, tendencia, alerta }) {
  const direcao = tendencia?.direcao || "ESTABILIDADE";
  const config = obterConfig(direcao);
  const Icon = config.icon;
  const percentual = paraNumero(tendencia?.percentual);

  return (
    <div className="rounded-xl border border-zinc-200 p-[clamp(0.65rem,3.1cqw,0.75rem)]">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-[clamp(0.68rem,2.9cqw,0.75rem)] text-zinc-500">
            {titulo}
          </p>
          <AlertTooltip mensagem={alerta} />
        </div>

        <Badge
          variant="outline"
          className={cn(
            "h-7 rounded-lg px-2 text-xs font-semibold",
            "text-[clamp(0.68rem,2.9cqw,0.75rem)]",
            config.badge,
          )}
        >
          <Icon size={13} />
          {percentual ? formatarPercentual(Math.abs(percentual), 1) : config.label}
        </Badge>
      </div>

      <p className="mt-2 text-[clamp(1rem,4.8cqw,1.25rem)] font-bold text-zinc-950">
        {config.label}
      </p>
      <p className="mt-3 text-[clamp(0.76rem,3.3cqw,0.875rem)] leading-snug text-zinc-600">
        {tendencia?.descricao || "Ainda não há tendência calculada para este indicador."}
      </p>
    </div>
  );
}

export default function TrendsCard({ tendencias, alertas, carregando }) {
  const mensagemContextoGeral = obterMensagemContextoGeral(tendencias);
  const itens = [
    {
      titulo: "Receitas",
      tendencia: tendencias?.tendenciaReceitas,
      alerta: "",
    },
    {
      titulo: "Despesas",
      tendencia: tendencias?.tendenciaDespesas,
      alerta: "",
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
    <Card className="@container/trends-card flex h-full flex-col rounded-2xl border-0 bg-white py-0 shadow-lg ring-0">
      <CardHeader className="px-[clamp(1rem,5cqw,1.25rem)] pb-2 pt-[clamp(1rem,5cqw,1.25rem)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-[clamp(1rem,5cqw,1.25rem)] font-bold text-zinc-950">
              Tendências
            </CardTitle>
            <CardDescription className="mt-1 text-[clamp(0.74rem,3.2cqw,0.875rem)] text-zinc-500">
              Comparação com a média histórica.
            </CardDescription>
          </div>
          {mensagemContextoGeral && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="mt-1 inline-flex size-6 items-center justify-center rounded-full text-amber-600 transition-colors hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label={mensagemContextoGeral}
                >
                  <CircleAlert size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={6}>
                {mensagemContextoGeral}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col px-[clamp(1rem,5cqw,1.25rem)] pb-[clamp(1rem,5cqw,1.25rem)]">
        <ScrollArea className="min-h-0 max-h-[318px] flex-1 pr-3">
          <div className="grid gap-[clamp(0.55rem,3cqw,0.75rem)]">
            {carregando
              ? [1, 2, 3].map((item) => (
                  <Skeleton key={item} className="h-32 w-full" />
                ))
              : itens.map((item) => (
                  <TrendItem
                    key={item.titulo}
                    titulo={item.titulo}
                    tendencia={item.tendencia}
                    alerta={item.alerta}
                  />
                ))}
          </div>
        </ScrollArea>

        <p className="mt-3 border-t border-zinc-100 pt-3 text-[clamp(0.68rem,2.9cqw,0.75rem)] leading-snug text-zinc-500">
          As tendências comparam a projeção atual com sua média histórica para
          indicar se receitas, despesas e saldo estão melhorando ou exigem atenção.
        </p>
      </CardContent>
    </Card>
  );
}
