import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  STATUS_ORCAMENTO,
  obterLabelStatus,
} from "@/components/orcamentos/budget-utils";

const statusClasses = {
  [STATUS_ORCAMENTO.SEGURO]: "border-emerald-200 bg-emerald-50 text-emerald-700",
  [STATUS_ORCAMENTO.ATENCAO]: "border-amber-200 bg-amber-50 text-amber-700",
  [STATUS_ORCAMENTO.CRITICO]: "border-red-200 bg-red-50 text-red-700",
  [STATUS_ORCAMENTO.ULTRAPASSADO]: "border-zinc-300 bg-zinc-950 text-white",
};

export default function BudgetStatusBadge({ status, compacto = false, className }) {
  return (
    <Badge
      variant="outline"
      className={cn(statusClasses[status] || statusClasses.seguro, className)}
    >
      {obterLabelStatus(status, compacto)}
    </Badge>
  );
}
