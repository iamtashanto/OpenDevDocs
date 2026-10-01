---
title: "Reusable Patterns with Tailwind CSS"
description: "Component abstraction patterns in React, resolving className conflicts with tailwind-merge and clsx, and the standard cn() utility."
category: frontend
topic: tailwindcss
type: guide
level: intermediate
tags:
  - tailwindcss
  - react
  - clsx
  - tailwind-merge
  - component-patterns
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Reusable Patterns with Tailwind CSS

In component-driven frameworks like React and Next.js, we don't abstract CSS by writing custom CSS classes with `@apply`. Instead, we abstract **React components**.

---

## 1. The Conflict Problem & `tailwind-merge`

When you pass custom `className` props to an abstracted React component, naive string concatenation causes CSS specificity collisions:

```tsx
// ❌ Naive string concatenation
function BadButton({ className, ...props }: ButtonProps) {
  // If caller passes className="bg-red-500", both "bg-blue-600" and "bg-red-500" exist.
  // Because they have identical CSS specificity, whichever class was declared later in CSS wins!
  return <button className={`bg-blue-600 text-white px-4 py-2 ${className}`} {...props} />;
}
```

---

## 2. The Standard `cn()` Helper

The industry standard solution combines `clsx` (for conditional boolean classes) and `tailwind-merge` (for resolving utility conflicts intelligently):

```bash
pnpm add clsx tailwind-merge
```

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 3. Creating Production-Grade Reusable Components

```tsx
// components/ui/button.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "inline-flex items-center justify-center font-medium rounded-lg transition-colors select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",

        // Variant styles
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
        variant === "secondary" && "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700",
        variant === "danger" && "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
        variant === "ghost" && "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",

        // Size styles
        size === "sm" && "text-xs px-2.5 py-1.5 h-8 gap-1.5",
        size === "md" && "text-sm px-4 py-2 h-10 gap-2",
        size === "lg" && "text-base px-6 py-2.5 h-12 gap-2.5",

        // User override
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

---

## Related Topics

- [Next.js App Router Integration](/docs/tailwindcss/nextjs-integration)
- [React Dynamic Styling Patterns](/docs/tailwindcss/react-integration)
- [Common Tailwind Mistakes](/docs/tailwindcss/common-mistakes)
