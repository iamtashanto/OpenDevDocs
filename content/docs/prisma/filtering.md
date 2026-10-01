---
title: "Prisma Filtering & Advanced Queries"
description: "Master where clauses in Prisma: string filters (contains, startsWith), numbers (gt, lt), lists (in), logical operators (AND, OR, NOT), and relation filters."
category: databases
topic: prisma
type: reference
level: intermediate
tags:
  - prisma
  - filtering
  - queries
  - where
  - relational-queries
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma Filtering & Advanced Queries

Prisma Client supports rich filtering operators inside the `where` argument.

---

## 1. Value & Range Operators

```typescript
const posts = await prisma.post.findMany({
  where: {
    // Numeric comparisons
    viewCount: { gte: 1000 },
    likes: { gt: 50, lte: 500 },

    // In list comparison
    status: { in: ["PUBLISHED", "FEATURED"] },

    // Null checks
    deletedAt: null,
  },
});
```

---

## 2. String Filters

```typescript
const searchResults = await prisma.article.findMany({
  where: {
    title: {
      contains: "kubernetes",
      mode: "insensitive", // Case-insensitive search (PostgreSQL ILIKE)
    },
    slug: {
      startsWith: "guide-",
    },
  },
});
```

---

## 3. Logical Operators (`AND`, `OR`, `NOT`)

```typescript
const filteredUsers = await prisma.user.findMany({
  where: {
    AND: [
      { role: "DEVELOPER" },
      { isActive: true },
    ],
    OR: [
      { country: "US" },
      { country: "CA" },
    ],
    NOT: {
      email: { endsWith: "@banned-domain.com" },
    },
  },
});
```

---

## 4. Relation Filters (`some`, `every`, `none`)

Filter parent records based on conditions in their associated children:

```typescript
// Find all authors who have at least ONE published post with > 500 views
const popularAuthors = await prisma.user.findMany({
  where: {
    posts: {
      some: {
        published: true,
        viewCount: { gt: 500 },
      },
    },
  },
});

// Find users who have ZERO unpaid invoices
const goodStandingUsers = await prisma.user.findMany({
  where: {
    invoices: {
      none: { status: "UNPAID" },
    },
  },
});
```

---

## Related Topics

- [CRUD Operations](/docs/prisma/crud)
- [Pagination & Sorting](/docs/prisma/pagination)
- [Database Transactions](/docs/prisma/transactions)
