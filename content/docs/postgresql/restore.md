---
title: "Restoring PostgreSQL Databases with pg_restore"
description: Restore PostgreSQL databases from custom dumps, directory archives, and SQL scripts using pg_restore and psql.
category: database
topic: postgresql
type: guide
level: intermediate
tags:
  - postgresql
  - restore
  - pg_restore
  - backup
  - disaster-recovery
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## 1. Restoring Custom Binary Dumps (`pg_restore`)

For backups created with `pg_dump -F c`:

```bash
# Restore into an existing database
pg_restore -h localhost -p 5432 -U postgres -d target_db -v backup.dump

# Clean (drop) existing tables before restoring and recreate schema
pg_restore -U postgres -d target_db --clean --if-exists -v backup.dump
```

---

## 2. Multi-Threaded Parallel Restore (`-j`)

Drastically accelerate database restores on multi-core servers:

```bash
pg_restore -U postgres -d target_db -j 4 -v backup.dump
```

---

## 3. Restoring Specific Tables or Schemas

Extract only a specific table from a full database backup dump:

```bash
# Restore only the users and orders tables
pg_restore -U postgres -d target_db -t users -t orders backup.dump

# Restore only the public schema
pg_restore -U postgres -d target_db -n public backup.dump
```

---

## 4. Restoring Plain SQL Files (`psql`)

Plain text `.sql` files cannot be processed by `pg_restore`. Use standard `psql` piping:

```bash
# Restore plain SQL script
psql -h localhost -U postgres -d target_db -f backup.sql

# Restore gzipped SQL script
gunzip -c backup.sql.gz | psql -U postgres -d target_db
```

---

## Disaster Recovery Checklist

1. Always verify backup integrity by performing regular test restores in a staging environment.
2. Ensure database users and roles have been created before restoring database objects.
3. Terminate active application connections before performing full `--clean` database restorations.
