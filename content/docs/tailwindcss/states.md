---
title: "Tailwind CSS Interactive States & Variants"
description: "Styling elements on hover, focus, active, disabled states, group-hover, peer interactions, and has-* selectors."
category: frontend
topic: tailwindcss
type: reference
level: beginner
tags:
  - tailwindcss
  - pseudo-classes
  - hover
  - focus
  - group
  - peer
platforms:
  - web
tested:
  tailwindcss: "4.x"
lastVerified: "2026-10-01"
---

# Tailwind CSS Interactive States & Variants

Tailwind provides pseudo-class modifiers for every interactive state (`hover:`, `focus:`, `active:`, `disabled:`, etc.).

---

## 1. Common Pseudo-Classes

```html
<button class="bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors
               hover:bg-blue-700
               active:bg-blue-800
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
               disabled:opacity-50 disabled:cursor-not-allowed">
  Submit Action
</button>
```

---

## 2. Parent State Targeting (`group-*`)

When you need to style a child element based on the hover or focus state of a **parent container**, mark the parent with `group` and prefix the child with `group-hover:`, `group-focus:`, etc.:

```html
<a href="/article" class="group flex items-center justify-between p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50/50 transition-all">
  <div>
    <!-- Title changes color when whole card is hovered -->
    <h3 class="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
      Deploying with Docker
    </h3>
    <p class="text-xs text-slate-500">Read in 4 minutes</p>
  </div>

  <!-- Arrow icon slides right when whole card is hovered -->
  <svg class="size-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
</a>
```

---

## 3. Sibling State Targeting (`peer-*`)

When you need to style an element based on the state of a **sibling element** (such as showing validation errors when an input is invalid), mark the trigger with `peer`:

```html
<div class="space-y-1">
  <input
    type="email"
    required
    placeholder="you@company.com"
    class="peer w-full px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:border-blue-500 invalid:border-rose-500"
  />
  <!-- Only visible when input is invalid AND focused -->
  <p class="hidden peer-invalid:block text-xs text-rose-500">
    Please enter a valid email address.
  </p>
</div>
```

---

## 4. Modern CSS `:has()` Variant (`has-*`)

Style a container based on the state or presence of its descendants:

```html
<!-- Border turns blue if ANY child checkbox or radio inside is checked -->
<label class="flex items-center gap-3 p-4 border rounded-xl cursor-pointer has-checked:border-blue-600 has-checked:bg-blue-50/30">
  <input type="checkbox" class="size-4 text-blue-600 rounded" />
  <span class="text-sm font-medium text-slate-900">Enable Two-Factor Authentication</span>
</label>
```

---

## Related Topics

- [Borders & Focus Rings](/docs/tailwindcss/borders)
- [Dark Mode Variant](/docs/tailwindcss/dark-mode)
- [Arbitrary Variants](/docs/tailwindcss/arbitrary-values)
