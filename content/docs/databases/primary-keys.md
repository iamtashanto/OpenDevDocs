---
title: "Database Primary Keys"
description: Understand primary keys, natural vs surrogate keys, auto-incrementing integers, and UUID v4 vs UUID v7.
category: database
topic: database-fundamentals
type: concept
level: beginner
tags:
  - database
  - sql
  - primary-keys
  - uuid
  - schema
platforms:
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is a Primary Key?

A **Primary Key (PK)** is a column (or combination of columns) that uniquely identifies each individual row in a table.

### Core Rules
1. **Uniqueness**: No two rows can possess the same primary key value.
2. **Non-Null**: Primary key columns can never contain `NULL`.
3. **Immutable**: Primary key values should rarely or never be updated once assigned.
4. **Indexed**: The database automatically constructs a unique B-Tree index on the primary key column for instantaneous $O(\log N)$ point lookups.

---

## Natural vs Surrogate Keys

- **Natural Key**: A real-world attribute that is naturally unique (e.g. Social Security Number, ISBN, or Email).
  - *Drawback*: Real-world identifiers can change (a user updates their email) or format requirements may evolve.
- **Surrogate Key**: An artificial, database-generated identifier with no intrinsic business meaning (e.g. sequential `id = 1, 2, 3` or a random `UUID`).
  - *Recommendation*: Use surrogate keys for most application tables.

---

## Sequential Integers vs UUIDs

| Strategy | Pros | Cons |
| :--- | :--- | :--- |
| **Auto-Increment (`BIGINT SERIAL`)** | Compact (8 bytes), sequential, optimal B-Tree index locality | Predictable / enumerable (`/users/1`, `/users/2`), impossible to generate safely on distributed clients |
| **UUID v4 (Random)** | Globally unique across distributed nodes, generated before DB insert, non-enumerable | Larger (16 bytes), random insertion causes B-Tree index fragmentation |
| **UUID v7 (Time-Ordered)** | Globally unique AND time-ordered (retains high B-Tree index performance) | Emerging standard (requires library or Postgres 17+) |

---

## Composite Primary Keys

When an entity is uniquely identified by the combination of two or more columns (common in junction / Many-to-Many bridge tables):

```sql
CREATE TABLE project_members (
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'contributor',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (project_id, user_id)
);
```
