---
title: "The useMemo Hook in React"
description: "Optimizing expensive calculations with useMemo: caching computed values, referential equality, and when not to over-optimize."
category: frontend
topic: react
type: guide
level: intermediate
tags:
  - react
  - hooks
  - use-memo
  - performance
  - memoization
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# The `useMemo` Hook in React

**`useMemo`** is a React hook that caches (memoizes) the result of a calculation between re-renders, recalculating only when specified dependencies change.

---

## 1. Syntax and Example

```tsx
import { useState, useMemo } from "react";

export function ProductSearch({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState("");

  // Only re-filters products when 'products' or 'filter' changes:
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {filteredProducts.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 2. Preserving Referential Equality

In JavaScript, `{}` !== `{}`. If you pass an object literal down to a memoized child component, the child will re-render because the object reference changes on every render. `useMemo` preserves stable object references:

```tsx
const options = useMemo(() => ({
  colorScheme: theme,
  showBadge: true,
}), [theme]);
```

---

## 3. When NOT to Use `useMemo`

Do not wrap cheap everyday calculations (like `a + b` or basic string formatting) in `useMemo`. The overhead of creating a closure and comparing dependency arrays is often more expensive than the calculation itself.

---

## Related Topics

- [useCallback Hook](/docs/react/use-callback)
- [Performance Basics in React](/docs/react/performance-basics)
- [Common React Mistakes](/docs/react/common-react-mistakes)
