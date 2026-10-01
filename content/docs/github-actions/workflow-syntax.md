---
title: "GitHub Actions Workflow Syntax & Structure"
description: "Master the structure of GitHub Actions YAML files — anatomy of workflows, jobs, steps, runners, context variables, and default configuration."
category: devops
topic: github-actions
type: guide
level: beginner
tags:
  - github-actions
  - yaml
  - workflows
  - syntax
  - automation
platforms:
  - all
tested:
  github-actions: "current"
lastVerified: "2026-10-01"
---

# GitHub Actions Workflow Syntax & Structure

GitHub Actions workflows are defined in YAML files located inside the `.github/workflows/` directory at the root of your Git repository. Every workflow file must follow a declarative schema consisting of triggers, jobs, and execution steps.

---

## 1. Directory Structure

Workflows must reside in `.github/workflows/`. You can have multiple independent workflow files:

```
.github/
└── workflows/
    ├── ci.yml               # Runs on Pull Requests
    ├── release.yml          # Runs on Git tag push
    ├── deploy-prod.yml      # Runs on merge to main
    └── scheduled-audit.yml  # Runs every night via cron
```

---

## 2. Complete Workflow Anatomy

Below is a breakdown of the top-level keys in a workflow file:

```yaml
# 1. Friendly Name shown in the GitHub Actions UI tab
name: Production CI Pipeline

# 2. Event Triggers: When this workflow should run
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

# 3. Security: Explicit Least-Privilege Permissions
permissions:
  contents: read

# 4. Global Environment Variables
env:
  NODE_ENV: production
  CI: true

# 5. Global Defaults
defaults:
  run:
    shell: bash

# 6. Concurrency control (cancels superseded in-flight builds)
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

# 7. Job Definitions
jobs:
  validate:
    name: Lint & Typecheck
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout repository code
        uses: actions/checkout@v4

      - name: Setup Node.js runtime
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run linter
        run: pnpm lint

      - name: Run TypeScript type check
        run: pnpm typecheck
```

---

## 3. Key Hierarchy & Definitions

| Top-Level Key | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Workflow title displayed in the GitHub Actions dashboard. |
| `on` | Map / List | Event(s) that trigger the workflow (e.g., `push`, `pull_request`). |
| `permissions` | Map / String | Sets token scopes granted to `GITHUB_TOKEN`. |
| `env` | Map | Key-value pairs available as environment variables to all jobs. |
| `concurrency` | Map | Ensures only one workflow run executes per branch or ref at a time. |
| `jobs` | Map | Container for one or more parallel/sequential execution units. |

---

## 4. Contexts & Expressions

GitHub Actions provides expressions `${{ <expression> }}` to dynamically evaluate variables and context data:

```yaml
steps:
  - name: Print Commit SHA and Branch
    run: |
      echo "Commit SHA: ${{ github.sha }}"
      echo "Triggering Actor: ${{ github.actor }}"
      echo "Event Name: ${{ github.event_name }}"
      echo "Current Ref: ${{ github.ref }}"
```

### Essential Context Objects

- `github`: Metadata about the workflow run, actor, commit SHA, event payload, and repository.
- `env`: Environment variables set in the workflow or job.
- `secrets`: Encrypted secrets stored in GitHub Settings.
- `matrix`: Parameters for the current matrix execution instance.
- `steps`: Outputs and completion status of previous steps in the job.
- `runner`: Information about the machine running the job (`runner.os`, `runner.temp`).

---

## 5. Summary Checklist

- [x] Workflows must be saved inside `.github/workflows/*.yml`.
- [x] Always declare a top-level `permissions:` block.
- [x] Configure `concurrency` with `cancel-in-progress: true` on PR workflows to save runner minutes.
- [x] Set explicit `timeout-minutes:` on all jobs to prevent runaway build charges.
