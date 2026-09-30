---
title: "Error Boundaries in React"
description: "Catching rendering errors in React: Error Boundary lifecycle (getDerivedStateFromError, componentDidCatch), fallback UIs, and Next.js error.tsx boundaries."
category: frontend
topic: react
type: guide
level: intermediate
tags:
  - react
  - error-boundaries
  - error-handling
  - fallback
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# Error Boundaries in React

By default, if a JavaScript error is thrown during rendering inside a component, React unmounts the entire component tree, resulting in a blank white screen. **Error Boundaries** are special components that catch rendering errors anywhere in their child component tree and display a fallback UI.

---

## 1. Class Component Error Boundary

In React, error boundaries must currently be class components implementing `componentDidCatch` or `getDerivedStateFromError`:

```tsx
import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  fallback?: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught rendering error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 border border-destructive bg-destructive/10 rounded">
            <h2 className="text-lg font-bold">Something went wrong.</h2>
            <p className="text-sm">{this.state.error?.message}</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
```

---

## 2. Granular Error Boundary Placement

Place error boundaries around isolated widgets so that a failure in one widget (like a comments section) does not crash the rest of the page:

```tsx
<PageLayout>
  <Header />
  <ErrorBoundary fallback={<p>Unable to load live comments.</p>}>
    <CommentsList />
  </ErrorBoundary>
  <Footer />
</PageLayout>
```

---

## 3. Next.js App Router `error.tsx`

In Next.js App Router, every route segment can define an automatic error boundary by creating an `error.tsx` file:

```tsx
// app/dashboard/error.tsx
"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6">
      <h2>Failed to load dashboard data</h2>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
```

---

## Related Topics

- [JavaScript Error Handling](/docs/javascript/error-handling)
- [Next.js Error Handling Architecture](/docs/nextjs/error-handling)
- [Cannot read properties of undefined Error Fix](/errors/javascript/cannot-read-properties-of-undefined)
