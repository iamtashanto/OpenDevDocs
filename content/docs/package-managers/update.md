---
title: "Updating Packages Safely"
description: Complete guide to updating dependencies with npm update, pnpm update, handling major version breaking changes, and using interactive update CLI tools.
category: programming
topic: package-managers
type: guide
level: beginner
tags:
  - update
  - upgrade
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

Keeping project dependencies updated ensures you receive the latest bug fixes, security patches, and performance optimizations.

---

## Minor & Patch Updates (`npm update`)

The `npm update` command updates all packages to the highest version permitted by the SemVer constraints in your `package.json` (e.g. within `^` or `~` ranges):

```bash
# Update all packages within allowed semver ranges
npm update

# Update a specific package
npm update express
```

---

## Major Upgrades (Breaking Changes)

Because `^` prevents jumping to a new `MAJOR` version (e.g. from `react@18` to `react@19`), `npm update` will not upgrade major versions.

### Method 1: Explicit npm install
```bash
npm install express@latest
```

### Method 2: Using `npm-check-updates` (NCU)
`npm-check-updates` analyzes `package.json` and upgrades version strings to the latest releases:

```bash
# Check available upgrades
npx npm-check-updates

# Upgrade package.json automatically
npx npm-check-updates -u

# Install the newly upgraded dependencies
npm install
```

### Method 3: pnpm Interactive Updater (Built-In)
pnpm features a powerful interactive terminal updater:

```bash
# Interactively select packages with keyboard arrows and spacebar
pnpm update -i --latest
```

---

## Post-Update Verification Workflow

After updating dependencies:
1. Run test suites: `npm test`
2. Run TypeScript typecheck: `npm run typecheck` or `npx tsc --noEmit`
3. Run linter: `npm run lint`
4. Verify production build: `npm run build`

---

## Related Guides

- [Checking Outdated Packages](/docs/package-managers/outdated)
- [Semantic Versioning Rules](/docs/package-managers/semantic-versioning)
- [Lock Files](/docs/package-managers/lock-files)
