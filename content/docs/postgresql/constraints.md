---
title: "PostgreSQL Constraints & Data Integrity"
description: Enforce data consistency using PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, and EXCLUDE constraints.
category: database
topic: postgresql
type: guide
level: intermediate
tags:
  - postgresql
  - constraints
  - data-integrity
  - check
  - ddl
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Overview

Constraints are rules enforced on table columns by the PostgreSQL database engine to prevent invalid or inconsistent data from entering the database.

---

## 1. `NOT NULL` Constraint

Prevents a column from storing `NULL` values:

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);
```

---

## 2. `UNIQUE` Constraint

Ensures all values in a column (or group of columns) are distinct:

```sql
-- Single-column unique constraint
ALTER TABLE users ADD CONSTRAINT uq_users_email UNIQUE (email);

-- Composite multi-column unique constraint
ALTER TABLE project_members ADD CONSTRAINT uq_user_project UNIQUE (user_id, project_id);
```

---

## 3. `CHECK` Constraint

Validates that column values satisfy a custom Boolean condition:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL CONSTRAINT chk_positive_price CHECK (price > 0),
    discount_percentage INT DEFAULT 0 CONSTRAINT chk_discount_range CHECK (discount_percentage BETWEEN 0 AND 100),
    end_date DATE,
    start_date DATE,
    CONSTRAINT chk_date_order CHECK (end_date >= start_date)
);
```

---

## 4. `FOREIGN KEY` Constraint

Guarantees referential integrity between parent and child tables:

```sql
ALTER TABLE orders 
ADD CONSTRAINT fk_orders_customer
FOREIGN KEY (customer_id) 
REFERENCES customers(id) 
ON DELETE RESTRICT;
```

---

## 5. Adding Constraints Safely to Large Production Tables

Adding a constraint with full table validation on a table with 100M rows locks the table against writes. Use `NOT VALID` followed by `VALIDATE CONSTRAINT` to avoid locking production traffic:

```sql
-- Step 1: Add constraint without scanning existing historical rows (Instant lock release)
ALTER TABLE orders 
ADD CONSTRAINT chk_positive_total CHECK (total_amount >= 0) NOT VALID;

-- Step 2: Validate existing rows in background without blocking concurrent writes
ALTER TABLE orders VALIDATE CONSTRAINT chk_positive_total;
```
