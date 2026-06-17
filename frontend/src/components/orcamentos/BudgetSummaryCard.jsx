import { createElement } from "react";

export default function BudgetSummaryCard({
  titulo,
  valor,
  descricao,
  icon,
  variante = "zinc",
  carregando,
}) {
  const estilosPorVariante = {
    zinc: {
      gradiente: "from-white via-white to-zinc-50",
      icone: "bg-zinc-100 text-zinc-700",
    },
    emerald: {
      gradiente: "from-white via-white to-emerald-50",
      icone: "bg-emerald-100 text-emerald-700",
    },
    amber: {
      gradiente: "from-white via-white to-amber-50",
      icone: "bg-amber-100 text-amber-700",
    },
    red: {
      gradiente: "from-white via-white to-red-50",
      icone: "bg-red-100 text-red-700",
    },
    blue: {
      gradiente: "from-white via-white to-blue-50",
      icone: "bg-blue-100 text-blue-700",
    },
  };
  const estilos = estilosPorVariante[variante] || estilosPorVariante.zinc;

  return (
    <section
      className={`flex h-full min-h-[150px] rounded-2xl bg-linear-to-r p-4 shadow-sm sm:p-5 ${estilos.gradiente}`}
    >
      <div className="flex h-full w-full items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="text-base font-bold text-zinc-950">{titulo}</p>
          <div className="mt-5">
            <p className="text-3xl font-bold leading-none text-zinc-950 sm:text-[2rem]">
              {carregando ? "..." : valor}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              {descricao}
            </p>
          </div>
        </div>

        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${estilos.icone}`}
        >
          {createElement(icon, { size: 20 })}
        </div>
      </div>
    </section>
  );
}
