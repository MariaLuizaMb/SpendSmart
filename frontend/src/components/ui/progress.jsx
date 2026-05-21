import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Progress({ className, value, indicatorClassName, ...props }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-zinc-100",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full w-full flex-1 rounded-full bg-zinc-950 transition-all",
          indicatorClassName,
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
