---
title: "git reset --soft"
description: Undo recent commits while preserving all modified files in the staging area (index).
category: git
topic: git
type: reference
level: intermediate
tags:
  - git
  - reset
  - commits
  - staging
platforms:
  - all
tested:
  git: "2.44+"
lastVerified: "2026-09-30"
---

## Command

<Command>git reset --soft HEAD~1</Command>

---

## Short Description

`git reset --soft` moves the current branch `HEAD` pointer backward to a specified commit without touching your working tree or the staging area (index). All file changes from the undone commits remain **staged** and ready for a new commit.

---

## Syntax

```bash
git reset --soft <commit-reference>
```

### Parameters

- `<commit-reference>`: Target commit hash, branch name, or relative reference (e.g. `HEAD~1` for the parent commit, `HEAD~3` to undo the last 3 commits).

---

## Examples

### 1. Undo Last Commit to Fix Commit Message or Staged Files

```bash
# Undo the last commit; changes stay staged in index
git reset --soft HEAD~1

# Make additional edits or re-stage
git add .

# Re-commit with a cleaner message
git commit -m "feat(auth): complete OAuth2 flow with token refresh"
```

### 2. Squash Multiple Local Commits into One

```bash
# Move HEAD back 3 commits
git reset --soft HEAD~3

# All changes from the 3 commits are now staged together
git commit -m "feat(payment): implement Stripe checkout integration"
```

---

## Detailed Explanation: What Happens Under the Hood?

Git tracks state across three trees:

```
[ Working Directory ] <───> [ Staging Area (Index) ] <───> [ Commit History (HEAD) ]
```

When you run `git reset --soft HEAD~1`:
1. **HEAD Pointer**: Moves back by 1 commit.
2. **Staging Area (Index)**: **Unchanged** (contains the exact file diffs from the undone commit).
3. **Working Directory**: **Unchanged** (no files on disk are modified or deleted).

---

## Comparison of Git Reset Modes

| Reset Mode | Moves HEAD | Updates Index (Staging) | Updates Working Tree (Disk) | Safe for Unsaved Work? |
| :--- | :--- | :--- | :--- | :--- |
| **`--soft`** | ✅ Yes | ❌ No (stays staged) | ❌ No (files untouched) | ✅ **100% Safe** |
| **`--mixed`** (default) | ✅ Yes | ✅ Yes (unstaged) | ❌ No (files untouched) | ✅ **Safe** |
| **`--hard`** | ✅ Yes | ✅ Yes (cleared) | ✅ Yes (**overwrites disk**) | ⚠️ **Destructive** |

---

## Common Options & Flags

| Flag | Description |
| :--- | :--- |
| `--soft` | Keeps all modified files staged in the index. |
| `--mixed` | Default behavior. Unstages changes but leaves files modified in working tree. |
| `--hard` | Discards all changes in both the staging area and working directory. |
| `-q`, `--quiet` | Suppresses summary output. |

---

## When to Use

- When you committed too early and want to add more changes to the same logical commit.
- When you want to squash several micro-commits before opening a pull request.
- When you want to change the author, date, or commit structure of recent unpushed commits.

---

## Warnings & Risks

<Warning title="Do Not Reset Pushed Public Commits">
Never run `git reset` on commits that have already been pushed to a shared branch (e.g., `main` or `develop`). Resetting pushed commits rewrites Git history and will cause synchronization conflicts for your teammates. Use `git revert <commit>` for public history instead.
</Warning>

---

## Related Commands

- `git commit --amend` — Quickly edit the previous commit message without resetting.
- `git reset --mixed HEAD~1` — Undo commit and unstage changes.
- `git revert <hash>` — Create a new inverse commit that safely cancels out a past commit.
- `git reflog` — Recover commits if you accidentally reset to the wrong commit reference.

---

## Related Documentation

- [Git Command Reference](/commands/git/git-commands)
- [Git Merge Conflicts Troubleshooting](/errors)
