---
title: "IP Addressing & DHCP Fundamentals"
description: Learn how IP addressing works, static vs dynamic IP assignment (DHCP), and routing packets across subnets.
category: networking
topic: networking
type: concept
level: beginner
tags:
  - networking
  - ip-address
  - dhcp
  - routing
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is an IP Address?

An **Internet Protocol (IP) Address** is a unique numerical identifier assigned to every network interface connected to a TCP/IP network. It serves two principal functions:
1. **Host Identification**: Uniquely identifying the device.
2. **Location Addressing**: Providing the network routing path to deliver packets to that device.

---

## Static vs Dynamic IP Addressing

- **Static IP Address**: Manually configured on the host machine or reserved in router settings. Never changes across reboots. Crucial for web servers, databases, and DNS nameservers.
- **Dynamic IP Address**: Automatically leased to devices upon joining a network via **DHCP (Dynamic Host Configuration Protocol)**. The IP address can change when the lease expires or upon device reboot.

---

## The DHCP 4-Step Handshake (DORA)

```
Client (New Device)                                  DHCP Server (Router)
      │                                                       │
      │ 1. Discover: Broadcast "Is there a DHCP server?"      │
      ├──────────────────────────────────────────────────────>│
      │                                                       │
      │ 2. Offer: "You can use 192.168.1.105 for 24 hours"   │
      │<──────────────────────────────────────────────────────┤
      │                                                       │
      │ 3. Request: "I accept lease for 192.168.1.105"        │
      ├──────────────────────────────────────────────────────>│
      │                                                       │
      │ 4. Acknowledge (ACK): "Confirmed! Gateway is .1"      │
      │<──────────────────────────────────────────────────────┤
```

---

## Inspecting IP Addresses on Your System

```bash
# Linux
ip addr show

# macOS
ifconfig | grep "inet "

# Query your Public IP visible to the world
curl -s https://ifconfig.me
```
