import { createElement } from "react";
import { Activity, AlertTriangle, CircleDollarSign } from "lucide-react";

import BudgetAlertTooltip from "@/components/orcamentos/BudgetAlertTooltip";
import { Badge } from "@/components/ui/badge";
import {
  calcularPrevisaoEstouro,
  calcularRitmoConsumo,
  formatarPercentual,
} from "@/components/orcamentos/budget-utils";

function InsightBlock({ icon: Icon, titulo, texto, badge, alerta, tooltip }) {
  return (
    <div className="rounded-xl bg-zinc-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-700">
            {createElement(Icon, { size: 18 })}
          </div>
          <p className="font-semibold text-zinc-950">{titulo}</p>
        </div>
        <BudgetAlertTooltip mensagem={tooltip} alerta={alerta} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-zinc-600">{texto}</p>
      {badge && (
        <Badge
          variant="outline"
          className={
            alerta
              ? "mt-3 border-amber-200 bg-amber-50 text-amber-700"
              : "mt-3 border-emerald-200 bg-emerald-50 text-emerald-700"
          }
        >
          {badge}
        </Badge>
      )}
    </div>
  );
}

export default function BudgetInsightsCard({ orcamentoGeral, orcamentos }) {
  const ritmo = orcamentoGeral ? calcularRitmoConsumo(orcamentoGeral) : null;
  const previsao = orcamentoGeral ? calcularPrevisaoEstouro(orcamentoGeral) : null;
  const semMovimentacao = (orcamentos || []).filter(
    (orcamento) => (orcamento.lancamentosAssociados || []).length === 0,
  ).length;

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <h2 className="text-base font-bold text-zinc-950">Resumo do período</h2>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <InsightBlock
          icon={Activity}
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
          tooltip={
            ritmo?.consumoAcelerado
              ? "O percentual usado está acima do avanço esperado para o mês."
              : ""
          }
        />

        <InsightBlock
          icon={AlertTriangle}
          titulo="Previsão de estouro"
          texto={
            previsao?.mensagem ||
            "Não há dados suficientes para calcular esta informação."
          }
          badge={previsao ? "Acompanhar limite" : ""}
          alerta={Boolean(previsao)}
          tooltip="Essa previsão é calculada com base no ritmo atual de gastos do período."
        />

        <InsightBlock
          icon={CircleDollarSign}
          titulo="Orçamentos sem movimentação"
          texto={`${semMovimentacao} ${semMovimentacao === 1 ? "orçamento ainda não teve" : "orçamentos ainda não tiveram"} lançamentos associados neste período.`}
          badge={semMovimentacao > 0 ? "Sem movimentação" : "Todos movimentados"}
          alerta={semMovimentacao > 0}
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
