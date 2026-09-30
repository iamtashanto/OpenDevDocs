---
title: "JavaScript Operators & Strict Equality"
description: "Mastering JavaScript operators: arithmetic, logical (&&, ||, ??), comparison (== vs ===), optional chaining (?.), and ternary expressions."
category: programming
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - operators
  - equality
  - nullish-coalescing
  - optional-chaining
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Operators & Strict Equality

Operators perform mathematical calculations, string concatenations, logical evaluations, and conditional assignments.

---

## 1. Strict (`===`) vs. Loose (`==`) Equality

Always use **Strict Equality (`===`)**. Loose equality (`==`) performs unpredictable type coercion:

```javascript
// ❌ Loose Equality (Performs Coercion)
0 == false;        // true
"" == false;       // true
null == undefined; // true
"42" == 42;        // true

// ✅ Strict Equality (Compares Type AND Value)
0 === false;        // false
"" === false;       // false
null === undefined; // false
"42" === 42;        // false
```

---

## 2. Logical Operators & Short-Circuit Evaluation

| Operator | Name | Short-Circuit Rule | Example |
| :--- | :--- | :--- | :--- |
| **`&&`** | Logical AND | Returns first falsy value, or last truthy value | `user.isAdmin && renderAdminPanel()` |
| **`\|\|`** | Logical OR | Returns first truthy value, or last falsy value | `const name = input \|\| "Anonymous"` |
| **`??`** | Nullish Coalescing | Returns right-hand value **ONLY if left-hand is `null` or `undefined`** | `const port = process.env.PORT ?? 3000` |

### Why `??` is Better than `||` for Defaults:
```javascript
const count = 0;

// ❌ Bug: 0 is falsy, so || overrides it to 10
const pageSize1 = count || 10; // 10

// ✅ Correct: 0 is not null/undefined, so ?? preserves 0
const pageSize2 = count ?? 10; // 0
```

---

## 3. Optional Chaining (`?.`)

Optional chaining prevents `TypeError: Cannot read properties of undefined` when traversing deeply nested properties that might not exist:

```javascript
const user = {
  profile: null,
};

// ❌ Crashes with TypeError: Cannot read properties of null
// const city = user.profile.address.city;

// ✅ Safe: returns undefined immediately without throwing
const city = user.profile?.address?.city;
console.log(city); // undefined
```

---

## 4. Conditional (Ternary) Operator

A concise inline replacement for `if...else` statements:

```javascript
const status = isOnline ? "Active" : "Offline";
```

---

## Related Topics

- [JavaScript Data Types](/docs/javascript/data-types)
- [Conditional Statements & Switch](/docs/javascript/conditions)
- [Cannot read properties of undefined Error Fix](/errors/javascript/cannot-read-properties-of-undefined)
