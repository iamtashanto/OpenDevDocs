---
title: "Linux Background Services & Daemons"
description: Understand Linux background services, daemons, PID files, socket activation, and service management lifecycles.
category: linux
topic: linux
type: concept
level: intermediate
tags:
  - linux
  - services
  - daemons
  - devops
  - administration
platforms:
  - linux
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## What is a Service / Daemon?

A **Service** (or **Daemon**) is a background process that runs continuously without direct user interaction to handle system tasks, listen for incoming network connections, or execute scheduled jobs.

By convention, Linux daemons often end with the letter `d` (e.g. `sshd`, `systemd`, `dockerd`, `crond`, `httpd`).

---

## Interactive Process vs System Service

| Attribute | Interactive User Process | System Daemon / Service |
| :--- | :--- | :--- |
| **Trigger** | Launched manually by a logged-in user | Started automatically at boot by the init system |
| **TTY / Terminal** | Bound to standard terminal (`pts/0`) | Detached from any terminal (`?`) |
| **Termination** | Closes when user logs out or closes terminal | Continues running persistently in background |
| **Restarts** | Requires manual restart upon crash | Init system (systemd) automatically restarts upon failure |

---

## Service Lifecycle States

```
[ Disabled / Stopped ]
         │
         ├── `systemctl start <service>`
         ▼
    [ Running ] ──(Crash / Error)──> [ Failed ] ──(Auto-Restart)──> [ Running ]
         │
         ├── `systemctl stop <service>`
         ▼
    [ Inactive ]
```

---

## Managing Daemons in Modern Linux

On modern Linux distributions, services are managed by **systemd**. You interact with system services using the `systemctl` CLI utility to start, stop, reload, enable (auto-boot), or inspect service health.
