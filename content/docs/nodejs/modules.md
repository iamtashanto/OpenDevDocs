---
title: "Node.js Modules: ESM & CommonJS"
description: Master ECMAScript Modules (ESM) and CommonJS (CJS) in Node.js, native module prefixes, top-level await, and interop rules.
category: backend
topic: nodejs
type: guide
level: beginner
tags:
  - nodejs
  - modules
  - esm
  - commonjs
  - imports
platforms:
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

Node.js supports two module systems:

1. **ECMAScript Modules (ESM)**: Modern official JavaScript standard (`import` / `export`).
2. **CommonJS (CJS)**: Legacy Node.js standard (`require()` / `module.exports`).

---

## ECMAScript Modules (ESM) (Recommended)

Enable ESM by adding `"type": "module"` in your `package.json` or by using the `.mjs` file extension.

### Exporting and Importing

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export const PI = 3.14159;

export default function multiply(a, b) {
  return a * b;
}
```

```javascript
// app.js
import multiply, { add, PI } from './math.js';

console.log(add(2, 3)); // 5
console.log(multiply(4, 5)); // 20
```

### Top-Level `await`
In ESM, you can use `await` directly at the top level of a module without wrapping it in an `async` function:

```javascript
// db.js
import { connectDB } from './database.js';

// Automatically pauses module initialization until connected
export const db = await connectDB(process.env.DATABASE_URL);
```

---

## Native Node.js Built-in Prefix (`node:`)

Always prefix built-in core modules with `node:` to avoid collisions with third-party packages:

```javascript
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
```

---

## CommonJS (CJS) (Legacy)

CommonJS is the legacy module format enabled by default when `"type": "module"` is absent, or when using `.cjs` files:

```javascript
// utils.cjs
function formatName(name) {
  return name.trim().toUpperCase();
}

module.exports = {
  formatName,
};
```

```javascript
// index.cjs
const { formatName } = require('./utils.cjs');
console.log(formatName(' Alice '));
```

---

## Summary: ESM vs CommonJS

| Feature | ESM (`import`) | CommonJS (`require`) |
| :--- | :--- | :--- |
| **Loading Mechanism** | Asynchronous / Static analysis | Synchronous / Dynamic runtime |
| **Top-Level Await** | Native support | Not supported |
| **Tree-Shaking** | Optimized by bundlers | Difficult to optimize |
| **File Extension** | Required in native ESM imports (`./file.js`) | Optional in CJS (`./file`) |
| **Directory Scope** | `import.meta.url` | `__dirname`, `__filename` |
