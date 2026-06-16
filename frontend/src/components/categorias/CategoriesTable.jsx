import { LoaderCircle } from "lucide-react";

import CategoryActions from "@/components/categorias/CategoryActions";
import {
  CategoryOriginBadge,
  CategoryTypeBadge,
} from "@/components/categorias/CategoryBadge";
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

function formatarQuantidadeLancamentos(quantidade) {
  const total = Number(quantidade || 0);

  if (total === 0) return "Nenhum lançamento";
  if (total === 1) return "1 lançamento associado";

  return `${total} lançamentos associados`;
}

export default function CategoriesTable({
  categorias,
  carregando,
  erro,
  haFiltrosAtivos,
  selecionados,
  todosSelecionados,
  codigosCategoria,
  onSelecionarTodas,
  onSelecionarCategoria,
  onEditar,
  onRemover,
  onVerLancamentos,
  categoriaRemovendo,
}) {
  return (
    <ScrollArea className="h-full rounded-lg border border-zinc-200">
      <div className="min-w-[980px]">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-white">
            <tr className="border-b border-zinc-200 text-xs font-medium text-zinc-950">
              <th className="w-10 px-3 py-3">
                <CheckboxTabela
                  checked={todosSelecionados}
                  onChange={onSelecionarTodas}
                  label="Selecionar todas as categorias"
                />
              </th>
              <th className="px-3 py-3">ID Categoria</th>
              <th className="px-3 py-3">Nome</th>
              <th className="px-3 py-3">Tipo</th>
              <th className="px-3 py-3">Nº de Lançamentos</th>
              <th className="px-3 py-3">Criado por</th>
              <th className="w-36 px-3 py-3 text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            {carregando && (
              <tr>
                <td colSpan={7} className="h-80 text-center text-sm text-zinc-500">
                  <LoaderCircle className="mx-auto mb-2 animate-spin" size={20} />
                  Carregando categorias...
                </td>
              </tr>
            )}

            {!carregando && erro && (
              <tr>
                <td colSpan={7} className="h-80 text-center text-sm text-red-600">
                  {erro || "Erro ao carregar categorias."}
                </td>
              </tr>
            )}

            {!carregando && !erro && categorias.length === 0 && (
              <tr>
                <td colSpan={7} className="h-80 text-center text-sm text-zinc-500">
                  {haFiltrosAtivos
                    ? "Nenhuma categoria encontrada para os filtros selecionados."
                    : "Nenhuma categoria encontrada."}
                </td>
              </tr>
            )}

            {!carregando &&
              !erro &&
              categorias.map((categoria) => {
                const estaSelecionada = selecionados.has(categoria.id);
                const codigoCategoria =
                  codigosCategoria.get(categoria.id) || "C00";

                return (
                  <tr
                    key={categoria.id}
                    className="border-b border-zinc-200 text-xs text-zinc-950 last:border-b-0 hover:bg-zinc-50"
                  >
                    <td className="px-3 py-3">
                      <CheckboxTabela
                        checked={estaSelecionada}
                        onChange={() => onSelecionarCategoria(categoria.id)}
                        label={`Selecionar categoria ${codigoCategoria}`}
                      />
                    </td>
                    <td className="px-3 py-3 font-medium">{codigoCategoria}</td>
                    <td className="px-3 py-3">
                      <span className="font-medium">{categoria.nome || "Sem nome"}</span>
                    </td>
                    <td className="px-3 py-3">
                      <CategoryTypeBadge tipo={categoria.tipo} />
                    </td>
                    <td className="px-3 py-3 text-zinc-700">
                      {formatarQuantidadeLancamentos(
                        categoria.quantidadeLancamentos,
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <CategoryOriginBadge categoria={categoria} />
                    </td>
                    <td className="px-3 py-2 text-right">
                      <CategoryActions
                        categoria={categoria}
                        removendo={categoriaRemovendo === categoria.id}
                        onEditar={onEditar}
                        onRemover={onRemover}
                        onVerLancamentos={onVerLancamentos}
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
