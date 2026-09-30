---
title: "git merge — Combining Branch Histories"
description: "How to merge branches in Git: Fast-Forward merges, 3-way merge commits (--no-ff), squash merging (--squash), and resolving divergence."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - merge
  - fast-forward
  - branches
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git merge` — Combining Branch Histories

The **`git merge`** command integrates independent lines of development from another branch into your currently active branch.

---

## 1. Fast-Forward vs. 3-Way Merge

### 1. Fast-Forward Merge
If the target branch has not diverged (no new commits on `main` since `feature` was branched), Git simply moves the `main` branch pointer forward:

```
Before:
main ────────► [C1] ──► [C2]
                         └──► [C3] ──► [C4] (feature)

After 'git merge feature' (Fast-forward):
main ────────────────────────► [C3] ──► [C4] (main, feature)
```

### 2. 3-Way Merge Commit (`--no-ff`)
If both `main` and `feature` have new commits, Git creates a new **merge commit** with two parent commits:

```
          ┌──► [C3] ──► [C4] (feature) ──┐
          │                              ▼
[C1] ──► [C2] ──────────────────────► [C5 (Merge Commit)] (main)
```

---

## 2. Standard Merging Workflow

```bash
# 1. Switch to the receiving branch (usually main):
git switch main

# 2. Pull the latest remote updates:
git pull origin main

# 3. Merge the feature branch:
git merge feature/auth

# 4. Push the merged main branch:
git push origin main
```

---

## 3. Squash Merging (`--squash`)

Squash merging collapses all commits from a feature branch into a single clean commit on `main`:

```bash
git switch main
git merge --squash feature/auth
git commit -m "feat: implement user authentication flow"
```

---

## Related Topics

- [Git Merge Branch Command Reference](/commands/git/merge-branch)
- [Resolving Merge Conflicts](/docs/git/merge-conflicts)
- [Rebasing Branches (git rebase)](/docs/git/rebase)
