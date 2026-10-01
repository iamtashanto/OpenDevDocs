"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { cn } from "@/lib/utils";
import { Kbd } from "@/components/ui/kbd";

export interface SearchButtonProps {
  className?: string;
  variant?: "full" | "icon";
}

const emptySubscribe = () => () => {};

/**
 * Interactive search trigger button for header and hero.
 * Opens the unified full-text documentation search modal.
 */
export function SearchButton({ className, variant = "full" }: SearchButtonProps) {
  const { setOpenSearch } = useSearchContext();
  const isMac = React.useSyncExternalStore(
    emptySubscribe,
    () => /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),
    () => true
  );

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => setOpenSearch(true)}
        aria-label="Search documentation (⌘K)"
        title="Search documentation"
        className={cn(
          "inline-flex items-center justify-center size-9 rounded-lg border",
          "border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80",
          "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100",
          "hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950",
          className
        )}
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="sr-only">Search</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      aria-label="Search documentation (Press ⌘K or Ctrl+K)"
      className={cn(
        "group relative flex items-center justify-between w-full h-9 px-3 text-xs rounded-lg border",
        "border-slate-200 dark:border-slate-800/90 bg-slate-50/80 dark:bg-slate-900/80",
        "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200",
        "hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800/90",
        "transition-all shadow-sm select-none cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950",
        className
      )}
    >
      <span className="flex items-center gap-2 font-normal">
        <Search className="size-3.5 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors" aria-hidden="true" />
        <span>Search docs, commands, errors…</span>
      </span>
      <span className="flex items-center gap-0.5 ml-2">
        <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
        <Kbd>K</Kbd>
      </span>
    </button>
  );
}
