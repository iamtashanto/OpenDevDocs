---
title: API Error Handling Architecture
description: Design consistent, RFC 7807 Problem Details compliant error responses, handle uncaught exceptions, and protect internal error traces.
category: backend
topic: backend-concepts
type: guide
level: intermediate
tags:
  - backend
  - api
  - errors
  - rfc7807
  - architecture
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

A well-architected API delivers predictable, standardized error responses that give frontend clients actionable details without leaking sensitive internal infrastructure secrets.

---

## The Standard Error Response Structure

Avoid returning plain text strings (`res.status(500).send("error")`) or inconsistent JSON shapes. Adopt a unified schema across all endpoints:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "User with ID 'usr_123' does not exist.",
    "timestamp": "2026-10-01T02:00:00.000Z",
    "requestId": "req_8f42d1e2",
    "details": []
  }
}
```

---

## RFC 7807: Problem Details for HTTP APIs

For strict enterprise and public standards compliance, consider the official RFC 7807 specification using `Content-Type: application/problem+json`:

```json
{
  "type": "https://api.example.com/errors/insufficient-funds",
  "title": "Insufficient Funds",
  "status": 403,
  "detail": "Your account balance of $12.50 is lower than the transaction cost of $30.00.",
  "instance": "/accounts/acc_123/transactions"
}
```

---

## Centralized Error Handling Pipeline

Instead of writing repetitive `try/catch` blocks inside every route handler, funnel all errors to a global middleware:

```typescript
// Express Error Handling Middleware
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/errors/AppError';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  // Check if error is an operational AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.name,
        message: err.message,
        timestamp: new Date().toISOString(),
      },
    });
  }

  // Programmer / Unknown Internal Error
  console.error('[CRITICAL UNHANDLED ERROR]:', err);

  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected internal error occurred.',
      timestamp: new Date().toISOString(),
    },
  });
}
```

---

## Security: Never Expose Internal Stack Traces in Production

```javascript
// ❌ Dangerous in production (exposes directory paths and DB queries)
res.status(500).json({ error: err.message, stack: err.stack });

// ✅ Secure: Hide stack trace in production
res.status(500).json({
  error: 'Internal Server Error',
  stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
});
```
