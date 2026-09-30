---
title: API Pagination Strategies
description: Compare Offset-based vs Cursor-based (Keyset) pagination, performance trade-offs, and pagination response schemas.
category: backend
topic: backend-concepts
type: guide
level: intermediate
tags:
  - backend
  - pagination
  - sql
  - rest
  - performance
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

Pagination prevents database query timeouts and bandwidth bottlenecks by dividing large collections into manageable chunks.

---

## 1. Offset-Based Pagination

Uses page number and page size: `GET /api/v1/items?page=3&limit=20`

### SQL Implementation
```sql
SELECT * FROM items
ORDER BY created_at DESC
LIMIT 20 OFFSET 40;
```

### Pros & Cons
- **Pros**: Easy to implement; supports jumping directly to arbitrary pages (e.g. "Page 5").
- **Cons**:
  - **Performance Degradation**: At high offsets (`OFFSET 1000000`), the database engine must scan and discard 1,000,000 index rows before returning 20 items.
  - **Data Drift**: If a new row is inserted while the user is paginating, items shift down, causing duplicate or skipped items across pages.

---

## 2. Cursor-Based / Keyset Pagination (Recommended for High Scale)

Uses a pointer to the last retrieved item: `GET /api/v1/items?cursor=eyJpZCI6MTAxfQ==&limit=20`

### SQL Implementation
```sql
SELECT * FROM items
WHERE id > 101
ORDER BY id ASC
LIMIT 20;
```

### Pros & Cons
- **Pros**:
  - **Constant Speed ($O(1)$)**: Fast index seek regardless of whether you are reading item #10 or item #10,000,000.
  - **Zero Data Drift**: Immune to new inserts or deletes shifting pages.
  - Ideal for infinite scrolling feeds (social feeds, logs, real-time messaging).
- **Cons**: Cannot jump to arbitrary page numbers (like "Page 42").

---

## Standard Pagination Response Schemas

### Offset-Based Response
```json
{
  "data": [ ... ],
  "meta": {
    "page": 2,
    "limit": 20,
    "totalItems": 154,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": true
  }
}
```

### Cursor-Based Response
```json
{
  "data": [ ... ],
  "pageInfo": {
    "endCursor": "eyJpZCI6MTIwLCJjcmVhdGVkQXQiOjE3Mzg0NTY3fQ==",
    "hasNextPage": true
  }
}
```
