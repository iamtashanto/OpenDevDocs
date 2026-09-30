---
title: Understanding CORS (Cross-Origin Resource Sharing)
description: Master Same-Origin Policy, CORS headers, preflight OPTIONS requests, and how to fix CORS errors on the backend.
category: backend
topic: backend-concepts
type: guide
level: intermediate
tags:
  - backend
  - cors
  - security
  - http
  - browser
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## What is Same-Origin Policy (SOP)?

The **Same-Origin Policy (SOP)** is a critical security mechanism implemented by web browsers. It restricts scripts running on one origin from making network requests to read data from a different origin.

An **Origin** is defined by the combination of three components: `Protocol` + `Domain` + `Port`.

- `https://example.com:443/app` $\rightarrow$ Origin: `https://example.com`
- `https://api.example.com` $\rightarrow$ **Different Origin** (Subdomain differs)
- `http://example.com` $\rightarrow$ **Different Origin** (Protocol differs: HTTP vs HTTPS)
- `https://example.com:3000` $\rightarrow$ **Different Origin** (Port differs)

---

## What is CORS?

**CORS (Cross-Origin Resource Sharing)** is an HTTP-header based mechanism that allows a server to explicitly declare which origins are permitted to access its resources via browser requests.

> [!NOTE]
> CORS is strictly a browser-enforced security check. Server-to-server requests (cURL, Postman, Node.js backends) do not enforce CORS.

---

## Preflight Requests (`OPTIONS`)

For non-simple requests (such as requests using `Content-Type: application/json`, `PUT`, `DELETE`, or custom `Authorization` headers), the browser automatically dispatches an `OPTIONS` preflight request to ask the server for permission before sending the real request:

```http
OPTIONS /api/v1/posts HTTP/1.1
Host: api.example.com
Origin: https://app.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization
```

The server must respond with appropriate CORS headers:

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

---

## Key CORS Headers

| Header | Description |
| :--- | :--- |
| **`Access-Control-Allow-Origin`** | Specifies permitted origin (e.g. `https://myfrontend.com` or `*`). |
| **`Access-Control-Allow-Methods`** | Comma-separated list of permitted HTTP methods (`GET, POST, PUT`). |
| **`Access-Control-Allow-Headers`** | Comma-separated list of allowed custom request headers. |
| **`Access-Control-Allow-Credentials`** | Must be `true` if cookies or authorization headers are sent. |
| **`Access-Control-Max-Age`** | Seconds the preflight response can be cached by the browser. |

---

## Common CORS Mistakes

1. **`Access-Control-Allow-Origin: *` with `Credentials: true`**: Browsers will reject this combination. When sending cookies, you must explicitly specify the exact origin domain.
2. **Missing `OPTIONS` Route Handling**: If your server returns 404 or 405 on `OPTIONS` requests, all cross-origin requests will fail immediately.
