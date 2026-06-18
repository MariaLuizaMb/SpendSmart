import { createElement } from "react";

export default function CategorySummaryCard({
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
    blue: {
      gradiente: "from-white via-white to-blue-50",
      icone: "bg-blue-100 text-blue-700",
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
  };
  const estilos = estilosPorVariante[variante] || estilosPorVariante.zinc;

  return (
    <section
      className={`flex h-full flex-col rounded-2xl bg-linear-to-r p-4 shadow-sm ${estilos.gradiente}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-zinc-600">{titulo}</p>
          <p className="mt-3 text-2xl font-bold leading-none text-zinc-950">
            {carregando ? "..." : valor}
          </p>
        </div>

        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${estilos.icone}`}
        >
          {createElement(icon, { size: 20 })}
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-zinc-500">{descricao}</p>
    </section>
  );
}
