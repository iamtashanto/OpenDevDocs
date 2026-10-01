---
title: "GitHub Actions Pull Request Checks & Branch Protection"
description: "Build robust pull request validation pipelines, status checks, automated testing, and enforce merge gates using GitHub branch protection rules."
category: devops
topic: github-actions
type: guide
level: intermediate
tags:
  - github-actions
  - pull-requests
  - branch-protection
  - testing
  - quality
platforms:
  - all
tested:
  github-actions: "current"
lastVerified: "2026-10-01"
---

# GitHub Actions Pull Request Checks & Branch Protection

Automated Pull Request (PR) checks ensure that no broken code, syntax errors, or failing tests are ever merged into your default branch (`main`).

---

## 1. Standard Pull Request CI Workflow

```yaml
name: Pull Request CI

on:
  pull_request:
    branches:
      - main

permissions:
  contents: read

concurrency:
  group: pr-${{ github.head_ref || github.run_id }}
  cancel-in-progress: true

jobs:
  validate:
    name: Code Quality & Unit Tests
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout PR Branch
        uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Run ESLint
        run: pnpm lint

      - name: Run TypeScript Type Check
        run: pnpm typecheck

      - name: Run Unit Tests
        run: pnpm test
```

---

## 2. Enforcing Branch Protection Rules

To block merging when CI checks fail:

1. Navigate to **Repository Settings -> Branches -> Add branch protection rule** (or **Rulesets**).
2. Set Branch name pattern to `main`.
3. Check **Require status checks to pass before merging**.
4. Search and select your job name: `Code Quality & Unit Tests`.
5. Check **Require branches to be up to date before merging**.
6. Check **Do not allow bypassing the above settings**.
