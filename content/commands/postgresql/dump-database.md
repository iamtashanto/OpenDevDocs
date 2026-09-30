---
title: "PostgreSQL Database Backup (pg_dump)"
description: Export and backup a PostgreSQL database schema and data to a plain text SQL or custom binary dump.
category: database
topic: postgresql
type: reference
level: intermediate
tags:
  - postgresql
  - database
  - backup
  - pg_dump
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Command

<Command>pg_dump -U postgres -d my_database -F c -b -v -f my_database_backup.dump</Command>

---

## Short Description

`pg_dump` is an official PostgreSQL utility for creating consistent logical backups of a single database, even while the database is actively being read and written to by clients.

---

## Examples

### 1. Plain SQL Text Dump (Human Readable)

```bash
pg_dump -U postgres -h localhost -d production_db > backup_$(date +%Y%m%d).sql
```

### 2. Custom Compressed Archive Format (Recommended for Production)

```bash
pg_dump -U postgres -h localhost -d production_db -F c -b -v -f backup.dump
```

### 3. Restore with `pg_restore`

```bash
pg_restore -U postgres -d production_db -v backup.dump
```
