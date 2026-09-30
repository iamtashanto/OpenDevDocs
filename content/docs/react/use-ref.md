---
title: "The useRef Hook in React"
description: "Mastering useRef: persisting values without triggering re-renders, DOM element referencing, focus management, and storing timer IDs."
category: frontend
topic: react
type: guide
level: beginner
tags:
  - react
  - hooks
  - use-ref
  - dom
  - focus
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# The `useRef` Hook in React

**`useRef`** is a React hook that lets you reference a value that persists across renders **without triggering a new re-render when mutated**.

---

## 1. Referencing DOM Elements (e.g. Focus / Scroll)

```tsx
import { useRef } from "react";

export function SearchInput() {
  // 1. Initialize ref with null
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus() {
    // 2. Access underlying DOM node via .current
    inputRef.current?.focus();
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button type="button" onClick={handleFocus}>
        Focus Input
      </button>
    </div>
  );
}
```

---

## 2. Storing Mutable Data Without Re-Rendering

Use `useRef` when you need to track information (like timer IDs or previous state snapshots) that should not affect the visual UI:

```tsx
import { useState, useRef, useEffect } from "react";

export function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function start() {
    if (timerRef.current !== null) return;
    timerRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  }

  function stop() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    return () => stop(); // Cleanup timer on unmount
  }, []);

  return (
    <div>
      <p>Time: {seconds}s</p>
      <button type="button" onClick={start}>Start</button>
      <button type="button" onClick={stop}>Stop</button>
    </div>
  );
}
```

---

## Related Topics

- [useState Hook](/docs/react/use-state)
- [useEffect Hook](/docs/react/use-effect)
- [DOM Basics](/docs/javascript/dom-basics)
