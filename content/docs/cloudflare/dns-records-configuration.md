---
title: "Cloudflare DNS Records & Domain Configuration"
description: "Configure A, AAAA, CNAME, TXT, MX, and CAA DNS records in Cloudflare, apex CNAME flattening, TTL strategies, and DNS propagation verification."
category: devops
topic: cloudflare
type: guide
level: beginner
tags:
  - cloudflare
  - dns
  - a-record
  - cname
  - email
  - domains
platforms:
  - all
tested:
  cloudflare: "current"
lastVerified: "2026-10-01"
---

# Cloudflare DNS Records & Domain Configuration

Managing DNS records accurately is the foundation of domain routing, web hosting, email delivery, and SSL certificate verification.

---

## 1. Common DNS Record Types

| Type | Name / Target | Purpose | Example Value |
| :--- | :--- | :--- | :--- |
| **`A`** | `@` (Root) or `subdomain` | Maps hostname to an **IPv4 Address** | `198.51.100.45` |
| **`AAAA`** | `@` (Root) or `subdomain` | Maps hostname to an **IPv6 Address** | `2001:db8::1` |
| **`CNAME`**| `docs` or `app` | Alias pointing to another domain name | `cname.vercel-dns.com` |
| **`TXT`** | `@` or `_dmarc` | Verification strings, SPF email auth, Google Search Console | `"v=spf1 include:_spf.google.com ~all"` |
| **`MX`** | `@` | Mail Exchange server directing domain emails | `aspmx.l.google.com` (Priority: `1`) |
| **`CAA`** | `@` | Restricts which Certificate Authorities can issue SSL certs | `0 issue "letsencrypt.org"` |

---

## 2. Standard Web Application Configuration

### Pointing Root and `www` to your VPS Server:
```text
Type: A      Name: @     Content: 198.51.100.45    Proxy: Proxied (Orange)
Type: CNAME  Name: www   Content: example.com      Proxy: Proxied (Orange)
Type: A      Name: api   Content: 198.51.100.45    Proxy: Proxied (Orange)
```

---

## 3. CNAME Flattening on Apex / Root Domains

Under traditional DNS specifications (RFC 1034), CNAME records cannot exist on root/zone apex domains (`example.com`) because other records like `MX` or `NS` must exist at the root.

Cloudflare provides automatic **CNAME Flattening**:
- When you create a CNAME at the root (`@ -> my-app.vercel.app`), Cloudflare dynamically resolves the target to an A/AAAA record at the edge, allowing you to use SaaS platforms (Vercel, Render, AWS CloudFront) on root domains seamlessly.

---

## 4. Diagnosing DNS Propagation from CLI

```bash
# Query A record using Google Public DNS (8.8.8.8)
dig A example.com @8.8.8.8 +short

# Query Cloudflare DNS directly (1.1.1.1)
dig A example.com @1.1.1.1 +short

# Query TXT records (SPF / verification)
dig TXT example.com +short

# Trace full DNS authoritative hierarchy
dig +trace example.com
```
