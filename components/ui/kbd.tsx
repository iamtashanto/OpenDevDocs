import * as React from "react";
import { cn } from "@/lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Kbd({ children, className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center font-mono text-[11px] font-semibold",
        "px-1.5 py-0.5 min-w-[20px] h-5 rounded border shadow-sm select-none",
        "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300",
        "border-slate-200 dark:border-slate-700/80",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
