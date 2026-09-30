---
title: "Blocked by CORS Policy: No 'Access-Control-Allow-Origin'"
description: Resolve browser CORS errors in React, Next.js, Express, and Nginx reverse proxies with correct response headers.
category: networking
topic: web
type: troubleshooting
level: beginner
tags:
  - cors
  - http
  - security
  - react
  - express
  - nextjs
platforms:
  - web
tested:
  browsers: "Chrome / Firefox / Safari"
  node: "22.x"
lastVerified: "2026-09-30"
---

## Error Message

```text
Access to fetch at 'https://api.example.com/data' from origin 'http://localhost:3000'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
on the requested resource. If an opaque response serves your needs, set the request's
mode to 'no-cors' to fetch the resource with CORS disabled.
```

---

## Symptoms

- An API request (`fetch` or `axios`) from your frontend application fails with a network error in the browser console.
- The API works when tested in terminal using `curl` or Postman/Bruno, but fails inside the browser.
- Network tab shows a failed preflight `OPTIONS` request with status `403` or `405`.

---

## Why It Happens

**CORS (Cross-Origin Resource Sharing)** is a browser security mechanism enforced by the **Same-Origin Policy (SOP)**. When a web application on `http://localhost:3000` makes an asynchronous HTTP request to a different origin (different protocol, domain, or port, e.g. `https://api.example.com`):

1. The browser checks if the server explicitly authorizes the requesting origin.
2. The browser sends an `OPTIONS` preflight request asking for permissions.
3. If the server does not respond with appropriate `Access-Control-Allow-Origin` headers, the browser **blocks JavaScript from reading the response**.

<Callout type="warning" title="CORS is Enforced by the Browser, Not the Server">
The server often processes the request and executes backend logic successfully, but the browser blocks your frontend code from receiving the response payload.
</Callout>

---

## Quick Fix & Server Configuration

CORS headers must be returned by the **Server / API**, not the frontend client.

### 1. Express / Node.js Backend

Install the standard `cors` middleware:

<PackageManagerTabs package="cors" />

Configure in your Express app:

```javascript
import express from "express";
import cors from "cors";

const app = express();

// Enable CORS for specific frontend origins
app.use(
  cors({
    origin: ["http://localhost:3000", "https://docs.tashanto.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/data", (req, res) => {
  res.json({ status: "success", message: "CORS working cleanly" });
});
```

---

### 2. Next.js App Router Route Handler (`app/api/.../route.ts`)

Return CORS headers in your API response and provide an `OPTIONS` preflight handler:

```typescript
// app/api/data/route.ts
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  return NextResponse.json(
    { message: "Hello from Next.js API" },
    { headers: corsHeaders }
  );
}
```

---

### 3. Nginx Reverse Proxy Fix

Add headers to your Nginx server block:

```nginx
location /api/ {
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '$http_origin' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
        add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
    }

    add_header 'Access-Control-Allow-Origin' '$http_origin' always;
    add_header 'Access-Control-Allow-Credentials' 'true' always;

    proxy_pass http://127.0.0.1:4000;
}
```

---

## How to Diagnose with cURL

Simulate a browser cross-origin preflight request:

```bash
curl -I -X OPTIONS https://api.example.com/data \
  -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET"
```

Verify that the response includes:
```text
HTTP/2 200 (or 204)
access-control-allow-origin: http://localhost:3000
access-control-allow-methods: GET, POST, OPTIONS
```
