---
title: "npm Scripts & Task Automation"
description: Complete guide to defining and running scripts in package.json, pre/post lifecycle hooks, passing arguments, environment variables, and parallel task execution.
category: programming
topic: package-managers
type: guide
level: beginner
tags:
  - scripts
  - npm
  - pnpm
  - automation
platforms:
  - linux
  - macos
  - windows
tested:
  npm: "10.x"
  pnpm: "9.x"
lastVerified: "2026-09-30"
---

The `scripts` object in `package.json` allows you to define custom CLI commands and build workflows that run with local binaries in `./node_modules/.bin` automatically added to the execution `$PATH`.

---

## Defining Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

---

## Running Scripts

```bash
# npm (requires 'run' for custom scripts, but 'test' and 'start' work without 'run')
npm run dev
npm test
npm start

# pnpm ('run' keyword is completely optional)
pnpm dev
pnpm build
pnpm test
```

---

## Passing Extra Arguments (`--`)

In npm, use `--` to forward subsequent flags and arguments to the underlying binary:

```bash
# Runs: vitest run --coverage
npm test -- --coverage

# Runs: eslint . --fix
npm run lint -- --fix
```

With pnpm, flags pass directly without `--`:
```bash
pnpm test --coverage
```

---

## Pre and Post Lifecycle Hooks

npm automatically runs scripts prefixed with `pre` and `post` in chronological order:

```json
{
  "scripts": {
    "prebuild": "npm run clean && npm run lint",
    "build": "tsc -p tsconfig.json",
    "postbuild": "echo 'Build successfully completed!'"
  }
}
```

When you execute `npm run build`, npm executes:
1. `prebuild`
2. `build`
3. `postbuild`

---

## Running Scripts in Parallel vs Sequentially

- **Sequential (`&&`)**: Runs next command only if the previous command succeeds (exit code 0):
  ```json
  "build:all": "npm run lint && npm run build"
  ```
- **Parallel (`concurrently` or `npm-run-all`)**:
  ```bash
  npm install -D concurrently
  ```
  ```json
  "dev:all": "concurrently \"npm run dev:api\" \"npm run dev:web\""
  ```

---

## Related Guides

- [package.json Structure](/docs/package-managers/package-json)
- [npm CLI Overview](/docs/package-managers/npm)
- [pnpm CLI Overview](/docs/package-managers/pnpm)
