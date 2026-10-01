---
title: "Configuring an Nginx Reverse Proxy"
description: Complete production guide to configuring Nginx as a reverse proxy for Node.js/Next.js apps, WebSocket upgrades, gzip compression, and security headers.
category: devops
topic: deployment
type: guide
level: intermediate
tags:
  - nginx
  - reverse-proxy
  - linux
  - devops
  - security
platforms:
  - linux
tested:
  nginx: "1.26.x"
  ubuntu: "24.04"
lastVerified: "2026-09-30"
---

Nginx is the standard high-performance reverse proxy for production web applications, providing TLS termination, request buffering, static asset caching, and gzip compression.

---

## Production Nginx Server Block

Create `/etc/nginx/sites-available/app.conf`:

```nginx
# Rate limiting zone (10 requests per second per IP)
limit_req_zone $binary_remote_addr zone=apilimit:10m rate=10r/s;

# Upstream pool of Node.js app workers
upstream nodejs_backend {
    server 127.0.0.1:3000 max_fails=3 fail_timeout=10s;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    # Redirect all plain HTTP traffic to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com www.example.com;

    # SSL Certificates (Managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # Max upload size
    client_max_body_size 20M;

    # 1. Serve Static Assets directly from disk
    location /static/ {
        alias /var/www/app/public/static/;
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # 2. Reverse Proxy all dynamic requests to Node.js
    location / {
        limit_req zone=apilimit burst=20 nodelay;

        proxy_pass http://nodejs_backend;
        proxy_http_version 1.1;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Forward real client IP and Host
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

---

## Activating & Testing Configuration

```bash
# Symlink to sites-enabled
sudo ln -s /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled/

# Test syntax validity
sudo nginx -t

# Reload without dropping connections
sudo systemctl reload nginx
```

---

## Related Guides

- [HTTPS & Let's Encrypt Setup](/docs/deployment/configure-https-letsencrypt)
- [Deploying Node.js to Linux VPS](/docs/deployment/deploy-nodejs-vps)
- [Reverse Proxies Overview](/docs/deployment/reverse-proxies)
