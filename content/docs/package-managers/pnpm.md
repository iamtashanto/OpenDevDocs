---
title: "pnpm: Fast, Disk Space Efficient Package Manager"
description: Complete guide to pnpm, hard links, content-addressable storage, strict non-flat node_modules layout, and preventing phantom dependencies.
category: programming
topic: package-managers
type: guide
level: beginner
tags:
  - pnpm
  - nodejs
  - package-manager
  - javascript
platforms:
  - linux
  - macos
  - windows
tested:
  pnpm: "9.x"
  node: "22.x"
lastVerified: "2026-09-30"
---

**pnpm** (Performant npm) is a fast, disk space-efficient package manager for JavaScript and TypeScript.

---

## Why Use pnpm?

### 1. Massive Disk Space Savings
With npm/Yarn, if you have 100 projects that depend on `next` or `react`, you have 100 identical copies saved on your hard drive.
With pnpm, packages are stored once in a single global **Content-Addressable Store** (`~/.local/share/pnpm/store`). Projects use filesystem **hard links** that point directly to this central store.

### 2. Up to 3x Faster Installation
pnpm installs dependencies up to 3x faster than npm by streaming package downloads in parallel and eliminating redundant file copies.

### 3. Strict Non-Flat `node_modules` (No Phantom Dependencies)
npm flattens all dependencies into the root `node_modules`. If package A depends on B, your code can accidentally `import B from 'b'` without declaring B in your `package.json`. If package A updates and removes B, your app breaks unexpectedly.
pnpm creates a symlinked layout where code can **only import packages explicitly declared** in `package.json`.

---

## Installation

```bash
# Recommended: via Node.js Corepack
corepack enable
corepack prepare pnpm@latest --activate

# Or via npm
npm install -g pnpm

# Or standalone curl installer (macOS/Linux)
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

---

## Essential pnpm Commands

| npm Command | pnpm Equivalent | Description |
| :--- | :--- | :--- |
| `npm install` | `pnpm install` | Installs dependencies |
| `npm install express` | `pnpm add express` | Adds runtime dependency |
| `npm install -D tsx` | `pnpm add -D tsx` | Adds development dependency |
| `npm uninstall lodash` | `pnpm remove lodash` | Removes dependency |
| `npm run dev` | `pnpm dev` | Executes script (run keyword is optional) |
| `npm ci` | `pnpm install --frozen-lockfile` | CI clean installation |
| `npm update` | `pnpm update -i` | Interactive terminal version updater |
| `npm exec <pkg>` | `pnpm dlx <pkg>` | Executes remote CLI package without install |

---

## Monorepo & Workspaces

pnpm has first-class monorepo support through `pnpm-workspace.yaml`:

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

```bash
# Run command across all workspace packages in parallel
pnpm -r build

# Filter execution to a specific package
pnpm --filter web dev
```

---

## Related Guides

- [npm Overview](/docs/package-managers/npm)
- [Lock Files & pnpm-lock.yaml](/docs/package-managers/lock-files)
- [Workspaces Introduction](/docs/package-managers/workspaces)
