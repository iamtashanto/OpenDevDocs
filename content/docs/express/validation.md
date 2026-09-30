---
title: Express.js Request Validation with Zod
description: Build type-safe validation middleware using Zod to validate request bodies, URL params, and query strings in Express.js.
category: backend
topic: express
type: guide
level: intermediate
tags:
  - express
  - validation
  - zod
  - typescript
  - middleware
platforms:
  - node
tested:
  node: "22.x"
  express: "4.21.x"
lastVerified: "2026-09-30"
---

## Overview

Validating incoming request payloads before they reach business logic prevents data corruption and security bugs. Combining **Express** with **Zod** gives you end-to-end type safety and automated request sanitization.

---

## Building a Generic Validation Middleware

```typescript
// src/middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate and parse body, query, and params
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Assign sanitized, parsed values back to request
      req.body = parsed.body;
      req.query = parsed.query;
      req.params = parsed.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      }

      next(error);
    }
  };
};
```

---

## Defining Validation Schemas

```typescript
// src/schemas/auth.schema.ts
import { z } from 'zod';

export const RegisterUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, 'Alphanumeric characters only'),
  }),
});

export const GetUserParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user UUID format'),
  }),
});
```

---

## Applying to Express Routes

```typescript
// src/routes/auth.routes.ts
import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { RegisterUserSchema, GetUserParamsSchema } from '../schemas/auth.schema.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post(
  '/register',
  validate(RegisterUserSchema),
  authController.register
);

router.get(
  '/:id',
  validate(GetUserParamsSchema),
  authController.getUser
);

export default router;
```
