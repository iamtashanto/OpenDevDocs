---
title: Introduction to Node.js
description: Understand Node.js, the V8 JavaScript engine, event-driven non-blocking I/O, and its role in modern backend systems.
category: backend
topic: nodejs
type: concept
level: beginner
tags:
  - nodejs
  - backend
  - javascript
  - runtime
  - v8
platforms:
  - node
  - linux
  - macos
  - windows
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## What is Node.js?

Node.js is an open-source, cross-platform JavaScript runtime environment built on Google Chrome's V8 JavaScript engine. It allows developers to run JavaScript outside the browser to build scalable network applications, web servers, CLI tools, and automation scripts.

---

## Key Characteristics

1. **Non-Blocking Asynchronous I/O**: Operations such as file system access, network requests, and database queries are performed asynchronously without freezing the single execution thread.
2. **Event-Driven Architecture**: Uses an event loop to orchestrate callbacks, promises, and events efficiently.
3. **Single-Threaded Event Loop**: While Node.js processes user JavaScript on a single thread, background tasks (such as disk I/O and crypto) leverage a multi-threaded C++ worker pool (libuv).
4. **V8 Engine**: Compiles JavaScript directly to native machine code at runtime for high execution speed.
5. **Rich Package Ecosystem**: npm and pnpm offer over two million reusable packages.

---

## Architecture Overview

```
+---------------------------------------------------------+
|                    Your JavaScript Code                 |
+---------------------------------------------------------+
|                    Node.js Core API                     |
|           (fs, http, path, crypto, stream, events)      |
+----------------------------+----------------------------+
|        V8 Engine           |           libuv            |
|   (JS Execution & GC)      |   (Event Loop & Threads)   |
+----------------------------+----------------------------+
|                       OS / Hardware                     |
+---------------------------------------------------------+
```

---

## When to Use Node.js

Node.js is an ideal choice for:

- **REST APIs & Microservices**: Fast JSON serialization and high concurrency.
- **Real-Time Applications**: Chat apps, live collaboration boards, and WebSocket servers.
- **Single-Page Application (SPA) Backends**: Next.js, Express, Fastify, and NestJS.
- **Developer Tooling & CLIs**: Build tools, bundling scripts, and command-line utilities.
- **I/O-Intensive Workloads**: Streaming video, proxying requests, and data pipeline aggregation.

---

## Node.js vs Browser JavaScript

| Feature | Browser | Node.js |
| :--- | :--- | :--- |
| **Global Object** | `window`, `document` | `global`, `process` |
| **DOM Manipulation** | Supported (`document.getElementById`) | None (Headless runtime) |
| **File System Access** | Restricted sandbox | Direct OS access (`node:fs`) |
| **Network Capabilities** | `fetch`, `XMLHttpRequest`, `WebSocket` | Raw TCP/UDP sockets, HTTP servers |
