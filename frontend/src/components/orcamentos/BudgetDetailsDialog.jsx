import BudgetProgressBar from "@/components/orcamentos/BudgetProgressBar";
import BudgetStatusBadge from "@/components/orcamentos/BudgetStatusBadge";
import PropTypes from "prop-types";
import {
  calcularPrevisaoEstouro,
  calcularRitmoConsumo,
  formatarMoeda,
  formatarPeriodo,
  formatarPercentual,
  obterNomeOrcamento,
  obterTipoOrcamento,
  obterValorLancamento,
  ordenarLancamentosPorValor,
} from "@/components/orcamentos/budget-utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

function DetailItem({ label, children }) {
  return (
    <div className="rounded-xl bg-zinc-50 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <div className="mt-1 font-semibold text-zinc-950">{children}</div>
    </div>
  );
}

export default function BudgetDetailsDialog({ orcamento, aberto, onAbertoChange }) {
  const ritmo = orcamento ? calcularRitmoConsumo(orcamento) : null;
  const previsao = orcamento ? calcularPrevisaoEstouro(orcamento) : null;
  const lancamentos = ordenarLancamentosPorValor(
    orcamento?.lancamentosAssociados || [],
  ).slice(0, 5);

  return (
    <Dialog open={aberto} onOpenChange={onAbertoChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden p-0 sm:max-w-2xl">
        <div className="flex max-h-[92vh] flex-col">
          <div className="px-5 pb-3 pt-5">
            <DialogTitle className="text-xl font-bold text-zinc-950">
              Detalhes do orçamento
            </DialogTitle>
            <DialogDescription>
              Acompanhe limite, uso e movimentações associadas.
            </DialogDescription>
          </div>

          <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-5 px-5 pb-5">
              {!orcamento ? (
                <p className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-600">
                  Nenhum orçamento selecionado.
                </p>
              ) : (
                <>
                  <div className="flex flex-col gap-3 rounded-2xl bg-zinc-50 p-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-950">
                        {obterNomeOrcamento(orcamento)}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        {obterTipoOrcamento(orcamento)} · {formatarPeriodo(orcamento)}
                      </p>
                    </div>
                    <BudgetStatusBadge status={orcamento.status} />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <DetailItem label="Limite definido">
                      {formatarMoeda(orcamento.limite)}
                    </DetailItem>
                    <DetailItem label="Valor utilizado">
                      {formatarMoeda(orcamento.utilizado)}
                    </DetailItem>
                    <DetailItem label="Valor restante">
                      {formatarMoeda(orcamento.restante)}
                    </DetailItem>
                    <DetailItem label="Percentual utilizado">
                      {formatarPercentual(orcamento.percentual)}
                    </DetailItem>
                  </div>

                  <div className="rounded-xl border border-zinc-200 p-4">
                    <p className="mb-3 text-sm font-semibold text-zinc-950">
                      Uso do orçamento
                    </p>
                    <BudgetProgressBar percentual={orcamento.percentual} />
                  </div>

                  <div className="grid gap-3 lg:grid-cols-3">
                    <DetailItem label="Lançamentos associados">
                      {(orcamento.lancamentosAssociados || []).length}
                    </DetailItem>
                    <DetailItem label="Ritmo de consumo">
                      {ritmo
                        ? ritmo.consumoAcelerado
                          ? "Consumo acelerado"
                          : "Dentro do esperado"
                        : "Não há dados suficientes."}
                    </DetailItem>
                    <DetailItem label="Previsão de estouro">
                      {previsao?.mensagem ||
                        "Não há dados suficientes para calcular esta informação."}
                    </DetailItem>
                  </div>

                  <div className="rounded-xl border border-zinc-200 p-4">
                    <p className="text-sm font-semibold text-zinc-950">
                      Principais lançamentos
                    </p>
                    {lancamentos.length === 0 ? (
                      <p className="mt-3 text-sm text-zinc-500">
                        Nenhum lançamento consumiu este orçamento no período.
                      </p>
                    ) : (
                      <div className="mt-3 divide-y divide-zinc-200">
                        {lancamentos.map((lancamento) => (
                          <div
                            key={lancamento.id}
                            className="flex items-center justify-between gap-3 py-3 text-sm"
                          >
                            <div className="min-w-0">
                              <p className="truncate font-medium text-zinc-950">
                                {lancamento.descricao || "Lançamento sem descrição"}
                              </p>
                              <p className="text-xs text-zinc-500">
                                {lancamento.categoria?.nome || "Categoria"}
                              </p>
                            </div>
                            <span className="shrink-0 font-semibold text-zinc-950">
                              {formatarMoeda(obterValorLancamento(lancamento))}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl bg-zinc-50 p-4 text-sm text-zinc-600">
                    Comparação com período anterior: não há dados suficientes para
                    calcular esta informação.
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

BudgetDetailsDialog.propTypes = {
  orcamento: PropTypes.shape({
    id: PropTypes.string,
    limite: PropTypes.number,
    utilizado: PropTypes.number,
    percentual: PropTypes.number,
    lancamentosAssociados: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        descricao: PropTypes.string,
        valor: PropTypes.number,
        categoria: PropTypes.shape({
          nome: PropTypes.string,
        }),
      })
    ),
  }),
  aberto: PropTypes.bool.isRequired,
  onAbertoChange: PropTypes.func.isRequired,
};

BudgetDetailsDialog.defaultProps = {
  orcamento: null,
};
