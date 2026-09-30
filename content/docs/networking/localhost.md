---
title: "Understanding localhost & The Loopback Interface"
description: Deep dive into localhost, 127.0.0.1, the loopback virtual interface (lo), /etc/hosts resolution, and local inter-process communication.
category: networking
topic: networking
type: concept
level: beginner
tags:
  - networking
  - localhost
  - loopback
  - socket
  - dev-environment
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

## What is `localhost`?

In computer networking, **`localhost`** is the standard hostname referring to the local computer executing the program. It maps to the **Loopback Network Interface**:

- **IPv4**: `127.0.0.1` (or any address in the `127.0.0.0/8` block).
- **IPv6**: `::1`.

---

## The Loopback Interface (`lo`)

The loopback interface is a purely virtual network interface implemented entirely in OS kernel memory.

```
Application (Browser / curl)
            │
            ▼ (TCP Packet to 127.0.0.1)
┌───────────────────────────────────────────┐
│              Linux OS Kernel              │
│       [ Loopback Interface (lo) ]         │
│  (Bypasses physical NIC hardware wire)    │
└─────────────────────┬─────────────────────┘
                      │ Instant Memory Routing
                      ▼
Application (Node.js Web Server on :3000)
```

Packets sent to `localhost` **never leave your computer's RAM** and are never transmitted across physical Ethernet cables or Wi-Fi radio waves. This delivers near-instant throughput and zero physical latency.

---

## How `localhost` Resolves (`/etc/hosts`)

Before querying external DNS servers, operating systems inspect the local hosts file (`/etc/hosts` on Unix, `C:\Windows\System32\drivers\etc\hosts` on Windows):

```ini
# /etc/hosts
127.0.0.1   localhost
::1         localhost ip6-localhost ip6-loopback
```

---

## `localhost` vs LAN IP

- **`http://localhost:3000`**: Accessible **only** from the machine running the server.
- **`http://192.168.1.15:3000`**: Accessible by other phones, laptops, and tablets connected to the same local Wi-Fi router (provided the server is bound to `0.0.0.0`).
