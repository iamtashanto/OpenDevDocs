---
title: "DevOps VPC CIDR & Subnet Planning"
description: Architect production Cloud VPCs (AWS, GCP, Azure), allocate non-overlapping CIDR blocks, and plan high-availability multi-AZ subnets.
category: devops
topic: devops-networking
type: guide
level: intermediate
tags:
  - devops
  - networking
  - vpc
  - cidr
  - subnets
  - aws
platforms:
  - linux
tested:
  cloud: "AWS / GCP / Azure"
lastVerified: "2026-09-30"
---

## Cloud VPC IP Allocation Architecture

When provisioning a cloud Virtual Private Cloud (VPC), choosing an appropriate CIDR block prevents costly network redesigns and IP collisions when establishing VPC Peering or VPN connections.

---

## The Standard Production VPC Blueprint (`/16`)

A `/16` VPC provides **65,536 addresses**, allowing you to allocate discrete `/20` (4,096 IPs) or `/24` (256 IPs) subnets across multiple **Availability Zones (AZ)** for High Availability (HA):

```
Parent VPC: 10.0.0.0/16
│
├── Availability Zone A:
│   ├── Public Web Subnet (ALB / Ingress):    10.0.1.0/24  (256 IPs)
│   ├── Private Application Tier (Containers): 10.0.10.0/20 (4,096 IPs)
│   └── Private Database Tier (RDS Postgres): 10.0.20.0/24 (256 IPs)
│
└── Availability Zone B (Multi-AZ Failover):
    ├── Public Web Subnet (ALB / Ingress):    10.0.2.0/24  (256 IPs)
    ├── Private Application Tier (Containers): 10.0.30.0/20 (4,096 IPs)
    └── Private Database Tier (RDS Standby):   10.0.40.0/24 (256 IPs)
```

---

## Preventing Overlapping CIDR Blocks

Never assign `172.17.0.0/16` or `192.168.1.0/24` to a corporate or cloud VPC:
- `172.17.0.0/16` conflicts with default **Docker bridge** networks.
- `192.168.1.0/24` conflicts with home office router networks when engineers connect via VPN.
- Choose dedicated segments within `10.0.0.0/8` (e.g. `10.50.0.0/16` for Production, `10.60.0.0/16` for Staging).
