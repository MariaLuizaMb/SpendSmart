import { createElement } from "react";

export default function BudgetSummaryCard({
  titulo,
  valor,
  descricao,
  icon,
  variante = "zinc",
  carregando,
}) {
  const classesIcone = {
    zinc: "bg-zinc-100 text-zinc-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
    blue: "bg-blue-50 text-blue-700",
  };

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-950">{titulo}</p>
          <p className="mt-3 text-2xl font-bold leading-none text-zinc-950">
            {carregando ? "..." : valor}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            {descricao}
          </p>
        </div>

        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${classesIcone[variante] || classesIcone.zinc}`}
        >
          {createElement(icon, { size: 21 })}
        </div>
      </div>
    </section>
  );
}
