import * as React from "react";
import { Info, Lightbulb, AlertTriangle, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalloutType = "note" | "info" | "tip" | "warning" | "danger" | "error";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

interface CalloutStyle {
  container: string;
  icon: React.ReactNode;
  defaultTitle: string;
  titleColor: string;
}

const calloutConfig: Record<CalloutType, CalloutStyle> = {
  note: {
    container:
      "bg-blue-50/60 dark:bg-blue-950/20 border-blue-200/80 dark:border-blue-900/60 text-slate-800 dark:text-slate-200",
    icon: <Info className="size-4.5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />,
    defaultTitle: "Note",
    titleColor: "text-blue-900 dark:text-blue-300",
  },
  info: {
    container:
      "bg-cyan-50/60 dark:bg-cyan-950/20 border-cyan-200/80 dark:border-cyan-900/60 text-slate-800 dark:text-slate-200",
    icon: <Info className="size-4.5 text-cyan-600 dark:text-cyan-400 shrink-0" aria-hidden="true" />,
    defaultTitle: "Info",
    titleColor: "text-cyan-900 dark:text-cyan-300",
  },
  tip: {
    container:
      "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/60 text-slate-800 dark:text-slate-200",
    icon: <Lightbulb className="size-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />,
    defaultTitle: "Tip",
    titleColor: "text-emerald-900 dark:text-emerald-300",
  },
  warning: {
    container:
      "bg-amber-50/60 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/60 text-slate-800 dark:text-slate-200",
    icon: <AlertTriangle className="size-4.5 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />,
    defaultTitle: "Warning",
    titleColor: "text-amber-900 dark:text-amber-300",
  },
  danger: {
    container:
      "bg-rose-50/60 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/60 text-slate-800 dark:text-slate-200",
    icon: <AlertOctagon className="size-4.5 text-rose-600 dark:text-rose-400 shrink-0" aria-hidden="true" />,
    defaultTitle: "Danger",
    titleColor: "text-rose-900 dark:text-rose-300",
  },
  error: {
    container:
      "bg-rose-50/60 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/60 text-slate-800 dark:text-slate-200",
    icon: <AlertOctagon className="size-4.5 text-rose-600 dark:text-rose-400 shrink-0" aria-hidden="true" />,
    defaultTitle: "Error",
    titleColor: "text-rose-900 dark:text-rose-300",
  },
};

export function Callout({
  type = "note",
  title,
  children,
  className,
  ...props
}: CalloutProps) {
  const config = calloutConfig[type] || calloutConfig.note;
  const displayTitle = title ?? (title === "" ? undefined : config.defaultTitle);

  return (
    <aside
      role="note"
      className={cn(
        "my-5 flex gap-3.5 p-4 rounded-xl border text-sm leading-relaxed",
        config.container,
        className
      )}
      {...props}
    >
      <div className="mt-0.5">{config.icon}</div>
      <div className="flex-1 space-y-1 overflow-hidden">
        {displayTitle && (
          <p className={cn("font-semibold leading-none mb-1 text-sm", config.titleColor)}>
            {displayTitle}
          </p>
        )}
        <div className="text-slate-700 dark:text-slate-300 [&>p:last-child]:mb-0 [&>p]:mb-2 leading-relaxed">
          {children}
        </div>
      </div>
    </aside>
  );
}
