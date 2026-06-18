import { TrendingUp } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

import { obterNomeOrcamento } from "@/components/orcamentos/budget-utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BudgetUsageCard({
  orcamentos,
  orcamentoSelecionado,
  onOrcamentoSelecionadoChange,
  carregando,
}) {
  const possuiOrcamento = Boolean(orcamentoSelecionado);
  const utilizado = orcamentoSelecionado?.utilizado || 0;
  const limite = orcamentoSelecionado?.limite || 0;
  const percentual = limite ? (utilizado / limite) * 100 : 0;
  const valorGastoGrafico = Math.min(
    Math.max(utilizado, 0),
    Math.max(limite, 0),
  );
  const valorRestanteGrafico = Math.max(limite - utilizado, 0);
  const dadosGrafico = [
    { name: "Total gasto", value: valorGastoGrafico },
    { name: "Total restante", value: valorRestanteGrafico },
  ];
  const dadosGraficoVisiveis =
    limite > 0 && (valorGastoGrafico > 0 || valorRestanteGrafico > 0)
      ? dadosGrafico
      : [{ name: "Total restante", value: 1 }];

  const tendencia =
    utilizado <= 0
      ? "Sem movimentações no período"
      : percentual > 60
        ? "Aumento de gastos"
        : "Consumo dentro do esperado";

  function formatarMoedaCompacta(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    });
  }

  return (
    <section className="flex min-h-[300px] flex-col rounded-2xl bg-white p-4 shadow-sm sm:p-5 xl:min-h-[318px]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-zinc-950">Orçamento</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {possuiOrcamento
              ? orcamentoSelecionado?.idCategoria
                ? obterNomeOrcamento(orcamentoSelecionado)
                : "Orçamento geral"
              : "Orçamento geral"}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Select
            value={orcamentoSelecionado?.id || ""}
            onValueChange={onOrcamentoSelecionadoChange}
            disabled={carregando || orcamentos.length === 0}
          >
            <SelectTrigger className="w-[118px] rounded-xl bg-white text-sm">
              <SelectValue placeholder="Geral" />
            </SelectTrigger>
            <SelectContent align="end">
              {orcamentos.map((orcamento) => (
                <SelectItem key={orcamento.id} value={orcamento.id}>
                  {orcamento.idCategoria
                    ? obterNomeOrcamento(orcamento)
                    : "Geral"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center pt-3">
        {carregando ? (
          <p className="py-14 text-center text-sm text-zinc-500">
            Carregando orçamento...
          </p>
        ) : !possuiOrcamento ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-5 text-center text-sm text-zinc-600">
            Nenhum orçamento foi definido para o mês atual.
          </div>
        ) : (
          <>
            <div className="grid items-center gap-3 sm:grid-cols-[116px_minmax(0,1fr)]">
              <div className="order-2 flex justify-center sm:order-1 sm:block">
                <div className="space-y-2 text-xs text-zinc-950">
                  <div className="flex items-center gap-2">
                    <span className="size-4 rounded-sm bg-blue-950" />
                    <span>Total gasto</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-4 rounded-sm bg-blue-300" />
                    <span>Total restante</span>
                  </div>
                </div>
              </div>

              <div className="order-1 flex justify-center sm:order-2">
                <div className="relative aspect-square w-full max-w-[190px] sm:max-w-[210px] xl:max-w-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dadosGraficoVisiveis}
                        dataKey="value"
                        innerRadius="60%"
                        outerRadius="96%"
                        paddingAngle={
                          utilizado > 0 && valorRestanteGrafico > 0 ? 2 : 0
                        }
                        startAngle={0}
                        endAngle={360}
                        stroke="#ffffff"
                        strokeWidth={3}
                        isAnimationActive={false}
                      >
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-zinc-950">
                      {formatarMoedaCompacta(utilizado)}
                    </span>
                    <span className="mt-0.5 text-xs text-zinc-500">Gastos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 text-center">
              <p className="flex items-center justify-center gap-2 text-sm font-semibold text-zinc-950">
                {tendencia}
                {utilizado > 0 && <TrendingUp size={14} />}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Cálculo feito com base nas movimentações
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

BudgetUsageCard.propTypes = {
  orcamentos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      utilizado: PropTypes.number,
      limite: PropTypes.number,
      idCategoria: PropTypes.string,
    })
  ).isRequired,
  orcamentoSelecionado: PropTypes.shape({
    id: PropTypes.string,
    utilizado: PropTypes.number,
    limite: PropTypes.number,
    idCategoria: PropTypes.string,
  }),
  onOrcamentoSelecionadoChange: PropTypes.func.isRequired,
  carregando: PropTypes.bool.isRequired,
};

BudgetUsageCard.defaultProps = {
  orcamentoSelecionado: null,
};
