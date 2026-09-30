---
title: "Package Managers (npm, pnpm, yarn, bun)"
description: "Understanding JavaScript package managers: dependency resolution, node_modules, lockfiles, semantic versioning, and pnpm symlink architecture."
category: fundamentals
topic: tooling
type: guide
level: beginner
tags:
  - package-managers
  - npm
  - pnpm
  - yarn
  - bun
  - dependencies
platforms:
  - all
lastVerified: "2026-09-30"
---

# Package Managers (npm, pnpm, yarn, bun)

A **package manager** automates the installation, upgrading, configuration, and removal of third-party open-source libraries and developer CLI tools.

---

## 1. Comparing JavaScript Package Managers

| Package Manager | Storage Model | Speed | Lockfile | Key Feature |
| :--- | :--- | :--- | :--- | :--- |
| **npm** | Flat `node_modules` | Standard | `package-lock.json` | Default bundled with Node.js runtime. |
| **pnpm** | Content-addressable global store + Hard links | **Very Fast** | `pnpm-lock.yaml` | Saves massive disk space; prevents phantom dependencies. |
| **yarn** | Flat / Zero-Installs (PnP) | Fast | `yarn.lock` | Popular in monorepos; supports workspaces. |
| **bun** | Native Zig package engine | **Extremely Fast** | `bun.lockb` | Native JavaScript runtime + package manager in one. |

---

## 2. The Role of Lockfiles

When you define a dependency with a caret (`"lucide-react": "^1.48.0"`), the caret allows `npm install` to download minor or patch updates (e.g. `1.48.2`).

If two developers install at different times without a lockfile, they may run different code versions, causing "works on my machine" bugs.

### Lockfile Golden Rules
1. **Always commit your lockfile** (`pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`) to Git.
2. In CI/CD pipelines, always use **frozen / clean install commands** to guarantee exact bit-for-bit reproducibility:
   - **pnpm**: `pnpm install --frozen-lockfile`
   - **npm**: `npm ci`
   - **yarn**: `yarn install --immutable`

---

## 3. Command Comparison Cheat Sheet

| Task | `pnpm` | `npm` | `yarn` | `bun` |
| :--- | :--- | :--- | :--- | :--- |
| **Install all deps** | `pnpm install` | `npm install` | `yarn install` | `bun install` |
| **Add dependency** | `pnpm add <pkg>` | `npm install <pkg>` | `yarn add <pkg>` | `bun add <pkg>` |
| **Add dev dependency** | `pnpm add -D <pkg>` | `npm i -D <pkg>` | `yarn add -D <pkg>` | `bun add -d <pkg>` |
| **Run package script** | `pnpm <script>` | `npm run <script>` | `yarn <script>` | `bun run <script>` |
| **Execute remote binary** | `pnpm dlx <pkg>` | `npx <pkg>` | `yarn dlx <pkg>` | `bunx <pkg>` |
| **Clean cache/modules** | `pnpm store prune` | `npm cache clean --force` | `yarn cache clean` | `bun pm cache rm` |

---

## 4. Semantic Versioning (SemVer)

Dependencies in `package.json` follow `MAJOR.MINOR.PATCH` (e.g. `2.4.1`):
- **`MAJOR` (2.x.x)**: Breaking API changes.
- **`MINOR` (x.4.x)**: Backwards-compatible new features.
- **`PATCH` (x.x.1)**: Backwards-compatible bug fixes.

Prefix symbols:
- **`^1.2.3` (Caret)**: Allows minor and patch updates (`>= 1.2.3 < 2.0.0`).
- **`~1.2.3` (Tilde)**: Allows patch updates only (`>= 1.2.3 < 1.3.0`).
- **`1.2.3` (Exact)**: Locks to the exact version.

---

## Related Topics

- [Clean Install (pnpm) Reference](/commands/pnpm/clean-install)
- [Environment Variables](/docs/fundamentals/environment-variables)
- [Debugging Fundamentals](/docs/fundamentals/debugging-fundamentals)
