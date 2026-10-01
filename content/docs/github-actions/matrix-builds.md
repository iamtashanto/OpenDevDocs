---
title: "GitHub Actions Matrix Builds"
description: "Test across multiple operating systems, Node.js runtimes, and databases simultaneously using GitHub Actions matrix strategies."
category: devops
topic: github-actions
type: guide
level: intermediate
tags:
  - github-actions
  - matrix
  - testing
  - cross-platform
  - ci-cd
platforms:
  - all
tested:
  github-actions: "current"
lastVerified: "2026-10-01"
---

# GitHub Actions Matrix Builds

A **Matrix Build** runs multiple jobs in parallel using parameterized combinations of operating systems, language runtime versions, or database engines.

---

## 1. Basic Matrix Strategy

Run tests across multiple Node.js versions simultaneously:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      # Prevent one failure from canceling other matrix jobs
      fail-fast: false
      matrix:
        node-version: [20, 22, 24]

    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'

      - run: pnpm install --frozen-lockfile
      - run: pnpm test
```

---

## 2. Multi-Dimensional Matrix (OS x Runtime)

Test cross-platform compatibility across Linux, macOS, and Windows:

```yaml
jobs:
  cross-platform-test:
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      max-parallel: 4
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        node-version: [20, 22]

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm test
```

This generates **6 parallel jobs** (`3 operating systems × 2 Node versions`).

---

## 3. Adding and Excluding Combinations (`include` & `exclude`)

### 3.1 Using `include` to add extra variables or single configurations
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, macos-latest]
    node-version: [20, 22]
    include:
      # Add an experimental canary build on Ubuntu only
      - os: ubuntu-latest
        node-version: 24
        experimental: true
```

### 3.2 Using `exclude` to skip specific combinations
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, macos-latest, windows-latest]
    node-version: [20, 22, 24]
    exclude:
      # Exclude Windows on Node 20
      - os: windows-latest
        node-version: 20
```
