---
title: "Nginx Proxy Headers, WebSockets & HTTP/2"
description: "Configure reverse proxy headers (X-Forwarded-For, X-Real-IP), WebSocket proxy upgrades (Socket.io, HMR), and HTTP/2 protocol support in Nginx."
category: devops
topic: nginx
type: guide
level: intermediate
tags:
  - nginx
  - websockets
  - reverse-proxy
  - http2
  - headers
platforms:
  - linux
  - all
tested:
  nginx: "1.26"
lastVerified: "2026-10-01"
---

# Nginx Proxy Headers, WebSockets & HTTP/2

When proxying traffic, backend applications only see the IP address of Nginx (`127.0.0.1`) unless you explicitly forward client identity headers. Furthermore, real-time protocols like WebSockets require protocol upgrade headers.

---

## 1. Essential Proxy Headers

```nginx
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-Port $server_port;
```

| Header | Value | Purpose |
| :--- | :--- | :--- |
| `Host` | `$host` | Passes the original requested domain name to the application. |
| `X-Real-IP` | `$remote_addr` | Contains the true IP address of the client visitor. |
| `X-Forwarded-For` | `$proxy_add_x_forwarded_for` | Comma-separated list of IP proxies traversed by the client. |
| `X-Forwarded-Proto`| `$scheme` | Tells the backend whether the user connected via `http` or `https`. |

---

## 2. Proxying WebSockets (Socket.io, HMR, Realtime APIs)

HTTP/1.1 allows upgrading a TCP connection to a full-duplex WebSocket connection.

### Step 1: Define Connection Upgrade Map in `http` context (`nginx.conf`)
```nginx
# Add inside the http { ... } block in /etc/nginx/nginx.conf
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
```

### Step 2: Configure Server Location Block
```nginx
server {
    listen 443 ssl;
    server_name chat.example.com;

    # SSL configuration here...

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;

        # WebSocket Upgrade Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        # Standard Client Identity Headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Prevent socket from dropping during idle periods
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}
```

---

## 3. Enabling HTTP/2 Support

HTTP/2 allows multiplexing multiple concurrent HTTP requests over a single TCP connection, drastically accelerating page load times.

### In Modern Nginx (v1.25.1+):
```nginx
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;

    server_name example.com;
    # SSL certs...
}
```

### In Legacy Nginx (v1.9.5 - v1.24):
```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com;
    # SSL certs...
}
```
