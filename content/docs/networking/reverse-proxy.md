---
title: "Reverse Proxy Architecture & SSL Termination"
description: Master reverse proxies, NGINX configuration, SSL offloading, path-based routing, and backend load balancing.
category: networking
topic: networking
type: guide
level: intermediate
tags:
  - networking
  - reverse-proxy
  - nginx
  - ssl-termination
  - devops
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is a Reverse Proxy?

While a *forward proxy* sits in front of *clients*, a **Reverse Proxy** sits in front of **backend web servers**. When clients on the internet make requests to your website, the reverse proxy intercepts the traffic and routes it to the appropriate backend service.

```
Internet Clients ──> [ Reverse Proxy (NGINX on :80/:443) ]
                              │
                              ├── /api/*   ──> Node.js Express API (:4000)
                              ├── /docs/*  ──> Next.js Documentation (:3000)
                              └── /static/ ──> Local Static Disk Files
```

---

## Key Benefits of a Reverse Proxy

1. **SSL/TLS Termination**: Decrypts incoming HTTPS traffic at the edge, relieving backend Node.js applications from expensive cryptographic CPU overhead.
2. **Path-Based Routing**: Maps subpaths (`/api`, `/blog`, `/auth`) to different microservices or server clusters.
3. **Load Balancing**: Distributes requests evenly across multiple backend server instances.
4. **Security & Obfuscation**: Prevents external clients from directly accessing internal backend IP addresses or ports.
5. **Gzip/Brotli Compression & Caching**: Compresses responses before sending them over the wire to users.

---

## Production NGINX Reverse Proxy Example

```nginx
# /etc/nginx/sites-available/docs.tashanto.com
server {
    listen 443 ssl http2;
    server_name docs.tashanto.com;

    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/docs.tashanto.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/docs.tashanto.com/privkey.pem;

    # Forward to Node.js / Next.js backend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        
        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        
        # Forward original client headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
