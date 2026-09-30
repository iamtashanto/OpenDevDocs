---
title: "GitHub Pull Requests (PRs)"
description: "The complete Pull Request workflow: branch creation, commits, opening PRs, review requests, draft PRs, and merge strategies."
category: git
topic: github
type: guide
level: beginner
tags:
  - github
  - pull-requests
  - pr
  - collaboration
  - code-review
platforms:
  - all
lastVerified: "2026-09-30"
---

# GitHub Pull Requests (PRs)

A **Pull Request (PR)** lets you notify team members about changes you've pushed to a branch in a repository on GitHub. Once a PR is opened, collaborators can review code, discuss proposed changes, run automated test suites (CI), and approve merging into `main`.

---

## 1. The Complete End-to-End PR Workflow

```
[ 1. Switch to main & pull ] ──► [ 2. Create feature branch ] ──► [ 3. Make commits ]
                                                                          │
[ 6. Merge & Delete branch ] ◄── [ 5. CI Passes & Approved ] ◄── [ 4. Push & Open PR ]
```

### Step 1: Create a Feature Branch
```bash
git switch main
git pull origin main
git switch -c feat/search-filter
```

### Step 2: Make and Commit Changes
```bash
git add .
git commit -m "feat: add technology filter tags to search API"
```

### Step 3: Push Branch to GitHub
```bash
git push -u origin feat/search-filter
```

### Step 4: Open Pull Request
Navigate to the repository on GitHub or use the GitHub CLI:
```bash
gh pr create --title "feat: add technology filter tags to search API" --body "Closes #84"
```

---

## 2. Draft Pull Requests

If your work is in progress and you want early design feedback or want to trigger CI checks without asking for formal reviews:
- Create the PR as a **Draft**.
- Draft PRs prevent accidental merges until you click **Ready for review**.

---

## 3. Merge Strategies on GitHub

When merging a PR, GitHub offers three options:
1. **Create a merge commit (`--no-ff`)**: Preserves the complete commit history and creates a merge commit.
2. **Squash and merge (`--squash`)**: Collapses all PR commits into a single atomic commit on `main`. Keeps main history linear and readable.
3. **Rebase and merge (`--rebase`)**: Re-applies individual commits on top of `main` without creating a merge commit.

---

## Related Topics

- [Code Review Best Practices](/docs/github/code-review)
- [Branch Protection Rules](/docs/github/branch-protection)
- [Open-Source Fork Workflow](/docs/github/fork-workflow)
- [GitHub CLI (gh)](/docs/github/github-cli)
