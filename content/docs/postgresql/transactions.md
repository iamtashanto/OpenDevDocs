---
title: "PostgreSQL Transactions & Concurrency Control"
description: Implement multi-statement transactions, SAVEPOINT rollbacks, pessimistic row locking (FOR UPDATE), and isolation levels in PostgreSQL.
category: database
topic: postgresql
type: guide
level: intermediate
tags:
  - postgresql
  - transactions
  - locks
  - concurrency
  - savepoint
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## 1. Basic Transaction Workflow

```sql
BEGIN;

-- Perform operations
INSERT INTO orders (customer_id, total) VALUES (1, 150.00);
UPDATE inventory SET stock = stock - 1 WHERE product_id = 42;

-- Persist changes to disk permanently
COMMIT;

-- Or discard changes if validation fails
-- ROLLBACK;
```

---

## 2. Using Savepoints (Nested Rollbacks)

Savepoints allow you to roll back a portion of a transaction without discarding preceding successful work:

```sql
BEGIN;

INSERT INTO audit_log (action) VALUES ('order_attempt');

SAVEPOINT inventory_check;

-- Try updating limited stock
UPDATE inventory SET stock = stock - 5 WHERE product_id = 99 AND stock >= 5;

-- If stock wasn't sufficient, rollback ONLY to the savepoint
ROLLBACK TO SAVEPOINT inventory_check;

-- Log the alternative path and still commit the overall transaction
INSERT INTO audit_log (action) VALUES ('order_fallback_backorder');

COMMIT;
```

---

## 3. Pessimistic Row Locking (`SELECT ... FOR UPDATE`)

Prevent race conditions when checking balance or inventory before mutating it:

```sql
BEGIN;

-- Lock specific row from being read/modified by concurrent transactions
SELECT balance FROM wallets 
WHERE user_id = 12 
FOR UPDATE;

-- Safely deduct funds knowing no other process can concurrently spend it
UPDATE wallets 
SET balance = balance - 50 
WHERE user_id = 12;

COMMIT;
```

---

## 4. Setting Isolation Levels

```sql
-- Read Committed (Default in Postgres)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Repeatable Read (Snapshots table state at transaction start)
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Serializable (Strict mathematical equivalence to serial execution)
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```
