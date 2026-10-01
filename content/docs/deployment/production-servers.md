---
title: "Production Server Concepts & Infrastructure Architecture"
description: Complete guide to production hosting infrastructure, comparing Bare Metal, VPS, PaaS, Serverless, and Kubernetes, with resource sizing guidelines.
category: devops
topic: deployment
type: concept
level: intermediate
tags:
  - deployment
  - servers
  - vps
  - serverless
  - infrastructure
platforms:
  - linux
  - cloud
tested:
  ubuntu: "24.04"
lastVerified: "2026-09-30"
---

Selecting the right production infrastructure depends on application architecture, traffic predictability, latency requirements, team operational bandwidth, and cost constraints.

---

## Infrastructure Archetypes Compared

| Model | Examples | Control Level | Operational Overhead | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **Serverless / Edge** | Vercel, AWS Lambda, Cloudflare Workers | Code & Config only | 🟢 Minimal (Zero Server Mgmt) | Burst-traffic APIs, dynamic frontends, JAMstack |
| **PaaS (Platform as a Service)** | Render, Railway, Fly.io | Containers & Services | 🟡 Low (Managed OS & Networking) | Fast-moving startups, fullstack web apps |
| **VPS (Virtual Private Server)** | DigitalOcean, AWS EC2, Hetzner | Full Root Linux OS | 🟠 Medium (Manual OS patching & backups) | Cost-effective databases, microservices, background workers |
| **Kubernetes (K8s)** | AWS EKS, GKE, DigitalOcean K8s | Full Cluster Orchestration | 🔴 High (Requires dedicated DevOps) | Multi-team microservices with dynamic auto-scaling |
| **Bare Metal** | Hetzner Dedicated, OVH | Full Hardware Access | 🔴 Very High (Hardware & RAID management) | Ultra-high performance databases, GPU training clusters |

---

## Server Sizing Guidelines (Rule of Thumb)

```
┌─────────────────────────────────────────────────────────────┐
│ Recommended Minimum Resource Allocation                     │
├───────────────────┬───────────────┬─────────────────────────┤
│ Workload Type     │ Minimum RAM   │ Recommended vCPUs       │
├───────────────────┼───────────────┼─────────────────────────┤
│ Static Frontend   │ 512 MB (CDN)  │ N/A (Edge Edge Network) │
│ Node.js REST API  │ 1 GB – 2 GB   │ 1 – 2 vCPUs             │
│ PostgreSQL / DB   │ 2 GB – 8 GB+  │ 2 – 4 vCPUs + NVMe SSD  │
│ Redis Cache       │ 512 MB – 2 GB │ 1 – 2 vCPUs             │
│ Next.js SSR App   │ 1 GB – 4 GB   │ 2 vCPUs                 │
└───────────────────┴───────────────┴─────────────────────────┘
```

> [!WARNING]
> Never run production databases on machines with under 1GB RAM without configured swap space; the Linux Out-Of-Memory (OOM) killer will terminate the database process during sudden traffic spikes.

---

## Related Guides

- [Deploying Node.js to a Linux VPS](/docs/deployment/deploy-nodejs-vps)
- [Deploying Next.js to Vercel](/docs/deployment/deploy-nextjs-vercel)
- [Process Managers (systemd & PM2)](/docs/deployment/process-managers)
