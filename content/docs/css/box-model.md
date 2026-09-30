---
title: "The CSS Box Model"
description: "Mastering the CSS Box Model: content, padding, border, margin, margin collapse, and box-sizing: border-box."
category: frontend
topic: css
type: guide
level: beginner
tags:
  - css
  - box-model
  - margin
  - padding
  - border-box
  - web
platforms:
  - web
lastVerified: "2026-09-30"
---

# The CSS Box Model

In CSS, every HTML element is treated as a rectangular box. The **Box Model** defines how an element's total width, height, and spacing are calculated.

---

## 1. Layers of the Box Model

```
┌──────────────────────────────────────────────┐
│                    MARGIN                    │  (Outer transparent spacing)
│   ┌──────────────────────────────────────┐   │
│   │                BORDER                │   │  (Visible border line)
│   │   ┌──────────────────────────────┐   │   │
│   │   │           PADDING            │   │   │  (Inner space around content)
│   │   │   ┌──────────────────────┐   │   │   │
│   │   │   │       CONTENT        │   │   │   │  (Text, image, child elements)
│   │   │   └──────────────────────┘   │   │   │
│   │   └──────────────────────────────┘   │   │
│   └──────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
```

---

## 2. `content-box` vs. `border-box`

By default in legacy CSS, elements use `box-sizing: content-box`. Adding padding or borders increases the rendered box width beyond the specified `width`:

```css
/* With content-box (Default): Total width = 300 + 20(padding*2) + 2(border*2) = 322px */
.card {
  box-sizing: content-box;
  width: 300px;
  padding: 10px;
  border: 1px solid #000;
}

/* With border-box (Modern Standard): Total width = exactly 300px */
.card {
  box-sizing: border-box;
  width: 300px;
  padding: 10px;
  border: 1px solid #000;
}
```

### The Universal Border-Box Reset (Mandatory Best Practice)
```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

---

## 3. Margin Collapsing

In standard vertical document flow, adjacent vertical margins between block elements **collapse** into a single margin equal to the largest individual margin value:

```css
h1 { margin-bottom: 30px; }
p  { margin-top: 20px; }

/* The resulting space between h1 and p is 30px (NOT 50px!) */
```

*Note: Margins inside Flexbox (`display: flex`) and Grid (`display: grid`) containers never collapse.*

---

## Related Topics

- [CSS Display Property (block, inline, flex)](/docs/css/display)
- [CSS Positioning](/docs/css/positioning)
- [Flexbox Layout](/docs/css/flexbox)
