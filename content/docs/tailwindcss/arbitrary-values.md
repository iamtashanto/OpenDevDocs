---
title: "Tailwind CSS Arbitrary Values & Properties"
description: "How to use square-bracket arbitrary values, arbitrary CSS properties, and custom arbitrary variants when breaking out of design constraints."
category: frontend
topic: tailwindcss
type: reference
level: intermediate
tags:
  - tailwindcss
  - arbitrary-values
  - customization
  - css-properties
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Arbitrary Values & Properties

When you need a precise one-off pixel dimension or custom CSS property that does not exist in your design tokens, Tailwind allows you to write **arbitrary values** directly in class names using square brackets `[...]`.

---

## 1. Arbitrary Values

```html
<!-- Arbitrary width -->
<div class="w-[327px]">Custom 327px width</div>

<!-- Arbitrary top coordinate -->
<div class="top-[17px]">Positioned 17px from top</div>

<!-- Arbitrary hex / rgb color -->
<div class="bg-[#1da1f2] text-[#f5f8fa]">Custom Twitter Blue</div>

<!-- Arbitrary grid template -->
<div class="grid grid-cols-[100px_minmax(900px,1fr)_100px]">...</div>
```

---

## 2. Arbitrary CSS Properties

If Tailwind does not have a built-in utility for an obscure or cutting-edge CSS property, you can write any valid CSS declaration inline:

```html
<!-- Mask image CSS property -->
<div class="[mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
  Fading Content
</div>

<!-- Custom clip path -->
<div class="[clip-path:polygon(0_0,100%_0,100%_80%,0_100%)]">
  Angled Hero Header
</div>
```

> [!NOTE]
> Use underscores `_` in place of spaces inside arbitrary values and properties (e.g. `100%_80%`).

---

## 3. Arbitrary Variants (Targeting Child Selectors)

You can write arbitrary CSS selector variants to style nested elements without writing custom CSS files:

```html
<!-- Target all direct child <p> tags -->
<div class="[&>p]:text-slate-600 [&>p]:leading-relaxed [&>p]:mb-4">
  <p>First paragraph styled automatically.</p>
  <p>Second paragraph styled automatically.</p>
</div>

<!-- Target all nested <code> elements -->
<article class="[&_code]:bg-slate-100 [&_code]:px-1 [&_code]:rounded">
  Markdown Content
</article>
```

---

## Related Topics

- [Theme Customization with @theme](/docs/tailwindcss/theme-customization)
- [States & Variants](/docs/tailwindcss/states)
- [CSS Grid](/docs/tailwindcss/grid)
