---
title: "Copy Files & Directories (cp)"
description: Copy files and directories recursively, preserve attributes, and create backups using cp.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - cp
  - files
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>cp -r source_dir destination_dir</Command>

---

## Short Description

`cp` copies files and directories from one location to another.

---

## Examples

### 1. Copy a Single File

```bash
cp config.example.json config.json
```

### 2. Copy Directory Recursively (`-r`)

```bash
cp -r src/ src_backup/
```

### 3. Archive Mode (`-a`) (Preserves Permissions, Timestamps, & Links)

```bash
cp -a /var/www/html /var/www/html_snapshot
```

### 4. Interactive Mode (`-i`) (Prompt Before Overwriting)

```bash
cp -i new_data.csv data.csv
```
