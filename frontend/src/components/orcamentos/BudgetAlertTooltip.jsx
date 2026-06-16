import { Info, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function BudgetAlertTooltip({
  mensagem,
  alerta = false,
  className,
}) {
  if (!mensagem) return null;

  const Icon = alerta ? TriangleAlert : Info;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className={cn(
            "size-7 rounded-full text-zinc-500 hover:bg-zinc-100",
            alerta && "text-amber-600 hover:bg-amber-50",
            className,
          )}
          aria-label="Ver explicação do alerta"
        >
          <Icon size={15} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={6} className="max-w-64 text-xs">
        {mensagem}
      </TooltipContent>
    </Tooltip>
  );
}
