---
title: "Secure Copy Protocol (scp)"
description: Copy files and directories securely between local and remote systems over an encrypted SSH connection using scp.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - scp
  - ssh
  - file-transfer
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>scp -i ~/.ssh/id_ed25519 local_file.tar.gz user@remote:/path/to/destination/</Command>

---

## Short Description

`scp` (Secure Copy Protocol) copies files and directories securely between hosts over an encrypted SSH connection.

---

## Examples

### 1. Upload Local File to Remote Server

```bash
scp ./build.tar.gz deployer@192.0.2.10:/var/www/
```

### 2. Download Remote File to Local Directory

```bash
scp deployer@192.0.2.10:/var/log/nginx/access.log ./server_access.log
```

### 3. Copy Directory Recursively (`-r`) with Custom Port (`-P`)

```bash
scp -P 2222 -r ./dist deployer@192.0.2.10:/var/www/html/
```
