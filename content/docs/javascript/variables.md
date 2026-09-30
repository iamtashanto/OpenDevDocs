---
title: JavaScript Variables (let, const, var)
description: Complete guide to variable declarations, block scoping, TDZ, and immutability in modern JavaScript.
category: programming
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - variables
  - scoping
  - fundamentals
platforms:
  - web
  - node
tested:
  node: "22.x"
  v8: "current"
lastVerified: "2026-09-30"
---

## Overview

In modern JavaScript (ES6+), variable declarations should prioritize `const` and `let` over legacy `var`. Understanding how hoisting, block scope, and the Temporal Dead Zone (TDZ) operate is foundational to writing bug-free JavaScript.

---

## Comparison Summary

| Keyword | Scope | Hoisted | Temporal Dead Zone | Re-assignable | Re-declarable |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `const` | Block `{}` | Yes (uninitialized) | **Yes** | ❌ No | ❌ No |
| `let` | Block `{}` | Yes (uninitialized) | **Yes** | ✅ Yes | ❌ No |
| `var` | Function `()` | Yes (initialized `undefined`) | ❌ No | ✅ Yes | ✅ Yes |

---

## 1. `const` (Constant Declarations)

Always use `const` by default unless you know the variable value needs to be reassigned.

```javascript
const API_URL = "https://api.example.com";
const user = { name: "Alex", role: "developer" };

// Valid: mutating properties of a const object
user.role = "lead";

// TypeError: Assignment to constant variable.
// API_URL = "https://other.com";
```

<Callout type="tip" title="Object Mutation">
`const` prevents reassignment of the variable binding identifier, but does **not** make object contents immutable. Use `Object.freeze()` if shallow immutability is required.
</Callout>

---

## 2. `let` (Block-Scoped Mutable Variables)

Use `let` when a value will be reassigned (e.g. counters in loops, state accumulators):

```javascript
let count = 0;

for (let i = 0; i < 5; i++) {
  count += i;
}

console.log(count); // 10
// console.log(i); // ReferenceError: i is not defined
```

---

## 3. The Temporal Dead Zone (TDZ)

Variables declared with `let` and `const` exist in the Temporal Dead Zone from the beginning of their enclosing block until execution reaches the declaration line:

```javascript
{
  // TDZ begins
  // console.log(temp); // ReferenceError: Cannot access 'temp' before initialization
  
  let temp = 42; // TDZ ends
  console.log(temp); // 42
}
```

---

## Best Practices

1. **Default to `const`**: 90%+ of your variables should be declared with `const`.
2. **Use `let` only for stateful changes**: Loop iterators, conditional reassignment.
3. **Avoid `var`**: `var` lacks block scoping and silently pollutes global or function scopes.
