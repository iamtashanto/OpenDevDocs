---
title: "PostgreSQL ORDER BY, LIMIT & OFFSET"
description: Sort query results using ORDER BY, multi-column sorting, NULLS FIRST/LAST, and pagination with LIMIT and OFFSET.
category: database
topic: postgresql
type: guide
level: beginner
tags:
  - postgresql
  - order-by
  - sorting
  - pagination
  - limit
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Overview

Relational databases store and return rows in non-deterministic order by default. To guarantee a specific sequence, always append an **`ORDER BY`** clause.

---

## 1. Basic Sorting (`ASC` & `DESC`)

- **`ASC` (Default)**: Ascending order (A to Z, 1 to 10, oldest to newest).
- **`DESC`**: Descending order (Z to A, 10 to 1, newest to oldest).

```sql
-- Sort products by price highest to lowest
SELECT id, title, price 
FROM products 
ORDER BY price DESC;
```

---

## 2. Multi-Column Sorting

When the primary sort column contains duplicate values, secondary sort expressions resolve ties:

```sql
-- Sort by department alphabetically, then by salary descending within department
SELECT name, department, salary 
FROM employees 
ORDER BY department ASC, salary DESC;
```

---

## 3. Controlling NULL Sorting (`NULLS FIRST` / `NULLS LAST`)

By default in PostgreSQL:
- `ASC` orders `NULL` values **last**.
- `DESC` orders `NULL` values **first**.

To explicitly position `NULL` values:

```sql
-- Sort newest published first, but keep unpublished (NULL) articles at the bottom
SELECT id, title, published_at 
FROM articles 
ORDER BY published_at DESC NULLS LAST;
```

---

## 4. Limiting & Pagination (`LIMIT` & `OFFSET`)

```sql
-- Get Page 3 (Rows 21 to 30)
SELECT id, username, email 
FROM users 
ORDER BY id ASC 
LIMIT 10 OFFSET 20;
```

> [!TIP]
> Always pair `LIMIT` and `OFFSET` with a deterministic `ORDER BY` clause (such as a unique `id` or primary key). Without an `ORDER BY`, pagination results can shuffle randomly between requests.
