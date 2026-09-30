---
title: "Move & Rename Files (mv)"
description: Move and rename files and directories in Linux and Unix terminal environments.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - mv
  - files
  - rename
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>mv source_file destination_file</Command>

---

## Short Description

`mv` moves or renames files and directories. In Linux, renaming a file is technically moving it to a new name within the directory table.

---

## Examples

### 1. Rename a File

```bash
mv draft.md published.md
```

### 2. Move File to Another Directory

```bash
mv bundle.js public/dist/
```

### 3. Move Multiple Files at Once

```bash
mv *.png *.jpg public/images/
```

### 4. Do Not Overwrite Existing Destination (`-n`)

```bash
mv -n incoming_data.json data.json
```
