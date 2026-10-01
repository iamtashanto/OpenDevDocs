---
title: "Nginx SSL/TLS Hardening & Let's Encrypt Certbot"
description: "Harden Nginx SSL/TLS security with modern TLS 1.2/1.3 ciphers, HSTS preloading, OCSP stapling, session caching, and Certbot automation to achieve an A+ SSL Labs rating."
category: devops
topic: nginx
type: guide
level: intermediate
tags:
  - nginx
  - ssl
  - tls
  - certbot
  - security
  - hsts
platforms:
  - linux
  - all
tested:
  nginx: "1.26"
lastVerified: "2026-10-01"
---

# Nginx SSL/TLS Hardening & Let's Encrypt Certbot

Securing HTTP traffic with hardened TLS encryption is mandatory for production web applications. This guide provides an **A+ SSL Labs** configuration.

---

## 1. Obtaining Free SSL with Let's Encrypt (Certbot)

### Step 1: Install Certbot and the Nginx Plugin
```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
```

### Step 2: Request and Automatically Install Certificate
```bash
sudo certbot --nginx -d example.com -d www.example.com
```

### Step 3: Verify Automated Certificate Renewal
Let's Encrypt certificates expire every 90 days. Certbot installs a systemd timer that checks twice daily:
```bash
sudo certbot renew --dry-run
```

---

## 2. Production A+ Rated SSL Hardened Configuration

Create a reusable SSL snippet at `/etc/nginx/snippets/ssl-params.conf`:

```nginx
# /etc/nginx/snippets/ssl-params.conf

# Enforce secure TLS protocols only (Disable SSLv2, SSLv3, TLS 1.0, TLS 1.1)
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers off;

# Modern High-Security Cipher Suites
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;

# SSL Session Resumption Caching (Speed up repeated client visits)
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:10m;
ssl_session_tickets off;

# OCSP Stapling (Nginx queries certificate revocation directly)
ssl_stapling on;
ssl_stapling_verify on;
resolver 1.1.1.1 8.8.8.8 valid=300s;
resolver_timeout 5s;

# HTTP Strict Transport Security (HSTS - 2 years max-age with preloading)
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

# Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

---

## 3. Complete Domain Server Block with HTTPS Redirection

```nginx
# /etc/nginx/sites-available/example.com.conf

# 1. HTTP -> HTTPS Permanent 301 Redirect Block
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    return 301 https://$host$request_uri;
}

# 2. Hardened HTTPS Production Server Block
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;

    server_name example.com www.example.com;

    # SSL Certificate Paths
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # Include hardened SSL parameters
    include /etc/nginx/snippets/ssl-params.conf;

    root /var/www/example.com/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
