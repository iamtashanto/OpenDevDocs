---
title: "Peer Dependencies (`peerDependencies`)"
description: Guide to peerDependencies in package.json, plugin architectures, peerDependenciesMeta optional peers, and resolving conflicting peer dependencies.
category: programming
topic: package-managers
type: guide
level: intermediate
tags:
  - peerDependencies
  - npm
  - pnpm
  - plugins
platforms:
  - linux
  - macos
  - windows
tested:
  npm: "10.x"
  pnpm: "9.x"
lastVerified: "2026-09-30"
---

The `peerDependencies` field in `package.json` specifies that your package requires a specific version of a **host package**, but expects the consumer's root application to provide and install it.

---

## Why Peer Dependencies Exist (The Plugin Problem)

If you are authoring a React component library (e.g. `my-button-ui`), you need `react` to compile and run.
- If you put `react` into `dependencies`, npm could install a **second copy of React** inside `node_modules/my-button-ui/node_modules/react`.
- Having two copies of React in the same application breaks React Hooks (`Invalid hook call` runtime crash!).

By declaring `react` as a **peer dependency**, you guarantee that `my-button-ui` shares the exact single instance of React installed by the root application:

```json
{
  "name": "my-button-ui",
  "version": "1.0.0",
  "peerDependencies": {
    "react": ">=18.0.0 <20.0.0",
    "react-dom": ">=18.0.0 <20.0.0"
  }
}
```

---

## Optional Peer Dependencies (`peerDependenciesMeta`)

If your package works fine without a peer, but enhances features if it is present:

```json
{
  "peerDependencies": {
    "redis": "^4.0.0"
  },
  "peerDependenciesMeta": {
    "redis": {
      "optional": true
    }
  }
}
```

---

## Resolving Peer Dependency Conflicts (npm 7+)

In npm 7+, npm attempts to automatically install missing peer dependencies. If there is a version mismatch, npm throws an `ERESOLVE unable to resolve dependency tree` error.

### Fixes:
1. **Align versions**: Upgrade or downgrade packages to compatible ranges (Best practice).
2. **`--legacy-peer-deps`**: Instructs npm to ignore peer dependency conflicts during install:
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Overriding versions**: Use the `overrides` (npm) or `pnpm.overrides` (pnpm) field in root `package.json`.

---

## Related Guides

- [Dependencies vs devDependencies](/docs/package-managers/dependencies)
- [Semantic Versioning](/docs/package-managers/semantic-versioning)
- [Node Modules Resolution](/docs/package-managers/node-modules)
