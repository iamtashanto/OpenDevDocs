---
title: "JavaScript Async and Await"
description: "Mastering async/await syntax: synchronous-style asynchronous code, sequential vs parallel execution, and error handling with try/catch."
category: programming
topic: javascript
type: guide
level: intermediate
tags:
  - javascript
  - async-await
  - promises
  - asynchronous
  - syntax
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Async and Await

`async` and `await` provide syntactic sugar over Promises, allowing developers to write asynchronous non-blocking code that reads sequentially like synchronous code.

---

## 1. Syntax Basics

- Adding `async` before a function declaration ensures the function **always returns a Promise**.
- The `await` keyword pauses function execution until the awaited Promise settles. `await` can only be used inside `async` functions or at the top level of ES Modules.

```javascript
async function loadUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Failed to load user:", error.message);
    throw error; // Re-throw or return fallback
  }
}
```

---

## 2. Sequential vs. Parallel Execution Pitfall

### ❌ Anti-Pattern: Unintentional Sequential Waterfall
Awaiting independent promises sequentially doubles total network wait time:

```javascript
// Total time = 1000ms + 1000ms = 2000ms
async function loadDashboardWaterfall() {
  const user = await fetchUser();       // Takes 1000ms
  const stats = await fetchAnalytics(); // Takes 1000ms (waited unnecessarily for user!)
  return { user, stats };
}
```

### ✅ Best Practice: Parallel Execution with `Promise.all`
```javascript
// Total time = Math.max(1000ms, 1000ms) = 1000ms
async function loadDashboardParallel() {
  const [user, stats] = await Promise.all([
    fetchUser(),
    fetchAnalytics(),
  ]);
  return { user, stats };
}
```

---

## 3. Top-Level `await` (ES Modules)

In modern ES Modules, you can use `await` directly in module scope without wrapping it in an `async function`:

```javascript
// config.js
const res = await fetch("https://api.example.com/remote-config");
export const remoteConfig = await res.json();
```

---

## Related Topics

- [JavaScript Promises in Depth](/docs/javascript/promises)
- [Error Handling & Custom Exceptions](/docs/javascript/error-handling)
- [Fetch API & Request Headers](/docs/javascript/fetch)
- [The JavaScript Event Loop](/docs/javascript/event-loop)
