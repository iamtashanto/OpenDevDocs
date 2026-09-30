import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExpandableDetailsProps extends React.DetailsHTMLAttributes<HTMLDetailsElement> {
  title: string;
  children: React.ReactNode;
}

export function ExpandableDetails({
  title,
  children,
  className,
  ...props
}: ExpandableDetailsProps) {
  return (
    <details
      className={cn(
        "group my-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 transition-colors",
        className
      )}
      {...props}
    >
      <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer select-none font-medium text-sm text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl">
        <ChevronRight className="size-4 text-slate-400 group-open:rotate-90 transition-transform duration-200" />
        <span>{title}</span>
      </summary>
      <div className="px-4 pb-4 pt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
        {children}
      </div>
    </details>
  );
}
