import { createElement } from "react";
import { FileText, Gauge, TrendingUp } from "lucide-react";

import BudgetAlertTooltip from "@/components/orcamentos/BudgetAlertTooltip";
import {
  calcularPrevisaoEstouro,
  calcularRitmoConsumo,
  formatarPercentual,
} from "@/components/orcamentos/budget-utils";
import { cn } from "@/lib/utils";

function InsightBlock({
  icon: Icon,
  titulo,
  texto,
  badge,
  alerta,
  tooltip,
  iconClassName,
  className,
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-start gap-5 px-1 py-1 lg:px-7",
        className,
      )}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          iconClassName,
        )}
      >
        {createElement(Icon, { size: 20 })}
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <p className="truncate text-sm font-bold text-zinc-950">{titulo}</p>
          <BudgetAlertTooltip
            mensagem={tooltip}
            alerta={alerta}
            className="-my-1 size-5 text-zinc-500 hover:bg-transparent"
          />
        </div>

        <p className="mt-2 max-w-72.5 text-xs leading-5 text-zinc-700">
          {texto}
        </p>

        {badge && (
          <div className="mt-2 flex justify-start">
            <span
              className={cn(
                "inline-flex h-7 items-center rounded-md px-3 text-xs font-semibold",
                alerta
                  ? "bg-orange-100 text-orange-700"
                  : "bg-emerald-100 text-emerald-900",
              )}
            >
              {badge}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BudgetInsightsCard({ orcamentoGeral, orcamentos }) {
  const ritmo = orcamentoGeral ? calcularRitmoConsumo(orcamentoGeral) : null;
  const previsao = orcamentoGeral
    ? calcularPrevisaoEstouro(orcamentoGeral)
    : null;
  const semMovimentacao = (orcamentos || []).filter(
    (orcamento) => (orcamento.lancamentosAssociados || []).length === 0,
  ).length;

  return (
    <section className="rounded-xl border border-zinc-100 bg-linear-to-r from-white via-white to-zinc-50 px-5 py-5 shadow-sm">
      <h2 className="text-base font-bold text-zinc-950">Resumo do período</h2>

      <div className="mt-5 grid gap-5 lg:grid-cols-3 lg:gap-0">
        <InsightBlock
          icon={Gauge}
          titulo="Ritmo de consumo"
          texto={
            ritmo
              ? `Você usou ${formatarPercentual(ritmo.percentual)} do orçamento, mas ainda restam ${ritmo.diasRestantes} dias no mês.`
              : "Não há dados suficientes para calcular esta informação."
          }
          badge={
            ritmo
              ? ritmo.consumoAcelerado
                ? "Consumo acelerado"
                : "Dentro do esperado"
              : ""
          }
          alerta={Boolean(ritmo?.consumoAcelerado)}
          iconClassName="bg-amber-100 text-amber-700"
          tooltip={
            ritmo?.consumoAcelerado
              ? "O percentual usado está acima do avanço esperado para o mês."
              : ""
          }
        />

        <InsightBlock
          icon={TrendingUp}
          titulo="Previsão de estouro"
          texto={
            previsao?.mensagem ||
            "Não há dados suficientes para calcular esta informação."
          }
          badge={previsao ? "Acompanhar limite" : ""}
          alerta={Boolean(previsao)}
          iconClassName="bg-red-100 text-red-700"
          className="border-t border-zinc-200 pt-5 lg:border-l lg:border-t-0 lg:pt-1"
          tooltip="Essa previsão é calculada com base no ritmo atual de gastos do período."
        />

        <InsightBlock
          icon={FileText}
          titulo="Orçamentos sem movimentação"
          texto={`${semMovimentacao} ${semMovimentacao === 1 ? "orçamento ainda não teve" : "orçamentos ainda não tiveram"} lançamentos associados neste período.`}
          badge={
            semMovimentacao > 0 ? "Sem movimentação" : "Todos movimentados"
          }
          alerta={semMovimentacao > 0}
          iconClassName="bg-blue-100 text-blue-700"
          className="border-t border-zinc-200 pt-5 lg:border-l lg:border-t-0 lg:pt-1"
          tooltip={
            semMovimentacao > 0
              ? "Orçamentos sem lançamentos podem indicar categorias pouco usadas ou ausência de movimentações no período."
              : ""
          }
        />
      </div>
    </section>
  );
}
