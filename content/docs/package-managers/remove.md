---
title: "Removing Packages (`npm uninstall` / `pnpm remove`)"
description: Guide to uninstalling dependencies from package.json and node_modules, cleaning orphaned transitive packages, and removing global packages.
category: programming
topic: package-managers
type: guide
level: beginner
tags:
  - remove
  - uninstall
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

Removing unneeded dependencies keeps bundle sizes lean, prevents security vulnerabilities, and speeds up continuous integration installs.

---

## Uninstalling Project Dependencies

```bash
# npm (removes from package.json, package-lock.json, and node_modules)
npm uninstall lodash
# or shorthand:
npm rm lodash

# pnpm
pnpm remove lodash
# or shorthand:
pnpm rm lodash
```

### Removing Multiple Packages
```bash
npm uninstall moment axios jquery
```

---

## Removing Global Packages

```bash
# npm global removal
npm uninstall -g nodemon

# pnpm global removal
pnpm remove -g nodemon
```

---

## Cleaning Transitive Dependencies (`npm prune`)

Sometimes removing a package leaves unused transitive sub-dependencies in `node_modules`. Run prune to clean them:

```bash
# Removes packages in node_modules not listed in package.json
npm prune

# Prunes devDependencies from node_modules (production preparation)
npm prune --omit=dev
```

With pnpm:
```bash
pnpm prune
```

---

## Related Guides

- [Installing Packages](/docs/package-managers/install)
- [Auditing Dependencies](/docs/package-managers/audit)
- [Lock Files](/docs/package-managers/lock-files)
