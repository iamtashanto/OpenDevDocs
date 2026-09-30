---
title: "git revert — Safe Public History Reversal"
description: "How to safely undo commits on shared public branches: creating inverse inverse-diff commits, revert vs reset differences, and reverting merge commits."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - revert
  - undo
  - safety
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git revert` — Safe Public History Reversal

Unlike `git reset` (which rewrites history by erasing commits), **`git revert`** creates a **new commit that applies the exact inverse diff** of an unwanted past commit.

---

## 1. Why `git revert` is Safe for Shared Branches

```
History before revert:
[C1] ──► [C2 (Introduced Bug)] ──► [C3]

After 'git revert C2':
[C1] ──► [C2 (Bug)] ──► [C3] ──► [C4 (Revert "Introduced Bug")]
```

Because `git revert` only moves history forward by adding a new commit, team members who pull the repository will not encounter diverged history or non-fast-forward push errors.

---

## 2. Syntax and Basic Usage

```bash
# 1. Revert the most recent commit:
git revert HEAD

# 2. Revert a specific commit SHA hash without prompting for editor:
git revert 7a8b901 --no-edit

# 3. Revert multiple commits:
git revert 7a8b901..9f012a4
```

---

## 3. `git revert` vs. `git reset`

| Feature | `git revert` | `git reset` |
| :--- | :--- | :--- |
| **History modification** | Appends a new inverse commit (Forward-only) | Rewinds branch pointer backwards |
| **Safe on shared branches (`main`)** | ✅ **Yes (Safe)** | ❌ **No (Causes divergence)** |
| **Erases commit from history** | ❌ No (Record remains) | ✅ Yes |

---

## Related Topics

- [Undoing Commits with git reset](/docs/git/reset)
- [Undoing Mistakes in Git](/docs/git/undoing-mistakes)
- [Git Non-Fast-Forward Push Troubleshooting](/errors/git/non-fast-forward)
