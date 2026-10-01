---
title: "Resolving Port Conflicts (EADDRINUSE)"
description: Diagnose and resolve port collisions, find the holding Process ID (PID) using lsof, netstat, and ss, and terminate stale processes.
category: networking
topic: developer-networking
type: troubleshooting
level: beginner
tags:
  - networking
  - ports
  - eaddrinuse
  - troubleshooting
  - lsof
platforms:
  - web
  - node
  - linux
  - macos
  - windows
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## What is a Port Conflict (`EADDRINUSE`)?

In TCP/IP networking, only one process can bind to a specific `(IP Address, Port Number)` combination at any given time. If an application attempts to start on a port that is already in use by another process (or a previous zombie instance that didn't terminate cleanly), the operating system returns an **`EADDRINUSE`** error:

```
Error: listen EADDRINUSE: address already in use :::3000
```

---

## 3-Step Fix Workflow

```
1. Identify the holding PID (Process ID)
       │
       ▼
2. Verify process identity (Ensure it's safe to kill)
       │
       ▼
3. Terminate process (kill -9 <PID>)
```

---

## 1. macOS & Linux: Finding and Killing with `lsof`

```bash
# Step 1: Find the PID listening on port 3000
lsof -i :3000

# Output example:
# COMMAND   PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
# node    14285 user   23u  IPv6 0x1234567890abcdef      0t0  TCP *:3000 (LISTEN)

# Step 2: Kill the process by PID (Try SIGTERM first, fallback to SIGKILL)
kill 14285
# or if unresponsive:
kill -9 14285
```

<Callout type="warning">
Always inspect the `COMMAND` column from `lsof -i :<port>` before killing the process. You want to make sure you are terminating a stray development server rather than an unrelated system service or database.
</Callout>

### One-Liner Quick Kill (Development Only)
```bash
# Gracefully kill holding process:
kill $(lsof -t -i :3000)
# Force kill if stuck:
kill -9 $(lsof -t -i :3000)
```

---

## 2. Linux: Using `ss` / `fuser`

```bash
# Find with ss
sudo ss -tulpn | grep :3000

# Kill holding process with fuser
sudo fuser -k 3000/tcp
```

---

## 3. Windows (PowerShell / CMD)

```powershell
# Find holding PID on Windows
netstat -ano | findstr :3000

# Terminate process by PID
taskkill /PID 14285 /F
```
