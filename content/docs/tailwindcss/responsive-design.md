---
title: "Tailwind CSS Responsive Design"
description: "Mobile-first responsive architecture: standard breakpoints (sm, md, lg, xl, 2xl), hiding/showing elements, and container queries."
category: frontend
topic: tailwindcss
type: guide
level: beginner
tags:
  - tailwindcss
  - responsive
  - mobile-first
  - breakpoints
  - media-queries
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Responsive Design

Tailwind uses a strict **mobile-first** breakpoint system. Unprefixed utilities apply to all screen sizes, while breakpoint-prefixed utilities apply at that breakpoint and above.

---

## 1. Default Breakpoint Scale

| Prefix | Min Width | Target Devices |
| :--- | :--- | :--- |
| *(default)* | `0px` | Mobile phones (Portrait) |
| **`sm:`** | `640px` | Large phones, small tablets |
| **`md:`** | `768px` | Tablets, iPad |
| **`lg:`** | `1024px` | Laptops, small desktops |
| **`xl:`** | `1280px` | Standard desktop monitors |
| **`2xl:`** | `1536px` | Large wide monitors |

---

## 2. The Mobile-First Mental Model

Always style for mobile devices first, then layer on overrides for larger screens:

```html
<!-- INCORRECT (Desktop first thinking):
     Trying to use 'sm' to target mobile -->
<div class="flex sm:block">...</div>

<!-- CORRECT (Mobile-first):
     Block on mobile, flex on desktop (md and above) -->
<div class="block md:flex">...</div>
```

---

## 3. Practical Responsive Component

```html
<div class="w-full p-4 md:p-8 lg:p-12">
  <!-- Stack vertically on mobile, row on tablet+ -->
  <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div>
      <!-- Responsive font sizes -->
      <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100">
        Analytics Overview
      </h2>
      <p class="text-xs sm:text-sm text-slate-500">
        Updated 5 minutes ago
      </p>
    </div>

    <!-- Hidden on mobile, visible on desktop -->
    <div class="hidden sm:flex items-center gap-2">
      <button class="px-3 py-1.5 text-xs font-medium border rounded-lg">Export CSV</button>
      <button class="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg">Create Report</button>
    </div>
  </div>
</div>
```

---

## 4. Container Queries (`@container`)

Tailwind CSS v4 supports native CSS Container Queries, allowing components to adapt based on their parent container's width rather than the browser viewport:

```html
<!-- Declare container parent -->
<div class="@container">
  <!-- Adapts when parent container is >= 384px wide -->
  <div class="flex flex-col @sm:flex-row gap-4">
    <div class="w-full @sm:w-1/3">Sidebar</div>
    <div class="w-full @sm:w-2/3">Main</div>
  </div>
</div>
```

---

## Related Topics

- [CSS Flexbox](/docs/tailwindcss/flexbox)
- [CSS Grid](/docs/tailwindcss/grid)
- [Responsive Typography](/docs/tailwindcss/typography)
