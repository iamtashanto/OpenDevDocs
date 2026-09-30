---
title: "CSS Custom Properties (Variables)"
description: "Mastering CSS Variables: declaration syntax (--var), var() fallback values, scoping, dark mode theming, and runtime JavaScript manipulation."
category: frontend
topic: css
type: guide
level: beginner
tags:
  - css
  - variables
  - theming
  - dark-mode
  - design-system
platforms:
  - web
lastVerified: "2026-09-30"
---

# CSS Custom Properties (Variables)

**CSS Custom Properties** (commonly called **CSS Variables**) allow developers to define reusable values across stylesheets, implement dark/light theme toggles, and dynamically mutate styling at runtime via JavaScript.

---

## 1. Declaring and Consuming Variables

Custom properties are prefixed with double dashes (`--`) and accessed using the `var()` function:

```css
/* 1. Global Scope (:root matches the <html> element) */
:root {
  --color-primary: #0284c7;
  --color-background: #ffffff;
  --color-foreground: #0f172a;
  --font-base: system-ui, -apple-system, sans-serif;
  --radius: 0.5rem;
}

/* 2. Consuming Variables with Optional Fallbacks */
.button {
  background-color: var(--color-primary, #000000);
  color: var(--color-background);
  border-radius: var(--radius);
  font-family: var(--font-base);
}
```

---

## 2. Dynamic Dark Mode Theming

CSS variables make implementing dark mode effortless by updating variable definitions on the root element:

```css
:root {
  --bg-page: #ffffff;
  --text-main: #0f172a;
  --border-subtle: #e2e8f0;
}

/* Dark theme overrides */
[data-theme="dark"],
.dark {
  --bg-page: #090d16;
  --text-main: #f8fafc;
  --border-subtle: #1e293b;
}

body {
  background-color: var(--bg-page);
  color: var(--text-main);
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

---

## 3. Manipulating CSS Variables with JavaScript

Unlike Sass/SCSS preprocessor variables, CSS custom properties exist live in the browser DOM and can be read or modified in real time:

```javascript
// Read variable value:
const rootStyles = getComputedStyle(document.documentElement);
const primaryColor = rootStyles.getPropertyValue("--color-primary");

// Modify variable value dynamically (e.g. user color picker):
document.documentElement.style.setProperty("--color-primary", "#10b981");
```

---

## Related Topics

- [The CSS Cascade and Inheritance](/docs/css/cascade)
- [Responsive Web Design & Breakpoints](/docs/css/responsive-design)
- [CSS Specificity Calculation](/docs/css/specificity)
