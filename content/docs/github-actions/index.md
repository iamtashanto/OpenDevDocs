---
title: "GitHub Actions Overview & CI/CD Fundamentals"
description: "Introduction to GitHub Actions — the native automation, continuous integration, and continuous delivery platform built into GitHub."
category: devops
topic: github-actions
type: guide
level: beginner
tags:
  - github-actions
  - ci-cd
  - devops
  - automation
  - workflows
platforms:
  - all
tested:
  github-actions: "current"
lastVerified: "2026-10-01"
---

# GitHub Actions Overview & CI/CD Fundamentals

**GitHub Actions** is a continuous integration and continuous delivery (CI/CD) platform that allows you to automate your build, test, and deployment pipelines directly from your GitHub repository.

---

## 1. What is CI/CD?

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   Continuous    │       │   Continuous    │       │   Continuous    │
│   Integration   │ ───►  │    Delivery     │ ───►  │   Deployment    │
│ (Test & Lint)   │       │ (Build Release) │       │ (Push to Prod)  │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

1. **Continuous Integration (CI)**: Automatically tests, lints, and compiles code whenever a developer opens a pull request or pushes commits, detecting bugs before code merges to `main`.
2. **Continuous Delivery (CD)**: Automatically packages the validated code into deployable release artifacts (Docker images, tarballs, npm packages).
3. **Continuous Deployment**: Automatically deploys new releases to staging or production infrastructure (VPS, Kubernetes, Vercel, AWS).

---

## 2. Core Components of GitHub Actions

```
[ Event: push to main ]
          │
          ▼
┌─────────────────────────────────────────┐
│       Workflow (.github/workflows/)     │
│  ┌───────────────────────────────────┐  │
│  │ Job 1: Lint & Typecheck (Ubuntu)  │  │
│  │   ├── Step 1: actions/checkout    │  │
│  │   ├── Step 2: actions/setup-node  │  │
│  │   └── Step 3: pnpm lint           │  │
│  └─────────────────┬─────────────────┘  │
│                    │ (needs: job 1)     │
│  ┌─────────────────▼─────────────────┐  │
│  │ Job 2: Production Build & Deploy  │  │
│  │   ├── Step 1: pnpm build          │  │
│  │   └── Step 2: Deploy to Server    │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

- **Workflow**: Automated YAML process stored in `.github/workflows/`.
- **Event**: A specific activity that triggers the workflow (e.g. `push`, `pull_request`, `schedule`).
- **Job**: A set of steps executed sequentially on the same runner machine. Jobs run in parallel by default unless linked with `needs:`.
- **Step**: An individual task that can run shell commands or invoke a reusable action.
- **Action**: A reusable application extension from the GitHub Marketplace or your private repo.
- **Runner**: A virtual machine hosted by GitHub (`ubuntu-latest`, `macos-latest`, `windows-latest`) or self-hosted in your cloud.

---

## Related Topics

- [Workflow Syntax & Structure](/docs/github-actions/workflow-syntax)
- [Events & Triggers](/docs/github-actions/events-and-triggers)
- [Practical Workflows](/docs/github-actions/practical-workflows)
