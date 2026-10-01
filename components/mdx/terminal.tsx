"use client";

import * as React from "react";
import { Copy, Check, Terminal as TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

export function Terminal({
  title = "terminal",
  children,
  className,
  ...props
}: TerminalProps) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    try {
      if (typeof children === "string") {
        await navigator.clipboard.writeText(children.trim());
      } else {
        const text = (document.getElementById(`terminal-${title}`)?.innerText ?? "").trim();
        await navigator.clipboard.writeText(text);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-900 text-slate-100 shadow-md",
        className
      )}
      {...props}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 dark:bg-[#0c0c0e] border-b border-slate-800 dark:border-zinc-800 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="size-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="size-2.5 rounded-full bg-emerald-500 inline-block" />
          </div>
          <div className="flex items-center gap-1.5 ml-2 text-xs font-mono text-slate-400">
            <TerminalIcon className="size-3.5 text-slate-400" aria-hidden="true" />
            <span className="font-medium">{title}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy output from ${title}`}
          title="Copy output"
          className={cn(
            "inline-flex items-center justify-center size-6 rounded",
            "text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors",
            "focus-visible:outline-none",
            copied && "text-emerald-400"
          )}
        >
          {copied ? (
            <Check className="size-3.5 text-emerald-400" aria-hidden="true" />
          ) : (
            <Copy className="size-3.5" aria-hidden="true" />
          )}
          <span className="sr-only" aria-live="polite">
            {copied ? `Copied ${title} output to clipboard` : ""}
          </span>
        </button>
      </div>

      {/* Terminal Content */}
      <div
        id={`terminal-${title}`}
        tabIndex={0}
        role="region"
        aria-label={`${title} terminal output`}
        className="p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed [&>pre]:my-0 [&>pre]:bg-transparent [&>pre]:p-0 focus-visible:outline-none rounded-b-xl"
      >
        {children}
      </div>
    </div>
  );
}
