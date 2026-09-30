---
title: "pnpm install (Clean & CI Install)"
description: Deterministic and frozen-lockfile installation command for CI/CD and production environments with pnpm.
category: tools
topic: pnpm
type: reference
level: beginner
tags:
  - pnpm
  - node
  - package-manager
  - ci
platforms:
  - all
tested:
  pnpm: "12.x"
  node: "22.x"
lastVerified: "2026-09-30"
---

## Command

<Command>pnpm install --frozen-lockfile</Command>

---

## Short Description

`pnpm install --frozen-lockfile` installs packages strictly according to `pnpm-lock.yaml`. If `pnpm-lock.yaml` is out of date or needs updating, the command aborts and fails with an exit code, guaranteeing deterministic builds in CI/CD pipelines.

---

## Common Flags

| Flag | Purpose |
| :--- | :--- |
| `--frozen-lockfile` | Strict CI flag; errors if lockfile is modified or out of sync. |
| `--prod`, `-P` | Install only `dependencies`, ignoring `devDependencies`. |
| `--prefer-offline` | Skip network checks for packages already in local store. |
| `--shamefully-hoist` | Hoists all dependencies to flat `node_modules` (useful for legacy packages). |
