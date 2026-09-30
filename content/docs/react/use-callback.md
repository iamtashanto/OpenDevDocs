---
title: "The useCallback Hook in React"
description: "Caching callback function definitions with useCallback: preventing unnecessary re-renders of memoized child components and custom hook dependencies."
category: frontend
topic: react
type: guide
level: intermediate
tags:
  - react
  - hooks
  - use-callback
  - performance
  - memoization
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# The `useCallback` Hook in React

**`useCallback`** is a React hook that caches a function definition between renders instead of recreating a new function instance on every render cycle.

---

## 1. Why Functions Recreate on Render

Every time a component re-renders, all function declarations inside it are recreated in memory. While creating small functions is fast, passing newly instantiated functions to memoized child components (`React.memo`) triggers unnecessary child re-renders.

```tsx
import { useState, useCallback, memo } from "react";

// Memoized child component only re-renders if props change:
const ExpensiveList = memo(function ExpensiveList({ onItemClick }: { onItemClick: (id: string) => void }) {
  console.log("Rendering ExpensiveList...");
  return <div>List Content</div>;
});

export function Dashboard() {
  const [count, setCount] = useState(0);

  // ✅ Stable function reference across re-renders:
  const handleClick = useCallback((id: string) => {
    console.log("Clicked item:", id);
  }, []); // Empty deps: reference never changes

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ExpensiveList onItemClick={handleClick} />
    </div>
  );
}
```

---

## 2. `useCallback` vs. `useMemo`

- `useMemo(() => fn, deps)` returns the **value produced** by calling the function.
- `useCallback(fn, deps)` returns the **function definition itself**.
- `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

---

## Related Topics

- [useMemo Hook](/docs/react/use-memo)
- [Performance Basics in React](/docs/react/performance-basics)
- [Custom Hooks](/docs/react/custom-hooks)
