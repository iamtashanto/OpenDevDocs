---
title: "Network Ports and Sockets"
description: "Understanding network ports, socket endpoints, standard port allocations (80, 443, 3000, 5432), and resolving port collisions."
category: fundamentals
topic: networking
type: guide
level: beginner
tags:
  - ports
  - networking
  - sockets
  - dev-server
  - fundamentals
platforms:
  - all
lastVerified: "2026-09-30"
---

# Network Ports and Sockets

While an **IP address** identifies a specific machine on a network, a **port number** identifies a specific application or process running on that machine. The combination of an IP address and a port number forms a **network socket** (e.g. `127.0.0.1:3000`).

---

## 1. How Ports Work

Think of the IP address as an apartment building's street address, and the port number as an individual apartment unit number. Multiple services can run on a single machine simultaneously as long as each listens on a unique port.

```
                  [ Single Server IP: 192.168.1.50 ]
                  ┌─────────────────────────────────┐
  Web Traffic  ──►│ Port 80 / 443  ──► Nginx        │
  PostgreSQL   ──►│ Port 5432      ──► Postgres DB  │
  Redis Cache  ──►│ Port 6379      ──► Redis        │
  SSH Remote   ──►│ Port 22        ──► OpenSSH      │
                  └─────────────────────────────────┘
```

---

## 2. Port Ranges and Classifications

Ports are 16-bit unsigned integers ranging from `0` to `65535`, divided into three categories:

| Range | Name | Description |
| :--- | :--- | :--- |
| **0 – 1023** | **Well-Known Ports** | Reserved for system services and standard protocols. Requires root/administrator privileges to bind on Linux/macOS. |
| **1024 – 49151** | **Registered Ports** | Assigned by IANA for specific developer services, databases, and application frameworks. |
| **49152 – 65535** | **Dynamic / Ephemeral Ports** | Assigned temporarily by the OS for outbound client connections. |

---

## 3. Common Standard Ports for Developers

| Port | Service | Description |
| :--- | :--- | :--- |
| `22` | **SSH** | Secure Shell for remote server terminal access. |
| `80` | **HTTP** | Standard unencrypted web traffic. |
| `443` | **HTTPS** | Standard TLS-encrypted web traffic. |
| `3000` | **Node / Next.js** | Common default for Next.js, React, and Express dev servers. |
| `3306` | **MySQL** | Default MySQL / MariaDB database port. |
| `5432` | **PostgreSQL** | Default PostgreSQL database port. |
| `6379` | **Redis** | Default in-memory cache port. |
| `8080` | **HTTP Alternate** | Frequently used for secondary dev web servers or Tomcat/Spring. |

---

## 4. Inspecting and Freeing Occupied Ports

If two applications attempt to bind to the same port at the same time, the second process will crash with an **`EADDRINUSE`** error.

### Find Process on macOS / Linux:
```bash
lsof -i :3000
```

### Terminate Process on macOS / Linux:

First attempt a graceful termination (`SIGTERM`), which gives the application time to save state and cleanly close socket connections:

```bash
kill <PID>
```

If the process is frozen and unresponsive, send a forceful termination (`SIGKILL`):

```bash
kill -9 <PID>
```

<Callout type="warning">
Use `kill -9` with caution. `SIGKILL` immediately destroys the process at the OS kernel level without giving it a chance to write unsaved state, flush disk buffers, or cleanly disconnect from databases. Always try `kill <PID>` (SIGTERM) first.
</Callout>

### Find and Kill Process on Windows (PowerShell):
```powershell
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
Stop-Process -Id <PID> -Force
```

---

## Related Topics

- [localhost and Loopback Interface](/docs/fundamentals/localhost)
- [IP Addresses Explained](/docs/fundamentals/ip-addresses)
- [Troubleshooting EADDRINUSE Port Collision](/errors/node/eaddrinuse)
- [Nginx Reverse Proxy & SSL Setup](/recipes/devops/nginx-reverse-proxy-ssl)
