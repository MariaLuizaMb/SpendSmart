import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  STATUS_ORCAMENTO,
  formatarPercentual,
  obterStatusOrcamento,
} from "@/components/orcamentos/budget-utils";

const indicatorClasses = {
  [STATUS_ORCAMENTO.SEGURO]: "bg-emerald-500",
  [STATUS_ORCAMENTO.ATENCAO]: "bg-amber-500",
  [STATUS_ORCAMENTO.CRITICO]: "bg-red-500",
  [STATUS_ORCAMENTO.ULTRAPASSADO]: "bg-zinc-950",
};

export default function BudgetProgressBar({ percentual, className }) {
  const status = obterStatusOrcamento(percentual);
  const valor = Math.min(Math.max(Number(percentual || 0), 0), 100);

  return (
    <div className={cn("min-w-[110px] space-y-1.5", className)}>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="font-medium text-zinc-950">{formatarPercentual(percentual)}</span>
        {percentual > 100 && <span className="text-red-600">+limite</span>}
      </div>
      <Progress value={valor} indicatorClassName={indicatorClasses[status]} />
    </div>
  );
}
