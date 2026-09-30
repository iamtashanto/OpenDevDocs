---
title: "Development Dependencies (`devDependencies`)"
description: Guide to devDependencies in package.json, why separating dev tools matters, how production builders prune devDependencies, and install commands.
category: programming
topic: package-managers
type: guide
level: beginner
tags:
  - devDependencies
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

The `devDependencies` field in `package.json` contains packages only needed during local development, testing, linting, and building. They are **never executed in production runtimes**.

---

## What Belongs in `devDependencies`?

- **Type Definitions**: `@types/node`, `@types/react`, `@types/express`
- **Compilers & Transpilers**: `typescript`, `ts-node`, `tsx`, `@babel/core`
- **Bundlers & Build Tools**: `vite`, `esbuild`, `postcss`, `tailwindcss`
- **Linters & Formatters**: `eslint`, `prettier`, `biome`
- **Testing Frameworks**: `vitest`, `jest`, `playwright`, `cypress`

---

## Installing Development Dependencies

Use the `-D` (or `--save-dev`) flag:

```bash
# npm
npm install -D typescript @types/node

# pnpm
pnpm add -D vitest

# Yarn
yarn add -D prettier
```

---

## Why the Separation Matters

1. **Smaller Production Images & Faster Deployments**:
   In Docker or cloud deployments, running:
   ```bash
   npm ci --omit=dev
   ```
   installs only runtime packages, reducing container image size and decreasing build times.

2. **Security Isolation**:
   Development tools often include heavier dependency trees and native binaries. Keeping them out of production containers reduces potential attack surfaces and CVE exposure.

3. **Cleaner Dependency Graph for Published Libraries**:
   When other developers install your npm package, npm **never installs your `devDependencies`**. Only your `dependencies` and `peerDependencies` are resolved.

---

## Related Guides

- [Runtime Dependencies](/docs/package-managers/dependencies)
- [peerDependencies Guide](/docs/package-managers/peer-dependencies)
- [Docker Multi-Stage Builds](/docs/docker/multi-stage-builds)
