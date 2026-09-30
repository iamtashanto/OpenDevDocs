---
title: "Common React Mistakes and Anti-Patterns"
description: "Avoiding frequent React mistakes: mutating state directly, infinite useEffect loops, missing keys, stale closures, and over-using Context."
category: frontend
topic: react
type: troubleshooting
level: intermediate
tags:
  - react
  - anti-patterns
  - mistakes
  - troubleshooting
  - debugging
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# Common React Mistakes and Anti-Patterns

A diagnostic checklist of the most common mistakes made in React codebases.

---

## 1. Mutating State Directly
```tsx
// ❌ WRONG: Mutating existing array
items.push("new item");
setItems(items); // React thinks reference didn't change!

// ✅ CORRECT: Return a new array reference
setItems([...items, "new item"]);
```

---

## 2. Infinite `useEffect` Render Loops
```tsx
// ❌ WRONG: Updating state that is in the dependency array
const [data, setData] = useState([]);
useEffect(() => {
  fetchData().then(res => setData(res)); // Triggers re-render -> triggers effect -> infinite loop!
}, [data]);

// ✅ CORRECT: Empty array or specific ID dependency
useEffect(() => {
  fetchData().then(res => setData(res));
}, []); // Runs once on mount
```

---

## 3. Stale Closures in Asynchronous Code
```tsx
// ❌ Bug: `count` is captured at the time setInterval was initialized (always 0)
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);

// ✅ Fix: Use the functional updater form
useEffect(() => {
  const id = setInterval(() => {
    setCount(prev => prev + 1); // Always gets latest value
  }, 1000);
  return () => clearInterval(id);
}, []);
```

---

## 4. Derived State Stored in State
```tsx
// ❌ Anti-pattern: Redundant state sync
const [users, setUsers] = useState([]);
const [activeUsers, setActiveUsers] = useState([]);

// ✅ Fix: Derive directly during render!
const activeUsers = users.filter(u => u.isActive);
```

---

## Related Topics

- [React State Management](/docs/react/state)
- [useEffect Hook](/docs/react/use-effect)
- [Lists and Keys](/docs/react/lists-and-keys)
