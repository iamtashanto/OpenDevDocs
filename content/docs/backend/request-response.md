---
title: The HTTP Request-Response Lifecycle
description: Deep dive into the anatomy of HTTP requests and responses, raw protocols, headers, and body payload encodings.
category: backend
topic: backend-concepts
type: concept
level: beginner
tags:
  - backend
  - http
  - request
  - response
  - networking
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

The entire World Wide Web runs on a simple request-response protocol. A client opens a TCP connection, sends an HTTP **Request**, and the server processes it and returns an HTTP **Response** before closing or reusing the connection.

---

## Anatomy of an HTTP Request

A raw HTTP/1.1 request consists of three parts:

```http
POST /api/v1/users HTTP/1.1
Host: api.example.com
User-Agent: Mozilla/5.0
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...
Content-Length: 48

{
  "name": "Alice Developer",
  "role": "engineer"
}
```

1. **Request Line**: HTTP Method (`POST`), Request Target URI (`/api/v1/users`), and HTTP Protocol Version (`HTTP/1.1`).
2. **Request Headers**: Key-value pairs providing metadata about the client, host, authentication, and payload format.
3. **Empty Line (`\r\n`)**: Crucial separator distinguishing headers from the body.
4. **Request Body (Optional)**: Payload data sent to the server.

---

## Anatomy of an HTTP Response

```http
HTTP/1.1 201 Created
Date: Wed, 01 Oct 2026 02:00:00 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 64
X-Request-Id: 8f42d1e2-9b24-4f81-9689

{
  "id": 101,
  "name": "Alice Developer",
  "role": "engineer"
}
```

1. **Status Line**: HTTP Protocol Version (`HTTP/1.1`), Status Code (`201`), and Reason Phrase (`Created`).
2. **Response Headers**: Metadata defining caching rules, content type, server info, and custom tracking IDs.
3. **Empty Line (`\r\n`)**.
4. **Response Body**: Data payload returned to the client.

---

## Common Payload Encodings (`Content-Type`)

- **`application/json`**: Standard for modern REST APIs.
- **`application/x-www-form-urlencoded`**: Default for standard HTML forms (`key1=val1&key2=val2`).
- **`multipart/form-data`**: Used for binary file uploads and attachments.
- **`text/plain` / `text/html`**: Raw text or HTML markup.
