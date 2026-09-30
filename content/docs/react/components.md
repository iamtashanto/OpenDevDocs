---
title: "React Components & Function Architecture"
description: "Building React components: functional components, return requirements, PascalCase naming, component purity, and folder organization."
category: frontend
topic: react
type: guide
level: beginner
tags:
  - react
  - components
  - functional-components
  - purity
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# React Components & Function Architecture

In modern React, a **component** is simply a JavaScript function that accepts `props` (inputs) and returns JSX markup describing what should appear on the screen.

---

## 1. Anatomy of a Function Component

```tsx
interface ArticleCardProps {
  title: string;
  category: string;
}

export function ArticleCard({ title, category }: ArticleCardProps) {
  return (
    <article className="p-4 rounded border bg-card">
      <span className="text-xs uppercase text-primary">{category}</span>
      <h3 className="text-lg font-bold mt-1">{title}</h3>
    </article>
  );
}
```

---

## 2. Component Rules

1. **Must Start with a Capital Letter (PascalCase)**: React distinguishes native HTML elements (`<div>`, `<button>`) from custom components (`<ArticleCard>`, `<Header>`) by capitalization.
2. **Must Return a Single Root Element**: Components cannot return multiple sibling elements without wrapping them in a parent container or a **Fragment (`<>...</>`)**.
3. **Must Be Pure Functions**: Given the same inputs (`props`), a React component should always return the same JSX without mutating external variables during rendering.

---

## Related Topics

- [JSX Syntax Guide](/docs/react/jsx)
- [React Props](/docs/react/props)
- [Component Composition](/docs/react/component-composition)
