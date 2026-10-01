---
title: "Tailwind CSS Colors"
description: "The modern curated color palette, OKLCH color spaces, background/text/border color utilities, and opacity slash modifiers."
category: frontend
topic: tailwindcss
type: reference
level: beginner
tags:
  - tailwindcss
  - colors
  - palette
  - oklch
  - opacity
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Colors

Tailwind features a curated, professionally designed color system spanning 22 color families with 11 shade steps (from `50` to `950`).

---

## 1. Color Palette Families

- **Neutrals**: `slate`, `gray`, `zinc`, `neutral`, `stone`
- **Primary / Brand**: `blue`, `indigo`, `violet`, `purple`, `sky`, `cyan`
- **Feedback & Accent**:
  - Success: `emerald`, `green`, `teal`
  - Warning: `amber`, `yellow`, `orange`
  - Danger: `red`, `rose`

---

## 2. Applying Colors

```html
<!-- Background color -->
<div class="bg-blue-600">Primary button background</div>
<div class="bg-slate-50 dark:bg-slate-900">Adaptive card background</div>

<!-- Text color -->
<p class="text-slate-900 dark:text-slate-100">High contrast primary text</p>
<p class="text-slate-500 dark:text-slate-400">Secondary muted text</p>
<span class="text-emerald-600">Success text</span>

<!-- Border color -->
<div class="border border-slate-200 dark:border-slate-800">Card border</div>
```

---

## 3. Opacity Slash Modifiers (`/alpha`)

You can adjust the opacity of any color by appending `/` followed by an opacity percentage:

```html
<!-- 10% opacity background (Subtle tint for badges) -->
<span class="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">
  New Feature
</span>

<!-- 80% opacity backdrop blur -->
<header class="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
  Sticky Navbar
</header>
```

---

## 4. Customizing Colors with `@theme`

In Tailwind CSS v4, define custom brand colors in your CSS stylesheet:

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-brand-50: #eff6ff;
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;
  --color-brand-900: #1e3a8a;
}
```

Now you can immediately use `bg-brand-600`, `text-brand-500`, and `border-brand-50` everywhere in your markup!

---

## Related Topics

- [Borders and Radius](/docs/tailwindcss/borders)
- [Dark Mode Architecture](/docs/tailwindcss/dark-mode)
- [Theme Customization](/docs/tailwindcss/theme-customization)
