---
title: "HTML Document Structure & Head Metadata"
description: "Mastering HTML document anatomy: <!DOCTYPE html>, <html>, <head>, meta viewport, charsets, OpenGraph tags, and <body> layout."
category: frontend
topic: html
type: guide
level: beginner
tags:
  - html
  - metadata
  - head
  - seo
  - web
platforms:
  - web
lastVerified: "2026-09-30"
---

# HTML Document Structure & Head Metadata

Every compliant HTML5 document follows a strict two-part architecture: the **`<head>`** (metadata machine-readable by browsers and search engines) and the **`<body>`** (content rendered visually to users).

---

## 1. Anatomy of the `<head>` Element

The `<head>` element contains invisible configuration metadata:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Character encoding (MUST be first child of head) -->
  <meta charset="UTF-8" />

  <!-- Responsive mobile viewport scaling -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Page Title displayed in browser tabs -->
  <title>OpenDevDocs - Developer Knowledge Platform</title>

  <!-- Search engine description -->
  <meta name="description" content="Learn, Build, Debug, and Deploy software." />

  <!-- OpenGraph social sharing preview metadata -->
  <meta property="og:title" content="OpenDevDocs" />
  <meta property="og:description" content="Community-driven developer knowledge platform." />
  <meta property="og:image" content="https://docs.tashanto.com/og-image.png" />
  <meta property="og:url" content="https://docs.tashanto.com" />

  <!-- Favicon and CSS Stylesheets -->
  <link rel="icon" href="/favicon.ico" />
  <link rel="stylesheet" href="/styles.css" />
</head>
```

---

## 2. The Viewport Meta Tag

Without the viewport meta tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
Mobile browsers assume the site was designed for a 980px desktop monitor and scale the page down, causing microscopic text and broken mobile touch interactions.

---

## 3. The `<body>` Structure

The `<body>` contains all visible headings, paragraphs, navigation bars, images, and script tags:

```html
<body>
  <header>
    <a href="/">OpenDevDocs</a>
  </header>

  <main>
    <h1>HTML Document Structure</h1>
    <p>Understanding head vs body hierarchy.</p>
  </main>

  <footer>
    <p>&copy; 2026 OpenDevDocs</p>
  </footer>
</body>
</html>
```

---

## Related Topics

- [Semantic HTML5 Elements](/docs/html/semantic-html)
- [Web Accessibility Fundamentals](/docs/html/accessibility-fundamentals)
- [URLs & Query Strings](/docs/fundamentals/urls)
