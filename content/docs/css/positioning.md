---
title: "CSS Positioning (static, relative, absolute, fixed, sticky)"
description: "Mastering CSS position values: normal document flow, containing blocks, z-index stacking contexts, and sticky navigation bars."
category: frontend
topic: css
type: guide
level: beginner
tags:
  - css
  - positioning
  - layout
  - z-index
  - web
platforms:
  - web
lastVerified: "2026-09-30"
---

# CSS Positioning (static, relative, absolute, fixed, sticky)

The **`position`** property dictates how an element is positioned within the document flow and whether offset properties (`top`, `right`, `bottom`, `left`) and `z-index` take effect.

---

## 1. Comparing Position Values

| Value | In Normal Flow? | Positioned Relative To... | Common Use Case |
| :--- | :--- | :--- | :--- |
| **`static`** | ✅ Yes | Default document flow (offsets ignored). | Standard headings, paragraphs. |
| **`relative`** | ✅ Yes | Its own default static position. | Anchor parent for `absolute` child elements. |
| **`absolute`** | ❌ No (Removed) | Nearest ancestor with position other than `static`. | Dropdown menus, tooltips, badge overlays. |
| **`fixed`** | ❌ No (Removed) | The browser **viewport**. Stays in place during scroll. | Modals, back-to-top buttons, floating cookie banners. |
| **`sticky`** | ✅ Yes | Document flow until scroll threshold (`top: 0`), then acts as fixed. | Sticky navigation headers, sidebar table of contents. |

---

## 2. The Classic Parent-Child Absolute Pattern

To position an icon or badge inside a card, set `position: relative` on the card and `position: absolute` on the badge:

```css
.card {
  position: relative; /* Containing block */
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
}

.badge-new {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #10b981;
  color: white;
  padding: 2px 8px;
  border-radius: 9999px;
}
```

---

## 3. Stacking Contexts and `z-index`

The `z-index` property controls the vertical stacking order of overlapping positioned elements (elements with `position` other than `static`).

```css
/* Creates new stacking context */
.modal-overlay {
  position: fixed;
  inset: 0; /* top:0, right:0, bottom:0, left:0 */
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
}

.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 51;
}
```

---

## Related Topics

- [The CSS Box Model](/docs/css/box-model)
- [Flexbox Layout](/docs/css/flexbox)
- [CSS Grid Layout](/docs/css/grid)
