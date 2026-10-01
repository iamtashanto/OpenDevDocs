---
title: "Prisma Pagination & Sorting"
description: "Implementing offset-based pagination (skip/take) and high-performance cursor-based pagination (cursor/take) with multi-column sorting."
category: databases
topic: prisma
type: guide
level: intermediate
tags:
  - prisma
  - pagination
  - sorting
  - performance
  - cursor-pagination
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma Pagination & Sorting

---

## 1. Sorting (`orderBy`)

Sort records by single or multiple columns:

```typescript
const sortedProducts = await prisma.product.findMany({
  orderBy: [
    { isFeatured: "desc" },
    { price: "asc" },
    { createdAt: "desc" },
  ],
});
```

---

## 2. Offset-Based Pagination (`skip` / `take`)

Best suited for traditional page-number pagination (`Page 1`, `Page 2`, `Page 3`):

```typescript
const PAGE_SIZE = 20;
const pageNumber = 3; // 1-indexed

const [totalCount, items] = await prisma.$transaction([
  prisma.product.count({ where: { category: "electronics" } }),
  prisma.product.findMany({
    where: { category: "electronics" },
    skip: (pageNumber - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: { createdAt: "desc" },
  }),
]);

const totalPages = Math.ceil(totalCount / PAGE_SIZE);
```

> [!NOTE]
> Offset pagination (`OFFSET 100000`) degrades in performance on large tables because the database must scan and discard all skipped rows. For large datasets or infinite scrolling, use Cursor-based pagination.

---

## 3. Cursor-Based Pagination (`cursor` / `take`)

High-performance pagination designed for infinite scrolling feeds and large datasets:

```typescript
// Fetch the next 20 items starting AFTER cursorId
const nextBatch = await prisma.post.findMany({
  take: 20,
  skip: 1, // Skip the cursor item itself
  cursor: {
    id: "last_seen_post_id",
  },
  orderBy: {
    id: "asc", // Must sort by a unique column used as the cursor
  },
});
```

---

## Related Topics

- [CRUD Queries](/docs/prisma/crud)
- [Filtering Operators](/docs/prisma/filtering)
- [Database Transactions](/docs/prisma/transactions)
