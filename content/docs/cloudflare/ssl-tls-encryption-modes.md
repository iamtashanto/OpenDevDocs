---
title: "Cloudflare SSL/TLS Modes & Origin CA Certificates"
description: "Master Cloudflare SSL encryption modes (Flexible vs Full vs Full Strict), generate 15-year Origin CA certificates for Nginx, and fix infinite redirect loops."
category: devops
topic: cloudflare
type: guide
level: intermediate
tags:
  - cloudflare
  - ssl
  - tls
  - encryption
  - origin-ca
  - redirect-loop
platforms:
  - all
tested:
  cloudflare: "current"
lastVerified: "2026-10-01"
---

# Cloudflare SSL/TLS Modes & Origin CA Certificates

Configuring the correct SSL/TLS encryption mode in Cloudflare ensures end-to-end data security and eliminates common configuration errors like redirect loops.

---

## 1. Cloudflare SSL/TLS Encryption Modes Compared

```
1. Flexible (Vulnerable!):
   [ Browser ] ─── HTTPS (Encrypted) ───► [ Cloudflare ] ─── Plain HTTP (Unencrypted!) ───► [ Origin VPS ]

2. Full:
   [ Browser ] ─── HTTPS (Encrypted) ───► [ Cloudflare ] ─── HTTPS (Self-Signed Allowed) ──► [ Origin VPS ]

3. Full (Strict) - PRODUCTION STANDARD:
   [ Browser ] ─── HTTPS (Encrypted) ───► [ Cloudflare ] ─── HTTPS (Trusted / Origin CA) ─► [ Origin VPS ]
```

| Mode | Visitor to Cloudflare | Cloudflare to Origin | Security Rating |
| :--- | :--- | :--- | :--- |
| **Off** | HTTP | HTTP | ❌ Insecure |
| **Flexible** | HTTPS | **HTTP (Plaintext)** | ❌ **Dangerous** (Vulnerable to eavesdropping; causes redirect loops) |
| **Full** | HTTPS | HTTPS (Untrusted/Self-signed) | ⚠️ Partial |
| **Full (Strict)** | HTTPS | **HTTPS (Verified Valid Certificate)** | ✅ **Production Standard** |

---

## 2. Generating Cloudflare 15-Year Origin CA Certificates

Cloudflare provides free SSL certificates valid for up to **15 years** specifically designed for your origin server.

### Step 1: Create Origin Certificate in Cloudflare
1. In Cloudflare Dashboard, go to **SSL/TLS -> Origin Server -> Create Certificate**.
2. Keep **RSA (2048)** and list your hostnames: `example.com`, `*.example.com`.
3. Set Validity to **15 years**.
4. Click **Create**.

### Step 2: Save Certificates on your Ubuntu VPS
Save the certificate to `/etc/ssl/certs/cloudflare-origin.pem` and the private key to `/etc/ssl/private/cloudflare-origin.key`:

```bash
sudo chmod 600 /etc/ssl/private/cloudflare-origin.key
```

### Step 3: Configure Nginx Server Block
```nginx
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;

    server_name example.com www.example.com;

    ssl_certificate /etc/ssl/certs/cloudflare-origin.pem;
    ssl_certificate_key /etc/ssl/private/cloudflare-origin.key;

    # SSL protocols
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $http_cf_connecting_ip;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Step 4: Set Mode to Full (Strict) in Cloudflare Dashboard
Go to **SSL/TLS -> Overview** and select **Full (Strict)**.

---

## 3. Fixing `ERR_TOO_MANY_REDIRECTS` (Infinite Loop)

### The Cause:
If Cloudflare is set to **Flexible** mode, Cloudflare connects to your VPS over port 80 (HTTP). If Nginx has a rule saying `return 301 https://$host$request_uri;`, Nginx sends a redirect back to Cloudflare. Cloudflare requests HTTP again, causing an infinite redirect loop.

### The Fix:
Change Cloudflare SSL mode to **Full (Strict)** and ensure your origin VPS is listening on port 443 with SSL enabled.
