---
title: "Tailwind CSS Overview"
description: "Introduction to Tailwind CSS v4 — the utility-first CSS framework with an ultra-fast Oxide engine, modern CSS-first configuration, and zero runtime overhead."
category: frontend
topic: tailwindcss
type: guide
level: beginner
tags:
  - tailwindcss
  - css
  - frontend
  - styling
  - design-system
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Overview

**Tailwind CSS** is a utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center`, and `rotate-90` that can be composed directly in HTML and JSX markup to build custom user interfaces without writing traditional CSS rulesets.

---

## 1. Why Tailwind CSS?

Traditional CSS workflows require inventing class names (e.g. `.card-header-inner-wrapper`), switching between markup and stylesheets, and constantly battling CSS specificity and dead code accumulation.

Tailwind CSS provides a radically productive alternative:

1. **You don't waste energy inventing class names**: No more naming fatigue or bloated BEM selectors.
2. **Your CSS stops growing**: Styling new components reuses the same atomic utility classes. The production CSS file rarely exceeds 15–20 KB.
3. **Changes feel safe**: Modifying markup changes styling locally without the risk of breaking another page across your application.
4. **Design constraints built-in**: A cohesive scale for spacing, typography, shadows, and colors keeps designs harmonious by default.

---

## 2. Tailwind CSS v4 Architecture

Tailwind CSS v4 is rebuilt from the ground up on a Rust-based engine (Oxide) with a **CSS-first configuration** model:

- **Single `@import "tailwindcss";`**: No more complex multi-directive boilerplate.
- **Native `@theme` Directive**: Customize color scales, fonts, and spacing directly inside standard CSS stylesheets without needing a JavaScript config file (`tailwind.config.js`).
- **Lightning-Fast Builds**: Up to 10x faster compile times with native support for modern CSS features like CSS variables, OKLCH colors, and container queries.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-brand-primary: #2563eb;
  --font-display: "Inter", sans-serif;
}
```

---

## 3. Core Workflow

```tsx
export function MetricCard({ title, value, change }: MetricProps) {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {value}
        </span>
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          {change}
        </span>
      </div>
    </div>
  );
}
```

---

## Related Topics

- [Tailwind CSS Installation](/docs/tailwindcss/installation)
- [Utility-First Mental Model](/docs/tailwindcss/utility-first)
- [Next.js App Router Integration](/docs/tailwindcss/nextjs-integration)
- [CSS Fundamentals Overview](/docs/css/syntax)
