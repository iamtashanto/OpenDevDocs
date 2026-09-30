---
title: "The useEffect Hook in React"
description: "Mastering useEffect: synchronizing with external systems, cleanup functions, dependency array rules, and avoiding unnecessary effects."
category: frontend
topic: react
type: guide
level: intermediate
tags:
  - react
  - hooks
  - use-effect
  - lifecycle
  - cleanup
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# The `useEffect` Hook in React

The **`useEffect`** hook lets you synchronize a component with external systems (such as browser APIs, network subscriptions, document titles, or timers).

---

## 1. Syntax and Anatomy

```tsx
import { useEffect } from "react";

useEffect(() => {
  // 1. Setup code (runs after DOM renders)
  const connection = createChatConnection(roomId);
  connection.connect();

  // 2. Cleanup function (runs before next effect and on component unmount)
  return () => {
    connection.disconnect();
  };
}, [roomId]); // 3. Dependency array
```

---

## 2. Dependency Array Rules

| Dependency Option | Execution Timing |
| :--- | :--- |
| **Omitted** `useEffect(fn)` | Runs after **every single render** (rarely desired). |
| **Empty Array** `[]` | Runs **once on mount**, cleans up on unmount. |
| **With Dependencies** `[dep1, dep2]` | Runs on mount and whenever `dep1` or `dep2` changes identity (`Object.is`). |

---

## 3. When NOT to Use `useEffect`

<Callout type="warning" title="You Might Not Need an Effect">
Do NOT use `useEffect` to transform data for rendering or to handle user click interactions.
</Callout>

### ❌ Anti-Pattern: Syncing state with props in an effect
```tsx
// ❌ Redundant effect causes unnecessary extra re-render
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// ✅ Correct: Calculate directly during render!
const fullName = `${firstName} ${lastName}`;
```

---

## Related Topics

- [useState Hook](/docs/react/use-state)
- [useRef Hook](/docs/react/use-ref)
- [Custom Hooks in React](/docs/react/custom-hooks)
