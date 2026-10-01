---
title: "Prisma Production Best Practices"
description: "Optimizing Prisma queries with select vs include, indexing strategy, transaction timeouts, schema organization, and query logging."
category: databases
topic: prisma
type: guide
level: production
tags:
  - prisma
  - best-practices
  - performance
  - indexing
  - production
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma Production Best Practices

---

## 1. Always Prefer `select` Over Broad Queries

By default, querying a model fetches every single column. When fetching user lists, never fetch password hashes, internal tokens, or large text columns:

```typescript
// ❌ INEFFICIENT: Returns all columns including passwordHash
const users = await prisma.user.findMany();

// ✅ OPTIMIZED: Fetches only needed columns (Faster SQL, lower bandwidth)
const users = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
    createdAt: true,
  },
});
```

---

## 2. Add Indexes on Frequently Filtered & Sorted Columns

Every column used inside `where` or `orderBy` should be indexed in `schema.prisma`:

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  authorId  String
  status    String
  createdAt DateTime @default(now())

  // Add compound index for frequent author + status queries
  @@index([authorId, status])
  @@index([createdAt(sort: Desc)])
}
```

---

## 3. Enable Query Logging in Development

Log executed SQL queries and timings to diagnose N+1 query patterns:

```typescript
export const prisma = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "stdout", level: "error" },
  ],
});

prisma.$on("query", (e) => {
  console.log(`[SQL Query] ${e.query} (${e.duration}ms)`);
});
```

---

## Related Topics

- [Prisma Client Singleton](/docs/prisma/prisma-client)
- [PostgreSQL Performance Optimization](/docs/postgresql/performance)
- [Common Errors Reference](/docs/prisma/common-errors)
