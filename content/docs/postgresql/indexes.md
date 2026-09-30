---
title: "PostgreSQL Index Types & CONCURRENTLY"
description: Master B-Tree, GIN, GiST, BRIN index types, expression indexes, and zero-downtime index creation with CREATE INDEX CONCURRENTLY.
category: database
topic: postgresql
type: guide
level: intermediate
tags:
  - postgresql
  - indexes
  - gin
  - b-tree
  - performance
  - jsonb
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Index Types in PostgreSQL

| Index Type | Best For | Typical Use Cases |
| :--- | :--- | :--- |
| **B-Tree (Default)** | Scalar equality and range queries (`=`, `<`, `>`, `BETWEEN`, `ORDER BY`) | Primary keys, foreign keys, numbers, timestamps, strings |
| **GIN (Generalized Inverted)** | Composite values with internal elements | `JSONB` document keys, arrays (`text[]`), full-text search |
| **GiST (Generalized Search Tree)** | Geometric, spatial, and range types | PostGIS geometry, network IP addresses, scheduling intervals |
| **BRIN (Block Range Index)** | Very large append-only sorted tables | Time-series sensor logs, audit tables ($>100\text{M}$ rows) |

---

## 1. B-Tree Indexes & Expression Indexes

```sql
-- Standard index
CREATE INDEX idx_users_email ON users(email);

-- Expression / Function-based index (for case-insensitive lookups)
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- Query that will use the expression index:
SELECT * FROM users WHERE LOWER(email) = 'alice@example.com';
```

---

## 2. GIN Indexes for JSONB and Arrays

Accelerate lookups inside dynamic JSON documents:

```sql
-- Create GIN index on jsonb column
CREATE INDEX idx_events_payload ON events USING GIN (payload);

-- Query searching for specific JSON key-value pair using containment operator (@>)
SELECT * FROM events 
WHERE payload @> '{"event_type": "user_signup", "tier": "pro"}';
```

---

## 3. Partial Indexes (Space & Speed Optimization)

Index only a subset of rows matching a `WHERE` condition:

```sql
-- Index only active subscriptions (ignoring cancelled historical records)
CREATE INDEX idx_active_subscriptions ON subscriptions(user_id) 
WHERE status = 'active';
```

---

## 4. Production Zero-Downtime Indexing (`CONCURRENTLY`)

> [!IMPORTANT]
> Standard `CREATE INDEX` acquires an exclusive `SHARE` lock on the table, blocking all incoming `INSERT`, `UPDATE`, and `DELETE` queries until indexing finishes. Always use **`CONCURRENTLY`** in production.

```sql
-- Build index in background without blocking production write traffic
CREATE INDEX CONCURRENTLY idx_orders_customer_id ON orders(customer_id);

-- Drop index concurrently
DROP INDEX CONCURRENTLY idx_orders_customer_id;
```
