---
title: Node.js Error Handling
description: Handle operational vs programmer errors, create custom error classes, and prevent process crashes in Node.js applications.
category: backend
topic: nodejs
type: guide
level: intermediate
tags:
  - nodejs
  - errors
  - debugging
  - exceptions
  - reliability
platforms:
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Operational vs Programmer Errors

In backend Node.js applications, errors belong to two distinct categories:

1. **Operational Errors**: Known, predictable runtime errors (e.g. invalid user input, database timeout, file not found). These should be caught, handled gracefully, and reported with appropriate HTTP status codes.
2. **Programmer Errors**: Bugs in the code (e.g. `TypeError: cannot read properties of undefined`, syntax errors, unhandled null pointers). The application state may be corrupted, and the process should be restarted.

---

## Creating Custom Application Errors

```typescript
// src/errors/AppError.ts
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} was not found`, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
```

---

## Catching Uncaught Exceptions and Rejections

Unhandled errors should be captured to log diagnostic telemetry before gracefully restarting the server:

```javascript
// src/server.js

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection at:', promise, 'reason:', reason);
  // Log to error tracker (Sentry / Datadog)
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception thrown:', error);
  // Process is in an undefined state; flush logs and exit
  process.exit(1);
});
```

---

## Best Practices

- **Never swallow errors**: Avoid empty `catch {}` blocks. Always log or propagate the error.
- **Preserve Error Stacks**: Wrap lower-level errors using `Error.cause` (`new Error('Failed to fetch user', { cause: originalError })`).
- **Use Process Managers in Production**: Pair uncaught exception exits with a process manager like Docker, Kubernetes, or PM2 to instantly spin up healthy replacement containers.
