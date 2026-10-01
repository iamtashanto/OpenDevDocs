---
title: "Tailwind CSS with Next.js App Router"
description: "Production guide for styling Next.js 16 App Router applications with Tailwind CSS v4, Server Components, and zero runtime CSS overhead."
category: frontend
topic: tailwindcss
type: guide
level: intermediate
tags:
  - tailwindcss
  - nextjs
  - app-router
  - server-components
  - react
platforms:
  - web
tested:
  nextjs: "16.x"
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS with Next.js App Router

Tailwind CSS v4 works seamlessly with Next.js Server Components and Client Components because it compiles pure static CSS with **zero JavaScript runtime overhead**.

---

## 1. Zero Runtime Benefits with React Server Components (RSC)

Traditional CSS-in-JS libraries (like styled-components and Emotion) require JavaScript execution at runtime to inject style tags into the DOM, making them incompatible with React Server Components.

Tailwind CSS generates standard static CSS stylesheets at compile time. This means:
1. **100% Compatible with Server Components**: No `"use client"` directive is required just to style a component.
2. **Zero Client Bundle Size Overhead**: Your users download pure CSS without a styling runtime library.
3. **No Flash of Unstyled Content (FOUC)**: Styles are linked in the `<head>` of the server-rendered HTML response.

---

## 2. Server Component vs Client Component Styling

```tsx
// app/dashboard/page.tsx (Server Component — No "use client")
import { db } from "@/lib/db";
import { MetricCard } from "@/components/metric-card";
import { UserGreeting } from "@/components/user-greeting";

export default async function DashboardPage() {
  const stats = await db.getStats();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Styled Server Component */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Overview Dashboard
          </h1>
          {/* Client component with interactive state */}
          <UserGreeting />
        </header>

        {/* Server Component grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Active Users" value={stats.activeUsers} change="+12.4%" />
          <MetricCard title="Total Revenue" value={stats.revenue} change="+8.1%" />
        </div>
      </div>
    </main>
  );
}
```

---

## 3. Dark Mode with Next.js Theme Providers

When using `next-themes` or Fumadocs provider in Next.js:

```tsx
// components/theme-toggle.tsx ("use client")
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="size-4 hidden dark:block" />
      <Moon className="size-4 block dark:hidden" />
    </button>
  );
}
```

---

## Related Topics

- [Next.js App Router Overview](/docs/nextjs/app-router)
- [Reusable Component Helper `cn()`](/docs/tailwindcss/reusable-patterns)
- [Theme Customization with `@theme`](/docs/tailwindcss/theme-customization)
