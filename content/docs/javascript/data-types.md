---
title: "JavaScript Data Types & Type Coercion"
description: "Mastering JavaScript data types: 7 primitives (string, number, bigint, boolean, undefined, null, symbol), Objects, typeof operator, and type coercion."
category: programming
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - data-types
  - primitives
  - coercion
  - types
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Data Types & Type Coercion

In JavaScript, every value is categorized as either a **Primitive** or an **Object**.

---

## 1. The 7 Primitive Types

Primitives are immutable values passed by value (copied).

| Type | Example | `typeof` Result | Notes |
| :--- | :--- | :--- | :--- |
| **String** | `"OpenDevDocs"`, `'text'`, `` `template` `` | `"string"` | UTF-16 text sequence |
| **Number** | `42`, `3.14`, `-0`, `NaN`, `Infinity` | `"number"` | IEEE 754 64-bit float |
| **BigInt** | `9007199254740991n` | `"bigint"` | Arbitrary-precision integers |
| **Boolean** | `true`, `false` | `"boolean"` | Logical flags |
| **Undefined** | `undefined` | `"undefined"` | Variable declared but unassigned |
| **Null** | `null` | `"object"` *(legacy bug)* | Intentional absence of any value |
| **Symbol** | `Symbol("uniqueId")` | `"symbol"` | Guaranteed globally unique identifier |

---

## 2. Objects (Reference Types)

Objects, Arrays, Functions, Dates, and RegExps are **Reference Types** stored in heap memory. Assigning an object copies its memory reference, not the underlying data:

```javascript
const obj1 = { name: "Alex" };
const obj2 = obj1; // Copies reference

obj2.name = "Sarah";
console.log(obj1.name); // "Sarah" (mutated same memory object!)
```

---

## 3. Explicit vs. Implicit Type Coercion

### Implicit Coercion (Avoid)
```javascript
"5" + 2;   // "52" (number coerced to string due to +)
"5" - 2;   // 3    (string coerced to number)
true + 1;  // 2    (true coerced to 1)
```

### Explicit Conversion (Best Practice)
```javascript
const str = "42";
const num = Number(str);         // 42
const bool = Boolean(str);       // true
const text = String(100);        // "100"
```

---

## 4. `null` vs. `undefined`

- **`undefined`**: The variable has been declared, but has not yet been assigned a value (or a function returned nothing).
- **`null`**: An explicit assignment made by the developer indicating "this value is intentionally empty".

```javascript
let user;
console.log(user); // undefined

let activeSession = null; // explicitly cleared
```

---

## Related Topics

- [JavaScript Variables (let, const, var)](/docs/javascript/variables)
- [Operators & Equality (== vs ===)](/docs/javascript/operators)
- [Cannot read properties of undefined Troubleshooting](/errors/javascript/cannot-read-properties-of-undefined)
