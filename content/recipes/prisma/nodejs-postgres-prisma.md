---
title: "Node.js (Express) + PostgreSQL + Prisma Stack"
description: "Build a modular, production-ready TypeScript REST API using Node.js, Express, PostgreSQL, and Prisma ORM."
category: backend
topic: nodejs
type: recipe
level: intermediate
tags:
  - nodejs
  - express
  - postgresql
  - prisma
  - rest-api
platforms:
  - node
tested:
  node: "22.x"
  prisma: "6.x"
  postgresql: "16.x"
lastVerified: "2026-10-01"
---

# Node.js (Express) + PostgreSQL + Prisma Stack

A step-by-step recipe for building a production TypeScript REST API with Express, PostgreSQL, and Prisma.

---

## 1. Project Setup & Schema

```bash
mkdir express-prisma-api && cd express-prisma-api
pnpm init
pnpm add express dotenv @prisma/client
pnpm add -D prisma typescript @types/express @types/node tsx
npx prisma init --datasource-provider postgresql
```

Define `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Article {
  id        Int      @id @default(autoincrement())
  title     String
  slug      String   @unique
  content   String
  published Boolean  @default(false)
  createdAt DateTime @default(now())

  @@map("articles")
}
```

Run migration:
```bash
npx prisma migrate dev --name init_articles
```

---

## 2. Server Implementation (`src/index.ts`)

```typescript
import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// GET /api/articles
app.get("/api/articles", async (req, res) => {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(articles);
});

// POST /api/articles
app.post("/api/articles", async (req, res) => {
  try {
    const { title, slug, content } = req.body;
    const article = await prisma.article.create({
      data: { title, slug, content, published: true },
    });
    res.status(201).json(article);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return res.status(409).json({ error: "Slug is already taken" });
    }
    res.status(500).json({ error: "Failed to create article" });
  }
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---

## Related Guides

- [Prisma Node.js Integration](/docs/prisma/nodejs-integration)
- [Prisma CRUD Queries](/docs/prisma/crud)
- [PostgreSQL Overview](/docs/postgresql/installation)
