---
title: "JavaScript Conditions (if, else, switch, truthy/falsy)"
description: "Control flow in JavaScript: if/else branching, switch statements, truthy vs. falsy values, and early return guard clauses."
category: programming
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - conditions
  - control-flow
  - if-else
  - switch
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Conditions (if, else, switch, truthy/falsy)

Conditional statements control the execution flow of programs based on boolean expressions.

---

## 1. Truthy and Falsy Values

In JavaScript, any value can be evaluated in a boolean context.

### The 8 Falsy Values in JavaScript:
1. `false`
2. `0`, `-0`, `0n` (BigInt zero)
3. `""` (empty string)
4. `null`
5. `undefined`
6. `NaN`
7. `document.all` (legacy browser quirk)

**Everything else is Truthy**, including empty arrays `[]` and empty objects `{}`.

---

## 2. `if`, `else if`, and `else`

```javascript
const role = "admin";

if (role === "admin") {
  console.log("Full system access granted.");
} else if (role === "editor") {
  console.log("Edit privileges granted.");
} else {
  console.log("Read-only access.");
}
```

---

## 3. The "Early Return" Guard Clause Pattern

Avoid deeply nested `if/else` ladders by returning early when invalid conditions occur:

```javascript
// ❌ Deeply nested (Hard to read and test)
function processPayment(user, cart) {
  if (user) {
    if (user.hasValidCard) {
      if (cart.length > 0) {
        return chargeUser(user, cart);
      } else {
        throw new Error("Cart is empty");
      }
    } else {
      throw new Error("Invalid payment card");
    }
  } else {
    throw new Error("User not authenticated");
  }
}

// ✅ Guard Clauses (Flat, clean, easy to follow)
function processPayment(user, cart) {
  if (!user) throw new Error("User not authenticated");
  if (!user.hasValidCard) throw new Error("Invalid payment card");
  if (cart.length === 0) throw new Error("Cart is empty");

  return chargeUser(user, cart);
}
```

---

## 4. The `switch` Statement

Use `switch` when checking a single variable against multiple exact values:

```javascript
function getHttpStatusMessage(code) {
  switch (code) {
    case 200:
      return "OK";
    case 401:
      return "Unauthorized";
    case 404:
      return "Not Found";
    case 500:
      return "Internal Server Error";
    default:
      return "Unknown Status";
  }
}
```

---

## Related Topics

- [JavaScript Operators & Strict Equality](/docs/javascript/operators)
- [Loops and Iteration](/docs/javascript/loops)
- [Functions & Return Values](/docs/javascript/functions)
