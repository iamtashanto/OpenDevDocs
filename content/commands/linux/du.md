---
title: "Estimate File Space Usage (du)"
description: Calculate directory disk space, find large files, and diagnose disk usage with du.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - du
  - disk
  - storage
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>du -sh * | sort -h</Command>

---

## Short Description

`du` (Disk Usage) estimates and summarizes file and directory space consumption.

---

## Examples

### 1. Summary Size of Current Directory (`-sh`)

```bash
du -sh .
```

### 2. List Sizes of All Subdirectories (1-Level Deep)

```bash
du -h --max-depth=1 /var
```

### 3. Find Top 10 Largest Folders in Directory

```bash
du -sh * | sort -hr | head -n 10
```

### 4. Exclude Specific Patterns

```bash
du -sh --exclude="*.log" /var/www
```
