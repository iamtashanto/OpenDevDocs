---
title: "Tailwind CSS Flexbox"
description: "Build 1-dimensional responsive layouts with Flexbox: direction, alignment, justification, wrapping, grow/shrink, and gaps."
category: frontend
topic: tailwindcss
type: reference
level: beginner
tags:
  - tailwindcss
  - flexbox
  - layout
  - alignment
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Flexbox

Flexbox utilities provide control over 1-dimensional layouts (rows or columns).

---

## 1. Establishing a Flex Container

```html
<div class="flex">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## 2. Flex Direction (`flex-*`)

```html
<!-- Row (Default, Left to Right) -->
<div class="flex flex-row">...</div>

<!-- Row Reverse (Right to Left) -->
<div class="flex flex-row-reverse">...</div>

<!-- Column (Top to Bottom) -->
<div class="flex flex-col">...</div>

<!-- Column Reverse (Bottom to Top) -->
<div class="flex flex-col-reverse">...</div>
```

---

## 3. Alignment & Justification

### Justify Content (Main Axis)

```html
<div class="flex justify-start">Left aligned</div>
<div class="flex justify-center">Centered</div>
<div class="flex justify-end">Right aligned</div>
<div class="flex justify-between">Spaced evenly to edges (Navbar pattern)</div>
```

### Align Items (Cross Axis)

```html
<div class="flex items-center">Vertically centered</div>
<div class="flex items-start">Top aligned</div>
<div class="flex items-end">Bottom aligned</div>
<div class="flex items-stretch">Stretched to match tallest child (Default)</div>
```

---

## 4. Common Flex Patterns

### Navbar Pattern (Logo Left, Links Right)
```html
<nav class="flex items-center justify-between px-6 py-4 border-b">
  <div class="font-bold">Logo</div>
  <div class="flex items-center gap-4">
    <a href="/docs">Docs</a>
    <a href="/login">Login</a>
  </div>
</nav>
```

### Perfect Centering Pattern
```html
<div class="flex items-center justify-center min-h-[300px] border border-dashed rounded-xl">
  <p>Centered in both dimensions</p>
</div>
```

### Grow & Shrink
```html
<div class="flex items-center gap-3">
  <!-- Input expands to fill all remaining space -->
  <input class="flex-1 px-3 py-2 border rounded-lg" placeholder="Search..." />
  <!-- Button remains fixed at natural width -->
  <button class="shrink-0 px-4 py-2 bg-blue-600 text-white rounded-lg">Search</button>
</div>
```

---

## Related Topics

- [CSS Grid Layouts](/docs/tailwindcss/grid)
- [Spacing & Gap System](/docs/tailwindcss/spacing)
- [Responsive Design Breakpoints](/docs/tailwindcss/responsive-design)
