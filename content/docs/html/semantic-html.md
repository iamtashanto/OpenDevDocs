---
title: "Semantic HTML5 Elements"
description: "Why semantic HTML matters: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>, SEO benefits, and replacing div-soup."
category: frontend
topic: html
type: guide
level: beginner
tags:
  - html
  - semantic-html
  - a11y
  - seo
  - web
platforms:
  - web
lastVerified: "2026-09-30"
---

# Semantic HTML5 Elements

**Semantic HTML** means using HTML tags that convey the meaning of the content contained within them, rather than just using generic `<div>` and `<span>` tags.

---

## 1. Comparing Semantic vs. Non-Semantic Markup

```html
<!-- ❌ Non-Semantic ("Div Soup") -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
<div class="content">
  <div class="title">Article Title</div>
</div>

<!-- ✅ Semantic HTML5 -->
<header>
  <nav aria-label="Main Navigation">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
  </article>
</main>
```

---

## 2. Key Semantic Elements and Their Purpose

| Semantic Element | Role & Screen Reader Behavior |
| :--- | :--- |
| **`<main>`** | Represents the dominant, unique content of the `<body>`. **Only one `<main>` per page**. |
| **`<nav>`** | Defines major navigation links. Screen readers allow blind users to jump directly past or into this landmark. |
| **`<header>`** | Introductory content or group of navigational aids for a page or article. |
| **`<article>`** | A self-contained composition that makes sense on its own (e.g. blog post, documentation page, news story). |
| **`<section>`** | A standalone thematic grouping of content, typically with a heading. |
| **`<aside>`** | Content tangentially related to the main article (e.g. sidebar table of contents, related links, callout box). |
| **`<footer>`** | Footer for its nearest section or root document (author, copyright, links). |
| **`<figure>` & `<figcaption>`** | Self-contained image, diagram, or code listing with a caption. |

---

## 3. Heading Hierarchy Rules

- **Only one `<h1>` per page**: The `<h1>` represents the primary topic of the document.
- **Never skip heading levels**: Do not jump from `<h2>` directly to `<h4>` just to make text smaller. Use CSS font-size classes instead.

```html
<h1>JavaScript Fundamentals</h1>
  <h2>Variables</h2>
    <h3>let and const</h3>
  <h2>Functions</h2>
    <h3>Arrow Functions</h3>
```

---

## Related Topics

- [HTML Accessibility Fundamentals](/docs/html/accessibility-fundamentals)
- [HTML Forms & Input Validation](/docs/html/forms)
- [CSS Specificity and Cascade](/docs/css/cascade)
