---
title: "CSS Selectors"
description: "Comprehensive guide to CSS selectors: basic, combinators, attribute selectors, pseudo-classes, and pseudo-elements."
category: frontend
topic: css
type: guide
level: beginner
tags:
  - css
  - selectors
  - styling
  - web
platforms:
  - web
lastVerified: "2026-09-30"
---

# CSS Selectors

CSS selectors target HTML elements to apply styles. Mastering selectors allows you to style elements precisely without cluttering your markup with unnecessary class names.

---

## 1. Basic Selectors

| Selector | Name | Example | Matches |
| :--- | :--- | :--- | :--- |
| `*` | Universal | `* { box-sizing: border-box; }` | All elements on the page |
| `element` | Type / Tag | `p { line-height: 1.6; }` | All `<p>` elements |
| `.class` | Class | `.card { border: 1px solid #ccc; }` | Elements with `class="card"` |
| `#id` | ID | `#header { height: 60px; }` | The single element with `id="header"` |

---

## 2. Combinator Selectors

| Combinator | Name | Example | Matches |
| :--- | :--- | :--- | :--- |
| `A B` | Descendant | `nav a` | All `<a>` anywhere inside `<nav>` |
| `A > B` | Direct Child | `ul > li` | `<li>` elements that are direct children of `<ul>` |
| `A + B` | Adjacent Sibling | `h2 + p` | The first `<p>` immediately following an `<h2>` |
| `A ~ B` | General Sibling | `h2 ~ p` | All `<p>` elements preceded by an `<h2>` at same level |

---

## 3. Attribute Selectors

```css
/* Elements with the 'required' attribute */
input[required] { border-color: red; }

/* Elements with exact attribute value */
input[type="email"] { width: 100%; }

/* Elements whose attribute starts with 'https' */
a[href^="https"] { color: green; }

/* Elements whose attribute ends with '.pdf' */
a[href$=".pdf"]::after { content: " (PDF)"; }
```

---

## 4. Pseudo-Classes vs. Pseudo-Elements

- **Pseudo-Classes (`:`)**: Match elements based on state or DOM position (e.g. `:hover`, `:focus-visible`, `:first-child`, `:nth-child(even)`).
- **Pseudo-Elements (`::`)**: Style specific sub-parts of an element or insert virtual content (e.g. `::before`, `::after`, `::placeholder`, `::selection`).

```css
/* Interactive hover & focus */
button:hover { background-color: #0369a1; }
button:focus-visible { outline: 2px solid #38bdf8; }

/* Insert icon before link */
.external-link::after {
  content: " ↗";
  font-size: 0.8em;
}
```

---

## Related Topics

- [CSS Specificity Calculation](/docs/css/specificity)
- [CSS Cascade and Inheritance](/docs/css/cascade)
- [Flexbox Layout](/docs/css/flexbox)
