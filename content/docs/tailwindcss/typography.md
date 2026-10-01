---
title: "Tailwind CSS Typography"
description: "Font sizes, weights, leading, tracking, text alignment, text truncation, and modern line clamp utilities."
category: frontend
topic: tailwindcss
type: reference
level: beginner
tags:
  - tailwindcss
  - typography
  - fonts
  - text
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Typography

Tailwind provides extensive typography utilities for font sizing, weights, line heights, and layout wrapping.

---

## 1. Font Size (`text-*`)

| Utility | Font Size | Line Height | Typical Usage |
| :--- | :--- | :--- | :--- |
| `text-xs` | `0.75rem (12px)` | `1rem (16px)` | Badges, footnotes, timestamps |
| `text-sm` | `0.875rem (14px)` | `1.25rem (20px)` | Secondary text, UI labels |
| `text-base` | `1rem (16px)` | `1.5rem (24px)` | Body paragraphs |
| `text-lg` | `1.125rem (18px)` | `1.75rem (28px)` | Subheadings, lead text |
| `text-xl` | `1.25rem (20px)` | `1.75rem (28px)` | Card headers, section titles |
| `text-2xl` | `1.5rem (24px)` | `2rem (32px)` | H3 headings |
| `text-3xl` | `1.875rem (30px)` | `2.25rem (36px)` | H2 headings |
| `text-4xl` | `2.25rem (36px)` | `2.5rem (40px)` | Page H1 headings |
| `text-6xl` | `3.75rem (60px)` | `1` | Hero display titles |

---

## 2. Font Weight (`font-*`)

```html
<p class="font-normal">Regular (400)</p>
<p class="font-medium">Medium (500)</p>
<p class="font-semibold">Semibold (600)</p>
<p class="font-bold">Bold (700)</p>
<p class="font-extrabold">Extra Bold (800)</p>
```

---

## 3. Line Height & Letter Spacing

```html
<!-- Line height (Leading) -->
<p class="leading-none">Tightest line-height (1.0)</p>
<p class="leading-tight">Tight line-height (1.25) - Headings</p>
<p class="leading-relaxed">Relaxed line-height (1.625) - Long-form prose</p>

<!-- Letter spacing (Tracking) -->
<h1 class="tracking-tight">Tight letter spacing (-0.025em) - Modern UI</h1>
<p class="tracking-wider uppercase text-xs">Wide tracking for uppercase labels</p>
```

---

## 4. Text Truncation & Line Clamping

```html
<!-- Single-line truncate with ellipsis -->
<p class="truncate">Very long single line text that truncates with ellipsis...</p>

<!-- Multi-line clamp (Built-in) -->
<p class="line-clamp-2">
  This article description will display a maximum of two lines before cutting off cleanly with an ellipsis.
</p>
<p class="line-clamp-3">Max 3 lines</p>
```

---

## Related Topics

- [Colors & Opacity Modifiers](/docs/tailwindcss/colors)
- [Borders and Radius](/docs/tailwindcss/borders)
- [Responsive Typography](/docs/tailwindcss/responsive-design)
