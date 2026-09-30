---
title: "JavaScript Loops and Iteration"
description: "Mastering loops in JavaScript: for, while, do...while, for...of (iterables), for...in (keys), break, and continue."
category: programming
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - loops
  - iteration
  - for-of
  - for-in
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Loops and Iteration

Loops execute a code block repeatedly until a specified termination condition is met.

---

## 1. Comparing Loop Types

| Loop | Use Case | Example |
| :--- | :--- | :--- |
| **`for`** | Counted iteration with known start, end, and step. | `for (let i = 0; i < 5; i++)` |
| **`for...of`** | Iterating over **values** of an array, string, Set, or Map. | `for (const item of items)` |
| **`for...in`** | Iterating over enumerable **keys/properties** of an object. | `for (const key in user)` |
| **`while`** | Repeating while condition remains `true` (unknown iterations). | `while (hasMorePages)` |
| **`do...while`** | Guaranteed to execute **at least once** before evaluating condition. | `do { ... } while (retry);` |

---

## 2. `for...of` (Arrays) vs. `for...in` (Objects)

```javascript
const frameworks = ["Next.js", "React", "Vite"];

// ✅ for...of accesses array VALUES:
for (const fw of frameworks) {
  console.log(fw); // "Next.js", "React", "Vite"
}

const config = { host: "localhost", port: 3000 };

// ✅ for...in accesses object KEYS:
for (const key in config) {
  console.log(`${key}: ${config[key]}`); // "host: localhost", "port: 3000"
}
```

---

## 3. `break` and `continue`

- **`break`**: Immediately terminates the loop and jumps execution past the closing brace.
- **`continue`**: Skips the remainder of the current iteration and jumps directly to the next step.

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

for (const n of numbers) {
  if (n % 2 !== 0) continue; // Skip odd numbers
  if (n > 6) break;          // Stop when number exceeds 6

  console.log(n); // Prints: 2, 4, 6
}
```

---

## Related Topics

- [JavaScript Array Methods (map, filter, reduce)](/docs/javascript/arrays)
- [JavaScript Objects](/docs/javascript/objects)
- [Conditions & Guard Clauses](/docs/javascript/conditions)
