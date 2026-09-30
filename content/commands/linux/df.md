---
title: "Report File System Disk Space Usage (df)"
description: Check disk partition free space, mount points, and inode utilization in human-readable format with df.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - df
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

<Command>df -h</Command>

---

## Short Description

`df` (Disk Free) displays the amount of available and used disk space on all mounted filesystems.

---

## Examples

### 1. Human-Readable Capacity Breakdown (`-h`)

```bash
df -h
```

### 2. Include Filesystem Types (`-T`)

```bash
df -hT
```

### 3. Check Inode Usage (`-i`)

```bash
df -i
```

### 4. Check Disk Space for a Specific Directory

```bash
df -h /var/lib/docker
```
