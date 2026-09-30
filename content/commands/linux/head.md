---
title: "Output Beginning of Files (head)"
description: Output the first part (first N lines or bytes) of files in Linux and Unix environments.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - head
  - files
  - text
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>head -n 10 filename.txt</Command>

---

## Short Description

`head` prints the first part (by default, the first 10 lines) of one or more text files to standard output.

---

## Examples

### 1. View First 10 Lines (Default)

```bash
head /etc/passwd
```

### 2. View First 25 Lines (`-n`)

```bash
head -n 25 access.log
```

### 3. View First 100 Bytes (`-c`)

```bash
head -c 100 binary_data.dat
```

### 4. Combine with Pipeline

```bash
# View top 5 largest directories
du -sh * | sort -hr | head -n 5
```
