import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "brand" | "success" | "warning" | "error" | "info";
  size?: "sm" | "default";
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:
    "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700",
  secondary:
    "bg-slate-200/70 text-slate-700 border-slate-300 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700/60",
  outline:
    "bg-transparent text-slate-700 border-slate-300 dark:text-slate-300 dark:border-slate-700",
  brand:
    "bg-blue-500/10 text-blue-700 border-blue-500/25 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30",
  success:
    "bg-emerald-500/10 text-emerald-800 border-emerald-500/25 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30",
  warning:
    "bg-amber-500/10 text-amber-800 border-amber-500/25 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30",
  error:
    "bg-rose-500/10 text-rose-800 border-rose-500/25 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30",
  info:
    "bg-cyan-500/10 text-cyan-800 border-cyan-500/25 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30",
};

const sizeStyles: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-[11px]",
  default: "px-2.5 py-0.5 text-xs",
};

export function Badge({
  children,
  variant = "default",
  size = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full border tracking-tight select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
