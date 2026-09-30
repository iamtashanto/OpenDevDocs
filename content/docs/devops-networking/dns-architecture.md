---
title: "DevOps DNS Architecture & Service Discovery"
description: Architect split-horizon DNS, private hosted zones in Cloud VPCs, and Kubernetes CoreDNS internal service discovery.
category: devops
topic: devops-networking
type: concept
level: intermediate
tags:
  - devops
  - dns
  - kubernetes
  - coredns
  - service-discovery
platforms:
  - linux
tested:
  cloud: "AWS / Kubernetes"
lastVerified: "2026-09-30"
---

## 1. Split-Horizon (Split-View) DNS

**Split-Horizon DNS** serves different DNS query responses based on the requester's source IP address:

- **Public Internet User**: Queries `api.example.com` $\rightarrow$ Resolves to Public Load Balancer IP (`203.0.113.50`).
- **Internal VPC Server**: Queries `api.example.com` $\rightarrow$ Resolves to Private Internal IP (`10.0.1.20`), keeping traffic strictly within the cloud provider's low-latency backbone network without public data transfer costs.

---

## 2. Private Hosted Zones (Route 53 / Cloud DNS)

Private hosted zones allow you to define custom internal domain names accessible only within specified VPCs:

```
database.internal.production.net  ──> 10.0.20.15 (RDS Primary)
redis.internal.production.net     ──> 10.0.20.99 (ElastiCache Cluster)
```

---

## 3. Kubernetes Internal DNS & CoreDNS

Kubernetes runs an internal cluster DNS server (**CoreDNS**). Every Service automatically receives a cluster-internal DNS record:

$$\text{<service-name>.<namespace>.svc.cluster.local}$$

Example: A frontend pod in namespace `web` can connect to the PostgreSQL service in namespace `databases` simply by requesting:

```ini
DATABASE_URL="postgresql://user:pass@postgres-service.databases.svc.cluster.local:5432/mydb"
```
