---
title: "CSS Specificity Calculation"
description: "How CSS calculates selector weight: (0, 0, 0, 0) scoring system, inline styles, IDs, classes, element selectors, and specificity wars."
category: frontend
topic: css
type: guide
level: beginner
tags:
  - css
  - specificity
  - cascade
  - styling
  - web
platforms:
  - web
lastVerified: "2026-09-30"
---

# CSS Specificity Calculation

**Specificity** is a 4-part weight score assigned to a CSS selector. If multiple selectors target the same element with conflicting properties, the selector with the highest specificity score wins.

---

## 1. The Specificity Score Matrix `(A, B, C, D)`

Specificity is calculated across four columns:

```
( Inline Styles , ID Selectors , Classes/Attributes/Pseudo-classes , Elements/Pseudo-elements )
       A                 B                       C                                  D
```

| Column | Matches | Specificity Weight | Examples |
| :--- | :--- | :--- | :--- |
| **A** | Inline `style=""` | `(1, 0, 0, 0)` | `<div style="color: blue;">` |
| **B** | ID Selectors (`#`) | `(0, 1, 0, 0)` | `#nav-header`, `#user-profile` |
| **C** | Classes (`.`), Attributes (`[]`), Pseudo-classes (`:`) | `(0, 0, 1, 0)` | `.btn`, `[type="text"]`, `:hover`, `:focus` |
| **D** | Elements (`tag`), Pseudo-elements (`::`) | `(0, 0, 0, 1)` | `h1`, `p`, `div`, `::before`, `::after` |

---

## 2. Comparing Specificity Examples

| Selector | Score | Who Wins? |
| :--- | :--- | :--- |
| `p` | `(0, 0, 0, 1)` | Lowest |
| `div p` | `(0, 0, 0, 2)` | Beats `p` |
| `.intro` | `(0, 0, 1, 0)` | Beats `div p` |
| `div.card .intro` | `(0, 0, 2, 1)` | Beats `.intro` |
| `#sidebar .intro` | `(0, 1, 1, 0)` | Beats `div.card .intro` |
| `style="color: red;"` | `(1, 0, 0, 0)` | Beats `#sidebar .intro` |

*Note: Specificity columns never roll over. No amount of classes (e.g. 100 classes) can ever beat a single ID selector `(0, 1, 0, 0)`.*

---

## 3. Best Practices to Prevent "Specificity Wars"

1. **Avoid ID Selectors in CSS**: Use classes for styling (`.sidebar`) and reserve IDs (`id="sidebar"`) for JavaScript DOM querying or accessibility `aria-labelledby`.
2. **Keep Selectors Flat**: Prefer `.btn-primary` over deeply nested descendant selectors like `div.main > section.content > ul > li.item > a.btn`.
3. **Use the `:where()` Pseudo-Class**: `:where(h1, h2, h3)` has **zero specificity `(0, 0, 0, 0)`**, making reset stylesheets easy to override.

---

## Related Topics

- [The CSS Cascade and Inheritance](/docs/css/cascade)
- [CSS Selectors](/docs/css/selectors)
- [CSS Box Model](/docs/css/box-model)
