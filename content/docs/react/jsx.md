---
title: "JSX (JavaScript XML) Syntax Guide"
description: "Mastering JSX: syntax rules, embedding JavaScript expressions with curly braces {}, Fragments, className, and style objects."
category: frontend
topic: react
type: guide
level: beginner
tags:
  - react
  - jsx
  - syntax
  - fragments
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# JSX (JavaScript XML) Syntax Guide

**JSX** is a syntax extension for JavaScript that lets you write HTML-like markup directly inside a JavaScript/TypeScript file.

---

## 1. Core JSX Syntax Rules

1. **Return a Single Root Element (Use Fragments `<>...</>`)**:
   ```tsx
   return (
     <>
       <h1>OpenDevDocs</h1>
       <p>Learn. Build. Debug. Deploy.</p>
     </>
   );
   ```
2. **Close All Tags Explicitly**: Self-closing tags must end with `/>` (e.g. `<img src="..." alt="" />`, `<input />`, `<br />`).
3. **CamelCase Property Names**:
   - `class` becomes `className`
   - `for` becomes `htmlFor`
   - `tabindex` becomes `tabIndex`
   - `onclick` becomes `onClick`

---

## 2. Embedding JavaScript Expressions with `{}`

Any valid JavaScript expression (variables, function calls, arithmetic, ternary conditions) can be embedded inside JSX using curly braces `{}`:

```tsx
export function Greeting({ username }: { username: string }) {
  const isMorning = new Date().getHours() < 12;

  return (
    <div className="banner">
      <h2>Good {isMorning ? "Morning" : "Evening"}, {username.toUpperCase()}!</h2>
      <p>Active issues: {10 + 4}</p>
    </div>
  );
}
```

---

## Related Topics

- [React Components](/docs/react/components)
- [React Props](/docs/react/props)
- [Conditional Rendering](/docs/react/conditional-rendering)
