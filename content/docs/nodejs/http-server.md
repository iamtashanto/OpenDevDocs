---
title: Native Node.js HTTP Server
description: Build a native HTTP web server without external frameworks using the node:http module.
category: backend
topic: nodejs
type: guide
level: beginner
tags:
  - nodejs
  - http
  - server
  - networking
  - rest
platforms:
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

The `node:http` module provides the foundational building block for all Node.js web frameworks (such as Express, Fastify, and Koa). Understanding native HTTP servers helps you understand how request streams, response buffers, and headers interact.

---

## Basic HTTP Server

```javascript
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', timestamp: new Date() }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
```

---

## Handling Routing & Query Strings

```javascript
import http from 'node:http';

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname, searchParams } = url;

  if (pathname === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('Healthy');
  }

  if (pathname === '/greet' && req.method === 'GET') {
    const name = searchParams.get('name') || 'Guest';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: `Hello, ${name}!` }));
  }

  // Not Found fallback
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
});

server.listen(3000);
```

---

## Reading JSON Request Bodies

Incoming request bodies in `node:http` arrive as asynchronous data chunks via a Readable stream:

```javascript
import http from 'node:http';

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/data') {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const rawBody = Buffer.concat(buffers).toString('utf-8');

    try {
      const payload = JSON.parse(rawBody);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ received: payload }));
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid JSON body' }));
    }
  }

  res.writeHead(404);
  res.end();
});

server.listen(3000);
```
