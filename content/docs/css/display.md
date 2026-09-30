---
title: "The CSS Display Property"
description: "Understanding display modes: block, inline, inline-block, none, contents, flex, and grid."
category: frontend
topic: css
type: guide
level: beginner
tags:
  - css
  - display
  - layout
  - block
  - inline
  - web
platforms:
  - web
lastVerified: "2026-09-30"
---

# The CSS Display Property

The **`display`** property specifies the rendering box type of an element and governs how it interacts with surrounding content.

---

## 1. Comparing Core Display Values

| Value | Starts on New Line? | Respects Width & Height? | Respects Top/Bottom Margins? | Default HTML Elements |
| :--- | :--- | :--- | :--- | :--- |
| **`block`** | ✅ Yes (takes 100% width) | ✅ Yes | ✅ Yes | `<div>`, `<p>`, `<h1>`-`<h6>`, `<section>`, `<header>` |
| **`inline`** | ❌ No (flows with text) | ❌ No | ❌ No (left/right only) | `<span>`, `<a>`, `<strong>`, `<em>` |
| **`inline-block`** | ❌ No (flows with text) | ✅ Yes | ✅ Yes | `<button>`, `<input>`, `<img>` |
| **`none`** | ❌ (Removed from layout) | N/A | N/A | `<script>`, `<style>`, `<template>` |
| **`flex`** | ✅ Yes | ✅ Yes | ✅ Yes | Custom layout containers |
| **`grid`** | ✅ Yes | ✅ Yes | ✅ Yes | Custom grid containers |

---

## 2. `display: none` vs. `visibility: hidden`

- **`display: none`**: Removes the element entirely from the visual render tree and accessibility tree. It occupies **zero space** on the page.
- **`visibility: hidden`**: Hides the element visually, but the element still takes up its normal width and height in the layout flow.

---

## 3. Modern Display: `display: contents`

`display: contents` makes the container element effectively disappear from the box tree, rendering its direct children as if they were direct children of the container's parent:

```html
<div class="grid-parent" style="display: grid; grid-template-columns: 1fr 1fr;">
  <div class="wrapper" style="display: contents;">
    <div class="child-1">Item 1</div>
    <div class="child-2">Item 2</div>
  </div>
</div>
```

---

## Related Topics

- [The CSS Box Model](/docs/css/box-model)
- [CSS Positioning](/docs/css/positioning)
- [Flexbox Layout](/docs/css/flexbox)
- [CSS Grid Layout](/docs/css/grid)
