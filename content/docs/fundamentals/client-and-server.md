---
title: "Client and Server Architecture"
description: "Understanding the client-server model: roles, request-response lifecycles, frontend vs backend responsibilities, and state management."
category: fundamentals
topic: architecture
type: concept
level: beginner
tags:
  - client
  - server
  - architecture
  - frontend
  - backend
  - fundamentals
platforms:
  - web
  - server
lastVerified: "2026-09-30"
---

# Client and Server Architecture

The **Client-Server model** is the foundational architecture of the modern web. It divides computational workloads between service requesters (**clients**) and service providers (**servers**).

---

## 1. The Core Roles

```
┌───────────────────────────┐                    ┌───────────────────────────┐
│          CLIENT           │                    │          SERVER           │
│                           │   HTTP Request     │                           │
│  - Web Browser (Chrome)   │ ─────────────────► │  - Web Server (Nginx)     │
│  - Mobile App (iOS/Andr)  │                    │  - App Backend (Node.js)  │
│  - CLI / curl             │ ◄───────────────── │  - Database (PostgreSQL)  │
│                           │   HTTP Response    │                           │
└───────────────────────────┘                    └───────────────────────────┘
```

### The Client (Frontend)
- **Role**: Presents the user interface (UI), collects user input, and requests data.
- **Environment**: Runs on the user's local hardware (e.g., iPhone, laptop, browser sandbox).
- **Security Rule**: The client is **untrusted**. Never store secret API keys, database credentials, or trust client-side validation alone.

### The Server (Backend)
- **Role**: Listens for incoming connections, executes business logic, enforces authentication, reads/writes to databases, and returns responses.
- **Environment**: Runs in secure, controlled cloud environments or data centers (e.g., Linux VPS, Docker container, AWS EC2).
- **Security Rule**: The server must always validate and sanitize incoming payloads before executing queries or mutating state.

---

## 2. The Request-Response Lifecycle

Every client-server interaction follows a discrete sequence:

1. **User Action**: The user enters `https://example.com/api/users` or clicks a "Submit" button.
2. **DNS Resolution**: The client resolves `example.com` to an IP address (e.g. `93.184.216.34`).
3. **Connection Establishment**: Client initiates a TCP 3-way handshake and TLS cryptographic negotiation on port 443.
4. **HTTP Request Sent**: Client sends request headers and optional body:
   ```http
   GET /api/users HTTP/1.1
   Host: example.com
   Accept: application/json
   ```
5. **Server Processing**: Server receives request, verifies session/JWT, queries database, and formats payload.
6. **HTTP Response Returned**: Server sends status code, response headers, and body:
   ```http
   HTTP/1.1 200 OK
   Content-Type: application/json

   [{"id": 1, "name": "Sarah"}]
   ```
7. **Client Rendering**: Browser parses JSON, updates component state, and renders HTML/CSS.

---

## 3. Practical Example: Making a Client Request

Using `curl` from your terminal to act as a client requesting data from a server:

```bash
curl -i https://httpbin.org/get
```

Output inspection:
```text
HTTP/2 200 
date: Thu, 01 Oct 2026 01:00:00 GMT
content-type: application/json
content-length: 250

{
  "args": {}, 
  "headers": {
    "Accept": "*/*", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/8.7.1"
  }, 
  "origin": "203.0.113.42", 
  "url": "https://httpbin.org/get"
}
```

---

## 4. Common Mistakes & Gotchas

1. **Relying Solely on Client-Side Validation**: Users can bypass browser HTML `required` attributes or JavaScript checks using Postman, curl, or browser devtools. Always validate on the server.
2. **Exposing Secrets in Client Code**: Any environment variable prefixed with `NEXT_PUBLIC_` or bundled in frontend JavaScript is visible to anyone inspecting page sources.
3. **Assuming State Persists on Server**: HTTP is inherently stateless. Servers don't know that two consecutive requests came from the same user unless identified by a session cookie or JWT header.

---

## Related Topics

- [HTTP and HTTPS Protocols](/docs/fundamentals/http-and-https)
- [URLs & Anatomy of a Web Request](/docs/fundamentals/urls)
- [Ports & Socket Binding](/docs/fundamentals/ports)
- [JSON Data Format](/docs/fundamentals/json)
