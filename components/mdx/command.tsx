"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  prompt?: string;
}

export function Command({
  children,
  prompt = "$",
  className,
  ...props
}: CommandProps) {
  const [copied, setCopied] = React.useState(false);

  const commandText = React.useMemo(() => {
    if (typeof children === "string") return children.trim();
    return String(children).trim();
  }, [children]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(commandText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={cn(
        "group relative my-4 flex items-center justify-between gap-3 p-3 sm:px-4 rounded-xl border",
        "border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#0c0c0e] text-slate-900 dark:text-zinc-100 shadow-sm",
        className
      )}
      {...props}
    >
      <div
        tabIndex={0}
        role="region"
        aria-label="Command snippet"
        className="flex items-center gap-2.5 min-w-0 font-mono text-xs sm:text-sm overflow-x-auto select-all focus-visible:outline-none rounded"
      >
        <span className="text-slate-400 dark:text-zinc-500 select-none font-bold shrink-0">
          {prompt}
        </span>
        <code className="text-slate-900 dark:text-zinc-100 font-medium">{children}</code>
      </div>

      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy command to clipboard"
        title="Copy command"
        className={cn(
          "inline-flex items-center justify-center size-7 rounded-md shrink-0",
          "border border-slate-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors",
          "focus-visible:outline-none",
          copied && "text-emerald-600 dark:text-emerald-400 border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40"
        )}
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
        <span className="sr-only" aria-live="polite">
          {copied ? "Copied command to clipboard" : ""}
        </span>
      </button>
    </div>
  );
}
