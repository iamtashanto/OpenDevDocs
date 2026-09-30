---
title: "Cloud Security Groups vs Network ACLs"
description: Compare stateful cloud security groups with stateless network ACLs, subnet filtering, and defense-in-depth network architecture.
category: devops
topic: devops-networking
type: guide
level: intermediate
tags:
  - devops
  - security
  - security-groups
  - nacl
  - firewall
  - aws
platforms:
  - linux
tested:
  cloud: "AWS / GCP / Azure"
lastVerified: "2026-09-30"
---

## 2-Layer Cloud Perimeter Defense

In cloud architectures (e.g. AWS VPC), traffic passes through two distinct firewall defense tiers:

```
Incoming Internet Packet
          │
          ▼
[ 1. Network ACL (NACL) ] ──(Subnet Level / Stateless)
          │
          ▼
[ 2. Security Group (SG) ] ──(Instance / ENI Level / Stateful)
          │
          ▼
  EC2 Instance / Container Pod
```

---

## Direct Comparison

| Feature | Security Group (SG) | Network ACL (NACL) |
| :--- | :--- | :--- |
| **Operates At** | Instance / Network Interface (ENI) Level | Subnet Boundary Level |
| **Statefulness** | **Stateful** (Return traffic is automatically permitted) | **Stateless** (Must explicitly permit both inbound and outbound rules) |
| **Rule Types** | **ALLOW** rules only (Deny is implicit default) | **ALLOW** and **DENY** rules |
| **Rule Evaluation** | All rules are evaluated together | Evaluated in strict numerical order (Rule 100, Rule 200, *) |

---

## Security Group Chaining Architecture

Rather than hardcoding IP addresses into firewall rules, reference other Security Group IDs:

1. **Load Balancer Security Group (`sg-alb`)**:
   - Ingress: Allow Port `80` & `443` from `0.0.0.0/0` (Everyone).
2. **Application Server Security Group (`sg-app`)**:
   - Ingress: Allow Port `3000` **ONLY from `sg-alb`**.
3. **Database Security Group (`sg-db`)**:
   - Ingress: Allow Port `5432` **ONLY from `sg-app`**.

Direct internet connections to the database on port 5432 are impossible because no public inbound rule exists.
