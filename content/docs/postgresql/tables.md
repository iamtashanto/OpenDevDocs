---
title: "PostgreSQL Tables & Schema Definition"
description: Master CREATE TABLE, modern IDENTITY columns, ALTER TABLE migrations, and data type selection in PostgreSQL.
category: database
topic: postgresql
type: guide
level: beginner
tags:
  - postgresql
  - tables
  - ddl
  - identity
  - schema
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Creating Tables with Modern Identity Columns

> [!NOTE]
> Modern PostgreSQL recommends `GENERATED ALWAYS AS IDENTITY` over legacy `SERIAL` types because it complies with SQL standards and prevents accidental manual integer overrides.

```sql
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    bio TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

## Altering Tables (`ALTER TABLE`)

Modify existing table schemas without data loss:

```sql
-- Add a new column
ALTER TABLE users ADD COLUMN phone_number VARCHAR(20);

-- Drop a column
ALTER TABLE users DROP COLUMN bio;

-- Rename a column
ALTER TABLE users RENAME COLUMN username TO handle;

-- Change column data type
ALTER TABLE users ALTER COLUMN phone_number TYPE VARCHAR(30);

-- Set NOT NULL constraint on existing column
ALTER TABLE users ALTER COLUMN phone_number SET NOT NULL;

-- Add a CHECK constraint
ALTER TABLE users ADD CONSTRAINT chk_email_format CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$');
```

---

## Truncating and Dropping Tables

```sql
-- Fast deletion of all rows while preserving table structure & resetting identity sequences
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- Permanently remove table and all dependent foreign key relationships
DROP TABLE IF EXISTS users CASCADE;
```
