---
title: "Tailwind CSS Grid"
description: "Master 2-dimensional layouts with CSS Grid: template columns, column spanning, row spans, auto-fit/auto-fill, and dense placement."
category: frontend
topic: tailwindcss
type: reference
level: beginner
tags:
  - tailwindcss
  - grid
  - layout
  - responsive
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Grid

CSS Grid utilities provide powerful control over 2-dimensional layouts (rows and columns simultaneously).

---

## 1. Grid Template Columns (`grid-cols-*`)

```html
<!-- Fixed equal columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="p-4 border rounded-lg">Card 1</div>
  <div class="p-4 border rounded-lg">Card 2</div>
  <div class="p-4 border rounded-lg">Card 3</div>
</div>
```

---

## 2. Column Spanning (`col-span-*`)

```html
<div class="grid grid-cols-3 gap-4">
  <!-- Spans 2 columns -->
  <div class="col-span-2 p-4 bg-slate-100 rounded-lg">Main Article (2 cols)</div>
  <!-- Spans 1 column -->
  <div class="col-span-1 p-4 bg-slate-100 rounded-lg">Sidebar (1 col)</div>
</div>
```

---

## 3. Responsive 12-Column Dashboard Layout

```html
<div class="grid grid-cols-12 gap-6">
  <!-- Metric cards spanning 4 columns each (3 per row) -->
  <div class="col-span-12 sm:col-span-6 lg:col-span-4 p-5 border rounded-xl">Metric 1</div>
  <div class="col-span-12 sm:col-span-6 lg:col-span-4 p-5 border rounded-xl">Metric 2</div>
  <div class="col-span-12 sm:col-span-12 lg:col-span-4 p-5 border rounded-xl">Metric 3</div>

  <!-- Main Chart spanning 8 columns, Side Table spanning 4 columns -->
  <div class="col-span-12 lg:col-span-8 p-6 border rounded-xl">Main Chart</div>
  <div class="col-span-12 lg:col-span-4 p-6 border rounded-xl">Recent Activity</div>
</div>
```

---

## 4. Subgrid & Arbitrary Column Templates

Tailwind supports arbitrary grid tracks and native CSS Subgrid:

```html
<!-- Custom fractional tracks -->
<div class="grid grid-cols-[200px_1fr_300px] gap-4">
  <div>Sidebar (200px)</div>
  <div>Content (Flexible)</div>
  <div>Inspector (300px)</div>
</div>
```

---

## Related Topics

- [Flexbox Layouts](/docs/tailwindcss/flexbox)
- [Responsive Breakpoints](/docs/tailwindcss/responsive-design)
- [Spacing System](/docs/tailwindcss/spacing)
