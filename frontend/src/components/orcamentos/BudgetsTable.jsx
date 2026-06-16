import { LoaderCircle } from "lucide-react";

import BudgetActions from "@/components/orcamentos/BudgetActions";
import BudgetProgressBar from "@/components/orcamentos/BudgetProgressBar";
import BudgetStatusBadge from "@/components/orcamentos/BudgetStatusBadge";
import {
  formatarMoeda,
  formatarPeriodo,
  obterNomeOrcamento,
  obterTipoOrcamento,
} from "@/components/orcamentos/budget-utils";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

function CheckboxTabela({ checked, onChange, label }) {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={onChange}
      aria-label={label}
      className="border-zinc-300 data-checked:border-zinc-950 data-checked:bg-zinc-950 data-checked:text-white"
    />
  );
}

export default function BudgetsTable({
  orcamentos,
  carregando,
  erro,
  haFiltrosAtivos,
  selecionados,
  todosSelecionados,
  onSelecionarTodos,
  onSelecionarOrcamento,
  onVerDetalhes,
  onEditar,
  onRemover,
  orcamentoRemovendo,
}) {
  return (
    <ScrollArea className="h-full rounded-lg border border-zinc-200">
      <div className="min-w-[1120px]">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="border-b border-zinc-200 text-xs font-medium text-zinc-950">
              <th className="w-10 px-3 py-3">
                <CheckboxTabela
                  checked={todosSelecionados}
                  onChange={onSelecionarTodos}
                  label="Selecionar todos os orçamentos"
                />
              </th>
              <th className="px-3 py-3">Nome/Categoria</th>
              <th className="px-3 py-3">Tipo</th>
              <th className="px-3 py-3">Período</th>
              <th className="px-3 py-3">Limite</th>
              <th className="px-3 py-3">Utilizado</th>
              <th className="px-3 py-3">Restante</th>
              <th className="px-3 py-3">Uso</th>
              <th className="px-3 py-3">Status</th>
              <th className="w-36 px-3 py-3 text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            {carregando && (
              <tr>
                <td colSpan={10} className="h-80 text-center text-sm text-zinc-500">
                  <LoaderCircle className="mx-auto mb-2 animate-spin" size={20} />
                  Carregando orçamentos...
                </td>
              </tr>
            )}

            {!carregando && erro && (
              <tr>
                <td colSpan={10} className="h-80 text-center text-sm text-red-600">
                  {erro || "Erro ao carregar orçamentos."}
                </td>
              </tr>
            )}

            {!carregando && !erro && orcamentos.length === 0 && (
              <tr>
                <td colSpan={10} className="h-80 text-center text-sm text-zinc-500">
                  {haFiltrosAtivos
                    ? "Nenhum orçamento encontrado para os filtros selecionados."
                    : "Nenhum orçamento criado."}
                </td>
              </tr>
            )}

            {!carregando &&
              !erro &&
              orcamentos.map((orcamento) => {
                const selecionado = selecionados.has(orcamento.id);

                return (
                  <tr
                    key={orcamento.id}
                    className="border-b border-zinc-200 text-xs text-zinc-950 last:border-b-0 hover:bg-zinc-50"
                  >
                    <td className="px-3 py-3">
                      <CheckboxTabela
                        checked={selecionado}
                        onChange={() => onSelecionarOrcamento(orcamento.id)}
                        label={`Selecionar orçamento ${obterNomeOrcamento(orcamento)}`}
                      />
                    </td>
                    <td className="px-3 py-3 font-medium">
                      {obterNomeOrcamento(orcamento)}
                    </td>
                    <td className="px-3 py-3">{obterTipoOrcamento(orcamento)}</td>
                    <td className="px-3 py-3">{formatarPeriodo(orcamento)}</td>
                    <td className="px-3 py-3">{formatarMoeda(orcamento.limite)}</td>
                    <td className="px-3 py-3">{formatarMoeda(orcamento.utilizado)}</td>
                    <td className="px-3 py-3">{formatarMoeda(orcamento.restante)}</td>
                    <td className="px-3 py-3">
                      <BudgetProgressBar percentual={orcamento.percentual} />
                    </td>
                    <td className="px-3 py-3">
                      <BudgetStatusBadge status={orcamento.status} compacto />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <BudgetActions
                        orcamento={orcamento}
                        removendo={orcamentoRemovendo === orcamento.id}
                        onVerDetalhes={onVerDetalhes}
                        onEditar={onEditar}
                        onRemover={onRemover}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
