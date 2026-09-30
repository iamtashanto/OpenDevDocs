---
title: "Git Branches & Branching Strategies"
description: "Understanding Git branches: lightweight movable pointers, branch creation, listing, deleting, trunk-based development, and GitHub flow."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - branches
  - workflows
  - branching-strategies
platforms:
  - all
lastVerified: "2026-09-30"
---

# Git Branches & Branching Strategies

In Git, a **branch** is simply a lightweight, movable pointer to a commit. Unlike other VCS tools that copy entire directories to make a branch, creating and switching branches in Git is instantaneous.

---

## 1. How Git Branches Work Internally

```
Commit 1 ──► Commit 2 ──► Commit 3 (main)
                               │
                               └──► Commit 4 ──► Commit 5 (feature/auth) [HEAD]
```

When you create a branch named `feature/auth`, Git creates a 41-byte text file in `.git/refs/heads/feature/auth` containing the 40-character SHA hash of the target commit.

---

## 2. Managing Branches (`git branch`)

```bash
# 1. List all local branches (* marks currently active branch):
git branch

# 2. List all local and remote tracking branches (-a):
git branch -a

# 3. Create a new branch without switching to it:
git branch feature/payment

# 4. Rename current branch:
git branch -m new-branch-name

# 5. Delete a merged branch safely (-d):
git branch -d feature/payment

# 6. Force delete an unmerged branch (-D):
git branch -D feature/experimental
```

---

## 3. Recommended Branching Workflow (GitHub Flow)

1. **`main`**: The single production-ready branch. Always deployable.
2. **Feature Branches**: Created directly from `main` (e.g. `feat/user-auth`, `fix/login-bug`).
3. **Pull Request**: Open a PR from your feature branch to `main` for code review and automated CI checks.
4. **Merge & Delete**: Once approved, merge into `main` and delete the feature branch.

---

## Related Topics

- [Switching Branches (git switch)](/docs/git/git-switch)
- [Legacy Checkout (git checkout)](/docs/git/git-checkout)
- [Merging Branches (git merge)](/docs/git/merge)
- [Rebasing Branches (git rebase)](/docs/git/rebase)
