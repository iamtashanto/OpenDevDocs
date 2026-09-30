---
title: "The CSS Cascade and Inheritance"
description: "How CSS resolves conflicting rules: stylesheet origin, specificity, source order, property inheritance, and initial vs inherit keywords."
category: frontend
topic: css
type: guide
level: beginner
tags:
  - css
  - cascade
  - inheritance
  - styling
  - web
platforms:
  - web
lastVerified: "2026-09-30"
---

# The CSS Cascade and Inheritance

The **Cascade** is the algorithm browsers use to resolve conflicts when multiple CSS declarations target the same element.

---

## 1. The Cascade Algorithm Hierarchy

When two or more declarations set the same property on an element, CSS resolves the winner using the following precedence hierarchy:

```
1. Importance & Origin (User Agent < User < Author < !important)
        │
        ▼ (If tie)
2. Specificity (Inline styles > ID > Class/Attribute/Pseudo-class > Element)
        │
        ▼ (If tie)
3. Source Order (The declaration defined LAST in the stylesheet wins)
```

---

## 2. Property Inheritance

Some CSS properties automatically inherit values from their parent element down to child elements:

- **Inherited Properties**: Typography properties (`color`, `font-family`, `font-size`, `line-height`, `text-align`, `visibility`).
- **Non-Inherited Properties**: Layout & box model properties (`margin`, `padding`, `border`, `background`, `width`, `height`, `display`, `position`).

### Explicit Inheritance Keywords
```css
.child-element {
  /* Force property to take parent's value */
  border: inherit;

  /* Reset property to CSS initial default */
  color: initial;

  /* Revert to browser default */
  font-size: revert;
}
```

---

## 3. The `!important` Escape Hatch

Adding `!important` to a declaration overrides normal specificity and source order rules:

```css
p {
  color: red !important;
}
```

### Best Practice
Avoid `!important` in normal application stylesheets. It breaks the natural cascade, making future overrides painful and creating maintenance debt. Reserve `!important` solely for generic utility override classes.

---

## Related Topics

- [CSS Specificity Calculation](/docs/css/specificity)
- [CSS Custom Properties (Variables)](/docs/css/variables)
- [The CSS Box Model](/docs/css/box-model)
