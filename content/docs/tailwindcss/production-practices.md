---
title: "Tailwind CSS Production Best Practices"
description: "Guidelines for production design systems, automated class sorting with Prettier, accessible contrast standards, and scalable team workflows."
category: frontend
topic: tailwindcss
type: guide
level: production
tags:
  - tailwindcss
  - production
  - prettier
  - design-systems
  - accessibility
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Production Best Practices

---

## 1. Automatic Class Sorting with Prettier

Maintain consistent, readable class ordering across your team by adding the official Prettier plugin:

```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```

Configure `.prettierrc`:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Prettier automatically sorts classes according to Tailwind's official order:
1. Box model & positioning (`absolute`, `top-0`, `z-10`)
2. Display & layout (`flex`, `items-center`, `gap-4`)
3. Sizing (`w-full`, `max-w-md`, `h-10`)
4. Spacing (`p-4`, `my-2`)
5. Typography (`font-semibold`, `text-sm`, `text-slate-900`)
6. Visual styles (`bg-white`, `border`, `rounded-xl`, `shadow-sm`)
7. Interactive variants (`hover:`, `focus:`, `dark:`)

---

## 2. Enforcing Accessibility & Contrast Standards

1. **Focus Visible**: Always pair `focus:outline-none` with accessible `focus-visible:ring-2 focus-visible:ring-blue-500` to ensure keyboard navigation works cleanly.
2. **WCAG Contrast Ratios**: In light mode, prefer high-contrast pairs (e.g., `text-slate-900` on `bg-white`, not `text-slate-400`). In dark mode, use `text-slate-100` on `bg-slate-950`.
3. **Screen Reader Utilities**: Use `sr-only` to provide descriptive labels for icon-only buttons:
   ```html
   <button class="p-2 rounded-lg">
     <svg class="size-4" aria-hidden="true" />
     <span class="sr-only">Close modal window</span>
   </button>
   ```

---

## 3. Strict Design Token Discipline

Avoid littering arbitrary values (`w-[137px]`, `text-[#ff0033]`) across production components. If a size, color, or radius is reused more than twice, promote it to your design tokens using the `@theme` block in `globals.css`:

```css
@theme {
  --color-brand-accent: #6366f1;
  --radius-card: 1rem;
}
```

---

## Related Topics

- [Performance Overview](/docs/tailwindcss/performance)
- [Theme Customization](/docs/tailwindcss/theme-customization)
- [Next.js App Router Integration](/docs/tailwindcss/nextjs-integration)
