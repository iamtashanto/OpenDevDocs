---
title: "Nginx Reverse Proxy & Upstream Load Balancing"
description: "Configure Nginx as a high-performance reverse proxy — proxy_pass syntax, upstream load balancing algorithms (round-robin, least_conn, ip_hash), and keepalive tuning."
category: devops
topic: nginx
type: guide
level: intermediate
tags:
  - nginx
  - reverse-proxy
  - proxy-pass
  - load-balancing
  - upstream
platforms:
  - linux
  - all
tested:
  nginx: "1.26"
lastVerified: "2026-10-01"
---

# Nginx Reverse Proxy & Upstream Load Balancing

A **Reverse Proxy** intercepts public HTTP requests and forwards them to backend applications (Next.js, Express, Go Gin, Python FastAPI) listening on internal localhost ports or private network servers.

---

## 1. Basic Reverse Proxy with `proxy_pass`

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        # Forward request to Node.js application running on port 3000
        proxy_pass http://127.0.0.1:3000;

        # Forward crucial client identity headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

> [!WARNING]
> **The Trailing Slash Pitfall in `proxy_pass`**:
> - `proxy_pass http://127.0.0.1:3000;` (No trailing slash): Passes the original URI as-is (`/api/users` -> `/api/users`).
> - `proxy_pass http://127.0.0.1:3000/;` (With trailing slash): Strips the location prefix and appends remainder (`location /api/` -> `/users`).

---

## 2. Upstream Load Balancing Pools

Use an `upstream` block in the `http` context to distribute traffic across multiple backend instances:

```nginx
upstream backend_nodes {
    # 1. Load Balancing Algorithm (choose one):
    # default: round-robin
    least_conn; # Routes to instance with fewest active connections

    # 2. Server Nodes with weights and health checks
    server 10.0.1.10:3000 weight=3 max_fails=3 fail_timeout=10s;
    server 10.0.1.11:3000 weight=2 max_fails=3 fail_timeout=10s;
    server 10.0.1.12:3000 backup; # Only used if primaries are down

    # 3. Keepalive connections to backend servers (reduces TCP handshake latency)
    keepalive 64;
}

server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://backend_nodes;
        proxy_http_version 1.1;
        proxy_set_header Connection ""; # Required for upstream keepalive
    }
}
```

### Load Balancing Methods

- **Round Robin** (Default): Sequential distribution.
- **`least_conn;`**: Directs traffic to the server with the lowest count of active connections.
- **`ip_hash;`**: Hashes the client IP address so the same user always hits the same backend instance (sticky sessions).
- **`hash $request_uri consistent;`**: Consistent hashing for caching reverse proxies.

---

## 3. Proxy Timeouts & Buffering

Prevent backend gateway timeouts (`504 Gateway Timeout`) on long-running queries or report generation:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8080;

    # Timeouts
    proxy_connect_timeout 60s; # Time to establish TCP connection with backend
    proxy_send_timeout    60s; # Time between two successive write operations
    proxy_read_timeout    120s; # Time waiting for backend to return response data

    # Buffering (Nginx reads entire backend response to free backend thread fast)
    proxy_buffering on;
    proxy_buffer_size 16k;
    proxy_buffers 8 32k;
    proxy_busy_buffers_size 64k;
}
```
