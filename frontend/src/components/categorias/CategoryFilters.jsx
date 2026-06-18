import { Search } from "lucide-react";
import PropTypes from "prop-types";

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

export const FILTRO_USO_TODAS = "todas";
export const FILTRO_USO_COM_LANCAMENTOS = "com-lancamentos";
export const FILTRO_USO_SEM_LANCAMENTOS = "sem-lancamentos";
export const FILTRO_USO_RECENTE = "recente";
export const FILTRO_USO_NAO_RECENTE = "nao-recente";

export default function CategoryFilters({
  busca,
  origem,
  uso,
  onBuscaChange,
  onOrigemChange,
  onUsoChange,
}) {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(220px,1fr)_max-content_max-content] xl:items-center">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />

        <Input
          value={busca}
          onChange={(event) => onBuscaChange(event.target.value)}
          placeholder="Pesquisar categoria"
          className="pl-9"
        />
      </div>

      <Select value={origem} onValueChange={onOrigemChange}>
        <SelectTrigger className="w-fit min-w-max">
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

      <Select value={uso} onValueChange={onUsoChange}>
        <SelectTrigger className="w-fit min-w-max">
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

CategoryFilters.propTypes = {
  busca: PropTypes.string.isRequired,
  origem: PropTypes.string.isRequired,
  uso: PropTypes.string.isRequired,
  onBuscaChange: PropTypes.func.isRequired,
  onOrigemChange: PropTypes.func.isRequired,
  onUsoChange: PropTypes.func.isRequired,
};
