---
title: "List Directory Contents (ls)"
description: List files and directories with permissions, ownership, human-readable file sizes, and hidden files.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - ls
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

<Command>ls -la</Command>

---

## Short Description

`ls` lists files and subdirectories within a directory, providing metadata such as file permissions, size, modification date, and ownership.

---

## Examples

### 1. Detailed Long List with Hidden Files

```bash
ls -la
```

### 2. Human-Readable File Sizes (`-lh`)

```bash
ls -lh
```

### 3. Sort by Modification Time (Newest First)

```bash
ls -lht
```

### 4. Sort by File Size (Largest First)

```bash
ls -lhS
```
