---
title: "CSS Syntax and Selectors Overview"
description: "Understanding CSS rulesets: selectors, declarations, properties, values, and how browsers parse stylesheets."
category: frontend
topic: css
type: guide
level: beginner
tags:
  - css
  - styling
  - syntax
  - web
  - frontend
platforms:
  - web
lastVerified: "2026-09-30"
---

# CSS Syntax and Selectors Overview

**CSS (Cascading Style Sheets)** describes how HTML elements are formatted, styled, laid out, and animated on screens, paper, or other media.

---

## 1. Anatomy of a CSS Rule

A CSS stylesheet consists of one or more **rulesets**:

```css
/* Selector */
.button-primary {
  /* Declaration */
  background-color: #0284c7; /* Property: Value; */
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}
```

- **Selector**: Points to the HTML element(s) you want to style.
- **Declaration Block**: Enclosed in curly braces `{}`.
- **Property**: The style attribute you want to change (e.g. `color`, `font-size`).
- **Value**: The specific setting assigned to the property (must end with a semicolon `;`).

---

## 2. Including CSS in HTML

### 1. External Stylesheet (Recommended)
```html
<link rel="stylesheet" href="/styles.css" />
```

### 2. Internal `<style>` Block (For critical path styles)
```html
<style>
  body { margin: 0; font-family: sans-serif; }
</style>
```

### 3. Inline Styles (Avoid for maintainability)
```html
<p style="color: red;">Alert message</p>
```

---

## Related Topics

- [CSS Selectors in Depth](/docs/css/selectors)
- [CSS Cascade and Inheritance](/docs/css/cascade)
- [CSS Specificity Calculation](/docs/css/specificity)
- [The CSS Box Model](/docs/css/box-model)
