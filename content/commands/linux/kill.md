---
title: "Terminate Processes (kill)"
description: Send termination and control signals (SIGTERM, SIGKILL, SIGHUP) to processes by PID in Linux.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - kill
  - processes
  - signals
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>kill -15 12345</Command>

---

## Short Description

`kill` sends a specified OS signal to one or more processes specified by Process ID (PID). By default, it sends `SIGTERM` (signal 15), requesting graceful termination.

---

## Examples

### 1. Graceful Termination (`SIGTERM` - Default)

```bash
kill 12345
# or explicitly:
kill -15 12345
```

### 2. Forceful Immediate Kill (`SIGKILL` / `-9`)

> [!WARNING]
> `SIGKILL` cannot be caught or ignored. The process terminates immediately without saving open files or closing database connections.

```bash
kill -9 12345
```

### 3. Send Reload Signal (`SIGHUP` / `-1`)

```bash
sudo kill -1 $(cat /var/run/nginx.pid)
```

### 4. Kill by Name with `pkill` and `killall`

```bash
# Kill all processes named 'node'
pkill node
killall node
```
