---
title: Understanding package.json
description: Master the manifest file of Node.js projects, semantic versioning, dependencies, type definitions, and subpath exports.
category: backend
topic: nodejs
type: guide
level: beginner
tags:
  - nodejs
  - package-json
  - semver
  - npm
  - dependencies
platforms:
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Overview

The `package.json` file is the manifest of a Node.js project. It records metadata, scripts, configuration settings, and all third-party package dependencies required by the application.

---

## Anatomy of a Modern `package.json`

```json
{
  "name": "my-api-server",
  "version": "1.0.0",
  "description": "Production REST API for user authentication",
  "type": "module",
  "main": "./dist/index.js",
  "scripts": {
    "dev": "node --watch src/index.js",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest"
  },
  "dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.7.0",
    "typescript": "^5.6.2"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

---

## Key Fields Explained

### 1. `type: "module"` vs CommonJS
Setting `"type": "module"` enables native **ECMAScript Modules (ESM)**, allowing top-level `import` and `export` statements. If omitted, Node.js defaults to legacy **CommonJS (CJS)** using `require()` and `module.exports`.

### 2. Dependency Types
- **`dependencies`**: Packages required in production (e.g. `express`, `pg`, `zod`).
- **`devDependencies`**: Packages needed only during development or build time (e.g. `typescript`, `eslint`, `vitest`).
- **`peerDependencies`**: Packages expected to be provided by the consuming root application (common in plugin and library authoring).

---

## Semantic Versioning (SemVer)

Versions follow the `MAJOR.MINOR.PATCH` format:

- **`^1.2.3` (Caret - Default)**: Allows backward-compatible minor and patch updates (`>= 1.2.3 < 2.0.0`).
- **`~1.2.3` (Tilde)**: Allows only patch bug fixes (`>= 1.2.3 < 1.3.0`).
- **`1.2.3` (Exact)**: Locks to the exact specified version.

---

## Modern Subpath Exports (`exports`)

Modern packages use the `exports` field instead of `main` to control module resolution and entrypoints:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./utils": "./dist/utils.js"
  }
}
```
