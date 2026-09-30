---
title: Express.js Controllers & Architecture
description: Decouple routing definitions from business logic using controller patterns, dependency injection, and asynchronous service layers.
category: backend
topic: express
type: guide
level: intermediate
tags:
  - express
  - controllers
  - architecture
  - patterns
  - services
platforms:
  - node
tested:
  node: "22.x"
  express: "4.21.x"
lastVerified: "2026-09-30"
---

## Why Use Controllers?

Inline route callbacks become difficult to maintain and test as applications grow. The **Controller Pattern** separates HTTP request parsing and response formatting from route declarations and database queries.

```
Route Definition (routes/user.routes.ts)
       │
       ▼
Controller Handler (controllers/user.controller.ts) -> Parses req, formats res
       │
       ▼
Service Layer (services/user.service.ts)           -> Business logic & DB queries
```

---

## Writing an Express Controller

```typescript
// src/controllers/user.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service.js';

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await userService.findUsers({ page, limit });

    res.status(200).json({
      success: true,
      data: result.users,
      meta: result.meta,
    });
  } catch (error) {
    next(error); // Forward error to global error middleware
  }
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await userService.findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}
```

---

## Clean Route Binding

Routes remain concise and declarative:

```typescript
// src/routes/user.routes.ts
import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { validate } from '../middleware/validate.js';
import { CreateUserSchema } from '../schemas/user.schema.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', validate(CreateUserSchema), userController.createUser);

export default router;
```

---

## Async Wrapper Utility (`asyncHandler`)

To eliminate boilerplate `try/catch` blocks inside every controller method:

```typescript
// src/utils/asyncHandler.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
```

Usage:

```typescript
export const getUser = asyncHandler(async (req, res) => {
  const user = await userService.findUserById(req.params.id);
  res.json({ success: true, user });
});
```
