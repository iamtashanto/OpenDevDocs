---
title: "Vacuum & Optimize PostgreSQL Database (vacuumdb)"
description: Clean dead tuples, reclaim disk space, and update query planner statistics using the vacuumdb CLI tool.
category: database
topic: postgresql
type: reference
level: intermediate
tags:
  - postgresql
  - vacuumdb
  - maintenance
  - optimization
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

<Command>vacuumdb -h localhost -U postgres -d database_name -z -v</Command>

---

## Short Description

`vacuumdb` is a command-line utility for cleaning and updating statistics for a PostgreSQL database.

---

## Examples

### 1. Vacuum and Analyze All Tables in Database

```bash
vacuumdb -U postgres -d production_db --analyze --verbose
```

### 2. Vacuum All Databases on Server

```bash
vacuumdb -U postgres --all --analyze --jobs=4
```

### 3. Full Table Lock Vacuum (Reclaims Disk to OS)

```bash
vacuumdb -U postgres -d production_db --full --table=large_audit_log
```
