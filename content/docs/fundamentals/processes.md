---
title: "Operating System Processes and Signals"
description: "Understanding OS processes: PIDs, memory boundaries, background daemons, exit codes, and Unix signals (SIGINT, SIGTERM, SIGKILL)."
category: fundamentals
topic: system
type: guide
level: intermediate
tags:
  - processes
  - linux
  - pid
  - signals
  - system
platforms:
  - all
lastVerified: "2026-09-30"
---

# Operating System Processes and Signals

A **process** is an active instance of a running computer program with its own isolated memory space, file descriptors, and thread execution context.

---

## 1. Process IDs (PIDs) and Lifecycle

Every time you execute a command, script, or server, the operating system assigns it a unique integer called a **Process ID (PID)**.

```
[ Kernel (PID 0) ] ──► [ systemd / launchd (PID 1) ]
                              │
                              ├─► [ Nginx Server (PID 1024) ]
                              └─► [ Node.js App (PID 8492) ]
                                        │ (Spawns worker child process)
                                        └─► [ Worker (PID 8493) ]
```

---

## 2. Process Inspection Commands

| Command | Action | Example |
| :--- | :--- | :--- |
| `ps aux` | View all active processes across system | `ps aux \| grep node` |
| `top` / `htop` | Interactive real-time CPU & memory monitor | `htop` |
| `lsof -i :<port>` | Find the process listening on a specific network port | `lsof -i :3000` |
| `kill -<SIGNAL> <PID>` | Send an OS signal to terminate or interrupt a process | `kill -15 8492` |
| `killall <name>` | Kill all processes matching binary name | `killall node` |

---

## 3. Standard Unix Signals

Operating systems communicate lifecycle events to processes using **Signals**:

| Signal | Number | Name | Action / Behavior |
| :--- | :--- | :--- | :--- |
| `SIGINT` | 2 | Interrupt | Triggered when user presses `Ctrl + C` in terminal. Gracefully stops program. |
| `SIGTERM` | 15 | Terminate | Polite shutdown request (default for `kill`). Allows app to close DB connections and finish active requests. |
| `SIGKILL` | 9 | Force Kill | **Immediate uncatchable termination** by kernel. Process cannot cleanup. |
| `SIGHUP` | 1 | Hangup | Terminal closed, or signals service to reload configuration without restart. |

---

## 4. Graceful Shutdown in Node.js

Production servers should intercept termination signals to finish active HTTP requests and close database connections cleanly:

```javascript
import http from "node:http";

const server = http.createServer((req, res) => {
  res.end("OK");
});

server.listen(3000, () => console.log("Server listening on 3000"));

// Listen for shutdown signals
function gracefulShutdown(signal) {
  console.log(`Received ${signal}. Closing HTTP server gracefully...`);
  server.close(() => {
    console.log("HTTP server closed. Database connections released.");
    process.exit(0);
  });

  // Force close if cleanup takes longer than 10 seconds
  setTimeout(() => {
    console.error("Forced termination due to timeout.");
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
```

---

## Related Topics

- [Terminal Fundamentals & Redirection](/docs/fundamentals/terminal-fundamentals)
- [Ports & Socket Binding](/docs/fundamentals/ports)
- [Troubleshooting EADDRINUSE Port Collision](/errors/node/eaddrinuse)
