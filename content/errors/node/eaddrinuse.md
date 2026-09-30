---
title: "EADDRINUSE: address already in use"
description: Complete troubleshooting guide for resolving port collisions and killing zombie processes on Linux, macOS, and Windows.
category: nodejs
topic: nodejs
type: troubleshooting
level: beginner
tags:
  - nodejs
  - nextjs
  - express
  - eaddrinuse
  - ports
  - networking
platforms:
  - linux
  - macos
  - windows
tested:
  node: "22.x"
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

## Error Message

```text
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (node:net:1904:16)
    at listenInCluster (node:net:1961:12)
    at Server.listen (node:net:2063:7)
```

---

## Symptoms

- Your Next.js, Express, Fastify, or Vite development server crashes immediately upon running `pnpm dev` or `npm start`.
- Terminal logs indicate code `EADDRINUSE` with a specific port number (e.g. `3000`, `8080`, `5432`).
- The application was recently stopped with `Ctrl + C` or crashed in the background.

---

## Why It Happens

The operating system kernel assigns network ports exclusively to one active listening socket at a time. `EADDRINUSE` (*Error Address In Use*) occurs when your Node.js process attempts to bind to a port that is already held by:

1. **A zombie / orphaned background process** that did not exit cleanly when the previous terminal session closed.
2. **Another running development server** or service (e.g., another Next.js project on port 3000).
3. **A system service** already bound to that port (e.g. system PostgreSQL on port 5432).

---

## Quick Fix (1-Liner)

<OSTabs
  macos="lsof -i :3000 -t | xargs kill -9"
  linux="sudo fuser -k 3000/tcp"
  windows="Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force"
/>

---

## Detailed Fix & Platform Instructions

### Option 1: Terminate the Process Holding the Port

#### Linux / macOS

<Steps>
  <Step step={1} title="Find the Process ID (PID)">
    Run `lsof` to find the process bound to port 3000:
    ```bash
    lsof -i :3000
    ```
    Output:
    ```text
    COMMAND   PID    USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
    node    48291 username   23u  IPv6 0x246813579bdf      0t0  TCP *:3000 (LISTEN)
    ```
  </Step>

  <Step step={2} title="Kill the Process">
    Terminate the process using its PID (replace `48291` with your PID):
    ```bash
    kill -9 48291
    ```
  </Step>
</Steps>

#### Windows (PowerShell / Command Prompt)

<Steps>
  <Step step={1} title="Identify the Owning PID">
    ```cmd
    netstat -ano | findstr :3000
    ```
    Output:
    ```text
    TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       14280
    ```
  </Step>

  <Step step={2} title="Force Kill the PID">
    ```cmd
    taskkill /PID 14280 /F
    ```
  </Step>
</Steps>

---

### Option 2: Change Your Application Port

If you want to run multiple applications simultaneously, configure your server to use an alternative port:

#### Next.js
```bash
# Using CLI flag
pnpm dev -p 3001

# Or via package.json script
# "dev": "next dev -p 3001"
```

#### Express / Node.js
```bash
PORT=3001 node server.js
```

---

## How to Prevent It in Node.js Applications

Ensure your server handles `SIGINT` (Ctrl + C) and `SIGTERM` signals gracefully by closing active listeners before exiting:

```javascript
// server.js
const server = app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

function gracefulShutdown(signal) {
  console.log(`Received ${signal}. Closing HTTP server...`);
  server.close(() => {
    console.log("HTTP server closed. Exiting process.");
    process.exit(0);
  });

  // Force close if graceful termination hangs
  setTimeout(() => {
    console.error("Forced termination due to timeout.");
    process.exit(1);
  }, 5000);
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
```

---

## Related Errors & Docs

- [Kill Process on Port Command Reference](/commands/linux/kill-process-port)
- [Check Open Ports Command Reference](/commands/networking/check-open-ports)
- [CORS Policy Blocked Troubleshooting](/errors/web/cors-policy)
