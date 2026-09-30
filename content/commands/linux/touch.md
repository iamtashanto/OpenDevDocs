---
title: "Create Empty File & Update Timestamps (touch)"
description: Create new empty files or update last accessed and modified timestamps of existing files using touch.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - touch
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

<Command>touch filename.txt</Command>

---

## Short Description

`touch` creates a new empty file if the specified file does not exist, or updates the file's access and modification timestamps if it already exists.

---

## Examples

### 1. Create Empty Files

```bash
touch app.js styles.css .env
```

### 2. Update Timestamp Without Modifying Contents

```bash
touch existing_file.txt
```

### 3. Set Specific Timestamp

```bash
touch -t 202610011200.00 old_archive.tar.gz
```
