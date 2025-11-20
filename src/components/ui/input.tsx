import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground border-neutral-300 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30  h-12 w-full min-w-0 rounded-xl border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-12 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-[#1C65DA] focus-visible:ring-[3px]",
        "aria-invalid:ring-[#1C65DA] dark:aria-invalid:ring-[#1C65DA] aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
