---
title: "CSS Grid Layout"
description: "Mastering two-dimensional CSS Grid: grid-template-columns, fr unit, repeat, auto-fit, minmax, and grid-template-areas."
category: frontend
topic: css
type: guide
level: intermediate
tags:
  - css
  - grid
  - layout
  - 2d
  - web
platforms:
  - web
lastVerified: "2026-09-30"
---

# CSS Grid Layout

**CSS Grid Layout** is a powerful two-dimensional layout system capable of handling both rows and columns simultaneously.

---

## 1. Defining a Basic Grid

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3 columns using fractional units (fr) */
  gap: 1.5rem;                        /* Row and column gutters */
}
```

- **`fr` (Fractional Unit)**: Represents a fraction of the available free space in the grid container.

---

## 2. The Responsive Auto-Fit Pattern (No Media Queries Required)

Create an automatically responsive card grid that wraps smoothly across mobile, tablet, and desktop viewports without writing a single `@media` query:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

### Breakdown:
- **`repeat()`**: Repeats column definition automatically.
- **`auto-fit`**: Fits as many columns as will fit into the container width.
- **`minmax(280px, 1fr)`**: Each column must be at least `280px` wide, but can expand up to `1fr` to fill extra room.

---

## 3. Named Grid Template Areas

Define complex dashboard layouts visually using `grid-template-areas`:

```css
.dashboard-layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

header  { grid-area: header; }
aside   { grid-area: sidebar; }
main    { grid-area: main; }
footer  { grid-area: footer; }
```

---

## 4. Flexbox vs. CSS Grid

| Scenario | Preferred Tool |
| :--- | :--- |
| Aligning items in a single row or column (e.g. navbar, button group) | **Flexbox** |
| Complex two-dimensional page layouts (dashboards, card galleries) | **CSS Grid** |
| Content-driven size (elements size according to their content) | **Flexbox** |
| Layout-driven size (elements conform strictly to container cells) | **CSS Grid** |

---

## Related Topics

- [CSS Flexbox Layout](/docs/css/flexbox)
- [Responsive Web Design](/docs/css/responsive-design)
- [CSS Box Model](/docs/css/box-model)
