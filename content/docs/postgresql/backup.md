---
title: "PostgreSQL Database Backup with pg_dump"
description: Export and backup PostgreSQL databases using pg_dump, custom compressed archives, multi-threaded parallel dumps, and pg_dumpall.
category: database
topic: postgresql
type: guide
level: intermediate
tags:
  - postgresql
  - backup
  - pg_dump
  - devops
  - administration
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Overview

`pg_dump` is PostgreSQL's official logical backup utility. It creates consistent point-in-time snapshots of a database without locking out concurrent read or write transactions.

---

## 1. Custom Compressed Format (`-F c`) (Recommended for Production)

The custom archive format compresses data, supports selective object restoration, and enables parallel multi-core extraction:

```bash
pg_dump -h localhost -p 5432 -U postgres -d production_db \
  -F c -b -v -f "backup_production_$(date +%Y%m%d_%H%M%S).dump"
```

### Key Flags:
- **`-F c`**: Custom binary archive format.
- **`-b`**: Include large objects (BLOBs).
- **`-v`**: Verbose logging output.
- **`-f <file>`**: Destination output filepath.

---

## 2. Plain SQL Text Backup

Generates a standard human-readable SQL file:

```bash
pg_dump -U postgres -d production_db > backup.sql

# Compressed with gzip on-the-fly
pg_dump -U postgres -d production_db | gzip > backup.sql.gz
```

---

## 3. High-Speed Multi-Threaded Parallel Backup (`-F d -j`)

For multi-gigabyte or terabyte databases, dump data using multiple CPU cores into a directory:

```bash
pg_dump -U postgres -d production_db \
  -F d -j 4 -v -f ./production_backup_dir
```

---

## 4. Backing Up All Databases & Global Roles (`pg_dumpall`)

To export all databases, user accounts, roles, and global configuration settings:

```bash
pg_dumpall -U postgres -h localhost > all_databases_and_roles.sql

# Dump only roles and global permissions
pg_dumpall -U postgres --globals-only > global_roles.sql
```
