---
title: "Workspaces & Monorepos Introduction"
description: Complete introduction to monorepos, npm workspaces, pnpm workspaces, inter-package dependencies, shared configs, and unified dependency management.
category: programming
topic: package-managers
type: guide
level: intermediate
tags:
  - workspaces
  - monorepo
  - npm
  - pnpm
platforms:
  - linux
  - macos
  - windows
tested:
  npm: "10.x"
  pnpm: "9.x"
lastVerified: "2026-09-30"
---

A **Monorepo** is a single version-controlled repository containing multiple distinct projects or packages (e.g. frontend app, backend API, shared UI component library, and shared TypeScript types).

**Workspaces** are the native package manager feature that links these internal packages together locally without needing to publish them to npm.

---

## Monorepo Directory Structure

```
my-monorepo/
├── package.json               # Root manifest
├── pnpm-workspace.yaml        # Workspace configuration
├── packages/
│   ├── ui/                    # Shared React UI components (@repo/ui)
│   │   └── package.json
│   └── tsconfig/              # Shared tsconfig base
├── apps/
│   ├── web/                   # Next.js web application
│   │   └── package.json
│   └── api/                   # Express backend API
│       └── package.json
```

---

## Configuring Workspaces

### 1. npm Workspaces (`package.json`)
```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

### 2. pnpm Workspaces (`pnpm-workspace.yaml`)
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

---

## Referencing Internal Packages (`workspace:*`)

In `apps/web/package.json`:

```json
{
  "name": "web",
  "dependencies": {
    "@repo/ui": "workspace:*",
    "react": "^19.0.0"
  }
}
```

The package manager creates a direct symlink from `apps/web/node_modules/@repo/ui` pointing directly to `./packages/ui`. Any code changes in `packages/ui` reflect immediately inside `apps/web`!

---

## Running Commands Across Workspaces

```bash
# npm
npm run build --workspaces
npm run dev --workspace=web

# pnpm
pnpm -r build
pnpm --filter web dev
```

---

## Related Guides

- [pnpm CLI Overview](/docs/package-managers/pnpm)
- [package.json Reference](/docs/package-managers/package-json)
- [Node Modules Resolution](/docs/package-managers/node-modules)
