---
title: "GitHub Actions Steps & Actions"
description: "Master steps, shell command execution, marketplace actions, step outputs, GITHUB_ENV, GITHUB_OUTPUT, GITHUB_STEP_SUMMARY, and reusable composite actions."
category: devops
topic: github-actions
type: guide
level: intermediate
tags:
  - github-actions
  - steps
  - actions
  - composite-actions
  - automation
platforms:
  - all
tested:
  github-actions: "current"
lastVerified: "2026-10-01"
---

# GitHub Actions Steps & Actions

A **Step** is an individual task within a job. Steps execute sequentially in order on the same runner and share the local workspace filesystem.

---

## 1. Running Shell Commands (`run`)

The `run` keyword executes shell scripts directly on the runner:

```yaml
steps:
  - name: Single line command
    run: pnpm test

  - name: Multi-line bash script
    shell: bash
    working-directory: ./packages/api
    run: |
      echo "Current working directory: $(pwd)"
      pnpm build
      pnpm test:e2e
```

---

## 2. Using Pre-built Actions (`uses`)

The `uses` keyword invokes a reusable action published to GitHub Marketplace or stored locally:

```yaml
steps:
  # Reference by version tag
  - name: Checkout Code
    uses: actions/checkout@v4

  # Reference with configuration parameters (with)
  - name: Setup Node.js Runtime
    uses: actions/setup-node@v4
    with:
      node-version: 22
      cache: 'pnpm'

  # Security Best Practice: Reference by immutable commit SHA
  - name: Setup Secure Action
    uses: actions/checkout@b4ffde65f46336ab851534e0da3b0bc18a105b33 # v4.1.1
```

---

## 3. GitHub Environment Files

GitHub Actions provides special environment files to write outputs, set dynamic environment variables, and build Markdown step summaries.

### 3.1 Step Outputs (`$GITHUB_OUTPUT`)
Pass data to subsequent steps:

```yaml
steps:
  - name: Generate Build Metadata
    id: meta
    run: |
      GIT_HASH=$(git rev-parse --short HEAD)
      echo "sha=$GIT_HASH" >> "$GITHUB_OUTPUT"

  - name: Consume Output
    run: |
      echo "Built from SHA: ${{ steps.meta.outputs.sha }}"
```

### 3.2 Dynamic Environment Variables (`$GITHUB_ENV`)
Export variables for all remaining steps in the job:

```yaml
steps:
  - name: Set Release Tag
    run: echo "APP_VERSION=2.4.0" >> "$GITHUB_ENV"

  - name: Use Variable
    run: echo "Target Version: $APP_VERSION"
```

### 3.3 Rich Step Summaries (`$GITHUB_STEP_SUMMARY`)
Render markdown directly onto the Actions workflow run summary page:

```yaml
steps:
  - name: Post Job Summary
    run: |
      echo "### Build Complete 🚀" >> "$GITHUB_STEP_SUMMARY"
      echo "| Package | Status |" >> "$GITHUB_STEP_SUMMARY"
      echo "| :--- | :--- |" >> "$GITHUB_STEP_SUMMARY"
      echo "| Web Client | ✅ Pass |" >> "$GITHUB_STEP_SUMMARY"
      echo "| API Server | ✅ Pass |" >> "$GITHUB_STEP_SUMMARY"
```

---

## 4. Reusable Composite Actions

Create local composite actions in `.github/actions/setup-project/action.yml` to eliminate duplicated setup steps across multiple workflows:

```yaml
# .github/actions/setup-project/action.yml
name: 'Setup Node and PNPM'
description: 'Installs PNPM and Node.js with caching'
inputs:
  node-version:
    description: 'Node version'
    required: false
    default: '22'

runs:
  using: 'composite'
  steps:
    - uses: pnpm/action-setup@v4
      with:
        version: 10
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}
        cache: 'pnpm'
    - shell: bash
      run: pnpm install --frozen-lockfile
```

Invoke this composite action from any workflow:

```yaml
# .github/workflows/ci.yml
steps:
  - uses: actions/checkout@v4
  - name: Run Composite Setup
    uses: ./.github/actions/setup-project
    with:
      node-version: '22'
  - run: pnpm build
```
