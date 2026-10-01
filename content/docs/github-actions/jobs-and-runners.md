---
title: "GitHub Actions Jobs & Runners"
description: "Master GitHub Actions jobs orchestration, GitHub-hosted and self-hosted runners, job dependencies with needs, and inter-job output passing."
category: devops
topic: github-actions
type: guide
level: intermediate
tags:
  - github-actions
  - jobs
  - runners
  - orchestration
  - devops
platforms:
  - all
tested:
  github-actions: "current"
lastVerified: "2026-10-01"
---

# GitHub Actions Jobs & Runners

A **Job** is a distinct set of steps executed inside an isolated virtual machine or container. By default, all jobs in a workflow run **in parallel**. You can control execution order and build dependency graphs using `needs`.

---

## 1. GitHub-Hosted vs Self-Hosted Runners

### GitHub-Hosted Runners
Maintained and updated by GitHub. Fresh virtual machine provisioned for each job execution:

| Label | Operating System | Architecture | Common Use Case |
| :--- | :--- | :--- | :--- |
| `ubuntu-latest` | Ubuntu Linux (Current LTS) | x86_64 | Standard backend, web apps, Docker builds |
| `ubuntu-24.04-arm` | Ubuntu Linux | ARM64 | Multi-arch image builds |
| `macos-latest` | macOS (Apple Silicon M-series) | ARM64 | iOS / macOS / React Native builds |
| `windows-latest` | Windows Server | x86_64 | .NET, Windows tooling |

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

### Self-Hosted Runners
Hosted on your own physical or cloud infrastructure (AWS EC2, Hetzner, Bare Metal):

```yaml
jobs:
  gpu-training:
    runs-on: [self-hosted, linux, x64, gpu]
```

---

## 2. Job Dependency Graph (`needs`)

By default, jobs execute concurrently. Use `needs:` to enforce a Directed Acyclic Graph (DAG) sequence:

```
┌──────────────┐
│  job: test   │
└──────┬───────┘
       │ (needs: test)
┌──────▼───────┐
│  job: build  │
└──────┬───────┘
       │ (needs: build)
┌──────▼───────┐
│  job: deploy │
└──────────────┘
```

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm build

  deploy:
    needs: [test, build]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying to production server..."
```

---

## 3. Passing Data Between Jobs (`outputs`)

Each job runs on an independent runner with an isolated filesystem. To pass strings, IDs, or version numbers between jobs, define job `outputs`:

```yaml
jobs:
  prepare:
    runs-on: ubuntu-latest
    outputs:
      build_version: ${{ steps.version_step.outputs.version }}
    steps:
      - id: version_step
        run: echo "version=1.4.2" >> "$GITHUB_OUTPUT"

  deploy:
    needs: prepare
    runs-on: ubuntu-latest
    steps:
      - name: Use output from prepare job
        run: echo "Deploying version ${{ needs.prepare.outputs.build_version }}"
```

---

## 4. Job Timeouts & Error Control

Always set realistic execution timeouts to prevent hung processes from consuming monthly billable minutes:

```yaml
jobs:
  integration-tests:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v4
      - name: Flaky smoke test (does not fail entire pipeline)
        run: pnpm test:smoke
        continue-on-error: true
```

---

## 5. Job Status Functions & Conditions

Control job execution conditionally:

```yaml
jobs:
  notify-slack-on-failure:
    needs: [test, build, deploy]
    if: failure() # Runs only if any upstream job failed
    runs-on: ubuntu-latest
    steps:
      - name: Send Alert
        run: echo "Pipeline failed on branch ${{ github.ref }}"
```
