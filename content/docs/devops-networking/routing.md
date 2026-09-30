---
title: "Cloud VPC Route Tables & Gateway Architecture"
description: Master VPC routing tables, Internet Gateways, NAT Gateways, VPC Peering routes, and packet forwarding paths.
category: devops
topic: devops-networking
type: guide
level: intermediate
tags:
  - devops
  - networking
  - routing
  - route-tables
  - nat-gateway
  - vpc
platforms:
  - linux
tested:
  cloud: "AWS / GCP / Azure"
lastVerified: "2026-09-30"
---

## What is a VPC Route Table?

A **Route Table** contains a set of rules (called routes) that determine where network traffic from your subnet or gateway is directed.

---

## 1. Public Subnet Route Table

Subnets with a route to an **Internet Gateway (IGW)** are public:

| Destination CIDR | Target | Purpose |
| :--- | :--- | :--- |
| `10.0.0.0/16` | `local` | Direct communication within the VPC |
| `0.0.0.0/0` | `igw-0123456789abcdef0` | Route all internet-bound traffic through Internet Gateway |

---

## 2. Private Subnet Route Table

Private subnets route outbound traffic to a managed **NAT Gateway** located inside the public subnet:

| Destination CIDR | Target | Purpose |
| :--- | :--- | :--- |
| `10.0.0.0/16` | `local` | Direct communication within the VPC |
| `0.0.0.0/0` | `nat-0987654321fedcba0` | Route outbound internet traffic securely via NAT Gateway |

---

## 3. VPC Peering & Transit Gateways

To connect two distinct VPCs (e.g. Production `10.0.0.0/16` and Analytics `10.50.0.0/16`):

```
VPC A (10.0.0.0/16) ──[ VPC Peering Connection (pcx-123) ]──> VPC B (10.50.0.0/16)
```

Add a routing rule in VPC A's route table:
- **Destination**: `10.50.0.0/16` $\rightarrow$ **Target**: `pcx-123`
