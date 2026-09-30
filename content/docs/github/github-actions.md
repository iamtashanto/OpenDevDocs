---
title: "Introduction to GitHub Actions CI/CD"
description: "Automating workflows with GitHub Actions: triggers (on push/pull_request), runners, jobs, steps, secrets, matrix testing, and caching."
category: git
topic: github
type: guide
level: intermediate
tags:
  - github
  - github-actions
  - cicd
  - automation
  - devops
platforms:
  - all
lastVerified: "2026-09-30"
---

# Introduction to GitHub Actions CI/CD

**GitHub Actions** is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipeline directly within your GitHub repository.

---

## 1. Core Architecture Concepts

```
[ Event Trigger ] (push, pull_request, schedule)
        │
        ▼
   [ Workflow ] (.github/workflows/ci.yml)
        │
        ▼
     [ Job ] (runs-on: ubuntu-latest)
        │
        ├─► [ Step 1: Checkout Repository ] (actions/checkout@v4)
        ├─► [ Step 2: Setup Node & Cache ] (actions/setup-node@v4)
        ├─► [ Step 3: Install Dependencies ] (run: pnpm install)
        └─► [ Step 4: Run Tests & Build ] (run: pnpm test && pnpm build)
```

---

## 2. Complete Production Workflow Example

Create a YAML file in `.github/workflows/ci.yml`:

```yaml
name: CI Validation Suite

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node.js 22 with Cache
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Validate Frontmatter Metadata
        run: pnpm validate-content

      - name: Typecheck
        run: pnpm typecheck

      - name: Run Linter
        run: pnpm lint

      - name: Build Next.js Production Bundle
        run: pnpm build
```

---

## 3. Managing Secrets

Never commit API keys or deployment passwords into workflow YAML files:
1. Go to **Settings** → **Secrets and variables** → **Actions**.
2. Click **New repository secret**.
3. Reference secrets securely in your workflow:
   ```yaml
   env:
     DATABASE_URL: ${{ secrets.DATABASE_URL }}
   ```

---

## Related Topics

- [YAML Configuration Fundamentals](/docs/fundamentals/yaml)
- [Branch Protection & Required Status Checks](/docs/github/branch-protection)
- [Dockerize Next.js App Recipe](/recipes/docker/dockerize-nextjs)
- [DevOps Engineer Roadmap](/roadmaps/devops/devops-roadmap)
