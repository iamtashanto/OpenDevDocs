---
title: "The JavaScript Event Loop & Microtasks"
description: "Mastering the JavaScript runtime model: Call Stack, Web APIs / libuv, Task (Macrotask) Queue, Microtask Queue (Promises), and execution order."
category: programming
topic: javascript
type: concept
level: intermediate
tags:
  - javascript
  - event-loop
  - call-stack
  - microtasks
  - concurrency
platforms:
  - web
  - node
tested:
  node: "22.x"
  v8: "current"
lastVerified: "2026-09-30"
---

# The JavaScript Event Loop & Microtasks

JavaScript is **single-threaded**: it has one Call Stack and can execute only one piece of code at a time. The **Event Loop** is the concurrency mechanism that allows non-blocking asynchronous operations.

---

## 1. Runtime Architecture

```
┌───────────────────────────┐      ┌───────────────────────────┐
│        CALL STACK         │      │      WEB APIS / LIBUV     │
│  (Executes functions LIFO)│ ───► │  (Timers, Fetch, File I/O)│
└─────────────┬─────────────┘      └─────────────┬─────────────┘
              ▲                                  │ (When I/O finishes)
              │ (Pushes callback)                ▼
┌─────────────┴────────────────────────────────────────────────┐
│                          EVENT LOOP                          │
│                                                              │
│  1. Check Call Stack (if empty)                              │
│  2. Drain ALL Microtasks in Microtask Queue                  │
│  3. Pick ONE Task from Task (Macrotask) Queue                │
│  4. Repeat                                                   │
└─────────────▲──────────────────────────────────▲─────────────┘
              │                                  │
┌─────────────┴─────────────┐      ┌─────────────┴─────────────┐
│      MICROTASK QUEUE      │      │     TASK (MACRO) QUEUE    │
│  - Promise.then / catch   │      │  - setTimeout / setInterval│
│  - queueMicrotask()       │      │  - DOM Event callbacks    │
│  - process.nextTick (Node)│      │  - setImmediate (Node.js) │
└───────────────────────────┘      └───────────────────────────┘
```

---

## 2. Microtasks vs. Macrotasks Execution Order

**Rule**: Microtasks have strictly higher priority than Tasks. The runtime will continuously drain the **entire** Microtask Queue before executing the next Task from the Task Queue.

### Test Your Mental Model:

```javascript
console.log("1. Synchronous");

setTimeout(() => {
  console.log("2. setTimeout (Macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise 1 (Microtask)");
}).then(() => {
  console.log("4. Promise 2 (Microtask)");
});

console.log("5. Synchronous End");
```

### Output:
```text
1. Synchronous
5. Synchronous End
3. Promise 1 (Microtask)
4. Promise 2 (Microtask)
2. setTimeout (Macrotask)
```

---

## 3. Why Blocking the Event Loop Freezes the UI

If you run an expensive computational loop on the main thread (e.g. processing large array without yielding), the Call Stack is never empty.
- The Event Loop cannot check the Microtask/Task queues.
- The browser cannot run layout, recalculate styles, or paint frames.
- The UI completely freezes, and user clicks or keyboard presses are ignored.

### Solution: Yield to the Event Loop
```javascript
// Yield main thread so browser can paint frames:
await new Promise(resolve => setTimeout(resolve, 0));
```

---

## Related Topics

- [Promises and Asynchronous State](/docs/javascript/promises)
- [Async and Await](/docs/javascript/async-await)
- [Fetch API](/docs/javascript/fetch)
- [Node.js Runtime Concepts](/roadmaps/backend/backend-roadmap)
