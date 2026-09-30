---
title: "Working with Files & Directories in Linux"
description: Create, copy, move, rename, read, and delete files and directories in Linux using touch, mkdir, cp, mv, cat, less, and rm.
category: linux
topic: linux
type: guide
level: beginner
tags:
  - linux
  - files
  - directories
  - mkdir
  - cp
  - mv
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## 1. Creating Files and Directories

```bash
# Create an empty file or update timestamp
touch index.html server.js

# Create nested directory trees recursively
mkdir -p src/controllers/auth
```

---

## 2. Copying Files and Folders (`cp`)

```bash
# Copy single file
cp .env.example .env

# Copy directory recursively (-r)
cp -r src/ src_backup/

# Preserve timestamps and file permissions (-a archive mode)
cp -a /var/www/html /var/www/html_snapshot
```

---

## 3. Moving and Renaming (`mv`)

In Linux, moving a file within the same filesystem is identical to renaming it:

```bash
# Rename file
mv old_name.txt new_name.txt

# Move file into another directory
mv config.json src/config/
```

---

## 4. Viewing File Contents

- **`cat file.txt`**: Prints entire file to terminal (best for small files).
- **`less file.txt`**: Interactive scrollable viewer (`q` to quit, `/pattern` to search).
- **`head -n 20 file.txt`**: View first 20 lines.
- **`tail -n 50 file.txt`**: View last 50 lines.
- **`tail -f /var/log/app.log`**: Follow and stream newly appended log lines in real time.

---

## 5. Deleting Files and Folders (`rm`)

> [!CAUTION]
> The Linux terminal has no Trash / Recycle Bin. Deletions with `rm` are permanent and immediate.

```bash
# Delete a single file
rm scratch.txt

# Delete a non-empty directory recursively (-r)
rm -r old_project/

# Force delete without confirmation prompts (-rf)
rm -rf node_modules/
```
