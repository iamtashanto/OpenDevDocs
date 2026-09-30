---
title: "JavaScript Closures and Encapsulation"
description: "Understanding closures in JavaScript: lexical environments, private state encapsulation, factory functions, and common loop closure pitfalls."
category: programming
topic: javascript
type: guide
level: intermediate
tags:
  - javascript
  - closures
  - encapsulation
  - functions
  - memory
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Closures and Encapsulation

A **closure** is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created, at function creation time.

---

## 1. The Core Closure Mental Model

A closure gives an inner function access to an outer function's scope even **after the outer function has finished executing and returned**:

```javascript
function createCounter(initialValue = 0) {
  let count = initialValue; // Private variable closed over

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

const counterA = createCounter(10);
console.log(counterA.increment()); // 11
console.log(counterA.increment()); // 12
console.log(counterA.getCount());  // 12

// `count` cannot be modified directly from the outside!
// counterA.count = 999; // Does not affect internal closed count
```

---

## 2. Practical Use Case: Function Currying / Config Factories

```javascript
function createLogger(moduleName) {
  return function log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${moduleName.toUpperCase()}]: ${message}`);
  };
}

const authLogger = createLogger("AuthService");
const dbLogger = createLogger("PostgresDB");

authLogger("User logged in successfully"); 
// "[2026-10-01...] [AUTHSERVICE]: User logged in successfully"

dbLogger("Connection pool initialized");
// "[2026-10-01...] [POSTGRESDB]: Connection pool initialized"
```

---

## 3. The Classic Loop Closure Problem

```javascript
// ❌ Bug with `var`: all callbacks share the single hoisted `i` (= 3)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 100);
}
// Prints: 3, 3, 3

// ✅ Fixed with `let`: creates a new block-scoped binding per iteration
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 100);
}
// Prints: 0, 1, 2
```

---

## Related Topics

- [JavaScript Scope and Hoisting](/docs/javascript/scope)
- [Functions & Arrow Functions](/docs/javascript/functions)
- [JavaScript Modules (ESM)](/docs/javascript/modules)
