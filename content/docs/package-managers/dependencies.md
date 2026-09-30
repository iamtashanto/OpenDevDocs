---
title: "Runtime Dependencies (`dependencies`)"
description: Guide to runtime dependencies in Node.js, when to install packages into dependencies, dependency resolution, and bundle size considerations.
category: programming
topic: package-managers
type: guide
level: beginner
tags:
  - dependencies
  - npm
  - pnpm
  - nodejs
platforms:
  - linux
  - macos
  - windows
tested:
  npm: "10.x"
  pnpm: "9.x"
lastVerified: "2026-09-30"
---

The `dependencies` field in `package.json` specifies third-party packages strictly required for the application to run in **production environments**.

---

## When to Put a Package in `dependencies`

Ask yourself: **"Will this code execute when the app is running in production?"**

- ✅ **Yes $\rightarrow$ `dependencies`**:
  - Web frameworks (`express`, `fastify`, `hono`, `next`)
  - Utility libraries imported in runtime code (`lodash`, `date-fns`, `zod`, `axios`)
  - Database drivers and ORMs (`pg`, `@prisma/client`, `drizzle-orm`)
  - State management (`zustand`, `redux-toolkit`)

- ❌ **No $\rightarrow$ `devDependencies`**:
  - Compilers and type checkers (`typescript`, `@types/*`, `babel`)
  - Bundlers and build tools (`esbuild`, `vite`, `webpack`)
  - Testing frameworks (`vitest`, `jest`, `playwright`)
  - Linters and formatters (`eslint`, `prettier`)

---

## Installing Dependencies

```bash
# npm (default saves to dependencies)
npm install zod

# pnpm
pnpm add zod

# Explicit save flag
npm install --save-prod axios
```

---

## Production Impact & Bundle Size

In server environments, production deployments strip `devDependencies` using `npm ci --omit=dev` to reduce memory and startup overhead.

In client-side frontend applications (React/Next.js/Vite), modern bundlers perform **Tree Shaking** to eliminate dead code. However, heavy dependencies still increase client bundle size.

> [!TIP]
> Use tools like `bundlephobia.com` or `bundle-analyzer` to inspect package weight before installing new dependencies.

---

## Related Guides

- [devDependencies Guide](/docs/package-managers/dev-dependencies)
- [peerDependencies Guide](/docs/package-managers/peer-dependencies)
- [Lock Files & Deterministic Builds](/docs/package-managers/lock-files)
