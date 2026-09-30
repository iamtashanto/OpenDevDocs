---
title: Express.js Middleware Pipeline
description: Master Express middleware execution flow, custom authentication guards, request modification, and next() mechanics.
category: backend
topic: express
type: guide
level: intermediate
tags:
  - express
  - middleware
  - pipeline
  - auth
  - architecture
platforms:
  - node
tested:
  node: "22.x"
  express: "4.21.x"
lastVerified: "2026-09-30"
---

## What is Express Middleware?

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` function in the application’s request-response cycle.

```
Request ──> [ Middleware 1 ] ──> [ Middleware 2 ] ──> [ Route Handler ] ──> Response
```

---

## The Middleware Signature

```typescript
import { Request, Response, NextFunction } from 'express';

export function myMiddleware(req: Request, res: Response, next: NextFunction) {
  // 1. Perform logic or inspect headers
  console.log(`${req.method} ${req.path}`);

  // 2. Pass control to the next middleware in line
  next();

  // Or terminate the request immediately:
  // return res.status(401).json({ error: 'Unauthorized' });
}
```

---

## 4 Categories of Middleware

### 1. Application-Level Middleware
Bound to an instance of `app.use()` and runs for all routes:

```typescript
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});
```

### 2. Router-Level Middleware
Bound to an instance of `express.Router()`:

```typescript
const adminRouter = express.Router();
adminRouter.use(requireAdminAuth);
```

### 3. Route-Specific Middleware
Attached directly to individual route definitions:

```typescript
router.post('/posts', requireAuth, validatePostPayload, createPostHandler);
```

### 4. Error-Handling Middleware
Takes **4 arguments** `(err, req, res, next)` and catches any error passed via `next(err)`:

```typescript
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: err.message });
});
```

---

## Custom Authentication Middleware Example

```typescript
// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
```
