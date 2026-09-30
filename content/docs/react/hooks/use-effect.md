---
title: useEffect Hook in React
description: Learn how to synchronize components with external systems, manage cleanup cycles, and avoid infinite render loops.
category: frontend
topic: react
type: guide
level: intermediate
tags:
  - react
  - hooks
  - use-effect
  - frontend
platforms:
  - web
tested:
  react: "19.x"
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

## Overview

The `useEffect` hook enables functional React components to synchronize with external systems — such as browser APIs, WebSockets, data fetching, or non-React widgets.

---

## Basic Syntax

```tsx
import { useEffect } from "react";

useEffect(() => {
  // 1. Setup logic (runs after render)
  
  return () => {
    // 2. Cleanup logic (runs before unmount or next effect)
  };
}, [/* 3. Dependency array */]);
```

---

## Dependency Array Rules

| Dependencies | When it runs |
| :--- | :--- |
| **Omitted** `useEffect(fn)` | Runs after **every single render** (rarely what you want). |
| **Empty array** `[]` | Runs **once on mount**, cleanups on unmount. |
| **Dependencies** `[foo, bar]` | Runs on mount and whenever `foo` or `bar` identity changes (`Object.is`). |

---

## Example: Event Listener with Cleanup

```tsx
import { useState, useEffect } from "react";

export function WindowSizeTracker() {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize);

    // Crucial: always clean up subscriptions and event listeners
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty array: setup once on mount

  return <p>Window width: {width}px</p>;
}
```

<Callout type="warning" title="Avoid Redundant State Updates in Effects">
Do not use `useEffect` to transform data for rendering if the transformation can be calculated during render or with `useMemo`. (See the official React guide: *You Might Not Need an Effect*).
</Callout>
