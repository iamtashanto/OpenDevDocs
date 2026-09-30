---
title: Express.js Error Handling
description: Implement centralized global error middleware, handle 404 routes, custom error classes, and prevent silent unhandled exceptions.
category: backend
topic: express
type: guide
level: intermediate
tags:
  - express
  - error-handling
  - middleware
  - debugging
  - architecture
platforms:
  - node
tested:
  node: "22.x"
  express: "4.21.x"
lastVerified: "2026-09-30"
---

## Overview

In Express, error handling is handled centrally through 4-argument middleware functions `(err, req, res, next)`. When an error is passed to `next(err)`, Express skips all remaining standard middleware and jumps directly to error handlers.

---

## 1. Custom Application Error Class

```typescript
// src/errors/HttpError.ts
export class HttpError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}
```

---

## 2. Catching 404 Not Found Routes

Place a 404 handler after all defined routes:

```typescript
// src/middleware/notFound.ts
import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/HttpError.js';

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  next(new NotFoundError(`Path ${req.originalUrl} not found`));
}
```

---

## 3. Global Error Handling Middleware

Place the global error handler as the **very last** middleware in `app.ts`:

```typescript
// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/HttpError.js';

export function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
      },
    });
  }

  // Programmer or unexpected crash
  console.error('[CRITICAL UNHANDLED ERROR]:', err);

  return res.status(500).json({
    success: false,
    error: {
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal Server Error' 
        : err.message,
      statusCode: 500,
    },
  });
}
```

---

## Complete Registration in `app.ts`

```typescript
import express from 'express';
import apiRouter from './routes/index.js';
import { notFoundHandler } from './middleware/notFound.js';
import { globalErrorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

// Routes
app.use('/api/v1', apiRouter);

// 404 Catch-all
app.use(notFoundHandler);

// Centralized Error Handler (MUST HAVE 4 ARGUMENTS)
app.use(globalErrorHandler);

export default app;
```
