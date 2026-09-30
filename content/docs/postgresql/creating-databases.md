---
title: "Creating & Managing Databases in PostgreSQL"
description: Create, configure, alter, and drop PostgreSQL databases using SQL statements and createdb/dropdb CLI tools.
category: database
topic: postgresql
type: guide
level: beginner
tags:
  - postgresql
  - database
  - createdb
  - ddl
  - administration
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## 1. Creating Databases via SQL

```sql
-- Create a new database with specific owner and UTF-8 encoding
CREATE DATABASE production_db
    WITH 
    OWNER = app_user
    ENCODING = 'UTF8'
    LC_COLLATE = 'C.UTF-8'
    LC_CTYPE = 'C.UTF-8'
    CONNECTION LIMIT = 100;
```

---

## 2. Creating Databases via CLI (`createdb`)

The `createdb` command-line utility creates databases directly from your terminal:

```bash
# Create database owned by app_user
createdb -h localhost -p 5432 -U postgres -O app_user production_db
```

---

## 3. Altering Database Configuration

```sql
-- Rename a database (must terminate all active connections first)
ALTER DATABASE old_db_name RENAME TO new_db_name;

-- Change database owner
ALTER DATABASE production_db OWNER TO new_owner;

-- Set custom configuration parameters per database
ALTER DATABASE production_db SET timezone TO 'UTC';
ALTER DATABASE production_db SET statement_timeout TO '30s';
```

---

## 4. Dropping (Deleting) a Database

> [!WARNING]
> Dropping a database permanently removes all tables, schemas, views, and data. This operation cannot be undone.

```sql
-- Terminate active client connections before dropping
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE datname = 'staging_db' AND pid <> pg_backend_pid();

-- Drop database
DROP DATABASE IF EXISTS staging_db;
```

Or via CLI:

```bash
dropdb -h localhost -U postgres staging_db
```
