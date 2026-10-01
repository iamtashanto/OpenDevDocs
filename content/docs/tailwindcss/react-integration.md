---
title: "Tailwind CSS with React 19"
description: "Patterns for dynamic class composition, conditional styling, props-driven UI variants, and state transitions in React applications."
category: frontend
topic: tailwindcss
type: guide
level: beginner
tags:
  - tailwindcss
  - react
  - styling
  - jsx
  - props
platforms:
  - web
tested:
  react: "19.x"
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS with React 19

In React applications, styling components dynamically based on state and props is a core requirement.

---

## 1. Conditional Class Patterns

### Pattern A: Using the `cn()` Helper (Recommended)

```tsx
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "online" | "offline" | "busy";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
        status === "online" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        status === "offline" && "bg-slate-500/10 text-slate-600 border-slate-500/20",
        status === "busy" && "bg-amber-500/10 text-amber-600 border-amber-500/20"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "online" && "bg-emerald-500",
          status === "offline" && "bg-slate-400",
          status === "busy" && "bg-amber-500 animate-pulse"
        )}
      />
      <span className="capitalize">{status}</span>
    </span>
  );
}
```

---

## 2. Object Mapping Pattern for Clean Props

When dealing with many variants, dictionary object mapping keeps JSX clean and readable:

```tsx
const variantStyles = {
  default: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800",
  warning: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
  danger: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800",
};

export function Alert({ variant = "default", title, children }: AlertProps) {
  return (
    <div className={cn("p-4 rounded-xl border", variantStyles[variant])}>
      <h4 className="font-semibold text-sm mb-1">{title}</h4>
      <div className="text-xs leading-relaxed opacity-90">{children}</div>
    </div>
  );
}
```

---

## 3. Transitioning Interactive Elements

Smooth micro-animations elevate UI quality:

```tsx
export function CollapsibleCard({ isOpen, title, children }: CollapsibleProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 cursor-pointer select-none">
        <span className="font-medium text-sm">{title}</span>
        {/* Rotate chevron smoothly on state toggle */}
        <svg
          className={cn(
            "size-4 text-slate-400 transition-transform duration-200",
            isOpen && "rotate-180 text-blue-600"
          )}
        />
      </div>

      {/* Animate grid-rows or opacity */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden px-4 pb-4 text-sm text-slate-600 dark:text-slate-400">
          {children}
        </div>
      </div>
    </div>
  );
}
```

---

## Related Topics

- [React Fundamentals](/docs/react/components)
- [Reusable Patterns with `cn()`](/docs/tailwindcss/reusable-patterns)
- [Interactive States (Hover, Focus, Group)](/docs/tailwindcss/states)
