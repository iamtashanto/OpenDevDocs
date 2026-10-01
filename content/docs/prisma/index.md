---
title: "Prisma ORM Overview"
description: "Introduction to Prisma — the next-generation TypeScript ORM featuring declarative data modeling, automatic type-safety, and seamless migrations."
category: databases
topic: prisma
type: guide
level: beginner
tags:
  - prisma
  - orm
  - typescript
  - database
  - postgresql
platforms:
  - node
  - web
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma ORM Overview

**Prisma** is a modern, next-generation Object-Relational Mapper (ORM) that makes working with databases intuitive, safe, and productive in TypeScript and Node.js.

---

## 1. Core Architecture

Prisma consists of three primary tools:

```
┌─────────────────────────────────────────────────────────────┐
│                       schema.prisma                         │
│             (Declarative Database Schema Definition)        │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌───────────────────────────┐         ┌───────────────────────┐
│      Prisma Client        │         │    Prisma Migrate     │
│ (Type-Safe Auto-Generated │         │ (Declarative Database │
│       Query Engine)       │         │  Migration Tooling)   │
└───────────────────────────┘         └───────────────────────┘
```

1. **Prisma Schema (`schema.prisma`)**: A single human-readable file where you define your database connection, models, relations, and generators.
2. **Prisma Client**: An auto-generated, type-safe database client tailored precisely to your database models. Whenever your schema changes, running `prisma generate` creates instant TypeScript types.
3. **Prisma Migrate**: A declarative migration system that translates your schema definitions into deterministic SQL migration files.

---

## 2. Why Use Prisma?

- **100% Type-Safety**: Query results are automatically typed based on your specific `select` and `include` statements.
- **Auto-Completion in IDEs**: Instant TypeScript autocomplete for fields, relations, filters, and mutations in VS Code.
- **Relational Simplicity**: Fetching nested relational data (e.g. user with posts and comments) without writing manual SQL `JOIN` clauses.
- **Multi-Database Support**: Supports PostgreSQL, MySQL, SQLite, SQL Server, CockroachDB, and MongoDB with a unified API.

---

## 3. Quick Example

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Type-safe query with automatic relation loading
const user = await prisma.user.findUnique({
  where: { email: "sarah@example.com" },
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: "desc" },
    },
  },
});

console.log(user?.posts[0]?.title);
```

---

## Related Topics

- [Prisma Installation & Setup](/docs/prisma/installation)
- [Prisma Schema Definition](/docs/prisma/schema.prisma)
- [CRUD Operations](/docs/prisma/crud)
- [PostgreSQL Fundamentals](/docs/postgresql/tables)
