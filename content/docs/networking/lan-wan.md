---
title: "LAN, WAN, Routers & Gateways"
description: Understand Local Area Networks (LAN), Wide Area Networks (WAN), the role of routers, switches, and default gateways.
category: networking
topic: networking
type: concept
level: beginner
tags:
  - networking
  - lan
  - wan
  - router
  - gateway
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## Overview

Computer networks vary by geographical span, topology, and routing requirements.

---

## 1. Local Area Network (LAN)

A **LAN** connects computing devices within a localized physical area (such as a home, office building, or single data center floor).
- **Technology**: High-speed Ethernet cables (1Gbps - 100Gbps) and Wi-Fi (802.11).
- **Communication**: Devices communicate directly using **Layer 2 MAC addresses** via **Network Switches**.
- **Latency**: Sub-millisecond ($<1\text{ms}$).

---

## 2. Wide Area Network (WAN) & The Internet

A **WAN** connects multiple disparate LANs across large geographical distances (cities, countries, continents).
- **The Internet** is the largest public WAN in existence.
- **Routing**: Traffic hops between global autonomous systems (AS) via **Border Gateway Protocol (BGP)** and Tier 1 Internet Service Providers (ISPs).
- **Latency**: Milliseconds to hundreds of milliseconds ($10\text{ms} - 250\text{ms}$).

---

## Network Hardware Roles

### Network Switch (Layer 2)
Connects local devices inside the same LAN. Uses MAC addresses to forward Ethernet frames directly to the intended device without broadcasting to the entire network.

### Network Router (Layer 3)
Connects different networks together (e.g. your private home LAN to the public ISP WAN). Reads destination IP addresses in packet headers and determines the optimal path (routing) to forward the packet.

### Default Gateway
The IP address of the local router interface that devices send packets to whenever the destination IP address is outside the local subnet:

```bash
# Check default gateway on Linux
ip route | grep default
# Output: default via 192.168.1.1 dev eth0
```
