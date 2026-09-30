---
title: HTTP Cookies & Security Flags
description: Understand HTTP cookies, Set-Cookie attributes, HttpOnly, Secure, and SameSite policies for session management.
category: backend
topic: backend-concepts
type: guide
level: intermediate
tags:
  - backend
  - cookies
  - security
  - auth
  - http
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## What is an HTTP Cookie?

An HTTP cookie is a small piece of data that a server sends to a user's web browser via the `Set-Cookie` header. The browser stores this cookie and automatically attaches it to subsequent requests made to the same origin via the `Cookie` header.

---

## Setting a Cookie (`Set-Cookie`)

```http
Set-Cookie: session_id=xyz789; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800
```

---

## Critical Cookie Security Flags

### 1. `HttpOnly` (Crucial for Auth Tokens)
Prevents client-side JavaScript (`document.cookie`) from reading the cookie value. This mitigates Cross-Site Scripting (XSS) attacks from stealing session tokens.

### 2. `Secure`
Ensures the cookie is only transmitted over encrypted HTTPS connections. Never set session cookies without `Secure` in production.

### 3. `SameSite` (CSRF Protection)
Controls whether cookies are sent along with cross-site requests:
- **`SameSite=Strict`**: Cookie is sent *only* if the request originates from the exact same domain. Provides the highest security against Cross-Site Request Forgery (CSRF).
- **`SameSite=Lax` (Default)**: Cookie is withheld on cross-site subrequests (images, iframes), but sent when a user navigates to the origin site (e.g. following an external link).
- **`SameSite=None`**: Cookie is sent on all cross-site requests. **Requires** the `Secure` attribute.

---

## Cookie Expiration Attributes

- **`Max-Age`**: Lifetime in seconds from the time the cookie is set (e.g. `Max-Age=86400` for 1 day).
- **`Expires`**: Exact UTC date timestamp when the cookie expires.
- **Session Cookies**: If neither `Max-Age` nor `Expires` is set, the cookie is deleted when the user closes their browser session.

---

## Cookie Size Limits

- Most browsers limit individual cookie size to **4KB** (4096 bytes).
- Storing large objects or raw tokens in cookies can exceed header size limits (usually 8KB-16KB total across all headers).
