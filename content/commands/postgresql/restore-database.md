---
title: "Restore PostgreSQL Database (pg_restore)"
description: Restore a PostgreSQL database from an archive file created by pg_dump using the pg_restore CLI.
category: database
topic: postgresql
type: reference
level: intermediate
tags:
  - postgresql
  - pg_restore
  - backup
  - restore
  - cli
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Command

<Command>pg_restore -h localhost -U postgres -d database_name -v backup.dump</Command>

---

## Short Description

`pg_restore` restores a PostgreSQL database from an archive created by `pg_dump` in non-plain-text formats (such as custom `-F c` or directory `-F d`).

---

## Examples

### 1. Restore with Clean / Drop Existing Schema First

```bash
pg_restore -U postgres -d production_db --clean --if-exists -v backup.dump
```

### 2. Multi-Threaded Parallel Restore (4 Cores)

```bash
pg_restore -U postgres -d production_db -j 4 -v backup.dump
```

### 3. Restore Only Specific Tables

```bash
pg_restore -U postgres -d production_db -t users -t orders backup.dump
```
