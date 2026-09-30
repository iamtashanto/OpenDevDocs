---
title: "Make Directory (mkdir)"
description: Create new directories and nested directory hierarchies recursively using mkdir.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - mkdir
  - directories
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>mkdir -p path/to/nested/directory</Command>

---

## Short Description

`mkdir` creates one or more new directories in the filesystem.

---

## Examples

### 1. Create a Single Directory

```bash
mkdir projects
```

### 2. Create Multiple Nested Directories Recursively (`-p`)

Creates all required parent directories without throwing errors if they already exist:

```bash
mkdir -p src/components/ui
```

### 3. Create Directory with Specific Permissions Mode

```bash
mkdir -m 700 private_keys
```
