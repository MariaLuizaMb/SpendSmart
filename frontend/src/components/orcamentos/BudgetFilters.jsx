import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FILTRO_MOVIMENTACAO_TODOS = "todos";
export const FILTRO_PERIODO_MES_ATUAL = "mes-atual";
export const FILTRO_PERIODO_MES_ANTERIOR = "mes-anterior";
export const FILTRO_PERIODO_ULTIMOS_3_MESES = "ultimos-3-meses";
export const FILTRO_PERIODO_TODOS = "todos";

export default function BudgetFilters({
  busca,
  movimentacao,
  periodo,
  onBuscaChange,
  onMovimentacaoChange,
  onPeriodoChange,
  onLimparFiltros,
  limparFiltrosDesabilitado,
}) {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(260px,1fr)_max-content_max-content_max-content] xl:items-center">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
        <Input
          value={busca}
          onChange={(event) => onBuscaChange(event.target.value)}
          placeholder="Pesquisar por nome, tipo, status ou período"
          className="pl-9"
        />
      </div>

      <Select value={movimentacao} onValueChange={onMovimentacaoChange}>
        <SelectTrigger className="w-fit min-w-max">
          <SelectValue placeholder="Movimentação" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value={FILTRO_MOVIMENTACAO_TODOS}>Todos</SelectItem>
          <SelectItem value="com">Com movimentação</SelectItem>
          <SelectItem value="sem">Sem movimentação</SelectItem>
        </SelectContent>
      </Select>

      <Select value={periodo} onValueChange={onPeriodoChange}>
        <SelectTrigger className="w-fit min-w-max">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value={FILTRO_PERIODO_MES_ATUAL}>Mês atual</SelectItem>
          <SelectItem value={FILTRO_PERIODO_MES_ANTERIOR}>Mês anterior</SelectItem>
          <SelectItem value={FILTRO_PERIODO_ULTIMOS_3_MESES}>
            Últimos 3 meses
          </SelectItem>
          <SelectItem value={FILTRO_PERIODO_TODOS}>Todos os meses</SelectItem>
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant="outline"
        onClick={onLimparFiltros}
        disabled={limparFiltrosDesabilitado}
        className="border-zinc-200 bg-white text-xs text-zinc-950 hover:bg-zinc-50"
      >
        Limpar filtros
      </Button>
    </div>
  );
}
