---
title: "Change File Permissions (chmod)"
description: Change file and directory access permissions using numeric octal codes or symbolic notation with chmod.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - chmod
  - permissions
  - security
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>chmod 755 script.sh</Command>

---

## Short Description

`chmod` (Change Mode) modifies the file system access permissions of files and directories for users, groups, and others.

---

## Examples

### 1. Make Script Executable

```bash
chmod +x deploy.sh
```

### 2. Set Private Key Permissions (`600`)

```bash
chmod 600 ~/.ssh/id_ed25519
```

### 3. Set Standard Web Permissions Recursively

```bash
# Set 755 on directories, 644 on files
chmod -R 755 /var/www/html
```

### 4. Remove Write Permissions from Others

```bash
chmod o-w shared_file.txt
```
