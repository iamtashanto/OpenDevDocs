---
title: "PostgreSQL JOINs (INNER, LEFT, RIGHT, FULL)"
description: Master relational SQL joins, joining multi-table relationships, Venn diagram logic, and join performance optimization.
category: database
topic: postgresql
type: guide
level: intermediate
tags:
  - postgresql
  - joins
  - sql
  - inner-join
  - left-join
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Overview

A **`JOIN`** combines columns from one or more tables into a single result set based on a related column between them (typically Foreign Key = Primary Key).

---

## 1. `INNER JOIN` (Matching Rows in Both Tables)

Returns only the records that have matching values in both tables:

```sql
SELECT 
    users.id AS user_id,
    users.username,
    orders.id AS order_id,
    orders.total_amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;
```

---

## 2. `LEFT JOIN` (All Left Table Rows + Matching Right)

Returns **all** rows from the left table (`users`), plus matching rows from the right table (`orders`). If no match exists, the right side columns contain `NULL`:

```sql
-- Find all users, even those who have never placed an order
SELECT 
    users.id,
    users.username,
    COUNT(orders.id) AS order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id, users.username;
```

### Anti-Join (Find Records With No Relationship)
```sql
-- Find users who have NEVER made a purchase
SELECT users.id, users.email
FROM users
LEFT JOIN orders ON users.id = orders.user_id
WHERE orders.id IS NULL;
```

---

## 3. `FULL OUTER JOIN` (All Rows from Both Tables)

Returns all records when there is a match in either left or right table:

```sql
SELECT 
    customers.name, 
    invoices.invoice_number
FROM customers
FULL OUTER JOIN invoices ON customers.id = invoices.customer_id;
```

---

## 4. `CROSS JOIN` (Cartesian Product)

Produces every possible combination of rows between Table A and Table B ($N \times M$ rows):

```sql
SELECT sizes.size_name, colors.color_name
FROM sizes
CROSS JOIN colors;
```

---

## Summary of JOIN Types

```
INNER JOIN:        [  (A ∩ B)  ]   Matches in both
LEFT JOIN:         [  A (A ∩ B) ]  All A, matching B (NULL if none)
RIGHT JOIN:        [ (A ∩ B) B  ]  All B, matching A (NULL if none)
FULL OUTER JOIN:   [  A (A ∩ B) B ] All rows from both
```
