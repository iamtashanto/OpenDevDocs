---
title: "Database Normalization (1NF, 2NF, 3NF)"
description: Learn database normalization principles, eliminating data anomalies and redundancy, and when to intentionally denormalize for read performance.
category: database
topic: database-fundamentals
type: concept
level: intermediate
tags:
  - database
  - sql
  - normalization
  - 1nf
  - 2nf
  - 3nf
platforms:
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is Normalization?

**Normalization** is the systematic database design process of organizing tables and columns to:
1. **Eliminate Redundant Data**: Prevent duplicate values across multiple rows.
2. **Prevent Modification Anomalies**:
   - **Insertion Anomaly**: Inability to record certain facts without adding unrelated data.
   - **Update Anomaly**: Inconsistent data when updating one duplicate row but missing another.
   - **Deletion Anomaly**: Unintentionally losing critical information when deleting a row.

---

## The Normal Forms

### 1. First Normal Form (1NF) — Atomic Values
- Each column must contain atomic (indivisible) single values (no comma-separated lists `tags: "node,react,sql"`).
- Every row must have a unique identifier (Primary Key).
- No repeating groups of similar columns (`phone_1`, `phone_2`, `phone_3`).

### 2. Second Normal Form (2NF) — Full Functional Dependency
- Must already be in 1NF.
- All non-key columns must depend on the **entire** Primary Key (relevant when composite keys are used). If a column depends only on part of a composite key, move it to its own table.

### 3. Third Normal Form (3NF) — No Transitive Dependencies
- Must already be in 2NF.
- Non-key columns must not depend on other non-key columns.
- *Rule of Thumb*: "Every non-key column must provide a fact about the key, the whole key, and nothing but the key."

---

## Example: Moving from Unnormalized to 3NF

### ❌ Unnormalized / 1NF Violation
| `order_id` | `customer_name` | `customer_city` | `product_names` | `total` |
| :--- | :--- | :--- | :--- | :--- |
| `101` | `Alice` | `New York` | `Laptop, Mouse` | `1250` |

### ✅ Normalized into 3NF Tables
1. **`customers` Table**: `id`, `name`, `city`
2. **`orders` Table**: `id`, `customer_id` (FK), `order_date`, `status`
3. **`products` Table**: `id`, `name`, `unit_price`
4. **`order_items` Table**: `order_id` (FK), `product_id` (FK), `quantity`, `price_at_purchase`

---

## When to Denormalize?

In high-throughput read-heavy applications (dashboards, leaderboards, analytical reporting), traversing many 3NF JOINs can become a performance bottleneck. **Intentional Denormalization** selectively duplicates data (e.g. caching a precalculated `total_items_count` on the `orders` table) to minimize expensive multi-table aggregations.
