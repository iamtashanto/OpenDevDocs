---
title: "Prisma CRUD Operations"
description: "Comprehensive guide to Create, Read, Update, and Delete operations using Prisma Client: findUnique, findMany, update, delete, and upsert."
category: databases
topic: prisma
type: guide
level: beginner
tags:
  - prisma
  - crud
  - queries
  - mutations
  - typescript
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma CRUD Operations

Prisma Client provides an intuitive, type-safe API for executing database queries and mutations.

---

## 1. Create (Insert Records)

### Single Record:
```typescript
const newUser = await prisma.user.create({
  data: {
    email: "alex@example.com",
    name: "Alex Rivera",
    role: "USER",
  },
});
```

### Nested Relational Creation:
Create a parent user and their first post in a single atomic database query:
```typescript
const userWithPost = await prisma.user.create({
  data: {
    email: "sarah@example.com",
    name: "Sarah Chen",
    posts: {
      create: {
        title: "Getting Started with Next.js & Prisma",
        content: "Prisma makes full-stack development seamless.",
        published: true,
      },
    },
  },
  include: { posts: true },
});
```

### Batch Create (`createMany`):
```typescript
await prisma.tag.createMany({
  data: [
    { name: "typescript" },
    { name: "nextjs" },
    { name: "tailwindcss" },
  ],
  skipDuplicates: true,
});
```

---

## 2. Read (Query Records)

### Find by Unique Identifier / Index:
```typescript
// Returns User or null
const user = await prisma.user.findUnique({
  where: { email: "alex@example.com" },
});

// Throws error if record is not found (Useful in API routes)
const requiredUser = await prisma.user.findUniqueOrThrow({
  where: { id: "usr_12345" },
});
```

### Find Many with Selective Fields (`select` vs `include`):
```typescript
// Fetch only specific columns (reduces bandwidth and memory)
const userProfiles = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  },
});
```

---

## 3. Update & Upsert

### Update Single Record:
```typescript
const updatedUser = await prisma.user.update({
  where: { id: "usr_12345" },
  data: {
    name: "Alexander Rivera",
  },
});
```

### Upsert (Update if exists, Create if not):
```typescript
const user = await prisma.user.upsert({
  where: { email: "claire@example.com" },
  update: { name: "Claire Novak" },
  create: {
    email: "claire@example.com",
    name: "Claire Novak",
  },
});
```

---

## 4. Delete Records

```typescript
// Delete single record
const deletedPost = await prisma.post.delete({
  where: { id: 42 },
});

// Delete many matching a filter
const result = await prisma.session.deleteMany({
  where: {
    expiresAt: { lt: new Date() }, // Delete all expired sessions
  },
});
console.log(`Deleted ${result.count} expired sessions.`);
```

---

## Related Topics

- [Filtering & Complex Conditions](/docs/prisma/filtering)
- [Pagination & Sorting](/docs/prisma/pagination)
- [Database Transactions](/docs/prisma/transactions)
