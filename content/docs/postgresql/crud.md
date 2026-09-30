---
title: "PostgreSQL CRUD Operations & RETURNING Clause"
description: Master INSERT, SELECT, UPDATE, DELETE, and upsert (ON CONFLICT) queries using PostgreSQL's powerful RETURNING clause.
category: database
topic: postgresql
type: guide
level: beginner
tags:
  - postgresql
  - crud
  - sql
  - insert
  - returning
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## 1. Create (`INSERT`) with `RETURNING`

In PostgreSQL, the **`RETURNING`** clause returns modified or inserted rows directly to the application without requiring a secondary `SELECT` query:

```sql
-- Single row insert returning generated ID
INSERT INTO users (username, email)
VALUES ('alice', 'alice@example.com')
RETURNING id, created_at;

-- Bulk insertion
INSERT INTO products (title, price, stock)
VALUES 
  ('Mechanical Keyboard', 120.00, 50),
  ('Wireless Mouse', 45.00, 100),
  ('USB-C Hub', 35.00, 75)
RETURNING *;
```

---

## 2. Read (`SELECT`)

```sql
-- Select specific columns with alias
SELECT 
  id, 
  username, 
  email AS contact_email 
FROM users;

-- Limit and Offset
SELECT * FROM products 
LIMIT 10 OFFSET 20;
```

---

## 3. Update (`UPDATE`) with `RETURNING`

```sql
-- Update record and return updated timestamp
UPDATE users
SET 
  is_active = false,
  updated_at = NOW()
WHERE id = 42
RETURNING id, username, is_active, updated_at;
```

---

## 4. Delete (`DELETE`) with `RETURNING`

```sql
-- Delete inactive users and return their emails for audit logging
DELETE FROM users
WHERE is_active = false AND created_at < NOW() - INTERVAL '1 year'
RETURNING email, id;
```

---

## 5. Upsert (`INSERT ... ON CONFLICT`)

Perform an atomic insert or update in a single statement:

```sql
INSERT INTO user_settings (user_id, theme, notifications)
VALUES (1, 'dark', true)
ON CONFLICT (user_id) 
DO UPDATE SET 
  theme = EXCLUDED.theme,
  notifications = EXCLUDED.notifications,
  updated_at = NOW()
RETURNING *;
```
