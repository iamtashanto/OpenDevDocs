---
title: "Document Object Model (DOM) Basics"
description: "Interacting with the browser DOM: querySelector, element creation, textContent vs innerHTML, classList manipulation, and event listeners."
category: frontend
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - dom
  - browser
  - event-listeners
  - frontend
platforms:
  - web
tested:
  v8: "current"
lastVerified: "2026-09-30"
---

# Document Object Model (DOM) Basics

The **Document Object Model (DOM)** is a tree-structured programming interface for HTML documents. It represents the page so that programs (JavaScript) can change the document structure, style, and content dynamically.

---

## 1. Querying Elements

Modern DOM uses CSS selector queries:

```javascript
// Select first matching element:
const heading = document.querySelector("h1");
const submitBtn = document.querySelector(".btn-submit");

// Select ALL matching elements (returns NodeList):
const menuItems = document.querySelectorAll("nav ul li a");
menuItems.forEach(item => {
  console.log(item.textContent);
});
```

---

## 2. Modifying Content and Attributes

```javascript
const banner = document.querySelector(".announcement-banner");

// 1. Text Content (Safe against XSS injection):
banner.textContent = "OpenDevDocs v2.0 Released!";

// 2. Class List Manipulation:
banner.classList.add("active");
banner.classList.remove("hidden");
banner.classList.toggle("dark");

// 3. Attributes:
banner.setAttribute("aria-hidden", "false");
const isVisible = banner.getAttribute("aria-hidden");
```

### Security Warning: Avoid `innerHTML` with User Input
Never assign unescaped user input to `.innerHTML` because it allows malicious actors to inject and execute arbitrary `<script>` tags (**Cross-Site Scripting (XSS)**). Use `.textContent` instead.

---

## 3. Event Listeners and Event Delegation

### Adding Event Listeners
```javascript
const button = document.querySelector("#theme-toggle");

button.addEventListener("click", (event) => {
  document.body.classList.toggle("dark-mode");
});
```

### Event Delegation (Best Practice for Lists)
Instead of attaching 1,000 separate event listeners to 1,000 list items, attach **one single listener** to the parent container and inspect `event.target`:

```javascript
const list = document.querySelector("#todo-list");

list.addEventListener("click", (event) => {
  // Check if clicked element was a delete button:
  if (event.target.matches("button.delete-btn")) {
    const item = event.target.closest("li");
    item.remove();
  }
});
```

---

## Related Topics

- [Introduction to HTML](/docs/html/introduction)
- [HTML Semantic Elements](/docs/html/semantic-html)
- [The JavaScript Event Loop](/docs/javascript/event-loop)
