---
title: Asynchronous Programming & The Event Loop
description: Master asynchronous patterns in Node.js, event loop phases, microtasks, process.nextTick, and concurrency control.
category: backend
topic: nodejs
type: concept
level: intermediate
tags:
  - nodejs
  - async
  - event-loop
  - promises
  - concurrency
platforms:
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

Node.js executes JavaScript on a single thread. It achieves massive concurrency by delegating I/O operations (network, disk, child processes) to the operating system or the libuv thread pool, resuming JavaScript execution when the operations finish.

---

## The Event Loop Phases

Each iteration ("tick") of the Node.js event loop proceeds through six primary phases:

```
   ┌───────────────────────────┐
┌─>│          Timers           │ (setTimeout, setInterval)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     Pending Callbacks     │ (I/O callbacks deferred from previous tick)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │        Idle, Prepare      │ (Internal Node.js use only)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           Poll            │ (Retrieve new I/O events; execute I/O callbacks)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           Check           │ (setImmediate callbacks)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │      Close Callbacks      │ (socket.on('close', ...))
└──┴───────────────────────────┘
```

---

## Microtasks vs Macrotasks

Between every phase transition of the event loop, Node.js drains the **Microtask Queue**:

1. **`process.nextTick` Queue**: Highest priority; runs immediately before any other microtask or phase.
2. **Promise Microtask Queue**: Standard JavaScript `Promise.then`, `Promise.catch`, and `async/await` resumptions.
3. **Macrotasks**: `setTimeout`, `setInterval`, `setImmediate`, and network I/O events.

---

## Concurrency Patterns

### Parallel Execution with `Promise.all`

Fails immediately if any promise rejects:

```javascript
const [users, orders] = await Promise.all([
  fetchUsers(),
  fetchOrders(),
]);
```

### Resilient Batching with `Promise.allSettled`

Waits for all operations to finish regardless of success or failure:

```javascript
const results = await Promise.allSettled([
  sendEmail(user1),
  sendEmail(user2),
  sendEmail(user3),
]);

for (const result of results) {
  if (result.status === 'fulfilled') {
    console.log('Sent:', result.value);
  } else {
    console.error('Failed:', result.reason);
  }
}
```

---

## Golden Rules for Node.js Concurrency

1. **Don't Block the Event Loop**: Never execute CPU-heavy calculations (e.g. huge regex on large text, image rendering, or synchronous crypto) on the main thread. Use Worker Threads (`node:worker_threads`) for CPU-bound tasks.
2. **Always Handle Rejected Promises**: Always use `try/catch` or `.catch()` on promises to avoid terminating the process.
