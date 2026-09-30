---
title: "Output Last Part of Files & Stream Logs (tail)"
description: Output the last lines of files and stream newly appended log entries in real time using tail -f.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - tail
  - logs
  - files
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>tail -f /var/log/nginx/access.log</Command>

---

## Short Description

`tail` prints the last part of a file (default 10 lines). The `-f` (follow) option keeps the file open and outputs new lines in real time as they are appended.

---

## Examples

### 1. View Last 20 Lines

```bash
tail -n 20 /var/log/syslog
```

### 2. Follow Live Log Stream (`-f`)

```bash
tail -f /var/log/nginx/error.log
```

### 3. Follow with Retry on File Rotation (`-F`)

Keeps tracking the log file even if it is rotated, truncated, or recreated by `logrotate`:

```bash
tail -F /var/log/app.log
```

### 4. Show Last 50 Lines and Continue Following

```bash
tail -n 50 -f /var/log/postgresql/postgresql-16-main.log
```
