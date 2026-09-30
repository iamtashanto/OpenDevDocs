---
title: "Production Reverse Proxies: NGINX, Envoy & Traefik"
description: Compare modern production reverse proxies (NGINX, Envoy, Traefik, Caddy), edge rate limiting, and buffer tuning for high traffic.
category: devops
topic: devops-networking
type: guide
level: advanced
tags:
  - devops
  - reverse-proxy
  - nginx
  - envoy
  - traefik
  - microservices
platforms:
  - linux
tested:
  linux: "Ubuntu 24.04"
lastVerified: "2026-09-30"
---

## Overview

In production microservice and container architectures, reverse proxies act as the **API Gateway / Ingress Controller**.

---

## Reverse Proxy Comparison

| Feature | NGINX | Envoy Proxy | Traefik | Caddy |
| :--- | :--- | :--- | :--- | :--- |
| **Language** | C (Event-driven) | C++ (High Performance) | Go | Go |
| **Dynamic Config** | Reload required (or NGINX Plus) | Dynamic xDS API (Zero reload) | Native Docker/K8s auto-discovery | JSON API / Caddyfile |
| **Primary Use** | Web servers, static files, SSL termination | Kubernetes Service Mesh (Istio), high-scale RPC | Cloud-native container ingress | Automatic Let's Encrypt local/dev SSL |
| **gRPC & HTTP/3** | Supported | First-class native support | Supported | Supported |

---

## Edge Rate Limiting with NGINX

Protect backend microservices from traffic spikes by throttling at the proxy layer:

```nginx
# Limit to 10 requests per second per IP address
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

server {
    listen 443 ssl;
    server_name api.example.com;

    location /api/ {
        # Allow burst of up to 20 requests with nodelay
        limit_req zone=api_limit burst=20 nodelay;
        limit_req_status 429;

        proxy_pass http://backend_cluster;
    }
}
```

---

## Buffer Tuning for High Concurrency

```nginx
# Optimize client body and proxy buffer memory allocation
client_body_buffer_size 128k;
client_max_body_size 20M;

proxy_buffers 8 16k;
proxy_buffer_size 32k;
proxy_busy_buffers_size 64k;
```
