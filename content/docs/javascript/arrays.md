---
title: "JavaScript Arrays and Array Methods"
description: "Mastering modern JavaScript arrays: map, filter, reduce, find, some, every, flatMap, slice vs splice, and immutable transformations."
category: programming
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - arrays
  - map
  - filter
  - reduce
  - immutability
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Arrays and Array Methods

Arrays are ordered, zero-indexed collections of values capable of storing mixed data types and executing functional transformations.

---

## 1. Immutable Iteration Methods (Preferred)

Modern functional JavaScript avoids manual for-loops in favor of declarative, immutable array methods:

```javascript
const numbers = [1, 2, 3, 4, 5];

// 1. map(): Transform every item -> returns new array of same length
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// 2. filter(): Keep items matching predicate -> returns new array
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// 3. reduce(): Accumulate array into a single value (sum, object, map)
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0); // 15
```

---

## 2. Searching and Testing Methods

```javascript
const users = [
  { id: 1, name: "Alex", active: true },
  { id: 2, name: "Sam", active: false },
  { id: 3, name: "Taylor", active: true },
];

// find(): Returns the FIRST matching element (or undefined)
const user = users.find(u => u.id === 2); // { id: 2, name: "Sam", ... }

// some(): Returns true if AT LEAST ONE element matches
const hasInactive = users.some(u => !u.active); // true

// every(): Returns true if ALL elements match
const allActive = users.every(u => u.active); // false

// includes(): Primitive value check
const tags = ["react", "nextjs", "node"];
tags.includes("nextjs"); // true
```

---

## 3. `slice()` vs. `splice()`

| Method | Mutates Original Array? | Returns | Typical Usage |
| :--- | :--- | :--- | :--- |
| **`slice(start, end)`** | ❌ **No (Immutable)** | Shallow copy of selected portion | Pagination, copying sub-arrays |
| **`splice(start, deleteCount, ...items)`** | ✅ **Yes (Mutating)** | Removed items array | In-place removal or insertion |

```javascript
const letters = ["a", "b", "c", "d"];

// slice() does not modify letters:
const sub = letters.slice(1, 3); // ["b", "c"]
console.log(letters);            // ["a", "b", "c", "d"]

// splice() modifies letters in-place:
letters.splice(1, 2);            // Removes "b" and "c"
console.log(letters);            // ["a", "d"]
```

---

## Related Topics

- [JavaScript Objects](/docs/javascript/objects)
- [Destructuring and Spread Operator](/docs/javascript/destructuring)
- [Loops and Iteration](/docs/javascript/loops)
