---
title: "Remove Files & Directories (rm)"
description: Remove files and directories in Linux, with safety warnings for recursive and forced deletion (rm -rf).
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - rm
  - deletion
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

<Command>rm -rf /path/to/target</Command>

---

## Short Description

`rm` (Remove) deletes files or directories from the filesystem.

> [!CAUTION]
> **Deletions with `rm` are permanent and non-recoverable.** There is no trash bin. Never run `rm -rf /` or commands with unexpanded variables (e.g. `rm -rf $DIR/` where `$DIR` is empty, evaluating to `rm -rf /`).

---

## Examples

### 1. Remove a Single File

```bash
rm temp_file.log
```

### 2. Remove Multiple Files with Wildcard

```bash
rm *.tmp
```

### 3. Remove a Directory Recursively (`-r`)

```bash
rm -r build/
```

### 4. Force Remove Recursively Without Confirmation Prompts (`-rf`)

```bash
rm -rf node_modules/ .next/
```

### 5. Interactive Confirmation Mode (`-i`)

```bash
rm -i important_document.pdf
```
