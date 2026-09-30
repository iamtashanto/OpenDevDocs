---
title: "Network Ports & Well-Known Port Numbers"
description: Master TCP and UDP port numbers (0-65535), well-known vs ephemeral ports, and binding services.
category: networking
topic: networking
type: concept
level: beginner
tags:
  - networking
  - ports
  - tcp
  - udp
  - security
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is a Network Port?

While an **IP Address** directs network packets to a specific host machine, a **Port Number** directs those packets to a specific application or process running on that machine.

A port number is an unsigned 16-bit integer ranging from **`0` to `65535`**.

---

## 3 Port Categories (Assigned by IANA)

| Range | Category | Description |
| :--- | :--- | :--- |
| **`0 – 1023`** | **Well-Known / System Ports** | Reserved for core internet services. On Unix/Linux, binding to these ports requires `root` / `sudo` privileges. |
| **`1024 – 49151`** | **Registered / User Ports** | Used by user applications, databases, and development servers (Node.js, Postgres, Redis). |
| **`49152 – 65535`** | **Dynamic / Ephemeral Ports** | Temporary outbound ports allocated automatically by the OS when a client initiates an outgoing request. |

---

## Essential Developer Port Numbers Cheatsheet

| Port Number | Protocol / Service | Description |
| :--- | :--- | :--- |
| **`22`** | SSH (Secure Shell) | Remote server administration |
| **`53`** | DNS | Domain name resolution |
| **`80`** | HTTP | Plaintext World Wide Web traffic |
| **`443`** | HTTPS | Encrypted TLS web traffic |
| **`3000` / `5173`** | Next.js / Vite / React | Default frontend development web servers |
| **`4000` / `8080`** | Express / Spring / FastAPI | Backend API services |
| **`5432`** | PostgreSQL | PostgreSQL database server |
| **`3306`** | MySQL / MariaDB | MySQL database server |
| **`6379`** | Redis | In-memory key-value cache |
| **`27017`** | MongoDB | Document database |

---

## Checking Port Allocation on Linux

```bash
# Check all active listening ports
sudo ss -tulpn

# Find which process is listening on port 5432
sudo lsof -i :5432
```
