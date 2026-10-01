---
title: "Reverse Proxies: Nginx, Caddy & Load Balancing"
description: Complete guide to reverse proxies, SSL termination, static asset offloading, gzip/brotli compression, rate limiting, and backend load balancing.
category: devops
topic: deployment
type: concept
level: intermediate
tags:
  - reverse-proxy
  - nginx
  - caddy
  - networking
  - devops
platforms:
  - linux
tested:
  nginx: "1.26.x"
  caddy: "2.8.x"
lastVerified: "2026-09-30"
---

A **Reverse Proxy** sits in front of one or more backend web servers and intercepts all incoming client requests before routing them to the appropriate application process.

---

## Architecture Diagram

```
Internet Clients 
       │ (HTTPS on Port 443)
       ▼
┌─────────────────────────────────────────────────────────────┐
│ Reverse Proxy (Nginx / Caddy / Traefik)                     │
│ - SSL / TLS Termination                                     │
│ - Gzip & Brotli Compression                                 │
│ - Rate Limiting & DDoS Shield                               │
│ - Serves /static files directly from disk                   │
└─────────────────────────────────────────────────────────────┘
       │ (HTTP on localhost:3000, 3001, 3002)
       ▼
┌─────────────────────────────────────────────────────────────┐
│ Backend Application Servers (Node.js, Go, Python, Next.js)  │
└─────────────────────────────────────────────────────────────┘
```

---

## Why Never Expose Node.js Directly to the Internet

1. **Slow Client Attacks**: Node.js single-threaded event loop can be bogged down by slow network connections. Nginx buffers incoming requests and sends complete payloads to Node.js at internal network speeds.
2. **Privileged Port Binding**: Binding to port 80/443 requires root privileges. Running Node.js as root is a major security risk; running Nginx on 80/443 allows Node.js to run as an unprivileged user on port 3000.
3. **High-Performance Static File Serving**: Nginx uses the Linux kernel `sendfile` syscall to stream static images, CSS, and JS directly from disk with zero Node.js memory overhead.

---

## Popular Reverse Proxy Options

| Reverse Proxy | Language | SSL Setup | Configuration Style |
| :--- | :--- | :--- | :--- |
| **Nginx** | C | Certbot required | Block-based imperative syntax (`nginx.conf`) |
| **Caddy** | Go | Automatic built-in HTTPS | Clean, human-readable Caddyfile |
| **Traefik** | Go | Automatic built-in HTTPS | Dynamic label-based config for Docker / K8s |
| **HAProxy** | C | Manual or Certbot | High-throughput Layer 4 / Layer 7 load balancer |

---

## Related Guides

- [Configure Nginx Reverse Proxy](/docs/deployment/nginx-reverse-proxy)
- [Configure HTTPS with Let's Encrypt](/docs/deployment/configure-https-letsencrypt)
- [Process Managers (PM2 & systemd)](/docs/deployment/process-managers)
