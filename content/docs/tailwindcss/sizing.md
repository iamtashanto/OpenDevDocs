---
title: "Tailwind CSS Sizing"
description: "Width, height, min/max dimensions, square size utilities (size-*), fractions, and dynamic viewport units."
category: frontend
topic: tailwindcss
type: reference
level: beginner
tags:
  - tailwindcss
  - sizing
  - width
  - height
  - viewport
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Sizing

Tailwind provides utilities for setting widths, heights, constraints, and aspect ratios.

---

## 1. Width (`w-*`)

```html
<!-- Fixed scale -->
<div class="w-16">64px wide</div>
<div class="w-64">256px wide</div>

<!-- Percentage & Fraction Widths -->
<div class="w-1/2">50% width</div>
<div class="w-1/3">33.33% width</div>
<div class="w-full">100% width</div>

<!-- Dynamic viewport & automatic -->
<div class="w-auto">Automatic width</div>
<div class="w-screen">100vw</div>
<div class="w-fit">Fit-content</div>
```

---

## 2. Height (`h-*`)

```html
<!-- Fixed scale -->
<div class="h-10">40px tall</div>
<div class="h-64">256px tall</div>

<!-- Full & Viewport Height -->
<div class="h-full">100% parent height</div>
<div class="h-screen">100vh</div>
<div class="h-dvh">100dvh (Dynamic Viewport Height - mobile friendly)</div>
<div class="h-svh">100svh (Small Viewport Height)</div>
```

---

## 3. Equal Dimensions (`size-*`)

The `size-*` utility sets both `width` and `height` simultaneously, perfect for avatars, icons, and circular indicators:

```html
<!-- Avatar size (48px x 48px) -->
<img class="size-12 rounded-full" src="/avatar.jpg" alt="Avatar" />

<!-- Status dot (8px x 8px) -->
<span class="size-2 rounded-full bg-emerald-500 inline-block" />

<!-- Icon (20px x 20px) -->
<svg class="size-5 text-blue-500" />
```

---

## 4. Min / Max Constraints

```html
<!-- Maximum width containers -->
<div class="max-w-md mx-auto">Max 448px (Mobile dialogs)</div>
<div class="max-w-4xl mx-auto">Max 896px (Article prose)</div>
<div class="max-w-7xl mx-auto">Max 1280px (Site containers)</div>

<!-- Minimum heights -->
<div class="min-h-screen">Minimum 100vh page wrapper</div>
<div class="min-h-dvh">Minimum dynamic viewport height</div>
```

---

## Related Topics

- [Spacing System (`p-*`, `m-*`, `gap-*`)](/docs/tailwindcss/spacing)
- [Flexbox Layouts](/docs/tailwindcss/flexbox)
- [Responsive Breakpoints](/docs/tailwindcss/responsive-design)
