---
title: "PostgreSQL GROUP BY & Aggregate Functions"
description: Aggregate dataset metrics using COUNT, SUM, AVG, MIN, MAX, GROUP BY, and the HAVING filtering clause.
category: database
topic: postgresql
type: guide
level: intermediate
tags:
  - postgresql
  - group-by
  - aggregate
  - having
  - sql
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Overview

The **`GROUP BY`** clause divides query rows into groups with matching column values, allowing aggregate calculations (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) to be computed per group.

---

## Common Aggregate Functions

| Function | Purpose |
| :--- | :--- |
| **`COUNT(*)`** | Total number of rows in the group |
| **`COUNT(column)`** | Total non-null values in the group |
| **`SUM(column)`** | Sum total of numeric values |
| **`AVG(column)`** | Arithmetic mean of numeric values |
| **`MIN(column)`** | Smallest value |
| **`MAX(column)`** | Largest value |

---

## Basic GROUP BY Example

```sql
-- Calculate total revenue and order count per customer
SELECT 
    customer_id,
    COUNT(id) AS total_orders,
    SUM(total_amount) AS total_spent,
    ROUND(AVG(total_amount), 2) AS average_order_value
FROM orders
GROUP BY customer_id
ORDER BY total_spent DESC;
```

---

## Filtering Groups with `HAVING`

- **`WHERE`**: Filters individual rows *before* grouping occurs.
- **`HAVING`**: Filters summarized groups *after* aggregation is calculated.

```sql
-- Find categories that have more than 5 products and average price > $50
SELECT 
    category,
    COUNT(id) AS product_count,
    AVG(price) AS avg_price
FROM products
WHERE in_stock = true               -- 1. Filter rows before grouping
GROUP BY category                   -- 2. Group by category
HAVING COUNT(id) > 5 AND AVG(price) > 50.00 -- 3. Filter groups
ORDER BY product_count DESC;
```

---

## Critical SQL Rule

Every non-aggregated column appearing in your `SELECT` list **must** be listed in the `GROUP BY` clause.
