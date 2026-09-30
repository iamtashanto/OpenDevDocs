---
title: "Introduction to HTML"
description: "Understanding HTML (HyperText Markup Language): elements, opening/closing tags, attributes, and the role of HTML in the web platform."
category: frontend
topic: html
type: guide
level: beginner
tags:
  - html
  - web
  - frontend
  - markup
  - fundamentals
platforms:
  - web
lastVerified: "2026-09-30"
---

# Introduction to HTML

**HTML (HyperText Markup Language)** is the standard markup language used to structure web pages and their content. HTML tells the browser how to present text, images, links, forms, and multimedia to the user.

---

## 1. Elements, Tags, and Attributes

HTML documents are composed of **elements** organized hierarchically. An element typically consists of an opening tag, content, and a closing tag:

```html
<p class="intro">Welcome to OpenDevDocs!</p>
│  └────┬─────┘ └──────────┬───────────┘ └──┬─┘
│   Attribute           Content         Closing Tag
Opening Tag
```

### Self-Closing (Void) Elements
Some elements do not contain content and therefore do not have a closing tag:
- `<img src="logo.png" alt="OpenDevDocs Logo" />`
- `<input type="text" name="username" />`
- `<br />` (line break), `<hr />` (thematic break)

---

## 2. Minimal HTML Document

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Page - OpenDevDocs</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>Building open-source developer documentation.</p>
  </body>
</html>
```

---

## 3. Best Practices & Common Mistakes

| Practice | Recommendation | Why |
| :--- | :--- | :--- |
| **Always specify `lang`** | `<html lang="en">` | Essential for screen readers to choose correct pronunciation. |
| **Always provide `alt` on `<img>`** | `<img src="..." alt="Description" />` | Critical for web accessibility (a11y) and SEO. |
| **Never use HTML for styling** | Use CSS instead of `<font>` or `style=""` | Keeps content structure separated from presentation styles. |

---

## Related Topics

- [HTML Document Structure](/docs/html/document-structure)
- [Semantic HTML Elements](/docs/html/semantic-html)
- [Web Accessibility Fundamentals](/docs/html/accessibility-fundamentals)
