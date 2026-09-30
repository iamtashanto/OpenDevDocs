---
title: Express.js Routing
description: Organize modular routes using express.Router, extract route parameters, query strings, and build hierarchical API routers.
category: backend
topic: express
type: guide
level: beginner
tags:
  - express
  - routing
  - router
  - rest
  - params
platforms:
  - node
tested:
  node: "22.x"
  express: "4.21.x"
lastVerified: "2026-09-30"
---

## What is Express Routing?

Routing refers to how an application's endpoints respond to client requests. Express provides `express.Router` to create modular, mountable route handlers.

---

## Creating a Modular Router

```typescript
// src/routes/user.routes.ts
import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/v1/users
router.get('/', (req: Request, res: Response) => {
  res.json({ users: [] });
});

// GET /api/v1/users/:id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id, name: `User ${id}` });
});

// POST /api/v1/users
router.post('/', (req: Request, res: Response) => {
  const newUser = req.body;
  res.status(201).json({ success: true, user: newUser });
});

// DELETE /api/v1/users/:id
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).send();
});

export default router;
```

---

## Mounting Routers in the Main Application

```typescript
// src/routes/index.ts
import { Router } from 'express';
import userRoutes from './user.routes.js';
import postRoutes from './post.routes.js';

const apiRouter = Router();

apiRouter.use('/users', userRoutes);
apiRouter.use('/posts', postRoutes);

export default apiRouter;
```

In `src/app.ts`:

```typescript
import express from 'express';
import apiRouter from './routes/index.js';

const app = express();
app.use(express.json());

// Mount top-level API namespace
app.use('/api/v1', apiRouter);
```

---

## Reading Request Parameters

### 1. Route Parameters (`req.params`)
Extracted from URL path tokens:
```typescript
// Route: /products/:category/:productId
router.get('/products/:category/:productId', (req, res) => {
  const { category, productId } = req.params;
  res.json({ category, productId });
});
```

### 2. Query String Parameters (`req.query`)
Extracted from URL search queries (`/search?q=nodejs&page=2`):
```typescript
router.get('/search', (req, res) => {
  const query = req.query.q as string;
  const page = Number(req.query.page) || 1;
  res.json({ query, page });
});
```
