---
title: "Private vs Public IP Addresses (RFC 1918)"
description: Understand RFC 1918 private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16), public routable IPs, and VPC isolation.
category: networking
topic: networking
type: concept
level: beginner
tags:
  - networking
  - ip
  - rfc1918
  - private-ip
  - public-ip
  - vpc
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## Overview

The IPv4 address space is split into two categories: **Public (Globally Routable)** addresses and **Private (Non-Routable)** addresses.

---

## 1. Public IP Addresses

- **Globally Unique**: Assigned by Regional Internet Registries (RIRs) like ARIN, RIPE, and APNIC.
- **Directly Routable**: Accessible directly across the public Internet.
- Used by public web servers, load balancers, and CDN edge gateways.

---

## 2. Private IP Addresses (RFC 1918)

Private addresses are reserved for local internal networks (homes, corporate offices, AWS/GCP Virtual Private Clouds). Public internet routers are configured to immediately drop packets with private destination addresses.

### The 3 RFC 1918 Private Ranges

| Range | CIDR Block | Total Addresses | Common Usage |
| :--- | :--- | :--- | :--- |
| **`10.0.0.0` – `10.255.255.255`** | `10.0.0.0/8` | 16,777,216 | Large enterprises & Cloud VPCs (AWS, GCP) |
| **`172.16.0.0` – `172.31.255.255`** | `172.16.0.0/12`| 1,048,576 | Docker bridge networks (`172.17.0.0/16`) |
| **`192.168.0.0` – `192.168.255.255`**| `192.168.0.0/16`| 65,536 | Home routers & small office LANs |

---

## Why Use Private Subnets in Backend Architecture?

```
Internet (Public)
      │
      ▼ (Public IP: 203.0.113.10)
[ NGINX Load Balancer / API Gateway ]
      │
      ▼ (Private VPC Network: 10.0.1.0/24)
┌───────────────────────────────────────────────┐
│  Web Worker 1       Web Worker 2              │
│  (10.0.1.11)        (10.0.1.12)               │
│        │                 │                    │
│        └────────┬────────┘                    │
│                 ▼                             │
│        [ PostgreSQL Database ]                │
│             (10.0.2.50)                       │
│        (No Public IP - Shielded from hackers) │
└───────────────────────────────────────────────┘
```

By placing application databases on private IPs without public internet access, database instances are shielded from unauthorized internet scans and brute-force attacks.
