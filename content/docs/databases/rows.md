---
title: "Database Rows (Records & Tuples)"
description: Understand database rows, records, tuples, cardinality, row-level locking, and row storage in relational databases.
category: database
topic: database-fundamentals
type: concept
level: beginner
tags:
  - database
  - sql
  - rows
  - records
  - storage
platforms:
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is a Row?

A **Row** (also called a **Record** or **Tuple**) represents a single, unique instance of an entity stored in a table. For example, in a `users` table, each row holds the information for one specific user.

---

## Structure of a Row

| `id` | `username` | `email` | `is_active` | `created_at` |
| :--- | :--- | :--- | :--- | :--- |
| `1` | `alice` | `alice@example.com` | `true` | `2026-01-15 08:30:00Z` |
| `2` | `bob` | `bob@example.com` | `false` | `2026-02-20 14:15:00Z` |

Each row contains values conforming to the column definitions established in the table's schema.

---

## Row-Oriented vs Columnar Storage

- **Row-Oriented Databases (e.g. PostgreSQL, MySQL)**: Store all column values of a single row contiguously on disk pages. Extremely efficient for transactional workloads (OLTP) where entire records are read or modified at once (`SELECT * FROM users WHERE id = 1`).
- **Columnar Databases (e.g. ClickHouse, Snowflake, Redshift)**: Store all values of a given column together on disk. Optimized for analytical queries (OLAP) aggregating millions of rows across a few columns (`SELECT AVG(total_amount) FROM orders`).

---

## Row Operations

- **Insertion**: Adds a new record (`INSERT INTO users (...) VALUES (...)`).
- **Update**: Modifies specific column values within existing records matching a condition (`UPDATE users SET is_active = true WHERE id = 2`).
- **Deletion**: Removes records (`DELETE FROM users WHERE id = 2`).
- **Row-Level Locking**: Concurrency control mechanism allowing transactions to lock individual rows (`SELECT ... FOR UPDATE`) without blocking reads or writes on other rows in the table.
