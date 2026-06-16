import { createElement } from "react";

export default function CategorySummaryCard({
  titulo,
  valor,
  descricao,
  icon,
  carregando,
}) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-600">{titulo}</p>
          <p className="mt-3 text-2xl font-bold leading-none text-zinc-950">
            {carregando ? "..." : valor}
          </p>
        </div>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
          {createElement(icon, { size: 20 })}
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-zinc-500">{descricao}</p>
    </section>
  );
}
