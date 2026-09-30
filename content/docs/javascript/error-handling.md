---
title: "JavaScript Error Handling (try, catch, throw, Error)"
description: "Mastering error handling in JavaScript: try/catch/finally blocks, standard Error subclasses (TypeError, SyntaxError), custom error classes, and unhandled rejections."
category: programming
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - errors
  - try-catch
  - exceptions
  - debugging
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Error Handling (try, catch, throw, Error)

Robust error handling ensures applications degrade gracefully and log actionable diagnostics when runtime failures occur.

---

## 1. The `try...catch...finally` Statement

```javascript
try {
  // Code that may throw an exception
  const data = JSON.parse(rawString);
  processData(data);
} catch (error) {
  // Executed if an error was thrown inside try block
  console.error("Parsing failed:", error.name, error.message);
} finally {
  // Always executed, regardless of whether an error was thrown
  cleanupTemporaryResources();
}
```

---

## 2. Standard Built-in Error Types

| Error Class | Trigger Scenario | Example |
| :--- | :--- | :--- |
| **`Error`** | Base generic error class | `throw new Error("Something went wrong");` |
| **`TypeError`** | Operation on wrong data type or null/undefined | `null.toUpperCase()` |
| **`ReferenceError`** | Accessing a non-existent or TDZ variable | `console.log(undefinedVar)` |
| **`SyntaxError`** | Invalid JavaScript or malformed JSON | `JSON.parse("invalid{")` |
| **`RangeError`** | Value outside allowable numeric range | `new Array(-1)` |

---

## 3. Creating Custom Error Classes

Subclassing `Error` allows you to add custom HTTP status codes or error tags:

```javascript
export class ApiError extends Error {
  constructor(message, statusCode, code = "INTERNAL_ERROR") {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

// Throwing custom error:
throw new ApiError("User account suspended", 403, "ACCOUNT_SUSPENDED");
```

---

## 4. Catching Global Unhandled Errors

### In Node.js:
```javascript
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1); // Exit safely
});
```

### In Browser:
```javascript
window.addEventListener("error", (event) => {
  console.error("Global script error:", event.error);
});
```

---

## Related Topics

- [Cannot read properties of undefined Error Fix](/errors/javascript/cannot-read-properties-of-undefined)
- [Async and Await](/docs/javascript/async-await)
- [Debugging Fundamentals](/docs/fundamentals/debugging-fundamentals)
