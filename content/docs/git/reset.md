---
title: "git reset — Undoing Commits Locally"
description: "Mastering git reset: soft vs mixed vs hard resets, moving HEAD pointers, rescuing lost commits via reflog, and dangerous pitfalls."
category: git
topic: git
type: guide
level: intermediate
tags:
  - git
  - reset
  - undo
  - danger
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git reset` — Undoing Commits Locally

The **`git reset`** command moves the current branch `HEAD` pointer backward to a specified commit. It is used to undo local commits, unstage files, or completely wipe local changes.

---

## 1. Comparing the Three Reset Modes

```
                    ┌─────────────────────────┐
                    │   git reset <commit>    │
                    └────────────┬────────────┘
                                 │
     ┌───────────────────────────┼───────────────────────────┐
     ▼                           ▼                           ▼
[ --soft ]                  [ --mixed ]                 [ --hard ]
Moves HEAD pointer only.    Moves HEAD + unstages.      Moves HEAD + wipes staging
Preserves staged index      Keeps changes on disk       + PERMANENTLY DESTROYS
and working disk files.     in working directory.       uncommitted disk changes.
```

| Mode | Moves `HEAD`? | Updates Staging Area (Index)? | Modifies Working Tree (Disk)? | Risk Level |
| :--- | :--- | :--- | :--- | :--- |
| **`--soft`** | ✅ Yes | ❌ No (Preserved) | ❌ No (Preserved) | Safe |
| **`--mixed`** *(default)* | ✅ Yes | ✅ Yes (Unstages) | ❌ No (Preserved) | Safe |
| **`--hard`** | ✅ Yes | ✅ Yes (Wiped) | ⚠️ **Yes (WIPED)** | **Dangerous** |

---

## 2. Practical Examples

### 1. Undo Last Commit but Keep All Code Staged (`--soft`):
```bash
git reset --soft HEAD~1
```

### 2. Unstage All Files without Losing Changes (`--mixed`):
```bash
git reset HEAD
```

### 3. Completely Discard All Local Commits & Changes (`--hard`):
```bash
git reset --hard origin/main
```

<Callout type="danger" title="Warning: --hard Destroys Uncommitted Work">
Running `git reset --hard` will permanently delete uncommitted modifications from your hard drive. There is no trash bin. Always run `git status` or `git stash` before executing a hard reset.
</Callout>

---

## Related Topics

- [Safe History Reversal with git revert](/docs/git/revert)
- [Git Reflog Safety Net](/docs/git/reflog)
- [Undoing Mistakes in Git](/docs/git/undoing-mistakes)
