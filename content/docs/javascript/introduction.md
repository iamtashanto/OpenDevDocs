---
title: "Introduction to JavaScript"
description: "Understanding JavaScript: ECMAScript standards, browser V8 vs Node.js runtimes, dynamic typing, and the role of JavaScript in web development."
category: programming
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - js
  - ecmascript
  - runtime
  - fundamentals
platforms:
  - web
  - node
tested:
  node: "22.x"
  v8: "current"
lastVerified: "2026-09-30"
---

# Introduction to JavaScript

**JavaScript (JS)** is a lightweight, interpreted (or just-in-time compiled), multi-paradigm programming language with first-class functions. While best known as the scripting language for web pages, modern JavaScript powers backend servers (Node.js, Deno, Bun), mobile applications (React Native), and desktop software (Electron).

---

## 1. The Modern JavaScript Ecosystem

```
                    ┌─────────────────────────┐
                    │    JavaScript (ES6+)    │
                    └────────────┬────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       [ Browser Runtimes ]              [ Server Runtimes ]
    - V8 (Chrome, Edge, Brave)        - Node.js (V8 + libuv)
    - SpiderMonkey (Firefox)          - Bun (JavaScriptCore + Zig)
    - JavaScriptCore (Safari)         - Deno (V8 + Rust)
```

---

## 2. Key Language Characteristics

- **Dynamic & Weakly Typed**: Variables hold values, not types. Types can change at runtime.
- **Single-Threaded with Asynchronous Event Loop**: JavaScript executes one operation at a time on the main call stack, delegating I/O tasks to background runtime threads.
- **Prototype-Based Object Orientation**: Objects inherit properties directly from other objects via prototype chains rather than classical class blueprints.

---

## 3. Running Your First JavaScript Code

### In Browser Developer Tools:
Press `F12` or `Cmd + Option + I`, open the **Console** tab, and type:
```javascript
console.log("Hello from OpenDevDocs!");
```

### In Node.js Terminal:
```bash
node -e 'console.log("Node version:", process.version)'
```

---

## Related Topics

- [JavaScript Variables (let, const, var)](/docs/javascript/variables)
- [JavaScript Data Types & Primitives](/docs/javascript/data-types)
- [Functions & Arrow Functions](/docs/javascript/functions)
