---
title: "Database Foreign Keys & Referential Integrity"
description: Master foreign keys, referential integrity, and cascading delete/update actions (CASCADE, RESTRICT, SET NULL).
category: database
topic: database-fundamentals
type: concept
level: beginner
tags:
  - database
  - sql
  - foreign-keys
  - referential-integrity
  - relationships
platforms:
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is a Foreign Key?

A **Foreign Key (FK)** is a column (or set of columns) in one table that references the primary key of another table. It establishes a direct link between records across tables and enforces **Referential Integrity**.

---

## Example: Enforcing Relationships

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_orders_user 
      FOREIGN KEY (user_id) 
      REFERENCES users(id) 
      ON DELETE CASCADE
);
```

If an application attempts to insert an order with `user_id = 999` (which doesn't exist in `users`), the database rejects the write with a foreign key violation error.

---

## Referential Actions (`ON DELETE` / `ON UPDATE`)

What should happen to child rows when a referenced parent row is deleted or updated?

| Action | Behavior |
| :--- | :--- |
| **`RESTRICT` / `NO ACTION` (Default)** | Prevents the parent row from being deleted if any child rows reference it. |
| **`CASCADE`** | Automatically deletes (or updates) all child rows referencing the deleted parent row. |
| **`SET NULL`** | Sets the foreign key column in child rows to `NULL` (requires column to be nullable). |
| **`SET DEFAULT`** | Sets the foreign key column in child rows to its defined default value. |

---

## Best Practices

1. **Always Index Foreign Key Columns**: Unlike Primary Keys, most database engines do **not** automatically index foreign key columns. Create explicit indexes on foreign keys to accelerate `JOIN` queries and avoid table-level locks during parent deletions:
   ```sql
   CREATE INDEX idx_orders_user_id ON orders(user_id);
   ```
2. **Choose Cascade Carefully**: Use `CASCADE` for tightly-coupled dependent sub-entities (e.g. deleting an invoice deletes its `invoice_items`), but avoid cascading destructive parent deletions across critical audit logs or billing records.
