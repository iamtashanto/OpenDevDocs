---
title: "Tailwind CSS Spacing"
description: "Master padding, margin, gap, and space-between utilities based on the numeric 4px harmonic spacing scale."
category: frontend
topic: tailwindcss
type: reference
level: beginner
tags:
  - tailwindcss
  - spacing
  - padding
  - margin
  - gap
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Spacing

Tailwind uses a predictable numeric scale where `1 unit = 0.25rem (4px)`.

---

## 1. The Spacing Scale

| Utility | REM | Pixels | Example Use Case |
| :--- | :--- | :--- | :--- |
| `0` | `0rem` | `0px` | Resetting margin / padding |
| `1` | `0.25rem` | `4px` | Fine badge padding, tight gaps |
| `2` | `0.5rem` | `8px` | Small button padding, icon gaps |
| `3` | `0.75rem` | `12px` | Standard button vertical padding |
| `4` | `1rem` | `16px` | Standard component padding |
| `6` | `1.5rem` | `24px` | Card padding, grid gap |
| `8` | `2rem` | `32px` | Modal padding, section spacing |
| `12` | `3rem` | `48px` | Section margins, hero padding |
| `16` | `4rem` | `64px` | Page container padding |
| `24` | `6rem` | `96px` | Hero section top/bottom padding |

---

## 2. Padding (`p-*`)

Controls the inner spacing of an element:

```html
<!-- All sides -->
<div class="p-4">16px all sides</div>

<!-- Horizontal (Left + Right) & Vertical (Top + Bottom) -->
<div class="px-6 py-3">24px X, 12px Y</div>

<!-- Single sides -->
<div class="pt-4 pr-6 pb-8 pl-2">Individual sides</div>
```

---

## 3. Margin (`m-*`)

Controls outer spacing around an element:

```html
<!-- Outer margin -->
<div class="m-4">16px margin</div>
<div class="mx-auto">Horizontal centering</div>
<div class="my-8">32px top and bottom</div>

<!-- Negative margins -->
<div class="-mt-4">Pull element up by 16px</div>
```

---

## 4. Gap (`gap-*`)

Applies spacing between children inside Flexbox and CSS Grid layouts without affecting outer boundaries:

```html
<!-- Flexbox with 16px gap between items -->
<div class="flex items-center gap-4">
  <button class="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
  <button class="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>
</div>

<!-- Grid with 24px column gap and 32px row gap -->
<div class="grid grid-cols-3 gap-x-6 gap-y-8">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

---

## Related Topics

- [Sizing Dimensions (`w-*`, `h-*`)](/docs/tailwindcss/sizing)
- [Flexbox Layouts](/docs/tailwindcss/flexbox)
- [CSS Grid Layouts](/docs/tailwindcss/grid)
