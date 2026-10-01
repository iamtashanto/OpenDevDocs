---
title: "Cloudflare Proxy Modes (Orange vs Grey Cloud) & CDN Caching"
description: "Understand Proxied vs DNS-only records, edge CDN caching mechanisms, cache purging, and how to bypass edge caching on authenticated sessions."
category: devops
topic: cloudflare
type: guide
level: beginner
tags:
  - cloudflare
  - proxy
  - cdn
  - caching
  - orange-cloud
platforms:
  - all
tested:
  cloudflare: "current"
lastVerified: "2026-10-01"
---

# Cloudflare Proxy Modes (Orange vs Grey Cloud) & CDN Caching

In the Cloudflare DNS dashboard, each record features a toggleable cloud icon representing its **Proxy Status**.

---

## 1. Proxied (Orange Cloud) vs DNS Only (Grey Cloud)

| Feature | 🟠 Proxied (Orange Cloud) | ⚪ DNS Only (Grey Cloud) |
| :--- | :--- | :--- |
| **Origin IP Visibility** | **Hidden** (Resolves to Cloudflare Anycast IPs) | **Exposed** (Directly reveals your VPS IP) |
| **CDN & Edge Caching** | Active (Caches static assets at edge) | Disabled |
| **DDoS & WAF Protection** | Active (Blocks attacks before reaching VPS) | Disabled |
| **SSL/TLS Termination** | Managed by Cloudflare Universal SSL | Managed solely by origin server |
| **Non-HTTP Protocols** | Blocks direct SSH/FTP/SMTP on web ports | Allows all raw TCP/UDP ports |
| **Best Used For** | Web apps (`example.com`, `api.example.com`) | Mail servers (`mail.example.com`), SSH (`ssh.example.com`) |

---

## 2. What Cloudflare Caches by Default

Cloudflare automatically caches static file extensions:
- **Images**: `png`, `jpg`, `jpeg`, `gif`, `ico`, `webp`, `avif`, `svg`
- **Styles & Scripts**: `css`, `js`
- **Fonts**: `woff`, `woff2`, `ttf`, `eot`, `otf`
- **Media / Docs**: `pdf`, `mp4`, `wasm`

> [!IMPORTANT]
> **HTML files and API JSON responses are NOT cached by default.** Cloudflare passes them directly to your origin VPS so dynamic data is always real-time.

---

## 3. Creating Custom Cache Rules

To cache static pages or dynamic responses while respecting user authentication:

1. Navigate to **Caching -> Cache Rules -> Create Rule**.
2. **Expression**: `(http.request.uri.path eq "/docs/*") and not (http.cookie contains "auth_token")`
3. **Action**: Set **Edge TTL** to 4 hours and **Browser TTL** to 1 hour.

---

## 4. Cache Purging Workflow

When deploying updates:
- **Purge by Single URL**: Fast and preserves cache hits for all other pages.
- **Purge Everything**: Flushes all cached files across all 300+ global edge locations.
- **Development Mode**: Temporarily disables all edge caching for 3 hours during active debugging.
