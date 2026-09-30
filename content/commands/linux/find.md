---
title: "Search Files & Directories (find)"
description: Search the filesystem for files and directories based on name, size, modification date, or permissions using find.
category: linux
topic: linux-commands
type: reference
level: intermediate
tags:
  - linux
  - find
  - search
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

<Command>find /path/to/search -name "*.log"</Command>

---

## Short Description

`find` searches directory trees for files and directories that match specified criteria (such as name pattern, size, type, or modification time) and can execute actions on the results.

---

## Examples

### 1. Find Files by Name (Case-Insensitive)

```bash
find . -type f -iname "*.md"
```

### 2. Find Directories Only

```bash
find /var/www -type d -name "config"
```

### 3. Find Files Larger than 100MB

```bash
find / -type f -size +100M 2>/dev/null
```

### 4. Find Files Modified in the Last 24 Hours

```bash
find /var/log -type f -mtime -1
```

### 5. Find and Execute Action (`-exec` or `-delete`)

```bash
# Delete all .DS_Store files recursively
find . -name ".DS_Store" -type f -delete

# Change all directory permissions to 755
find /var/www/html -type d -exec chmod 755 {} +

# Change all file permissions to 644
find /var/www/html -type f -exec chmod 644 {} +
```
