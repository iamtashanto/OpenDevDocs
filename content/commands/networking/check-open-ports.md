---
title: "Check Open Ports (netstat & ss)"
description: Display all active TCP and UDP listening sockets and process mappings on a server.
category: networking
topic: networking
type: reference
level: beginner
tags:
  - networking
  - ports
  - netstat
  - ss
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04"
lastVerified: "2026-09-30"
---

## Command

<Command>sudo ss -tulnp</Command>

---

## Short Description

`ss` (Socket Statistics) is the modern replacement for `netstat`. It dumps open network sockets, listening ports, established connections, and which process owns each socket.

---

## Syntax & Common Flags

```bash
sudo ss -tulnp
```

| Flag | Meaning |
| :--- | :--- |
| `-t` | Display **TCP** sockets. |
| `-u` | Display **UDP** sockets. |
| `-l` | Show only **Listening** sockets (omits established connections). |
| `-n` | Do not resolve service names (show numeric port numbers like `3000` instead of `http`). |
| `-p` | Show the **Process** name and PID using the socket (requires `sudo`). |
