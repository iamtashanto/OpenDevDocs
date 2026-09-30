---
title: "JavaScript Modules (ESM vs. CommonJS)"
description: "Mastering JavaScript modularity: ES Modules (import/export), CommonJS (require/module.exports), dynamic imports, and tree-shaking."
category: programming
topic: javascript
type: guide
level: intermediate
tags:
  - javascript
  - modules
  - esm
  - commonjs
  - import-export
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# JavaScript Modules (ESM vs. CommonJS)

Modules allow code to be divided into separate, reusable, self-contained files with explicit import and export boundaries.

---

## 1. ES Modules (ESM) — The Modern Standard

ES Modules are static, asynchronous, and supported natively in all modern browsers and Node.js (`"type": "module"` in `package.json` or `.mjs` extension).

### Named Exports
```javascript
// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

### Named Imports
```javascript
// app.js
import { PI, add } from "./math.js";

console.log(add(10, 20)); // 30
```

### Default Export (One per file)
```javascript
// logger.js
export default function log(msg) {
  console.log(`[LOG]: ${msg}`);
}

// Consuming default import:
import log from "./logger.js";
log("System initialized");
```

---

## 2. CommonJS (CJS) — Legacy Node.js Standard

CommonJS is synchronous and historically used in Node.js (`require` and `module.exports`):

```javascript
// utils.cjs
const formatName = name => name.trim().toUpperCase();
module.exports = { formatName };

// server.cjs
const { formatName } = require("./utils.cjs");
```

---

## 3. Dynamic Imports (`import()`)

Dynamic imports load modules on-demand at runtime, enabling code-splitting:

```javascript
async function loadAnalytics() {
  const { trackEvent } = await import("./analytics.js");
  trackEvent("button_clicked");
}
```

---

## 4. Tree-Shaking

Because ES Module imports and exports are static (declarations cannot appear inside `if` statements), bundlers like Rollup, Webpack, and Turbopack can analyze the AST at build time and discard ("tree-shake") unused exports, drastically shrinking client bundle sizes.

---

## Related Topics

- [Package Managers (npm, pnpm)](/docs/fundamentals/package-managers)
- [Promises and Asynchronous Programming](/docs/javascript/promises)
- [JavaScript Closures](/docs/javascript/closures)
