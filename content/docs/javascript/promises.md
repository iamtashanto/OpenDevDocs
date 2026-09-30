---
title: "JavaScript Promises and Asynchronous State"
description: "Mastering JavaScript Promises: pending/fulfilled/rejected states, then/catch/finally chaining, Promise.all, Promise.allSettled, and Promise.race."
category: programming
topic: javascript
type: guide
level: intermediate
tags:
  - javascript
  - promises
  - async
  - concurrency
  - state
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Promises and Asynchronous State

A **Promise** is a proxy for a value that is not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason.

---

## 1. The Three Promise States

```
                 ┌────────────────────────────────┐
                 │       Promise [Pending]        │
                 └───────────────┬────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼ (resolve)                     ▼ (reject)
┌─────────────────────────────────┐   ┌────────────────────────────────┐
│      Promise [Fulfilled]        │   │       Promise [Rejected]       │
│      .then(value => ...)        │   │      .catch(error => ...)      │
└─────────────────────────────────┘   └────────────────────────────────┘
```

1. **`pending`**: Initial state, neither fulfilled nor rejected.
2. **`fulfilled`**: The operation completed successfully.
3. **`rejected`**: The operation failed with an error reason.

Once settled (fulfilled or rejected), a promise's state is **immutable** and cannot transition again.

---

## 2. Creating and Chaining Promises

```javascript
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "Alex" });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 500);
  });
}

// Consuming with .then / .catch / .finally:
fetchUserData(1)
  .then(user => {
    console.log("User retrieved:", user);
    return user.id; // Returns a new Promise resolved to user.id
  })
  .then(id => {
    console.log("User ID is:", id);
  })
  .catch(err => {
    console.error("Fetch failed:", err.message);
  })
  .finally(() => {
    console.log("Cleanup: request finished.");
  });
```

---

## 3. Promise Concurrency Combinators

| Combinator | Behavior | Fails Fast? | Best Used For |
| :--- | :--- | :--- | :--- |
| **`Promise.all([p1, p2])`** | Resolves when **ALL** promises fulfill. Rejects if **ANY single** promise rejects. | ✅ Yes | Parallel required requests (e.g. user + permissions). |
| **`Promise.allSettled([p1, p2])`** | Waits for **ALL** promises to settle (never rejects). Returns array of `{status, value/reason}` objects. | ❌ No | Batch operations where partial failures are acceptable (e.g. sending batch emails). |
| **`Promise.race([p1, p2])`** | Settles as soon as the **FIRST** promise settles (fulfilled or rejected). | ✅ Yes | Implementing network timeouts. |
| **`Promise.any([p1, p2])`** | Resolves as soon as the **FIRST** promise **fulfills**. Rejects only if all reject. | ❌ No | Redundant mirror fetching. |

---

## Related Topics

- [Async / Await Syntax](/docs/javascript/async-await)
- [Error Handling & Try/Catch](/docs/javascript/error-handling)
- [The JavaScript Event Loop](/docs/javascript/event-loop)
- [Fetch API](/docs/javascript/fetch)
