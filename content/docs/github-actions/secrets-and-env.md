---
title: "GitHub Actions Secrets & Environment Variables"
description: "Securely manage credentials, repository secrets, environment variables, automatic GITHUB_TOKEN, and prevent credential exposure in CI/CD."
category: devops
topic: github-actions
type: guide
level: intermediate
tags:
  - github-actions
  - secrets
  - environment-variables
  - security
  - devops
platforms:
  - all
tested:
  github-actions: "current"
lastVerified: "2026-10-01"
---

# GitHub Actions Secrets & Environment Variables

Managing sensitive tokens, API credentials, and environment-specific configurations securely is essential for production CI/CD pipelines.

---

## 1. Secrets vs Environment Variables

| Feature | Environment Variables (`env`) | Encrypted Secrets (`secrets`) |
| :--- | :--- | :--- |
| **Visibility** | Plain text in workflow files or UI settings | Encrypted at rest, never visible in UI once saved |
| **Log Masking** | Displayed in raw terminal build logs | Automatically redacted as `***` in build logs |
| **Best Used For** | Non-sensitive config: `NODE_ENV`, `PORT`, `REGION` | API keys, SSH keys, registry tokens, database passwords |

---

## 2. Defining & Accessing Encrypted Secrets

Secrets are configured in **Repository Settings -> Secrets and variables -> Actions**.

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Cloud Provider
        # ALWAYS pass secrets as environment variables to the step
        env:
          API_KEY: ${{ secrets.PROD_API_KEY }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          ./scripts/deploy.sh
```

> [!CAUTION]
> **Never interpolate secrets directly into shell command strings:**
> 
> ❌ **Vulnerable to injection & process table leaks**:
> ```yaml
> run: curl -H "Authorization: Bearer ${{ secrets.TOKEN }}" https://api.example.com
> ```
> 
> ✅ **Safe pattern (passed via step env)**:
> ```yaml
> env:
>   AUTH_TOKEN: ${{ secrets.TOKEN }}
> run: curl -H "Authorization: Bearer $AUTH_TOKEN" https://api.example.com
> ```

---

## 3. Automatic `GITHUB_TOKEN`

GitHub automatically provisions a short-lived installation token for every workflow run: `${{ secrets.GITHUB_TOKEN }}`.

```yaml
jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - name: Create Release
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: gh release create v1.0.0 --generate-notes
```

---

## 4. Environment Variable Scopes

Environment variables can be declared at three different hierarchy levels:

```yaml
# 1. Workflow Scope: Available to all jobs & all steps
env:
  GLOBAL_REGION: us-east-1

jobs:
  build:
    runs-on: ubuntu-latest
    # 2. Job Scope: Available to all steps in this job
    env:
      BUILD_TARGET: serverless

    steps:
      # 3. Step Scope: Available only within this single step
      - name: Compile
        env:
          NODE_ENV: production
        run: |
          echo "Region: $GLOBAL_REGION"
          echo "Target: $BUILD_TARGET"
          echo "Node Env: $NODE_ENV"
```

---

## 5. Built-in Runner Environment Variables

GitHub provides default environment variables on every runner:

- `CI`: Always set to `true`.
- `GITHUB_WORKSPACE`: The default working directory for steps (`/home/runner/work/repo/repo`).
- `GITHUB_SHA`: The commit SHA that triggered the workflow run.
- `GITHUB_REF`: The git ref that triggered the run (e.g. `refs/heads/main` or `refs/pull/42/merge`).
- `GITHUB_ACTOR`: The username of the user who initiated the workflow.
- `RUNNER_TEMP`: The temporary directory on the runner for scratch files.
