---
title: "Kill Process on Port (lsof + kill)"
description: Find and terminate any process holding a specific TCP/UDP port on Linux or macOS.
category: linux
topic: linux
type: reference
level: beginner
tags:
  - linux
  - macos
  - process
  - networking
  - lsof
platforms:
  - linux
  - macos
tested:
  bash: "5.x"
  zsh: "5.x"
lastVerified: "2026-09-30"
---

## Command

<Command>lsof -i :3000 -t | xargs kill -9</Command>

---

## Short Description

Quickly identifies which PID (Process Identifier) is actively bound to a port (e.g. 3000, 8080) and terminates it immediately with `SIGKILL (-9)`.

---

## Breakdown

```bash
# Step 1: List only the PID (-t) listening on port 3000
lsof -i :3000 -t

# Step 2: Pipe the PID into kill (graceful SIGTERM first)
lsof -i :3000 -t | xargs kill

# Or if process is completely unresponsive, force kill:
lsof -i :3000 -t | xargs kill -9
```

<Callout type="warning">
Use `kill -9` (`SIGKILL`) with caution. `SIGKILL` does not allow the application to flush disk buffers or close active network and database connections cleanly. Try graceful termination without `-9` first.
</Callout>

---

## Alternatives by Tool

### Using `fuser` (Standard Linux)

```bash
sudo fuser -k 3000/tcp
```

### Using `ss` and `pkill`

```bash
ss -lptn 'sport = :3000'
```
