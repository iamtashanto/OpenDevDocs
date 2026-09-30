---
title: "Network Sockets & Unix Domain Sockets"
description: Understand network sockets, TCP socket programming in Node.js (node:net), WebSockets, and high-speed Unix Domain Sockets.
category: networking
topic: networking
type: guide
level: intermediate
tags:
  - networking
  - sockets
  - tcp
  - unix-sockets
  - nodejs
platforms:
  - web
  - node
  - linux
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## What is a Socket?

A **Network Socket** is an internal OS software endpoint that acts as a portal for sending and receiving data over a network. A network socket is uniquely identified by a 4-tuple:
$$\text{(Source IP, Source Port, Destination IP, Destination Port)}$$

---

## 1. TCP Sockets in Node.js (`node:net`)

```javascript
// TCP Echo Server
import net from 'node:net';

const server = net.createServer((socket) => {
  console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

  socket.on('data', (data) => {
    socket.write(`Echo: ${data}`);
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, '127.0.0.1', () => {
  console.log('TCP Server listening on port 8080');
});
```

---

## 2. Unix Domain Sockets (IPC on Local Host)

When two processes communicate on the **same physical Linux server** (e.g. NGINX reverse proxy forwarding requests to a local Node.js application), using a **Unix Domain Socket** (`.sock` file) bypasses the TCP/IP network stack completely.

```javascript
// Node.js listening on Unix socket
import http from 'node:http';
import fs from 'node:fs';

const SOCKET_PATH = '/tmp/node_app.sock';

// Clean up stale socket file if it exists
if (fs.existsSync(SOCKET_PATH)) fs.unlinkSync(SOCKET_PATH);

const server = http.createServer((req, res) => {
  res.end('Served over Unix Domain Socket');
});

server.listen(SOCKET_PATH, () => {
  fs.chmodSync(SOCKET_PATH, '0777'); // Set permissions for NGINX
  console.log(`Listening on ${SOCKET_PATH}`);
});
```

In NGINX:
```nginx
location / {
    proxy_pass http://unix:/tmp/node_app.sock;
}
```

---

## 3. WebSockets (`ws://` and `wss://`)

WebSockets upgrade standard HTTP connections into full-duplex, persistent bidirectional TCP streams for real-time applications (chat, financial tickers, collaborative editing).
