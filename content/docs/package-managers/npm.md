---
title: "npm: The Node Package Manager"
description: Complete guide to npm, the default package manager for Node.js, covering the npm registry, CLI fundamentals, global vs local packages, and configuration.
category: programming
topic: package-managers
type: guide
level: beginner
tags:
  - npm
  - nodejs
  - package-manager
  - javascript
platforms:
  - linux
  - macos
  - windows
tested:
  npm: "10.x"
  node: "22.x"
lastVerified: "2026-09-30"
---

**npm** (Node Package Manager) is the default package manager bundled with Node.js. It consists of:
1. **The npm Registry**: A public database containing over 3 million open-source JavaScript packages.
2. **The npm CLI**: A command-line client used to install, publish, update, and manage dependencies.
3. **The npm Website**: The web interface for browsing documentation, versions, and maintainers.

---

## Installing and Updating npm

npm comes pre-installed with Node.js. To verify or update to the latest release:

```bash
# Check installed version
npm -v

# Update npm to latest globally
npm install -g npm@latest
```

---

## Global vs. Local Packages

### Local Installation (Project Scope)
Local packages are installed inside the project's `node_modules/` folder and listed in `package.json`. Always install project dependencies locally:

```bash
npm install express
npm install -D typescript
```

### Global Installation (System Scope)
Global packages are installed system-wide in your user home directory or system path, making CLI binaries accessible anywhere:

```bash
npm install -g pm2
```

> [!TIP]
> Use `npx` instead of installing CLI utilities globally. `npx <package>` downloads and executes the latest binary ephemerally without polluting your system path:
> ```bash
> npx prisma migrate dev
> ```

---

## npm Configuration (`.npmrc`)

Customize registry mirrors, authorization tokens, and install behaviors using `.npmrc`:

```ini
# .npmrc
registry=https://registry.npmjs.org/
save-exact=true
engine-strict=true
```

---

## Essential npm Commands

| Command | Purpose |
| :--- | :--- |
| `npm init -y` | Initializes a new `package.json` with default values |
| `npm install <pkg>` | Installs package and saves to `dependencies` |
| `npm install -D <pkg>` | Installs package and saves to `devDependencies` |
| `npm ci` | Clean, deterministic install from `package-lock.json` |
| `npm run <script>` | Runs a custom script defined in `package.json` |
| `npm test` | Runs the test script |
| `npm outdated` | Lists packages that have newer versions available |
| `npm audit` | Scans project dependencies for known security vulnerabilities |

---

## Related Guides

- [pnpm: Fast, Disk-Efficient Package Manager](/docs/package-managers/pnpm)
- [Understanding package.json](/docs/package-managers/package-json)
- [Lock Files & Deterministic Builds](/docs/package-managers/lock-files)
