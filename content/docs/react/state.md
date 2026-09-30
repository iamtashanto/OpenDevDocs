---
title: "React State and Component Memory"
description: "Understanding component state in React: useState hook, immutability rules, state updates, and lifting state up."
category: frontend
topic: react
type: guide
level: beginner
tags:
  - react
  - state
  - use-state
  - reactivity
  - memory
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# React State and Component Memory

**State** is a component's internal memory. Unlike regular JavaScript variables that reset on every function execution, React preserves state across re-renders and automatically updates the DOM whenever state changes.

---

## 1. Declaring State with `useState`

```tsx
import { useState } from "react";

export function Counter() {
  // [currentValue, setterFunction] = useState(initialValue)
  const [count, setCount] = useState<number>(0);

  function handleIncrement() {
    // Updater function ensures correct state during rapid updates:
    setCount(prev => prev + 1);
  }

  return (
    <div>
      <p>Current Count: {count}</p>
      <button type="button" onClick={handleIncrement}>
        Increment
      </button>
    </div>
  );
}
```

---

## 2. The Golden Rule of State: Never Mutate Directly!

State in React must be treated as **immutable**. Never modify properties directly on state objects or arrays:

```tsx
// ❌ WRONG: Mutating state directly does NOT trigger re-render!
// user.name = "Alex";
// setUser(user);

// ✅ CORRECT: Create a new object snapshot using spread operator:
setUser(prevUser => ({
  ...prevUser,
  name: "Alex",
}));

// Updating an array immutably:
setItems(prevItems => [...prevItems, "New Item"]);
```

---

## 3. Lifting State Up

When two or more sibling components need to share or coordinate the same state, move the state up to their closest common parent component and pass it down via `props`.

---

## Related Topics

- [useState Hook in Depth](/docs/react/use-state)
- [Event Handling](/docs/react/events)
- [React Forms & Controlled Inputs](/docs/react/forms)
