---
title: "GitHub Branch Protection Rules"
description: "Protecting production branches: requiring pull request reviews, requiring status checks (CI), preventing force pushes, and repository governance."
category: git
topic: github
type: guide
level: intermediate
tags:
  - github
  - branch-protection
  - rulesets
  - security
  - ci-cd
platforms:
  - all
lastVerified: "2026-09-30"
---

# GitHub Branch Protection Rules

**Branch Protection Rules** (and GitHub Repository Rulesets) safeguard your critical branches (such as `main` and `release/*`) against accidental deletion, unreviewed code pushes, and failing builds.

---

## 1. Essential Protection Settings for `main`

Navigate to **Settings** → **Branches** (or **Rulesets**) and configure the following rules for `main`:

### 1. Require a Pull Request Before Merging
- Disallows anyone (including admins) from pushing directly to `main` via `git push origin main`.
- **Require approvals**: Set to at least 1 or 2 approving reviews.
- **Dismiss stale pull request approvals**: Automatically dismisses approvals whenever new commits are pushed to the PR.

### 2. Require Status Checks to Pass Before Merging
- Blocks merging until automated CI test suites (e.g. `pnpm validate-content`, `pnpm test`, `next build`) succeed.
- **Require branches to be up to date before merging**: Ensures the PR was tested against the latest tip of `main`.

### 3. Block Force Pushes & Deletions
- Completely disables `git push --force` on `main`, preventing accidental destruction of repository history.

---

## 2. CODEOWNERS File

You can automatically assign specific team members or engineers as required reviewers when files in specific folders are modified:

```text
# .github/CODEOWNERS

# Global default owners:
* @iamtashanto

# Backend database changes require backend lead review:
/prisma/ @iamtashanto/backend-team

# Documentation changes require docs team review:
/content/ @iamtashanto/docs-team
```

---

## Related Topics

- [Pull Requests Workflow](/docs/github/pull-requests)
- [Code Review Standards](/docs/github/code-review)
- [GitHub Actions CI Automation](/docs/github/github-actions)
