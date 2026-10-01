---
title: "Tailwind CSS Borders, Radius & Rings"
description: "Master border widths, border styles, corner radius (rounded-*), box-shadow focus rings (ring-*), and divide utilities."
category: frontend
topic: tailwindcss
type: reference
level: beginner
tags:
  - tailwindcss
  - borders
  - radius
  - rings
  - shadows
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Borders, Radius & Rings

Tailwind provides utilities for borders, rounded corners, and focus rings.

---

## 1. Border Width & Style

```html
<!-- 1px default border -->
<div class="border border-slate-200">1px border</div>

<!-- Specific widths -->
<div class="border-2 border-blue-500">2px thick border</div>
<div class="border-t-2 border-slate-300">2px top border only</div>
<div class="border-b border-slate-200">1px bottom divider</div>

<!-- Border styles -->
<div class="border-dashed border-2 border-slate-300">Dashed dropzone</div>
```

---

## 2. Corner Radius (`rounded-*`)

| Utility | Radius Value | Pixels | Common Use Case |
| :--- | :--- | :--- | :--- |
| `rounded-none` | `0px` | `0px` | Squared containers |
| `rounded-sm` | `0.125rem` | `2px` | Subtle tags |
| `rounded-md` | `0.375rem` | `6px` | Standard inputs, tags |
| `rounded-lg` | `0.5rem` | `8px` | Buttons, dropdown menus |
| `rounded-xl` | `0.75rem` | `12px` | Cards, dialogue containers |
| `rounded-2xl` | `1rem` | `16px` | Hero panels, large modals |
| `rounded-full` | `9999px` | Pill / Circle | Avatars, status indicators, badges |

```html
<!-- Fully rounded pill badge -->
<span class="rounded-full px-3 py-1 bg-blue-100 text-blue-800 text-xs">
  Active
</span>
```

---

## 3. Focus Rings (`ring-*`)

Focus rings use CSS `box-shadow` to create accessible, pixel-perfect focus outlines that follow corner radius without causing layout reflow:

```html
<button class="px-4 py-2 bg-blue-600 text-white rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950">
  Accessible Button
</button>
```

- **`ring-2`**: Sets a 2px outer outline.
- **`ring-blue-500`**: Sets the ring color.
- **`ring-offset-2`**: Creates a 2px gap between the element border and the ring for maximum contrast.

---

## 4. Divide Utilities (`divide-*`)

Applies borders between child elements in a list without needing custom `:not(:last-child)` rules:

```html
<ul class="divide-y divide-slate-200 dark:divide-slate-800">
  <li class="py-3">Item 1</li>
  <li class="py-3">Item 2</li>
  <li class="py-3">Item 3</li>
</ul>
```

---

## Related Topics

- [Colors & Opacity](/docs/tailwindcss/colors)
- [Interactive States (hover, focus-visible)](/docs/tailwindcss/states)
- [Flexbox Layouts](/docs/tailwindcss/flexbox)
