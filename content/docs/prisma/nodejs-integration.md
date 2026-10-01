---
title: "Prisma with Node.js & Express"
description: "Architecture patterns for using Prisma in Node.js backend services: Express / Fastify REST APIs, error handling middlewares, and clean architecture."
category: databases
topic: prisma
type: guide
level: intermediate
tags:
  - prisma
  - nodejs
  - express
  - rest-api
  - backend
platforms:
  - node
tested:
  node: "22.x"
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma with Node.js & Express

Integrating Prisma into standard Express and Fastify backend applications.

---

## 1. Express Project Setup

```typescript
// src/server.ts
import express from "express";
import { prisma } from "./lib/prisma";

const app = express();
app.use(express.json());

// GET /api/users
app.get("/api/users", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// POST /api/users
app.post("/api/users", async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: { email, name },
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
```

---

## 2. Centralized Error Handling Middleware

Translate Prisma error codes into clear HTTP responses:

```typescript
// src/middlewares/prisma-error-handler.ts
import { Prisma } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";

export function prismaErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation (e.g. email already registered)
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "Conflict",
        message: `Unique constraint failed on field: ${(err.meta?.target as string[])?.join(", ")}`,
      });
    }

    // Record not found
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Not Found",
        message: "The requested record was not found.",
      });
    }
  }

  res.status(500).json({ error: "Internal Server Error" });
}
```

---

## 3. Graceful Process Termination

Always close database connections cleanly when your Node.js application receives termination signals:

```typescript
async function shutdown() {
  console.log("Shutting down server, disconnecting Prisma...");
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
```

---

## Related Topics

- [Node.js Fundamentals](/docs/nodejs/architecture)
- [Prisma Common Errors](/docs/prisma/common-errors)
- [Node.js + Postgres + Prisma Recipe](/recipes/prisma/nodejs-postgres-prisma)
