---
title: "CIDR Notation & IP Block Fundamentals"
description: Master Classless Inter-Domain Routing (CIDR), prefix lengths (/24, /16, /8), subnet masks, and address range calculations.
category: networking
topic: networking
type: concept
level: intermediate
tags:
  - networking
  - cidr
  - subnetting
  - ip
  - devops
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is CIDR?

**CIDR (Classless Inter-Domain Routing)** is the standard method used to allocate IP address blocks and route network traffic efficiently. It replaces the obsolete legacy "Class A/B/C" system.

CIDR notation appends a slash **`/`** followed by a number (prefix length) to an IP address, indicating how many bits represent the **Network Prefix**:

$$\text{192.168.1.0/24}$$

---

## How Prefix Lengths Work (IPv4)

An IPv4 address has 32 bits total. A `/24` prefix means:
- **First 24 bits**: Network identifier (fixed for all devices in this subnet).
- **Remaining 8 bits ($32 - 24$)**: Host identifier (unique for each device).

Number of total IP addresses in a CIDR block:
$$\text{Total IPs} = 2^{(32 - \text{prefix})}$$

---

## CIDR Prefix Reference Table

| CIDR Notation | Subnet Mask | Total Addresses | Usable Hosts | Typical Cloud / LAN Usage |
| :--- | :--- | :--- | :--- | :--- |
| **`/32`** | `255.255.255.255` | 1 | 1 | Single specific host/machine IP |
| **`/30`** | `255.255.255.252` | 4 | 2 | Point-to-point router links |
| **`/28`** | `255.255.255.240` | 16 | 14 | Small microservice subnets |
| **`/24`** | `255.255.255.0` | 256 | 254 | Standard office LAN / Web subnet |
| **`/20`** | `255.255.240.0` | 4,096 | 4,094 | Standard Cloud VPC Subnet |
| **`/16`** | `255.255.0.0` | 65,536 | 65,534 | Standard Cloud VPC (e.g. AWS `10.0.0.0/16`) |
| **`/8`** | `255.0.0.0` | 16,777,216 | 16,777,214 | Massive enterprise network |
| **`/0`** | `0.0.0.0` | 4,294,967,296 | All | `0.0.0.0/0` represents the entire Internet |

---

## Reserved Addresses in Every Subnet

In standard networking, 2 addresses are automatically reserved in every subnet:
1. **Network Address (First IP)**: e.g. `192.168.1.0`
2. **Broadcast Address (Last IP)**: e.g. `192.168.1.255`

> [!NOTE]
> In Cloud VPCs (like AWS), **5 IP addresses** are reserved per subnet (Network, VPC Router, DNS server, Future reserve, Broadcast).
