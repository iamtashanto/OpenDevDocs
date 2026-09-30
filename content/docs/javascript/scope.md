---
title: "JavaScript Scope and Hoisting"
description: "Understanding scope hierarchy in JavaScript: Global, Module, Function, Block scope, lexical scoping, and variable/function hoisting."
category: programming
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - scope
  - hoisting
  - lexical-scope
  - closures
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Scope and Hoisting

**Scope** determines the accessibility and visibility of variables, functions, and objects in some particular part of your code during runtime.

---

## 1. The 4 Scope Levels in JavaScript

```
[ Global Scope ] ──────────────────────────────────────────────┐
  │                                                            │
  ├─► [ Module Scope ] (ES Modules: import/export)             │
  │     │                                                      │
  │     ├─► [ Function Scope ] (Variables inside function)     │
  │     │     │                                                │
  │     │     └─► [ Block Scope ] (Variables inside if/for {}) │
```

### 1. Global Scope
Variables declared outside any function or block are in the global scope (attached to `window` in browsers or `globalThis`).

### 2. Function Scope
Variables declared inside a function are local to that function and inaccessible from outside.

### 3. Block Scope (`let` and `const`)
Variables declared with `let` and `const` inside curly braces `{}` cannot be accessed outside the block:

```javascript
{
  const blockSecret = "secret123";
  let counter = 10;
  var functionScoped = "leaked";
}

// console.log(blockSecret); // ReferenceError: blockSecret is not defined
console.log(functionScoped);  // "leaked" (var does not respect block scope!)
```

---

## 2. Lexical Scope (Scope Chain)

JavaScript uses **lexical scoping** (static scoping): an inner function has access to variables defined in its parent outer lexical environment:

```javascript
const globalVar = "Global";

function outer() {
  const outerVar = "Outer";

  function inner() {
    const innerVar = "Inner";
    console.log(`${innerVar} -> ${outerVar} -> ${globalVar}`);
  }

  inner();
}

outer(); // "Inner -> Outer -> Global"
```

---

## 3. Hoisting and Temporal Dead Zone

- **Function Declarations**: Hoisted completely with their body implementation. Can be called before their line of definition.
- **`var` Declarations**: Hoisted and initialized with `undefined`.
- **`let` and `const`**: Hoisted into the **Temporal Dead Zone (TDZ)** without initialization. Accessing them before declaration throws a `ReferenceError`.

---

## Related Topics

- [JavaScript Variables (let, const, var)](/docs/javascript/variables)
- [Closures and Encapsulation](/docs/javascript/closures)
- [Functions & Arrow Functions](/docs/javascript/functions)
