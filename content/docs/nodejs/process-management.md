---
title: Node.js Process Management & Graceful Shutdown
description: Manage process lifecycles, handle SIGTERM/SIGINT OS signals, monitor memory, and implement graceful shutdown in production.
category: backend
topic: nodejs
type: guide
level: advanced
tags:
  - nodejs
  - process
  - devops
  - graceful-shutdown
  - signals
platforms:
  - node
  - linux
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

In production systems (Kubernetes, AWS ECS, Docker, PM2), applications must respond cleanly to lifecycle events. When a container is restarted or scaled down, it receives OS termination signals that require a **Graceful Shutdown** to prevent dropped user requests and uncommitted database transactions.

---

## Implementing Graceful Shutdown

```javascript
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Server response');
});

server.listen(3000, () => {
  console.log(`Server PID ${process.pid} listening on port 3000`);
});

// Graceful shutdown handler
function handleShutdown(signal) {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  // 1. Stop accepting new incoming connections
  server.close(async () => {
    console.log('HTTP server closed.');

    try {
      // 2. Close active database connection pools
      // await db.end();
      console.log('Database connections closed.');

      // 3. Exit successfully
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown cleanup:', err);
      process.exit(1);
    }
  });

  // Force shutdown if cleanup takes longer than 10 seconds
  setTimeout(() => {
    console.error('Forcefully terminating process after timeout.');
    process.exit(1);
  }, 10000).unref();
}

// Listen for termination signals
process.on('SIGTERM', () => handleShutdown('SIGTERM')); // Sent by Docker / Kubernetes
process.on('SIGINT', () => handleShutdown('SIGINT'));   // Sent by Ctrl+C in terminal
```

---

## Monitoring Process Health & Memory

```javascript
// Check memory consumption
const mem = process.memoryUsage();
console.log({
  rss: `${(mem.rss / 1024 / 1024).toFixed(2)} MB`,       // Resident Set Size
  heapTotal: `${(mem.heapTotal / 1024 / 1024).toFixed(2)} MB`,
  heapUsed: `${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`,
});

// Process uptime in seconds
console.log(`Uptime: ${process.uptime().toFixed(0)}s`);
```

---

## Production Process Managers: PM2 vs Containers

- **Containerized Orchestration (Kubernetes/Docker)**: Run 1 Node.js process per container instance. Let Kubernetes handle scaling, liveness probes, and restarts.
- **PM2**: Ideal for multi-core Virtual Private Servers (VPS). Uses Node.js cluster module to spawn 1 worker process per CPU core:
  ```bash
  pm2 start server.js -i max --name api-cluster
  ```
