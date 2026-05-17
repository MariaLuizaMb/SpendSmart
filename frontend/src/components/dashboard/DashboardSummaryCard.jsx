import { createElement } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import AlertTooltip from "./AlertTooltip";
import { dashboardTypography } from "./dashboard-utils";

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
      className={`h-full min-h-[136px] overflow-hidden rounded-[18px] border-0 bg-linear-to-r py-3 shadow-lg ring-0 sm:min-h-[148px] sm:py-4 ${estilos.gradiente}`}
    >
      <CardContent className="@container/dashboard-summary-card relative flex size-full min-h-0 min-w-0 flex-1 flex-col justify-center px-5 sm:px-6">
        <div
          className={`absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border-2 sm:right-4 sm:top-4 sm:size-9 ${estilos.bordaIcone} ${estilos.fundoIcone} ${estilos.textoIcone}`}
        >
          {createElement(icon, { size: 18, strokeWidth: 2.1 })}
        </div>

        <div className="absolute right-12 top-3 sm:right-14 sm:top-4">
          <AlertTooltip mensagem={alerta} />
        </div>

        <div className="flex min-h-0 min-w-0 flex-col gap-1.5 sm:gap-2">
          <CardTitle
            className={`max-w-full shrink-0 overflow-hidden text-ellipsis whitespace-nowrap pr-12 ${dashboardTypography.metricTitle}`}
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
                className={`max-w-full shrink-0 overflow-hidden text-ellipsis whitespace-nowrap leading-none ${dashboardTypography.metricValue}`}
              >
                {valor}
              </p>
              <p
                className={`max-w-full overflow-hidden text-ellipsis whitespace-nowrap ${dashboardTypography.metricDescription}`}
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
