---
title: "Subnets & Subnetting Fundamentals"
description: Master network subnetting, dividing VPC address spaces, calculating network and broadcast boundaries, and isolating public vs private subnets.
category: networking
topic: networking
type: concept
level: intermediate
tags:
  - networking
  - subnetting
  - subnets
  - vpc
  - devops
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is a Subnet?

A **Subnet (Subnetwork)** is a logical subdivision of an IP network. Subnetting splits a large network block into smaller, isolated segments to improve network performance, reduce broadcast congestion, and enforce security boundaries.

---

## Example: Subnetting a `/16` VPC into `/24` Subnets

Suppose your organization has allocated a `10.0.0.0/16` Virtual Private Cloud (VPC):

```
Parent VPC Network: 10.0.0.0/16 (65,536 addresses)
│
├── Subnet 1 (Public Web DMZ):     10.0.1.0/24 (10.0.1.1 - 10.0.1.254)
├── Subnet 2 (Private App Tier):   10.0.2.0/24 (10.0.2.1 - 10.0.2.254)
├── Subnet 3 (Private Database):   10.0.3.0/24 (10.0.3.1 - 10.0.3.254)
└── Subnet 4 (Internal Cache Tier): 10.0.4.0/24 (10.0.4.1 - 10.0.4.254)
```

---

## Public vs Private Subnets

- **Public Subnet**: Connected directly to an **Internet Gateway (IGW)**. Resources placed here (e.g. Load Balancers, NGINX gateways) receive public IPv4 addresses and can receive incoming traffic from the internet.
- **Private Subnet**: Has **no direct route** to the Internet Gateway. Outbound internet access (for package updates) is routed through a NAT Gateway. Inbound direct internet connections are completely blocked.

---

## Step-by-Step Subnet Calculation

For subnet `192.168.10.0/26`:

1. **Prefix Length**: `/26` bits for network $\rightarrow 32 - 26 = 6$ bits for hosts.
2. **Total Addresses**: $2^6 = 64$ addresses.
3. **Subnet Mask**: `255.255.255.192` ($128 + 64 = 192$).
4. **Network Address**: `192.168.10.0` (Cannot be assigned to a host).
5. **Broadcast Address**: `192.168.10.63` (Cannot be assigned to a host).
6. **Usable Host Range**: `192.168.10.1` through `192.168.10.62` (62 usable host machines).
