import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FILTRO_STATUS_TODOS = "todos";
export const FILTRO_TIPO_TODOS = "todos";
export const FILTRO_MOVIMENTACAO_TODOS = "todos";
export const FILTRO_PERIODO_MES_ATUAL = "mes-atual";
export const FILTRO_PERIODO_MES_ANTERIOR = "mes-anterior";
export const FILTRO_PERIODO_ULTIMOS_3_MESES = "ultimos-3-meses";
export const FILTRO_PERIODO_TODOS = "todos";

export default function BudgetFilters({
  busca,
  status,
  tipo,
  movimentacao,
  periodo,
  onBuscaChange,
  onStatusChange,
  onTipoChange,
  onMovimentacaoChange,
  onPeriodoChange,
}) {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(220px,1fr)_150px_150px_180px_170px] xl:items-center">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
        <Input
          value={busca}
          onChange={(event) => onBuscaChange(event.target.value)}
          placeholder="Pesquisar orçamento"
          className="h-10 rounded-lg pl-9"
        />
      </div>

      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value={FILTRO_STATUS_TODOS}>Todos</SelectItem>
          <SelectItem value="seguro">Seguro</SelectItem>
          <SelectItem value="atencao">Atenção</SelectItem>
          <SelectItem value="critico">Crítico</SelectItem>
          <SelectItem value="ultrapassado">Ultrapassado</SelectItem>
        </SelectContent>
      </Select>

      <Select value={tipo} onValueChange={onTipoChange}>
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value={FILTRO_TIPO_TODOS}>Todos</SelectItem>
          <SelectItem value="GERAL">Geral</SelectItem>
          <SelectItem value="CATEGORIA">Categoria</SelectItem>
        </SelectContent>
      </Select>

      <Select value={movimentacao} onValueChange={onMovimentacaoChange}>
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder="Movimentação" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value={FILTRO_MOVIMENTACAO_TODOS}>Todos</SelectItem>
          <SelectItem value="com">Com movimentação</SelectItem>
          <SelectItem value="sem">Sem movimentação</SelectItem>
        </SelectContent>
      </Select>

      <Select value={periodo} onValueChange={onPeriodoChange}>
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value={FILTRO_PERIODO_MES_ATUAL}>Mês atual</SelectItem>
          <SelectItem value={FILTRO_PERIODO_MES_ANTERIOR}>Mês anterior</SelectItem>
          <SelectItem value={FILTRO_PERIODO_ULTIMOS_3_MESES}>
            Últimos 3 meses
          </SelectItem>
          <SelectItem value={FILTRO_PERIODO_TODOS}>Todos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
