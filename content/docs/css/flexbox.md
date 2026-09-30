---
title: "CSS Flexbox Layout"
description: "Mastering one-dimensional Flexbox: flex-direction, justify-content, align-items, flex-wrap, flex-grow, flex-shrink, and centering elements."
category: frontend
topic: css
type: guide
level: beginner
tags:
  - css
  - flexbox
  - layout
  - alignment
  - web
platforms:
  - web
lastVerified: "2026-09-30"
---

# CSS Flexbox Layout

**Flexbox (Flexible Box Layout)** is a one-dimensional layout model designed for distributing space and aligning items along either a **row** (horizontal) or a **column** (vertical).

---

## 1. Flex Container vs. Flex Items

Activating `display: flex` turns the parent into a **flex container** and its direct children into **flex items**:

```
[ Main Axis (justify-content) ] ────────────────────────►
┌───────────────────────────────────────────────────────┐
│  ┌──────────┐      ┌──────────┐      ┌──────────┐     │ ▲
│  │  Item 1  │      │  Item 2  │      │  Item 3  │     │ │ Cross Axis
│  └──────────┘      └──────────┘      └──────────┘     │ │ (align-items)
└───────────────────────────────────────────────────────┘ ▼
```

---

## 2. Container Properties

| Property | Values | Purpose |
| :--- | :--- | :--- |
| `flex-direction` | `row` (default), `column`, `row-reverse`, `column-reverse` | Sets the main axis orientation. |
| `justify-content` | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` | Aligns items along the **main axis**. |
| `align-items` | `stretch` (default), `center`, `flex-start`, `flex-end`, `baseline` | Aligns items along the **cross axis**. |
| `flex-wrap` | `nowrap` (default), `wrap`, `wrap-reverse` | Allows items to wrap onto multiple lines. |
| `gap` | e.g. `1rem` or `16px 24px` | Sets gutters between items without margins. |

---

## 3. The Perfect Centering Solution

Centering both vertically and horizontally in pure CSS:

```css
.center-container {
  display: flex;
  justify-content: center; /* Main axis center */
  align-items: center;     /* Cross axis center */
  min-height: 100vh;
}
```

---

## 4. Item Properties (`flex-grow`, `flex-shrink`, `flex-basis`)

- **`flex-grow`**: Proportion of leftover space the item should absorb (e.g. `1`).
- **`flex-shrink`**: Rate at which the item shrinks when space is constrained (default `1`, set `0` to prevent shrinking).
- **`flex-basis`**: Default initial size before space distribution (`auto` or `200px`).

### Shorthand:
```css
/* flex: <flex-grow> <flex-shrink> <flex-basis> */
.sidebar {
  flex: 0 0 260px; /* Never grow, never shrink, always 260px */
}

.main-content {
  flex: 1 1 auto;  /* Grow to fill all remaining space */
}
```

---

## Related Topics

- [CSS Grid Layout](/docs/css/grid)
- [CSS Responsive Design & Media Queries](/docs/css/responsive-design)
- [The CSS Box Model](/docs/css/box-model)
