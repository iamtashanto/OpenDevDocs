---
title: "Database Columns & Data Types"
description: Learn about table columns, fields, data type selection (integers, varchars, booleans, timestamps, JSONB, UUIDs), and column constraints.
category: database
topic: database-fundamentals
type: concept
level: beginner
tags:
  - database
  - sql
  - columns
  - data-types
  - schema
platforms:
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is a Column?

A **Column** (also referred to as a **Field** or **Attribute**) defines a specific characteristic or property of the entity represented by the table. Every column is assigned a strict **Data Type** and optional **Constraints**.

---

## Common SQL Data Types

| Data Type Category | PostgreSQL / SQL Type | Example Usage |
| :--- | :--- | :--- |
| **Integers** | `SMALLINT`, `INT`, `BIGINT` | Counters, IDs, quantity |
| **Decimals / Money** | `NUMERIC(10, 2)`, `DECIMAL` | Financial balances, currency (exact precision) |
| **Floating Point** | `REAL`, `DOUBLE PRECISION` | Scientific calculations (inexact precision) |
| **Text Strings** | `VARCHAR(N)`, `TEXT` | Usernames, descriptions, blog posts |
| **Booleans** | `BOOLEAN` | Flags (`is_active`, `is_verified`) |
| **Dates & Times** | `DATE`, `TIMESTAMPTZ` | Timestamps with timezone support |
| **Identifiers** | `UUID` | Universally Unique Identifiers |
| **Semi-Structured** | `JSONB` | Dynamic metadata, third-party webhook payloads |

---

## Column Constraints

Constraints enforce rules on the values stored in a column:

- **`NOT NULL`**: Disallows missing/null values.
- **`UNIQUE`**: Guarantees all non-null values in the column are distinct across the table.
- **`DEFAULT <value>`**: Automatically supplies a fallback value if none is provided during insertion.
- **`CHECK (<condition>)`**: Enforces custom logical validations (e.g. `CHECK (age >= 18)` or `CHECK (price > 0)`).

```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(30) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```
