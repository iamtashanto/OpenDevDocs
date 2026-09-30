---
title: "Introduction to React"
description: "Understanding React: component-driven UI architecture, declarative rendering, React 19 features, and the Virtual DOM."
category: frontend
topic: react
type: guide
level: beginner
tags:
  - react
  - frontend
  - ui
  - components
  - jsx
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# Introduction to React

**React** is a declarative, component-based JavaScript library for building interactive user interfaces. It powers web applications by breaking complex UIs into small, isolated, reusable pieces called **components**.

---

## 1. The Core React Mental Model

In traditional imperative DOM programming, you query elements and manually mutate text or classes (`document.getElementById().textContent = ...`).

In React, you describe **what the UI should look like for a given state**, and React takes care of updating the browser DOM efficiently when state changes.

```
[ Component State (Data) ] ──► [ React Render Function ] ──► [ Browser DOM ]
```

---

## 2. Key Principles

1. **Declarative**: Write predictable code that describes the desired final UI state.
2. **Component-Driven**: Build encapsulated components that manage their own state, then compose them to make complex UIs.
3. **Unidirectional Data Flow**: Data flows down from parent components to child components via `props`.
4. **React 19 & Compiler Modernization**: React 19 introduces automatic memoization and native Actions, eliminating boilerplate while maximizing performance.

---

## Related Topics

- [React Project Setup with Vite & Next.js](/docs/react/project-setup)
- [React Components](/docs/react/components)
- [JSX Syntax Guide](/docs/react/jsx)
