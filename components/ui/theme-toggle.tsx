"use client";

import * as React from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "fumadocs-ui/provider/base";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
  variant?: "segmented" | "button";
}

const emptySubscribe = () => () => {};

/**
 * Accessible, 3-mode theme switcher (Light / Dark / System)
 * Safe from hydration mismatches without cascading render effects.
 */
export function ThemeToggle({ className, variant = "segmented" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const currentTheme = mounted ? (theme || "system") : "system";

  if (variant === "button") {
    // Cycle button mode
    const cycleTheme = () => {
      if (currentTheme === "light") setTheme("dark");
      else if (currentTheme === "dark") setTheme("system");
      else setTheme("light");
    };

    return (
      <button
        type="button"
        onClick={cycleTheme}
        aria-label={`Current theme: ${currentTheme}. Click to switch theme.`}
        title={`Theme: ${currentTheme}`}
        className={cn(
          "relative inline-flex items-center justify-center size-9 rounded-xl border",
          "border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80",
          "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100",
          "hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer",
          className
        )}
      >
        {currentTheme === "light" && <Sun className="size-4 text-amber-500" />}
        {currentTheme === "dark" && <Moon className="size-4 text-blue-400" />}
        {currentTheme === "system" && <Laptop className="size-4 text-zinc-400" />}
      </button>
    );
  }

  // 3-Option Segmented Pill (Light / Dark / System)
  return (
    <div
      role="radiogroup"
      aria-label="Select color theme"
      className={cn(
        "inline-flex items-center p-0.5 rounded-xl border",
        "border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md",
        className
      )}
    >
      {/* Light Option */}
      <button
        type="button"
        role="radio"
        aria-checked={currentTheme === "light"}
        onClick={() => setTheme("light")}
        title="Light theme"
        aria-label="Light theme"
        className={cn(
          "relative flex items-center justify-center size-7 rounded-lg transition-all cursor-pointer",
          currentTheme === "light"
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
        )}
      >
        <Sun className="size-3.5" />
      </button>

      {/* Dark Option */}
      <button
        type="button"
        role="radio"
        aria-checked={currentTheme === "dark"}
        onClick={() => setTheme("dark")}
        title="Dark theme"
        aria-label="Dark theme"
        className={cn(
          "relative flex items-center justify-center size-7 rounded-lg transition-all cursor-pointer",
          currentTheme === "dark"
            ? "bg-zinc-800 text-white shadow-sm"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
        )}
      >
        <Moon className="size-3.5" />
      </button>

      {/* System Option */}
      <button
        type="button"
        role="radio"
        aria-checked={currentTheme === "system"}
        onClick={() => setTheme("system")}
        title="System default theme"
        aria-label="System default theme"
        className={cn(
          "relative flex items-center justify-center size-7 rounded-lg transition-all cursor-pointer",
          currentTheme === "system"
            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
            : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
        )}
      >
        <Laptop className="size-3.5" />
      </button>
    </div>
  );
}
