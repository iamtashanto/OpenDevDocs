---
title: "Connecting to PostgreSQL & psql Cheatsheet"
description: Connect to PostgreSQL databases using psql CLI, connection strings, environment variables, and essential psql slash commands.
category: database
topic: postgresql
type: guide
level: beginner
tags:
  - postgresql
  - psql
  - cli
  - connection-string
  - database
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## 1. Connecting via `psql` CLI

```bash
# Connect with explicit flags
psql -h localhost -p 5432 -U postgres -d my_database

# Connect using a standard connection URI
psql "postgresql://postgres:mysecretpassword@localhost:5432/my_database"
```

---

## 2. Standard Connection URI Format

```
postgresql://[user[:password]@][host][:port][/dbname][?param1=value1&...]
```

Example in Node.js / Next.js `.env.local`:
```ini
DATABASE_URL="postgresql://app_user:s3cur3p@ss@127.0.0.1:5432/production_db?sslmode=prefer"
```

---

## 3. Essential `psql` Meta-Commands

When inside the interactive `psql` prompt, use backslash `\` commands for database inspection:

| Command | Action |
| :--- | :--- |
| **`\l`** or **`\l+`** | List all databases |
| **`\c <dbname>`** | Connect to (switch to) a different database |
| **`\dt`** or **`\dt+`** | List all tables in current database |
| **`\d <tablename>`** | Describe table schema, columns, types, and constraints |
| **`\du`** | List all database roles / users and privileges |
| **`\dn`** | List all schemas (e.g. `public`) |
| **`\x`** | Toggle expanded table display mode (great for wide rows) |
| **`\timing`** | Toggle query execution timer |
| **`\i <file.sql>`** | Execute SQL commands from a local file |
| **`\q`** | Quit and exit `psql` |

---

## 4. Environment Variables (`.pgpass`)

Store credentials in `~/.pgpass` (permissions `0600`) to avoid typing passwords interactively:

```
# hostname:port:database:username:password
localhost:5432:*:postgres:mysecretpassword
```
