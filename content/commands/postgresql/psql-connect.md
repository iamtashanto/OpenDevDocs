---
title: "Connect to PostgreSQL (psql)"
description: Connect to a local or remote PostgreSQL database instance using the psql command-line client.
category: database
topic: postgresql
type: reference
level: beginner
tags:
  - postgresql
  - psql
  - cli
  - database
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Command

<Command>psql -h localhost -p 5432 -U postgres -d mydb</Command>

---

## Short Description

`psql` is the interactive terminal-based frontend for PostgreSQL. It allows you to enter queries interactively, issue them to PostgreSQL, and inspect the query results.

---

## Examples

### 1. Connect Using Connection URI

```bash
psql "postgresql://user:secret@localhost:5432/production_db?sslmode=require"
```

### 2. Execute SQL File Directly

```bash
psql -U postgres -d mydb -f schema_migration.sql
```

### 3. Run Single Command and Exit

```bash
psql -U postgres -d mydb -c "SELECT version();"
```
