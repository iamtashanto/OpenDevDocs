---
title: HTTP Headers Reference
description: Understand standard HTTP headers for content negotiation, caching, authentication, proxies, and web security.
category: backend
topic: backend-concepts
type: guide
level: intermediate
tags:
  - backend
  - http
  - headers
  - security
  - caching
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

HTTP headers allow the client and server to pass metadata with an HTTP request or response. Headers are case-insensitive key-value pairs separated by a colon `:`.

---

## 1. Content Negotiation Headers

- **`Content-Type`**: Indicates the media type of the body resource (e.g. `application/json`, `text/html; charset=utf-8`).
- **`Accept`**: Informs the server which content formats the client can understand (e.g. `Accept: application/json`).
- **`Accept-Encoding`**: Informs the server about supported compression algorithms (`gzip, deflate, br, zstd`).

---

## 2. Authentication & Authorization Headers

- **`Authorization`**: Contains user credentials or tokens (e.g. `Authorization: Bearer <jwt_token>` or `Authorization: Basic <base64>`).
- **`WWW-Authenticate`**: Sent by a server in a `401 Unauthorized` response to define how authentication should be performed.

---

## 3. Caching Headers

- **`Cache-Control`**: Directives for caching mechanisms in requests and responses (e.g. `Cache-Control: public, max-age=3600, stale-while-revalidate=60`).
- **`ETag`**: An identifier for a specific version of a resource (e.g. `ETag: "686897696a7c8"`).
- **`If-None-Match`**: Sent by the client with a cached ETag; server returns `304 Not Modified` if data has not changed.

---

## 4. Reverse Proxy & Forwarding Headers

When an application sits behind a load balancer, CDN, or reverse proxy (e.g. NGINX, Cloudflare), these headers preserve the original client details:

- **`X-Forwarded-For`**: Client IP address (`X-Forwarded-For: 203.0.113.195`).
- **`X-Forwarded-Proto`**: Original protocol used by client (`X-Forwarded-Proto: https`).
- **`X-Forwarded-Host`**: Original Host requested by client.

---

## 5. Security Headers

- **`Strict-Transport-Security (HSTS)`**: Enforces HTTPS connections (`max-age=63072000; includeSubDomains; preload`).
- **`X-Content-Type-Options`**: Prevents MIME-sniffing (`nosniff`).
- **`X-Frame-Options`**: Prevents clickjacking by controlling if the site can be framed (`DENY` or `SAMEORIGIN`).
