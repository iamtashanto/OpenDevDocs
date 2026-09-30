---
title: "Understanding package.json"
description: Complete field-by-field reference for package.json, including name, version, main, module, exports, type, scripts, dependencies, engines, and workspaces.
category: programming
topic: package-managers
type: guide
level: beginner
tags:
  - package-json
  - npm
  - nodejs
  - javascript
platforms:
  - linux
  - macos
  - windows
tested:
  npm: "10.x"
  node: "22.x"
lastVerified: "2026-09-30"
---

The `package.json` file is the central manifest for every Node.js project. It defines metadata, dependencies, scripts, and module resolution rules.

---

## Anatomy of a Modern `package.json`

```json
{
  "name": "my-awesome-app",
  "version": "1.0.0",
  "description": "Production REST API with Express and TypeScript",
  "private": true,
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest"
  },
  "dependencies": {
    "express": "^4.21.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.7.4",
    "tsx": "^4.19.1",
    "typescript": "^5.6.2",
    "vitest": "^2.1.1"
  },
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  }
}
```

---

## Core Fields Explained

### 1. `type` (`"module"` vs CommonJS)
- `"type": "module"`: Treats all `.js` files as ES Modules (`import`/`export`).
- Omitted or `"commonjs"`: Treats `.js` files as CommonJS (`require`/`module.exports`).

### 2. `private`
- Setting `"private": true` prevents accidental publication of proprietary or internal applications to the public npm registry.

### 3. `exports` (Subpath Exports)
Modern Node.js replacement for `main`. Controls exactly which entrypoints consumers can import:
```json
"exports": {
  ".": "./dist/index.js",
  "./utils": "./dist/utils/index.js"
}
```

### 4. `engines`
Declares the supported runtime versions for your project:
```json
"engines": {
  "node": ">=20.0.0"
}
```

---

## Related Guides

- [Dependencies vs devDependencies](/docs/package-managers/dependencies)
- [npm Scripts Guide](/docs/package-managers/scripts)
- [Semantic Versioning Explained](/docs/package-managers/semantic-versioning)
