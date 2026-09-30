import * as React from "react";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

export interface KeyboardShortcutProps {
  keys?: string[];
  children?: React.ReactNode;
  className?: string;
}

export function KeyboardShortcut({
  keys,
  children,
  className,
}: KeyboardShortcutProps) {
  if (keys && keys.length > 0) {
    return (
      <span className={cn("inline-flex items-center gap-1 mx-1 select-none", className)}>
        {keys.map((k, index) => (
          <React.Fragment key={k}>
            <Kbd>{k}</Kbd>
            {index < keys.length - 1 && (
              <span className="text-[10px] text-slate-400 font-bold">+</span>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  }

  if (typeof children === "string" && children.includes("+")) {
    const parts = children.split("+").map((s) => s.trim());
    return (
      <span className={cn("inline-flex items-center gap-1 mx-1 select-none", className)}>
        {parts.map((p, index) => (
          <React.Fragment key={p}>
            <Kbd>{p}</Kbd>
            {index < parts.length - 1 && (
              <span className="text-[10px] text-slate-400 font-bold">+</span>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center mx-1 select-none", className)}>
      <Kbd>{children}</Kbd>
    </span>
  );
}
