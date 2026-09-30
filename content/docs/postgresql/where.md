---
title: "PostgreSQL WHERE Clause & Filtering"
description: Filter query results using WHERE operators, logical combinations (AND, OR, NOT), pattern matching (LIKE, ILIKE), and NULL checks.
category: database
topic: postgresql
type: guide
level: beginner
tags:
  - postgresql
  - where
  - filtering
  - sql
  - operators
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Overview

The **`WHERE`** clause specifies search conditions to filter rows returned by `SELECT`, or modified by `UPDATE` and `DELETE` statements.

---

## Comparison Operators

| Operator | Description | Example |
| :--- | :--- | :--- |
| `=` | Equal to | `WHERE status = 'active'` |
| `<>` or `!=` | Not equal to | `WHERE status != 'archived'` |
| `>`, `<` | Greater than, Less than | `WHERE price > 50.00` |
| `>=`, `<=` | Greater or equal, Less or equal | `WHERE age >= 18` |

---

## Logical Operators & Ranges

### 1. `AND`, `OR`, `NOT`
```sql
SELECT * FROM orders
WHERE status = 'pending' AND (total_amount > 100 OR is_priority = true);
```

### 2. `IN` and `NOT IN`
```sql
SELECT * FROM users
WHERE role IN ('admin', 'moderator', 'editor');
```

### 3. `BETWEEN`
```sql
SELECT * FROM products
WHERE price BETWEEN 10.00 AND 50.00;
```

---

## Pattern Matching (`LIKE` vs `ILIKE`)

- **`LIKE`**: Case-sensitive wildcard search.
- **`ILIKE`**: Case-insensitive wildcard search (PostgreSQL extension).
- `%` matches zero or more characters; `_` matches exactly one character.

```sql
-- Case-insensitive search for emails ending in @gmail.com
SELECT * FROM users 
WHERE email ILIKE '%@gmail.com';

-- Names starting with 'J' and 4 letters total
SELECT * FROM users
WHERE username LIKE 'J___';
```

---

## Handling `NULL` Values

In SQL, `NULL` represents an unknown value. You cannot compare `NULL` with `=` (e.g. `WHERE deleted_at = NULL` always evaluates to False/Unknown).

```sql
-- ✅ Correct
SELECT * FROM articles WHERE deleted_at IS NULL;
SELECT * FROM articles WHERE published_at IS NOT NULL;
```
