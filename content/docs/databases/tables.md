---
title: "Database Tables & Schemas"
description: Understand relational database tables, schema design, entity modeling, and naming conventions.
category: database
topic: database-fundamentals
type: concept
level: beginner
tags:
  - database
  - sql
  - tables
  - schema
  - modeling
platforms:
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is a Database Table?

A **Table** is the core structural unit in a relational database. It represents a single entity type (e.g. `users`, `orders`, `products`) and consists of vertical **columns** (attributes) and horizontal **rows** (records).

---

## Schema Definition Example

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## Table Design Best Practices

1. **Use Plural, Snake_case Names**: Prefer `users`, `order_items`, `user_profiles` rather than `User` or `TBL_USER`.
2. **Always Define a Primary Key**: Every table must have a distinct primary key (e.g. `id`) to uniquely identify each row.
3. **Include Audit Timestamps**: Include `created_at` and `updated_at` timestamps on all mutable entities.
4. **Enforce Nullability Explicitly**: Add `NOT NULL` constraints whenever a field is required to prevent missing or ambiguous null data.
5. **Separate Concerns**: Avoid mixing unrelated business domains into a single wide table; split them into distinct relational entities.
