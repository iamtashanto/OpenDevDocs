---
title: "Checking Outdated Dependencies (`npm outdated`)"
description: Complete guide to analyzing outdated dependencies with npm outdated and pnpm outdated, interpreting Current, Wanted, and Latest columns, and automation.
category: programming
topic: package-managers
type: guide
level: beginner
tags:
  - outdated
  - npm
  - pnpm
  - dependencies
platforms:
  - linux
  - macos
  - windows
tested:
  npm: "10.x"
  pnpm: "9.x"
lastVerified: "2026-09-30"
---

The `npm outdated` command inspects your project dependencies against the npm registry and displays a table of all installed packages that have newer versions available.

---

## Running the Command

```bash
# npm
npm outdated

# pnpm
pnpm outdated
```

---

## Interpreting the Output

```text
Package         Current   Wanted   Latest   Location                Dep Type
zod              3.22.4   3.23.8    3.23.8  my-app                  dependencies
next             14.2.5   14.2.14   15.0.0  my-app                  dependencies
typescript        5.4.5    5.6.2    5.6.2   my-app                  devDependencies
```

### Column Definitions:

1. **`Current`**: The version currently installed on disk in `./node_modules`.
2. **`Wanted`**: The maximum version that satisfies the SemVer constraint declared in your `package.json` (e.g. `^14.2.5` permits `14.2.14`).
3. **`Latest`**: The highest version published on the npm registry, even if it requires a major version upgrade (e.g. Next.js 15).
4. **`Location`**: The workspace or path where the package resides.

---

## What Actions to Take

- **If `Current < Wanted`**: Run `npm update` to safely pull in bug fixes and minor features without risk of breaking changes.
- **If `Wanted < Latest`**: A new **Major** version exists. Check the library's migration guide / changelog before upgrading manually:
  ```bash
  npm install next@latest react@latest react-dom@latest
  ```

---

## Automated Dependency Updates

In production teams, automated bots handle checking and opening Pull Requests for outdated packages:
- **Dependabot**: Built directly into GitHub.
- **Renovate Bot**: Highly configurable dependency automation for monorepos and enterprise teams.

---

## Related Guides

- [Updating Packages](/docs/package-managers/update)
- [Semantic Versioning](/docs/package-managers/semantic-versioning)
- [Auditing Vulnerabilities](/docs/package-managers/audit)
