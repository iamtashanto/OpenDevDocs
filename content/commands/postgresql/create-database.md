---
title: "Create PostgreSQL Database (createdb)"
description: Create a new PostgreSQL database directly from the terminal using the createdb command-line utility.
category: database
topic: postgresql
type: reference
level: beginner
tags:
  - postgresql
  - createdb
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

<Command>createdb -h localhost -U postgres -O db_owner database_name</Command>

---

## Short Description

`createdb` is a command-line wrapper around the SQL command `CREATE DATABASE`.

---

## Examples

### 1. Create Database with Specific Owner

```bash
createdb -U postgres -O app_user production_db
```

### 2. Create Database with UTF-8 Encoding

```bash
createdb -U postgres -E UTF8 -O app_user analytics_db
```
