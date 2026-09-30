---
title: "The useState Hook in React"
description: "Mastering useState: state initialization, functional updates (prev => prev + 1), lazy initial state, and batching in React."
category: frontend
topic: react
type: guide
level: beginner
tags:
  - react
  - hooks
  - use-state
  - state
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# The `useState` Hook in React

**`useState`** is the primary React hook for adding local reactive state variables to functional components.

---

## 1. Syntax and Basic Declaration

```tsx
import { useState } from "react";

const [state, setState] = useState<T>(initialValue);
```

---

## 2. Functional State Updates (`prev => ...`)

If your new state depends on the previous state value (such as a counter or toggling an active flag), always pass an updater function:

```tsx
// ❌ Dangerous during rapid consecutive events (can overwrite updates):
// setCount(count + 1);

// ✅ Safe: React passes the most up-to-date pending state:
setCount(prev => prev + 1);
```

---

## 3. Lazy Initial State

If calculating the initial state is computationally expensive (e.g. reading and parsing `localStorage`), pass a function to `useState`. React will execute the initialization function **only once on initial mount**, rather than re-running it on every render:

```tsx
// ✅ Lazy Initializer: runs once on mount
const [theme, setTheme] = useState<string>(() => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("theme") ?? "light";
});
```

---

## 4. Automatic Batching

In React 18 & 19, multiple state updates triggered inside event handlers, Promises, `setTimeout`, or async functions are **automatically batched** into a single re-render, optimizing rendering performance.

---

## Related Topics

- [React State Concepts](/docs/react/state)
- [useEffect Hook](/docs/react/use-effect)
- [useRef Hook](/docs/react/use-ref)
