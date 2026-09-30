---
title: "Load Balancer Architecture & Algorithms"
description: Master Layer 4 vs Layer 7 load balancing, balancing algorithms (Round Robin, Least Connections, IP Hash), health checks, and high availability.
category: networking
topic: networking
type: concept
level: intermediate
tags:
  - networking
  - load-balancer
  - high-availability
  - devops
  - system-design
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is a Load Balancer?

A **Load Balancer** acts as a reverse-proxy traffic cop, distributing incoming network traffic across a cluster of backend servers to ensure scalability, responsiveness, and zero-downtime availability.

---

## Layer 4 vs Layer 7 Load Balancing

| Metric | Layer 4 (Transport / Network) | Layer 7 (Application) |
| :--- | :--- | :--- |
| **Operating Layer** | TCP / UDP (IP & Port only) | HTTP / HTTPS / WebSocket |
| **Packet Inspection** | Does not inspect HTTP content | Inspects HTTP headers, cookies, URLs, JSON payloads |
| **Routing Capability** | IP/Port routing only | Path routing (`/api` vs `/static`), host header routing |
| **SSL Termination** | Passes raw encrypted TCP stream | Decrypts SSL, inspects content, re-encrypts |
| **Speed / Throughput** | Ultra-high throughput ($>1\text{M}$ req/s), low CPU | Slightly higher CPU due to header parsing |
| **Examples** | AWS Network Load Balancer (NLB), HAProxy (TCP mode), IPVS | AWS Application Load Balancer (ALB), NGINX, Traefik |

---

## Common Load Balancing Algorithms

1. **Round Robin**: Distributes requests sequentially to each backend server in turn. Ideal when servers have identical hardware.
2. **Weighted Round Robin**: Routes more traffic to high-capacity servers based on assigned integer weights (e.g. Server A gets 70%, Server B gets 30%).
3. **Least Connections**: Forwards new requests to the server currently processing the fewest active concurrent connections. Optimal for long-lived database queries or WebSocket connections.
4. **IP Hash (Source Hash)**: Hashes the client's IP address to map them consistently to the same backend server (Sticky Sessions).

---

## Health Checks & Fault Tolerance

Load balancers poll backend instances periodically (e.g. `GET /health` every 5 seconds). If a backend instance crashes or returns a 500 status code:
1. The load balancer instantly marks the node **Unhealthy**.
2. New traffic is routed exclusively to healthy surviving nodes without dropping user requests.
3. Once the failed server recovers and passes consecutive health checks, it is automatically reintroduced into the pool.
