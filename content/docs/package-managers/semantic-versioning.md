---
title: "Semantic Versioning (SemVer) Explained"
description: Complete guide to Semantic Versioning (SemVer 2.0.0), MAJOR.MINOR.PATCH syntax, caret (^), tilde (~), exact versions, pre-releases, and dependency pinning.
category: programming
topic: package-managers
type: concept
level: beginner
tags:
  - semver
  - versioning
  - npm
  - pnpm
platforms:
  - linux
  - macos
  - windows
tested:
  npm: "10.x"
lastVerified: "2026-09-30"
---

**Semantic Versioning** (SemVer) is a universal specification for version numbers in software engineering that communicates the nature of changes between releases.

---

## SemVer Structure: `MAJOR.MINOR.PATCH`

```
  1  .  4  .  2
  │     │     │
  │     │     └─ PATCH: Backwards-compatible bug fixes
  │     └─────── MINOR: Backwards-compatible new features
  └───────────── MAJOR: Breaking changes (incompatible API changes)
```

- **`MAJOR` (1.0.0 $\rightarrow$ 2.0.0)**: Breaking changes. Existing code may break when upgrading.
- **`MINOR` (1.4.0 $\rightarrow$ 1.5.0)**: New functionality added in a backwards-compatible manner.
- **`PATCH` (1.4.2 $\rightarrow$ 1.4.3)**: Backwards-compatible bug fixes and performance improvements.

---

## Version Ranges in `package.json`

| Operator | Syntax Example | Matches | Does NOT Match |
| :--- | :--- | :--- | :--- |
| **Caret (`^`)** (Default) | `^1.2.3` | `>=1.2.3 <2.0.0` (Allows Minor & Patch) | `2.0.0` |
| **Tilde (`~`)** | `~1.2.3` | `>=1.2.3 <1.3.0` (Allows Patch only) | `1.3.0` |
| **Exact** | `1.2.3` | Exactly `1.2.3` | `1.2.4`, `1.3.0` |
| **Wildcard** | `*` or `1.x` | Any version or any minor release | Outside `1.x` |
| **Hyphen Range** | `1.0.0 - 2.1.0` | `>=1.0.0 <=2.1.0` | `2.2.0` |

### Special Zero-Major Behavior (`0.x.x`)
In SemVer, versions before `1.0.0` are considered initial development where anything may change. Therefore:
- `^0.2.3` matches only `>=0.2.3 <0.3.0` (does NOT allow 0.3.0 because minor bump in 0.x is breaking!).

---

## Pre-Release Tags & Build Metadata

- **Alpha**: `1.0.0-alpha.1`
- **Beta**: `1.0.0-beta.2`
- **Release Candidate**: `2.0.0-rc.1`
- **Nightly / Canary**: `15.0.0-canary.24`

---

## Pinning vs Floating Dependencies

- **Floating (`^` or `~`)**: Allows automatic bug fixes during `npm update`, but can introduce subtle upstream regressions if a package breaks SemVer rules.
- **Pinned (Exact versions)**: Guarantees 100% predictable installs. You can enforce exact versions by default via `.npmrc`:
  ```ini
  save-exact=true
  ```

---

## Related Guides

- [Lock Files & Deterministic Builds](/docs/package-managers/lock-files)
- [Updating Packages Safely](/docs/package-managers/update)
- [Auditing Dependencies](/docs/package-managers/audit)
