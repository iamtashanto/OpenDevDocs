---
title: "GitHub Actions Events & Workflow Triggers"
description: "Comprehensive guide to triggering GitHub Actions workflows with push, pull_request, schedule cron jobs, manual workflow_dispatch, and path filters."
category: devops
topic: github-actions
type: guide
level: beginner
tags:
  - github-actions
  - events
  - triggers
  - cron
  - webhooks
platforms:
  - all
tested:
  github-actions: "current"
lastVerified: "2026-10-01"
---

# GitHub Actions Events & Workflow Triggers

Workflows execute in response to specific GitHub events. You configure triggers using the `on` keyword in your workflow YAML file.

---

## 1. Common Event Triggers

### 1.1 Push Events
Triggers when commits are pushed to branches or git tags:

```yaml
on:
  push:
    branches:
      - main
      - 'release/**'
    tags:
      - 'v*.*.*'
    paths:
      - 'src/**'
      - 'package.json'
      - 'pnpm-lock.yaml'
```

### 1.2 Pull Request Events
Triggers when pull requests target specific branches:

```yaml
on:
  pull_request:
    types:
      - opened
      - synchronize
      - reopened
      - ready_for_review
    branches:
      - main
```

> [!TIP]
> By default, `pull_request` triggers on `opened`, `synchronize` (new commit pushed to PR branch), and `reopened`. If you use draft PRs, adding `ready_for_review` ensures checks run when converted to ready.

---

## 2. Scheduled Cron Triggers

You can run workflows on a recurring schedule using POSIX cron syntax in UTC time:

```yaml
on:
  schedule:
    # Runs at 02:00 UTC every Monday through Friday
    - cron: '0 2 * * 1-5'
```

### Cron Syntax Format
```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12 or JAN-DEC)
│ │ │ │ ┌───────────── day of the week (0 - 6 or SUN-SAT)
│ │ │ │ │
* * * * *
```

---

## 3. Manual Triggers (`workflow_dispatch`)

`workflow_dispatch` adds a "Run workflow" button in the GitHub Actions UI and supports custom parameterized inputs:

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deployment target environment'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production
      dry_run:
        description: 'Perform dry run without modifying resources'
        required: false
        default: true
        type: boolean
```

Access input parameters in your job steps via `${{ inputs.<name> }}`:

```yaml
steps:
  - name: Execute Deploy
    run: |
      echo "Deploying to ${{ inputs.environment }}"
      echo "Dry run mode: ${{ inputs.dry_run }}"
```

---

## 4. Path Filtering (`paths` & `paths-ignore`)

Avoid executing costly CI jobs when only non-code files (like documentation or markdown) change:

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'apps/**'
      - 'packages/**'
      - 'package.json'
      - 'pnpm-lock.yaml'
```

Or conversely, ignore specific paths:

```yaml
on:
  pull_request:
    paths-ignore:
      - 'docs/**'
      - '**.md'
      - '.gitignore'
      - 'LICENSE'
```

---

## 5. Multiple Combined Triggers

You can combine multiple events within a single workflow:

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * 0' # Weekly health check
```
