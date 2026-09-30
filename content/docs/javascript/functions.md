---
title: "JavaScript Functions & Arrow Functions"
description: "Mastering JavaScript functions: declarations vs expressions, arrow functions, default parameters, rest parameters, and lexical 'this' binding."
category: programming
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - functions
  - arrow-functions
  - this
  - parameters
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Functions & Arrow Functions

Functions are fundamental building blocks in JavaScript that encapsulate reusable blocks of logic, accept arguments, and return computed results.

---

## 1. Function Declarations vs. Arrow Functions

| Feature | Function Declaration | Arrow Function |
| :--- | :--- | :--- |
| **Syntax** | `function add(a, b) { return a + b; }` | `const add = (a, b) => a + b;` |
| **Hoisting** | ✅ Yes (callable before declaration) | ❌ No (lives in Temporal Dead Zone) |
| **`this` Binding** | Dynamic (determined by how function is called) | **Lexical** (inherits `this` from parent scope) |
| **`arguments` object** | ✅ Available | ❌ Not available (use rest `...args`) |
| **Constructor (`new`)** | ✅ Can be instantiated | ❌ Cannot be used with `new` |

---

## 2. Concise Arrow Function Syntax

```javascript
// Single parameter (parentheses optional):
const double = x => x * 2;

// Multiple parameters + implicit return:
const sum = (a, b) => a + b;

// Implicit return of an Object (wrap in parentheses):
const makeUser = (name, id) => ({ name, id });

// Multi-line block body (explicit return required):
const calculateTotal = (price, tax) => {
  const subtotal = price * (1 + tax);
  return Math.round(subtotal * 100) / 100;
};
```

---

## 3. Default and Rest Parameters

### Default Parameters
```javascript
function sendNotification(message, priority = "normal") {
  console.log(`[${priority.toUpperCase()}] ${message}`);
}

sendNotification("Deployment successful"); // "[NORMAL] Deployment successful"
```

### Rest Parameters (`...args`)
Collects an arbitrary number of trailing arguments into a real JavaScript array:

```javascript
function formatLog(level, ...messages) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}]`, messages.join(" "));
}

formatLog("ERROR", "Database", "connection", "timed", "out");
```

---

## 4. First-Class Functions & Callbacks

In JavaScript, functions are **first-class citizens**—they can be assigned to variables, passed as arguments to other functions (callbacks), and returned from functions:

```javascript
function executeTimer(durationMs, callback) {
  setTimeout(callback, durationMs);
}

executeTimer(1000, () => {
  console.log("Timer expired!");
});
```

---

## Related Topics

- [Scope and Hoisting](/docs/javascript/scope)
- [Closures and Higher-Order Functions](/docs/javascript/closures)
- [Array Methods (map, filter, reduce)](/docs/javascript/arrays)
