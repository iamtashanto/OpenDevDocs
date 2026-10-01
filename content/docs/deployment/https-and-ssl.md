---
title: "HTTPS, TLS Certificates & Let's Encrypt"
description: Complete guide to securing web traffic with HTTPS, TLS 1.3 handshakes, Let's Encrypt ACME automated certificates, and HTTP Strict Transport Security (HSTS).
category: devops
topic: deployment
type: guide
level: intermediate
tags:
  - https
  - ssl
  - tls
  - security
  - letsencrypt
platforms:
  - all
tested:
  certbot: "2.11.x"
lastVerified: "2026-09-30"
---

**HTTPS** (Hypertext Transfer Protocol Secure) encrypts communication between the client browser and the server using **TLS** (Transport Layer Security), preventing eavesdropping, man-in-the-middle tampering, and session hijacking.

---

## The TLS 1.3 Handshake

```
Client (Browser)                                    Server (Nginx/Cloud)
       │                                                      │
       │ ─── 1. ClientHello (Cipher suites, Key Share) ─────► │
       │                                                      │
       │ ◄── 2. ServerHello, Certificate, Finished ────────── │
       │                                                      │
       │ [=== Encrypted HTTP/2 or HTTP/3 Traffic Begins ===]  │
```

TLS 1.3 completes the cryptographic handshake in just **1 round-trip (1-RTT)**, drastically reducing latency compared to older TLS versions.

---

## Let's Encrypt & Automated ACME Renewal

**Let's Encrypt** is a free, automated, open Certificate Authority (CA). The **ACME protocol** automatically verifies domain ownership and issues 90-day TLS certificates without human intervention.

```bash
# Automated issuance and Nginx configuration with Certbot
sudo certbot --nginx -d example.com -d www.example.com
```

---

## Production Security Headers

Add these HTTP response headers in your reverse proxy or web server:

```nginx
# 1. Enforce HTTPS for 1 year (HSTS)
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# 2. Prevent Clickjacking
add_header X-Frame-Options "DENY" always;

# 3. Prevent MIME-type sniffing
add_header X-Content-Type-Options "nosniff" always;

# 4. Referrer Policy
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

---

## Related Guides

- [Configure HTTPS with Let's Encrypt Guide](/docs/deployment/configure-https-letsencrypt)
- [Nginx Reverse Proxy Configuration](/docs/deployment/nginx-reverse-proxy)
- [HTTP and HTTPS Fundamentals](/docs/fundamentals/http-https)
