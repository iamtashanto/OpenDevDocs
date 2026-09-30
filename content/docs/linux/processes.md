---
title: "Linux Process Management & Signals"
description: Monitor and manage Linux processes, PID lifecycles, background execution, and sending termination signals (kill, SIGTERM, SIGKILL).
category: linux
topic: linux
type: guide
level: intermediate
tags:
  - linux
  - processes
  - ps
  - top
  - kill
  - signals
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## What is a Process?

A **Process** is a running instance of an executable program in memory. The Linux kernel assigns every process a unique **Process ID (PID)** and tracks its Parent Process ID (**PPID**).

---

## 1. Inspecting Processes

```bash
# Snapshot of all running processes on the system
ps aux

# Search for a specific process (e.g. node)
ps aux | grep node

# Interactive real-time resource monitor
top
# or modern interactive monitor:
htop
```

---

## 2. Background and Foreground Execution

- **`command &`**: Appending `&` launches the command in the background immediately.
- **`Ctrl + Z`**: Pauses the current foreground process and moves it to the background.
- **`jobs`**: Lists all background jobs running in the current shell session.
- **`bg %1`**: Resumes paused job #1 in the background.
- **`fg %1`**: Brings background job #1 back to the active foreground.
- **`nohup`**: Prevents a background process from being killed when you close the terminal session:
  ```bash
  nohup node server.js > server.log 2>&1 &
  ```

---

## 3. Terminating Processes with Signals (`kill`)

Signals are asynchronous notifications sent to a process by the kernel or user:

| Signal | Number | Description | Catchable? |
| :--- | :--- | :--- | :--- |
| **`SIGTERM` (Default)** | **15** | Requests graceful process shutdown (flushes buffers, closes DB pools). | **Yes** |
| **`SIGKILL`** | **9** | Forces instant kernel-level termination (cannot be intercepted or cleaned up). | **No** |
| **`SIGINT`** | **2** | Interrupt signal sent by pressing `Ctrl + C` in the terminal. | **Yes** |
| **`SIGHUP`** | **1** | Hangup signal; often used to tell daemons to reload configuration files. | **Yes** |

```bash
# Graceful termination (Recommended first attempt)
kill -15 12345
# or simply:
kill 12345

# Forceful kill (Use only if process is frozen or unresponsive)
kill -9 12345

# Kill by process name
pkill -f node
killall nginx
```
