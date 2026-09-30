---
title: "Understanding node_modules & Resolution"
description: Complete guide to the node_modules folder, Node.js module resolution algorithm, flat vs nested trees, phantom dependencies, and cleaning corrupted caches.
category: programming
topic: package-managers
type: concept
level: intermediate
tags:
  - node_modules
  - resolution
  - npm
  - pnpm
platforms:
  - linux
  - macos
  - windows
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

The `node_modules` directory is the local filesystem store where package managers download and organize all direct and indirect dependencies for a Node.js project.

---

## How Node.js Resolves Modules

When your code executes `import express from 'express'` or `require('express')`, the Node.js runtime searches the filesystem in this order:

1. **Core modules** (`fs`, `path`, `http`, `crypto`).
2. **Current directory**: `./node_modules/express`.
3. **Parent directory**: `../node_modules/express`.
4. **Ascending ancestors**: `../../node_modules/express` all the way to the root `/node_modules/express`.
5. **Global directories**: (if configured).

If not found, Node.js throws `MODULE_NOT_FOUND`.

---

## Flattening vs Symlinking

### 1. Flat Layout (npm & Yarn Classic)
npm hoists (flattens) dependencies up to the root `node_modules/` to avoid deeply nested directory paths on Windows.
- **Problem**: Causes **Phantom Dependencies** — your app can accidentally import transitive packages that aren't declared in `package.json`.

### 2. Symlinked Layout (pnpm)
pnpm creates a virtual store inside `node_modules/.pnpm/` and hardlinks only the packages explicitly declared in `package.json` directly into `node_modules/`.
- **Benefit**: Strict isolation, no phantom dependencies, and huge disk space savings.

---

## How to Clean and Rebuild `node_modules`

If `node_modules` becomes corrupted or experiences stale build cache issues:

```bash
# Delete node_modules and lockfile caches
rm -rf node_modules package-lock.json

# Clean npm cache
npm cache clean --force

# Reinstall cleanly
npm install
```

With pnpm:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## Related Guides

- [pnpm vs npm](/docs/package-managers/pnpm)
- [Lock Files](/docs/package-managers/lock-files)
- [Managing Dependencies](/docs/package-managers/dependencies)
