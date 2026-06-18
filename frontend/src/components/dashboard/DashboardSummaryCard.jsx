import { createElement } from "react";

import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import AlertTooltip from "./AlertTooltip";

export default function DashboardSummaryCard({
  titulo,
  valor,
  descricao,
  icon,
  alerta,
  carregando,
  variante = "sky",
}) {
  const estilosPorVariante = {
    sky: {
      gradiente: "from-white via-white to-sky-50",
      bordaIcone: "border-sky-400",
      fundoIcone: "bg-sky-100",
      textoIcone: "text-sky-500",
    },
    indigo: {
      gradiente: "from-white via-white to-indigo-50",
      bordaIcone: "border-indigo-400",
      fundoIcone: "bg-indigo-100",
      textoIcone: "text-indigo-500",
    },
    emerald: {
      gradiente: "from-white via-white to-emerald-50",
      bordaIcone: "border-emerald-400",
      fundoIcone: "bg-emerald-100",
      textoIcone: "text-emerald-500",
    },
    rose: {
      gradiente: "from-white via-white to-rose-50",
      bordaIcone: "border-rose-400",
      fundoIcone: "bg-rose-100",
      textoIcone: "text-rose-500",
    },
    orange: {
      gradiente: "from-white via-white to-orange-50",
      bordaIcone: "border-orange-400",
      fundoIcone: "bg-orange-100",
      textoIcone: "text-orange-500",
    },
  };
  const estilos = estilosPorVariante[variante] || estilosPorVariante.sky;

  return (
    <Card
      className={`@container/dashboard-summary-card relative h-full min-h-[clamp(8rem,42cqw,9.25rem)] overflow-hidden rounded-2xl border-0 bg-linear-to-r py-[clamp(0.75rem,4cqw,1rem)] shadow-lg ring-0 ${estilos.gradiente}`}
    >
      <div
        className={`absolute right-4 top-4 flex size-10 items-center justify-center rounded-xl ${estilos.fundoIcone} ${estilos.textoIcone}`}
      >
        {createElement(icon, {
          size: 20,
          strokeWidth: 2.1,
        })}
      </div>

      <div className="absolute right-16 top-4">
        <AlertTooltip mensagem={alerta} />
      </div>

      <CardContent className="flex size-full min-h-0 min-w-0 flex-1 flex-col justify-center px-[clamp(1rem,6cqw,1.5rem)] pr-[clamp(3.5rem,18cqw,4rem)]">
        <div className="flex min-h-0 min-w-0 flex-col gap-[clamp(0.3rem,1.8cqw,0.5rem)]">
          <CardTitle
            className="max-w-full shrink-0 whitespace-normal break-words text-[clamp(0.78rem,4.4cqw,1rem)] font-semibold leading-tight text-zinc-950"
          >
            {titulo}
          </CardTitle>

          {carregando ? (
            <>
              <Skeleton className="h-8 w-36" />
              <Skeleton className="h-4 w-full max-w-56" />
            </>
          ) : (
            <>
              <p
                className="max-w-full shrink-0 whitespace-normal break-words text-[clamp(1.15rem,8.2cqw,1.875rem)] font-bold leading-tight tracking-normal text-zinc-950"
              >
                {valor}
              </p>
              <p
                className="max-w-full whitespace-normal break-words text-[clamp(0.68rem,3.4cqw,0.8125rem)] leading-snug text-zinc-900"
              >
                {descricao}
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
