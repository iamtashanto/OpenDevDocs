---
title: "HTTP and HTTPS Protocols"
description: "Comprehensive guide to Hypertext Transfer Protocol: request methods, status codes, headers, SSL/TLS encryption, and HTTP/2 vs HTTP/3."
category: fundamentals
topic: networking
type: guide
level: beginner
tags:
  - http
  - https
  - networking
  - ssl
  - tls
  - protocols
platforms:
  - web
  - server
lastVerified: "2026-09-30"
---

# HTTP and HTTPS Protocols

**HTTP** (Hypertext Transfer Protocol) is the application-level protocol that powers data communication across the web. **HTTPS** (HTTP Secure) layers HTTP over an encrypted **TLS** (Transport Layer Security) connection to guarantee confidentiality, data integrity, and server authentication.

---

## 1. HTTP Request Methods (Verbs)

HTTP defines standard methods indicating the desired action to be performed on a given resource:

| Method | Idempotent | Safe | Typical Use Case |
| :--- | :--- | :--- | :--- |
| `GET` | ✅ Yes | ✅ Yes | Retrieve a resource (fetch user profile, load webpage). |
| `POST` | ❌ No | ❌ No | Create a new subordinate resource or trigger server action (submit form, sign up). |
| `PUT` | ✅ Yes | ❌ No | Replace an entire existing resource with the provided payload. |
| `PATCH` | ❌ No | ❌ No | Apply partial modifications to an existing resource. |
| `DELETE` | ✅ Yes | ❌ No | Remove the specified resource. |
| `OPTIONS` | ✅ Yes | ✅ Yes | Discover supported HTTP methods in CORS preflight checks. |
| `HEAD` | ✅ Yes | ✅ Yes | Fetch response headers identical to `GET` without the body payload. |

---

## 2. HTTP Status Codes

Status codes are 3-digit integers categorized into 5 families:

```
1xx Informational  ──  Protocol negotiation (101 Switching Protocols)
2xx Success        ──  Request successfully received and processed (200 OK, 201 Created, 204 No Content)
3xx Redirection    ──  Further action needed (301 Moved Permanently, 302 Found, 304 Not Modified)
4xx Client Error   ──  Client submitted invalid request (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
5xx Server Error   ──  Server failed while processing valid request (500 Internal Error, 502 Bad Gateway, 503 Service Unavailable)
```

### Essential Status Codes to Know

- **`200 OK`**: Standard response for successful requests.
- **`201 Created`**: The request succeeded and a new resource was created (common for `POST`).
- **`204 No Content`**: Success, but no content returned in response body (common for `DELETE`).
- **`301 Moved Permanently`**: The URL has permanently changed; search engines update index.
- **`304 Not Modified`**: Cached copy is still valid (based on `ETag` or `If-None-Match`).
- **`400 Bad Request`**: Malformed syntax or invalid request parameters.
- **`401 Unauthorized`**: Authentication is required (missing or expired bearer token).
- **`403 Forbidden`**: Authenticated, but user lacks permissions to access this resource.
- **`404 Not Found`**: The requested resource does not exist.
- **`429 Too Many Requests`**: Rate limit exceeded.
- **`500 Internal Server Error`**: Unhandled exception or bug on the server.
- **`502 Bad Gateway`**: Reverse proxy (e.g. Nginx) received an invalid response or connection drop from upstream app.

---

## 3. HTTP Headers

Headers are key-value pairs transmitted in both requests and responses:

```http
GET /api/profile HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOi...
Accept: application/json
User-Agent: Mozilla/5.0
```

### Essential Security Headers
- `Strict-Transport-Security` (HSTS): Forces browsers to connect exclusively over HTTPS.
- `Content-Security-Policy` (CSP): Restricts origins from which scripts, styles, and images can load.
- `Access-Control-Allow-Origin`: Configures CORS permissions for browser requests.

---

## 4. HTTPS and SSL/TLS Encryption

Without HTTPS, HTTP traffic travels in plaintext across public Wi-Fi and ISPs, vulnerable to **eavesdropping** and **Man-in-the-Middle (MITM)** packet tampering.

HTTPS wraps HTTP inside a cryptographic TLS tunnel:
1. **Certificate Verification**: Browser validates the server's SSL certificate against trusted root Certificate Authorities (e.g. Let's Encrypt).
2. **Key Exchange**: Client and server use asymmetric encryption (ECDHE/RSA) to securely agree upon a shared symmetric session key.
3. **Encrypted Communication**: All subsequent headers, URLs, cookies, and data payloads are encrypted using symmetric AES-GCM or ChaCha20.

---

## 5. Testing HTTP Headers in Terminal

Inspect full HTTP/HTTPS headers using `curl -I`:

```bash
curl -I https://docs.tashanto.com
```

---

## Related Topics

- [URLs & Query Parameters](/docs/fundamentals/urls)
- [DNS Basics & Resolution](/docs/fundamentals/dns-basics)
- [Ports & Sockets](/docs/fundamentals/ports)
- [Nginx Reverse Proxy & SSL Setup Recipe](/recipes/devops/nginx-reverse-proxy-ssl)
- [CORS Error Troubleshooting](/errors/web/cors-policy)
