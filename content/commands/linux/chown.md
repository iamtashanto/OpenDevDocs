---
title: "Change File Owner & Group (chown)"
description: Change user ownership and group association of files and directories in Linux using chown.
category: linux
topic: linux-commands
type: reference
level: intermediate
tags:
  - linux
  - chown
  - ownership
  - permissions
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>sudo chown -R user:group /path/to/target</Command>

---

## Short Description

`chown` (Change Owner) changes the user and/or group ownership of files and directories.

---

## Examples

### 1. Change Owner Only

```bash
sudo chown deployer app.log
```

### 2. Change Owner and Group Simultaneously

```bash
sudo chown deployer:developers index.html
```

### 3. Change Ownership Recursively (`-R`)

```bash
sudo chown -R www-data:www-data /var/www/html
```

### 4. Change Group Only (Alternative to `chgrp`)

```bash
sudo chown :docker /var/run/docker.sock
```
