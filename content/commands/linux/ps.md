---
title: "Report Process Status (ps)"
description: View active processes, PIDs, user ownership, memory, and CPU usage snapshots in Linux using ps.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - ps
  - processes
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>ps aux</Command>

---

## Short Description

`ps` (Process Status) displays a snapshot of current running processes on the system.

---

## Examples

### 1. Snapshot All System Processes (`aux`)

```bash
ps aux
```

### 2. Search for Specific Process (e.g. Node or NGINX)

```bash
ps aux | grep node
```

### 3. Display Process Hierarchy Tree

```bash
ps -ef --forest
```

### 4. Sort Processes by Memory Usage

```bash
ps aux --sort=-%mem | head -n 10
```
