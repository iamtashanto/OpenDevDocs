---
title: "Database Indexes Fundamentals"
description: Understand B-Tree indexes, full-table scans vs index seeks, composite indexes, selectivity, and write overhead trade-offs.
category: database
topic: database-fundamentals
type: concept
level: intermediate
tags:
  - database
  - sql
  - indexes
  - b-tree
  - performance
platforms:
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is a Database Index?

An **Index** is a specialized, sorted data structure (most commonly a **B-Tree**) maintained alongside a database table. It acts like the index at the back of a book, allowing the database query engine to locate target records in $O(\log N)$ time rather than scanning every row in the table ($O(N)$ Sequential Scan).

---

## Sequential Scan vs Index Seek

```
Table Without Index (Full Table Scan):
[ Row 1 ] ──> [ Row 2 ] ──> [ Row 3 ] ──> ... ──> [ Row 1,000,000 ] (Slow!)

Table With B-Tree Index (Index Seek):
                    [ Root Node ]
                   /             \
         [ Branch Node ]     [ Branch Node ]
          /           \       /           \
     [ Leaf 1 ]   [ Leaf 2 ] [ Leaf 3 ]  [ Leaf 4 ] ──> Direct Disk Pointer (Fast!)
```

---

## Creating Indexes

```sql
-- Single-column B-Tree index
CREATE INDEX idx_users_email ON users(email);

-- Composite multi-column index
CREATE INDEX idx_orders_customer_status ON orders(customer_id, status);

-- Partial index (Indexes only rows matching condition)
CREATE INDEX idx_active_users ON users(id) WHERE is_active = true;
```

---

## The Leftmost Prefix Rule (Composite Indexes)

When creating a composite index on multiple columns `(col_a, col_b, col_c)`:
- ✅ Queries filtering on `(col_a)` or `(col_a, col_b)` or `(col_a, col_b, col_c)` **will** utilize the index.
- ❌ Queries filtering *only* on `(col_b)` or `(col_c)` **cannot** utilize this composite index.

---

## The Cost of Indexes (Trade-offs)

Indexes are not free:
1. **Slower Writes (`INSERT`, `UPDATE`, `DELETE`)**: Every write operation must update not only the base table but also rebalance every associated index tree.
2. **Disk and RAM Usage**: Indexes consume disk space and must fit inside the DBMS in-memory buffer pool for maximum speed.
3. **Over-Indexing Anti-Pattern**: Never index every column blindly. Index foreign keys, high-cardinality search fields, and columns frequently used in `WHERE`, `ORDER BY`, and `JOIN ON` clauses.
