---
title: "Cloudflare Rules: Redirects, Transforms & URL Rewriting"
description: "Configure Cloudflare Redirect Rules (non-www to www, HTTP to HTTPS), Request/Response Header Transforms, URL Rewriting, and Cache Rules."
category: devops
topic: cloudflare
type: guide
level: intermediate
tags:
  - cloudflare
  - redirect-rules
  - transform-rules
  - rewrites
  - headers
platforms:
  - all
tested:
  cloudflare: "current"
lastVerified: "2026-10-01"
---

# Cloudflare Rules: Redirects, Transforms & URL Rewriting

Cloudflare's modern Rules engine allows you to execute redirects, modify HTTP request/response headers, and rewrite URLs at the edge without putting any CPU load on your origin server.

---

## 1. Redirect Rules (URL 301 / 302 Redirection)

Navigate to **Rules -> Redirect Rules -> Create Rule**:

### Example 1: Redirect `www.example.com` -> `example.com` (Non-WWW)
- **Expression**: `(http.host eq "www.example.com")`
- **Target URL**: `concat("https://example.com", http.request.uri.path)`
- **Status Code**: `301 (Permanent Redirect)`
- **Preserve query string**: Enabled

### Example 2: Redirect Legacy Subpaths
- **Expression**: `(http.request.uri.path eq "/old-docs")`
- **Target URL**: `"https://example.com/docs"`
- **Status Code**: `301 (Permanent Redirect)`

---

## 2. Transform Rules: Request & Response Headers

Navigate to **Rules -> Transform Rules**:

### 2.1 Modify Request Header (Passing Metadata to Origin)
Inject custom edge headers to help your backend know the visitor's country or edge datacenter:
- **Rule Name**: `Pass Edge Metadata`
- **Expression**: `true` (all incoming requests)
- **Action**: Set static/dynamic request headers:
  - Header: `X-Visitor-Country` -> Value: `ip.geoip.country`
  - Header: `X-Cloudflare-Ray` -> Value: `cf.ray_id`

### 2.2 Modify Response Header (Injecting Security Headers)
Automatically inject security headers at the edge for all responses:
- Header: `X-Frame-Options` -> Value: `SAMEORIGIN`
- Header: `X-Content-Type-Options` -> Value: `nosniff`
- Header: `Referrer-Policy` -> Value: `strict-origin-when-cross-origin`

---

## 3. URL Rewrite Rules

Rewrite internal API paths without changing the URL visible in the user's browser:
- **Expression**: `(http.request.uri.path starts_with "/v1/")`
- **Rewrite**: Rewrite path to `concat("/api/v1/", substring(http.request.uri.path, 4))`
