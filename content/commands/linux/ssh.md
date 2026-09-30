---
title: "Secure Shell Client (ssh)"
description: Connect securely to remote Linux servers, execute remote commands, and forward ports using ssh.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - ssh
  - remote
  - devops
  - security
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>ssh -i ~/.ssh/id_ed25519 user@hostname_or_ip</Command>

---

## Short Description

`ssh` (Secure Shell) is a protocol and client utility for securely logging into remote systems and executing commands over encrypted channels.

---

## Examples

### 1. Connect with Specific Key and Port

```bash
ssh -i ~/.ssh/id_ed25519 -p 2222 deployer@192.0.2.10
```

### 2. Execute Command on Remote Server Without Interactive Shell

```bash
ssh deployer@192.0.2.10 "sudo systemctl restart nginx && uptime"
```

### 3. Local Port Forwarding (Access Remote Database Locally)

Forward local port `5433` to remote server's localhost `5432`:

```bash
ssh -L 5433:localhost:5432 deployer@192.0.2.10 -N
```

Now connect to `localhost:5433` to query the remote PostgreSQL instance safely without exposing port 5432 to the public internet.
