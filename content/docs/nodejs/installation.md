---
title: Installing Node.js
description: Install and manage Node.js versions using Node Version Manager (nvm), Fast Node Manager (fnm), and package managers.
category: backend
topic: nodejs
type: guide
level: beginner
tags:
  - nodejs
  - nvm
  - fnm
  - installation
  - dev-environment
platforms:
  - linux
  - macos
  - windows
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Release Channels: LTS vs Current

Node.js releases follow a predictable cycle:

- **LTS (Long Term Support)**: Recommended for most users and production servers. Offers stability, bug fixes, and critical security patches for 30 months.
- **Current**: Includes the latest features, experimental APIs, and modern JavaScript syntax updates.

---

## Recommended: Using a Version Manager

Using a Node version manager allows you to switch between multiple Node versions per project without permission issues (`sudo`).

### 1. Fast Node Manager (`fnm`) (Cross-Platform & Ultra-Fast)

`fnm` is built in Rust and works seamlessly across macOS, Linux, and Windows:

```bash
# macOS / Linux via Homebrew
brew install fnm

# Windows via Winget
winget install Schniz.fnm
```

Install and activate LTS:

```bash
fnm install --lts
fnm use --lts
fnm default --lts
```

### 2. Node Version Manager (`nvm`) (macOS & Linux)

Install `nvm`:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Install the latest LTS:

```bash
nvm install --lts
nvm use --lts
nvm alias default 'lts/*'
```

---

## Verifying the Installation

Check the installed versions of Node.js and its default package manager:

```bash
node -v
# Output example: v22.11.0

npm -v
# Output example: 10.9.0
```

---

## Enabling Modern Corepack (pnpm & Yarn)

Node.js includes **Corepack**, a zero-install tool to manage package managers like `pnpm` and `yarn`:

```bash
# Enable corepack
corepack enable

# Activate pnpm
corepack enable pnpm
pnpm --version
```
