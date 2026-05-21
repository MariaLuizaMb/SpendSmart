import { AlertTriangle, Info } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function AlertTooltip({
  mensagem,
  variant = "warning",
  className,
}) {
  if (!mensagem) return null;

  const Icon = variant === "info" ? Info : AlertTriangle;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex size-6 items-center justify-center rounded-full text-amber-600 transition-colors hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
            variant === "info" && "text-zinc-500 hover:bg-zinc-100",
            className,
          )}
          aria-label={mensagem}
        >
          <Icon size={15} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={6}>
        {mensagem}
      </TooltipContent>
    </Tooltip>
  );
}
