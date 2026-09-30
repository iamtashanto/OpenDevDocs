---
title: "Custom Hooks in React"
description: "Building custom React hooks: extracting reusable stateful logic, naming conventions (use*), returning values/tuples, and real-world examples (useDebounce, useLocalStorage)."
category: frontend
topic: react
type: guide
level: intermediate
tags:
  - react
  - hooks
  - custom-hooks
  - reusability
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# Custom Hooks in React

A **Custom Hook** is a JavaScript function whose name starts with `use` and that may call other React hooks. Custom hooks let you extract component logic into reusable functions.

---

## 1. Custom Hook Rules

1. **Must start with `use`** (e.g. `useDebounce`, `useMediaQuery`): This allows React linter plugins to enforce hook rules.
2. **Can call other hooks**: Inside a custom hook, you can call `useState`, `useEffect`, `useRef`, etc.
3. **State is isolated**: Each call to a custom hook creates an independent state instance.

---

## 2. Practical Example: `useDebounce`

Delay updating search queries to prevent flooding backend APIs with every keystroke:

```tsx
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => clearTimeout(handler);
  }, [value, delayMs]);

  return debouncedValue;
}
```

### Consuming `useDebounce`:
```tsx
export function SearchComponent() {
  const [search, setSearch] = useState("");
  const debouncedQuery = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedQuery) {
      console.log("Fetching API for:", debouncedQuery);
    }
  }, [debouncedQuery]);

  return <input value={search} onChange={e => setSearch(e.target.value)} />;
}
```

---

## Related Topics

- [useEffect Hook](/docs/react/use-effect)
- [useState Hook](/docs/react/use-state)
- [Component Composition](/docs/react/component-composition)
