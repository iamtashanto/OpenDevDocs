"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "fumadocs-ui/provider/base";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "default";
}

const emptySubscribe = () => () => {};

/**
 * Accessible theme switcher button (Light / Dark).
 * Safe from hydration mismatches without cascading render effects.
 */
export function ThemeToggle({ className, size = "default" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted ? (resolvedTheme === "dark" || theme === "dark") : false;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg border",
        "border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80",
        "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100",
        "hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950",
        size === "sm" ? "h-8 w-8" : "h-9 w-9",
        className
      )}
    >
      <Sun
        className={cn(
          "size-4 transition-all duration-200",
          mounted && isDark ? "scale-0 rotate-90 hidden" : "scale-100 rotate-0 block"
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "size-4 transition-all duration-200",
          mounted && isDark ? "scale-100 rotate-0 block" : "scale-0 -rotate-90 hidden"
        )}
        aria-hidden="true"
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
