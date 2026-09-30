---
title: npm & pnpm Package Managers
description: Compare npm and pnpm, understand dependency management, lockfiles, node_modules hard links, and workspace workflows.
category: backend
topic: nodejs
type: guide
level: beginner
tags:
  - nodejs
  - npm
  - pnpm
  - package-manager
  - dependencies
platforms:
  - linux
  - macos
  - windows
tested:
  node: "22.x"
  pnpm: "9.x"
  npm: "10.x"
lastVerified: "2026-09-30"
---

## Overview

Package managers download, resolve, and update third-party libraries for Node.js projects. The two most prominent package managers in modern development are **npm** (bundled with Node.js) and **pnpm** (fast, disk-efficient, strict).

---

## npm vs pnpm: Key Differences

| Feature | npm | pnpm |
| :--- | :--- | :--- |
| **Storage Model** | Flat `node_modules` per project | Central content-addressable store + hard links |
| **Disk Usage** | Duplicates packages across projects | Saves packages once on disk across all projects |
| **Installation Speed** | Moderate | Ultra-fast (up to 2-3x faster) |
| **Phantom Dependencies** | Vulnerable (allows unlisted imports) | Strictly prevents importing undeclared packages |
| **Lockfile** | `package-lock.json` | `pnpm-lock.yaml` |

---

## Common CLI Commands Comparison

| Action | npm Command | pnpm Command |
| :--- | :--- | :--- |
| Initialize project | `npm init -y` | `pnpm init` |
| Install all dependencies | `npm install` | `pnpm install` |
| Add production dependency | `npm install express` | `pnpm add express` |
| Add dev dependency | `npm install -D typescript` | `pnpm add -D typescript` |
| Run custom script | `npm run build` | `pnpm build` |
| Run binary (npx equivalent) | `npx eslint .` | `pnpm dlx eslint .` or `pnpm exec eslint .` |
| Update dependencies | `npm update` | `pnpm update` |
| Remove a package | `npm uninstall lodash` | `pnpm remove lodash` |

---

## Lockfiles & Deterministic Builds

- **Never ignore lockfiles**: Always commit `package-lock.json` or `pnpm-lock.yaml` to Git.
- **CI/CD Best Practice**: Use strict immutable install commands in production pipelines:
  - `pnpm install --frozen-lockfile`
  - `npm ci`

---

## Monorepo Workspaces with pnpm

pnpm includes built-in support for multi-package monorepos via `pnpm-workspace.yaml`:

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

To run commands across all packages:

```bash
# Run build in every workspace package
pnpm -r build

# Add a shared internal package to an app
pnpm --filter web add @workspace/ui
```
