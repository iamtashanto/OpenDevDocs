---
title: "NAT (Network Address Translation) & Port Forwarding"
description: Understand SNAT, DNAT, Port Address Translation (PAT), router NAT tables, and how private subnets route across the public internet.
category: networking
topic: networking
type: concept
level: intermediate
tags:
  - networking
  - nat
  - routing
  - port-forwarding
  - devops
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is NAT?

**NAT (Network Address Translation)** is a networking method that remaps an IP address space into another by modifying network address information in the IP packet headers while they are in transit across a router.

NAT was engineered to conserve IPv4 addresses, allowing entire LANs (with hundreds of devices) to share a single public IP.

---

## How Port Address Translation (PAT) Works

```
Private LAN Device (192.168.1.50:52341)
              │
              ▼ (Outgoing Request)
[ Router with Public IP: 203.0.113.88 ]
  - Rewrites Source IP:Port to 203.0.113.88:40001
  - Records mapping in NAT Translation Table:
    [ Private: 192.168.1.50:52341 <---> Public: 203.0.113.88:40001 ]
              │
              ▼
Public Web Server (198.51.100.2:443)
              │
              ▼ (Incoming Response to 203.0.113.88:40001)
[ Router NAT Table Match ] ──> Rewrites destination to 192.168.1.50:52341
              │
              ▼
Private LAN Device receives response!
```

---

## 1. Source NAT (SNAT / Masquerading)

Used when private internal devices initiate outbound connections to the internet. The router replaces the private source IP with its own public IP.

---

## 2. Destination NAT (DNAT / Port Forwarding)

Used when external internet users need to access a server running inside a private local network:

- **Rule**: Forward incoming public traffic on `203.0.113.88:80` to internal server `192.168.1.200:80`.

---

## NAT in Cloud & DevOps (AWS NAT Gateways)

In cloud environments (AWS/GCP), backend databases in private subnets have no public IP for security reasons. When they need to download security patches from the internet, traffic is routed out through a managed **NAT Gateway** in the public subnet.
