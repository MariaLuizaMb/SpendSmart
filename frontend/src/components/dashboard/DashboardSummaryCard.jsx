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
      gradiente: "from-white via-white to-sky-100",
      bordaIcone: "border-sky-400",
      fundoIcone: "bg-sky-100/70",
      textoIcone: "text-sky-500",
    },
    indigo: {
      gradiente: "from-white via-white to-indigo-100",
      bordaIcone: "border-indigo-400",
      fundoIcone: "bg-indigo-100/70",
      textoIcone: "text-indigo-500",
    },
    emerald: {
      gradiente: "from-white via-white to-emerald-100",
      bordaIcone: "border-emerald-400",
      fundoIcone: "bg-emerald-100/70",
      textoIcone: "text-emerald-500",
    },
    rose: {
      gradiente: "from-white via-white to-rose-100",
      bordaIcone: "border-rose-400",
      fundoIcone: "bg-rose-100/70",
      textoIcone: "text-rose-500",
    },
    orange: {
      gradiente: "from-white via-white to-orange-100",
      bordaIcone: "border-orange-400",
      fundoIcone: "bg-orange-100/70",
      textoIcone: "text-orange-500",
    },
  };
  const estilos = estilosPorVariante[variante] || estilosPorVariante.sky;

  return (
    <Card
      className={`@container/dashboard-summary-card relative h-full min-h-[clamp(8rem,42cqw,9.25rem)] overflow-hidden rounded-[18px] border-0 bg-linear-to-r py-[clamp(0.75rem,4cqw,1rem)] shadow-lg ring-0 ${estilos.gradiente}`}
    >
      <div
        className={`absolute right-[clamp(0.75rem,4cqw,1rem)] top-[clamp(0.75rem,4cqw,1rem)] flex size-[clamp(2rem,11cqw,2.25rem)] items-center justify-center rounded-full border-2 ${estilos.bordaIcone} ${estilos.fundoIcone} ${estilos.textoIcone}`}
      >
        {createElement(icon, {
          className: "size-[clamp(1rem,5cqw,1.125rem)]",
          strokeWidth: 2.1,
        })}
      </div>

      <div className="absolute right-[clamp(3rem,15cqw,3.5rem)] top-[clamp(0.75rem,4cqw,1rem)]">
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
