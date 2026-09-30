---
title: "Real-Time Process Activity (top)"
description: Monitor real-time CPU usage, memory utilization, load average, and running processes interactively with top.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - top
  - monitoring
  - cpu
  - memory
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>top</Command>

---

## Short Description

`top` provides an ongoing, dynamic real-time view of system performance, including CPU usage, RAM/swap consumption, load averages, and individual process metrics.

---

## Key Interactive Shortcuts in `top`

| Key | Action |
| :--- | :--- |
| **`M`** | Sort processes by Memory usage (highest first) |
| **`P`** | Sort processes by CPU usage (highest first) |
| **`k`** | Prompt for a PID and signal to kill a process |
| **`1`** | Toggle individual CPU core breakdown view |
| **`q`** | Quit `top` |

---

## Examples

```bash
# Launch top
top

# Run in batch mode for automated scripts (sample 1 iteration)
top -b -n 1 | head -n 20
```
