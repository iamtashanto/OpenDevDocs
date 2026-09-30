---
title: "React Performance Optimization Basics"
description: "Core React performance techniques: React 19 Compiler, React.memo, code splitting with React.lazy, virtualized lists, and avoiding wasted renders."
category: frontend
topic: react
type: guide
level: intermediate
tags:
  - react
  - performance
  - memo
  - code-splitting
  - optimization
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# React Performance Optimization Basics

Optimizing React applications is about eliminating wasted re-renders and reducing initial JavaScript bundle payload sizes.

---

## 1. When Does React Re-Render?

A React component re-renders when:
1. Its **own state changes** via a setter function (`setState`).
2. Its **parent component re-renders** (by default, all children re-render recursively).
3. A **Context value it consumes changes**.

---

## 2. Preventing Unnecessary Child Re-renders with `React.memo`

Wrap expensive components with `React.memo` so they only re-render if their props shallowly change:

```tsx
import { memo } from "react";

export const HeavyChart = memo(function HeavyChart({ data }: { data: number[] }) {
  console.log("Expensive chart rendering...");
  return <svg>{/* Complex SVG path calculations */}</svg>;
});
```

---

## 3. Code-Splitting with `React.lazy` and `Suspense`

Do not force users on mobile devices to download code for pages or heavy modals they haven't opened yet:

```tsx
import { lazy, Suspense } from "react";

// Dynamically loaded only when rendered:
const HeavyAdminDashboard = lazy(() => import("./AdminDashboard"));

export function App() {
  return (
    <Suspense fallback={<div>Loading dashboard bundle...</div>}>
      <HeavyAdminDashboard />
    </Suspense>
  );
}
```

---

## 4. The React 19 Compiler

In React 19+, the **React Compiler** automatically memoizes components, values, and functions at build time, eliminating the manual mental overhead of littered `useMemo`, `useCallback`, and `React.memo` calls across application code.

---

## Related Topics

- [useMemo Hook](/docs/react/use-memo)
- [useCallback Hook](/docs/react/use-callback)
- [Core Web Vitals & Performance](/roadmaps/frontend/frontend-roadmap)
