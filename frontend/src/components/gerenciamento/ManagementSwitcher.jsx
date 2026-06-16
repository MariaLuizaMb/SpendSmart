import { FolderKanban } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const VISAO_CATEGORIAS = "categorias";
export const VISAO_ORCAMENTOS = "orcamentos";

export default function ManagementSwitcher({ value, onValueChange }) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-10 w-full rounded-xl bg-white shadow-sm sm:w-[220px]">
        <FolderKanban size={16} />
        <SelectValue placeholder="Categorias" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value={VISAO_CATEGORIAS}>Categorias</SelectItem>
        <SelectItem value={VISAO_ORCAMENTOS}>Orçamentos</SelectItem>
      </SelectContent>
    </Select>
  );
}
