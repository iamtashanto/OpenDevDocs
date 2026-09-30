---
title: "Installing Packages (`npm install` / `pnpm add`)"
description: Complete guide to installing packages, installing specific versions, Git repositories, local tarballs, global packages, and dependency flags.
category: programming
topic: package-managers
type: guide
level: beginner
tags:
  - install
  - npm
  - pnpm
  - packages
platforms:
  - linux
  - macos
  - windows
tested:
  npm: "10.x"
  pnpm: "9.x"
lastVerified: "2026-09-30"
---

The `install` (or `add`) command downloads and links third-party packages into your project workspace.

---

## Installing All Project Dependencies

When cloning an existing repository, install all dependencies listed in `package.json`:

```bash
# npm
npm install

# pnpm
pnpm install

# In CI/CD pipelines (Strict lockfile enforcement)
npm ci
pnpm install --frozen-lockfile
```

---

## Adding New Packages

### 1. Runtime Dependencies
```bash
# npm
npm install zod axios

# pnpm
pnpm add zod axios
```

### 2. Development Dependencies
```bash
# npm
npm install -D typescript vitest

# pnpm
pnpm add -D typescript vitest
```

### 3. Installing Specific Versions or Tags
```bash
# Exact version
npm install react@18.2.0

# Latest beta or next tag
npm install next@canary
```

### 4. Installing from GitHub / Git URLs
```bash
# Install directly from main branch of GitHub repo
npm install github:user/repo

# Install from specific Git commit SHA or tag
npm install git+https://github.com/user/repo.git#v2.1.0
```

### 5. Installing Local Packages or Tarballs
```bash
# Relative local directory
npm install ../my-local-package

# Packaged tarball (.tgz)
npm install ./dist/my-package-1.0.0.tgz
```

---

## Related Guides

- [Removing Packages](/docs/package-managers/remove)
- [Updating Packages](/docs/package-managers/update)
- [Lock Files](/docs/package-managers/lock-files)
