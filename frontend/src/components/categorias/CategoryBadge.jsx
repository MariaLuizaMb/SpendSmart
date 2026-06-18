import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  categoriaEhSistema,
  formatarTipoCategoria,
  normalizarTipoCategoria,
} from "@/components/categorias/category-utils";

export function CategoryTypeBadge({ tipo, className }) {
  const tipoNormalizado = normalizarTipoCategoria(tipo);

  return (
    <Badge
      variant="outline"
      className={cn(
        tipoNormalizado === "RECEITA"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-rose-200 bg-rose-50 text-rose-700",
        className,
      )}
    >
      {formatarTipoCategoria(tipoNormalizado)}
    </Badge>
  );
}

export function CategoryOriginBadge({ categoria, className }) {
  const ehSistema = categoriaEhSistema(categoria);

  return (
    <Badge
      variant="outline"
      className={cn(
        ehSistema
          ? "border-zinc-300 bg-zinc-100 text-zinc-700"
          : "border-sky-200 bg-sky-50 text-sky-700",
        className,
      )}
    >
      {ehSistema ? "Sistema" : "Usuário"}
    </Badge>
  );
}
