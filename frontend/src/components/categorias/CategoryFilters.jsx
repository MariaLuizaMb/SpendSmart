import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FILTRO_ORIGEM_TODAS = "todas";
export const FILTRO_ORIGEM_USUARIO = "usuario";
export const FILTRO_ORIGEM_SISTEMA = "sistema";

export const FILTRO_TIPO_TODAS = "todas";
export const FILTRO_TIPO_RECEITA = "RECEITA";
export const FILTRO_TIPO_DESPESA = "DESPESA";

export const FILTRO_USO_TODAS = "todas";
export const FILTRO_USO_COM_LANCAMENTOS = "com-lancamentos";
export const FILTRO_USO_SEM_LANCAMENTOS = "sem-lancamentos";
export const FILTRO_USO_RECENTE = "recente";
export const FILTRO_USO_NAO_RECENTE = "nao-recente";

export default function CategoryFilters({
  busca,
  origem,
  tipo,
  uso,
  onBuscaChange,
  onOrigemChange,
  onTipoChange,
  onUsoChange,
}) {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(220px,1fr)_170px_150px_190px] xl:items-center">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />

        <Input
          value={busca}
          onChange={(event) => onBuscaChange(event.target.value)}
          placeholder="Pesquisar categoria"
          className="h-10 rounded-lg pl-9"
        />
      </div>

      <Select value={origem} onValueChange={onOrigemChange}>
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder="Origem" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value={FILTRO_ORIGEM_TODAS}>Todas</SelectItem>
          <SelectItem value={FILTRO_ORIGEM_USUARIO}>
            Criadas por mim
          </SelectItem>
          <SelectItem value={FILTRO_ORIGEM_SISTEMA}>Sistema</SelectItem>
        </SelectContent>
      </Select>

      <Select value={tipo} onValueChange={onTipoChange}>
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value={FILTRO_TIPO_TODAS}>Todas</SelectItem>
          <SelectItem value={FILTRO_TIPO_RECEITA}>Receita</SelectItem>
          <SelectItem value={FILTRO_TIPO_DESPESA}>Despesa</SelectItem>
        </SelectContent>
      </Select>

      <Select value={uso} onValueChange={onUsoChange}>
        <SelectTrigger className="h-10 w-full">
          <SelectValue placeholder="Uso" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value={FILTRO_USO_TODAS}>Todas</SelectItem>
          <SelectItem value={FILTRO_USO_COM_LANCAMENTOS}>
            Com lançamentos
          </SelectItem>
          <SelectItem value={FILTRO_USO_SEM_LANCAMENTOS}>
            Sem lançamentos
          </SelectItem>
          <SelectItem value={FILTRO_USO_RECENTE}>
            Usadas recentemente
          </SelectItem>
          <SelectItem value={FILTRO_USO_NAO_RECENTE}>
            Não usadas recentemente
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
