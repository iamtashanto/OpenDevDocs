---
title: "Lock Files & Deterministic Builds"
description: Complete guide to package-lock.json, pnpm-lock.yaml, yarn.lock, resolving merge conflicts, and running reproducible CI builds with npm ci.
category: programming
topic: package-managers
type: concept
level: intermediate
tags:
  - lockfiles
  - npm
  - pnpm
  - ci-cd
platforms:
  - linux
  - macos
  - windows
tested:
  npm: "10.x"
  pnpm: "9.x"
lastVerified: "2026-09-30"
---

A **Lock File** (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`) records the exact version, integrity hash, and download URL of every direct and transitive dependency installed in your project.

---

## Why Lock Files are Mandatory

Without a lock file, if your `package.json` contains `"express": "^4.21.0"`:
- Developer A installs on Monday and gets Express `4.21.0`.
- Express releases `4.21.1` on Tuesday.
- Developer B installs on Wednesday and gets Express `4.21.1`.
- Production builds on Thursday may fail due to unexpected upstream patch changes.

**Lock files guarantee 100% deterministic builds**: anyone cloning the repository gets the exact same byte-for-byte dependency tree.

---

## Lock File Comparison

| Tool | Lock File | Format | Characteristics |
| :--- | :--- | :--- | :--- |
| **npm** | `package-lock.json` | JSON | Large, comprehensive nested tree format |
| **pnpm** | `pnpm-lock.yaml` | YAML | Compact, human-readable, store references |
| **Yarn** | `yarn.lock` | Custom YAML-like | Flat dependency resolution map |
| **Bun** | `bun.lockb` / `bun.lock` | Binary or text | High-performance lock format |

---

## `npm install` vs `npm ci`

| Feature | `npm install` | `npm ci` (Clean Install) |
| :--- | :--- | :--- |
| **Lock File Modification** | Can modify `package-lock.json` | **Never** modifies `package-lock.json` |
| **Existing `node_modules`** | Modifies incrementally | Deletes `./node_modules` entirely first |
| **Speed** | Slower | Significantly faster in CI pipelines |
| **Mismatch Handling** | Syncs lock file to `package.json` | **Fails the build immediately** |

### Running in CI/CD Pipelines:
```bash
# npm
npm ci

# pnpm
pnpm install --frozen-lockfile
```

---

## Resolving Lock File Merge Conflicts

When two Git branches add different dependencies, Git may flag a conflict inside the lock file.

**Never manually edit a 5,000-line lock file in your text editor.** Follow this safe workflow:

```bash
# 1. Resolve conflicts in package.json manually
git checkout --theirs package.json # or edit by hand

# 2. Regenerate the lock file automatically
npm install
# or for pnpm:
pnpm install

# 3. Stage the cleanly regenerated lock file
git add package.json package-lock.json
git commit -m "Resolve dependency conflicts and regenerate lockfile"
```

---

## Related Guides

- [Semantic Versioning](/docs/package-managers/semantic-versioning)
- [Node Modules Resolution](/docs/package-managers/node-modules)
- [CI/CD Workflows](/docs/fundamentals/processes)
