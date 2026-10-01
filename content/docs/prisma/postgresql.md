---
title: "Using PostgreSQL with Prisma"
description: "Native PostgreSQL features in Prisma: @db attributes, UUID generation, native JSONB, native Enums, and full-text search."
category: databases
topic: prisma
type: guide
level: intermediate
tags:
  - prisma
  - postgresql
  - jsonb
  - enums
  - uuid
platforms:
  - node
tested:
  prisma: "6.x"
  postgresql: "16.x"
lastVerified: "2026-10-01"
---

# Using PostgreSQL with Prisma

Prisma supports native PostgreSQL capabilities through specialized `@db.*` column attributes and native enum types.

---

## 1. Native PostgreSQL Types (`@db.*`)

Fine-tune exact column types in the underlying PostgreSQL database:

```prisma
model AuditLog {
  id          String   @id @default(uuid()) @db.Uuid
  action      String   @db.VarChar(100)
  details     Json     @db.JsonB
  ipAddress   String?  @db.Inet
  amountCents BigInt   @db.BigInt
  createdAt   DateTime @default(now()) @db.Timestamptz(6)
}
```

---

## 2. Native PostgreSQL Enums

```prisma
enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model Order {
  id     String      @id @default(cuid())
  status OrderStatus @default(PENDING)
}
```

---

## 3. Querying Native JSONB Fields

Prisma allows deep filtering inside PostgreSQL `jsonb` columns:

```typescript
// Query inside a JSON metadata object
const userLogs = await prisma.auditLog.findMany({
  where: {
    details: {
      path: ["device", "browser"],
      equals: "Chrome",
    },
  },
});
```

---

## 4. PostgreSQL Full-Text Search

Enable full-text search in `generator` block:

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["fullTextSearchPostgres"]
}
```

```typescript
const searchResults = await prisma.post.findMany({
  where: {
    content: {
      search: "docker & kubernetes",
    },
  },
});
```

---

## Related Topics

- [PostgreSQL Database Fundamentals](/docs/postgresql/tables)
- [Prisma Models](/docs/prisma/models)
- [Database Migrations](/docs/prisma/migrations)
