---
title: "Database Transactions & ACID Properties"
description: Master database transactions, ACID guarantees, BEGIN/COMMIT/ROLLBACK workflows, and concurrency anomalies.
category: database
topic: database-fundamentals
type: concept
level: intermediate
tags:
  - database
  - sql
  - transactions
  - acid
  - concurrency
platforms:
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is a Transaction?

A **Transaction** is a single logical unit of work that contains one or more database operations (such as multiple `INSERT`, `UPDATE`, or `DELETE` statements). A transaction guarantees that either **all** statements execute successfully, or if any error occurs, the entire set of changes is discarded (**Rolled Back**).

---

## Classic Banking Example: Transferring Funds

Transferring $100 from Alice to Bob requires two discrete operations:

```sql
BEGIN;

-- 1. Deduct $100 from Alice
UPDATE accounts 
SET balance = balance - 100 
WHERE account_id = 'alice' AND balance >= 100;

-- 2. Add $100 to Bob
UPDATE accounts 
SET balance = balance + 100 
WHERE account_id = 'bob';

-- If both succeed:
COMMIT;

-- If a power failure or error occurs before COMMIT:
-- ROLLBACK;
```

Without a transaction, if the database crashed immediately after step 1, Alice would lose $100 without Bob receiving it.

---

## The ACID Principles

1. **Atomicity (All or Nothing)**: If any statement inside the transaction fails, the database automatically rolls back all preceding changes within that transaction.
2. **Consistency (Valid State to Valid State)**: Transactions cannot violate constraints (foreign keys, checks, unique rules).
3. **Isolation (Concurrency Control)**: Multiple transactions executing simultaneously do not expose incomplete or uncommitted intermediate data to each other.
4. **Durability (Committed Data Persists)**: Once `COMMIT` returns success, the changes are recorded to the Write-Ahead Log (WAL) on non-volatile storage and survive system crashes.

---

## Concurrency Anomalies & Isolation Levels

| Isolation Level | Dirty Reads | Non-Repeatable Reads | Phantom Reads |
| :--- | :--- | :--- | :--- |
| **Read Uncommitted** | Allowed | Allowed | Allowed |
| **Read Committed (PostgreSQL Default)** | Prevented | Allowed | Allowed |
| **Repeatable Read** | Prevented | Prevented | Allowed (Prevented in Postgres) |
| **Serializable** | Prevented | Prevented | Prevented |
