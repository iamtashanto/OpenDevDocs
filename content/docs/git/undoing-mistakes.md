---
title: "Undoing Mistakes in Git"
description: "Comprehensive emergency guide for undoing Git mistakes: uncommitted edits, accidental commits, wrong branch commits, and recovering deleted files."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - undo
  - troubleshooting
  - restore
  - reset
platforms:
  - all
lastVerified: "2026-09-30"
---

# Undoing Mistakes in Git

A practical emergency decision tree for undoing common Git mistakes without losing work.

---

## 1. The Emergency Decision Matrix

| What happened? | How to fix it | Command |
| :--- | :--- | :--- |
| **I made local changes to a file and want to throw them away** | Discard unstaged changes in working tree | `git restore <file>` |
| **I accidentally ran `git add` on a file** | Unstage file without losing changes | `git restore --staged <file>` |
| **I made a commit locally and want to undo it** | Undo commit, keep changes staged | `git reset --soft HEAD~1` |
| **I committed with a typo in the message** | Amend the commit message | `git commit --amend -m "new msg"` |
| **I committed to `main` instead of a feature branch** | Create new branch, rewind `main` | `git branch feat/my-work && git reset --hard origin/main` |
| **I accidentally deleted a file** | Restore file from last commit | `git restore <deleted-file>` |
| **I ran `git reset --hard` and lost commits** | Find lost commit in reflog | `git reflog` then `git reset --hard <SHA>` |
| **I already pushed a buggy commit to `origin/main`** | Safely revert public commit | `git revert <SHA>` then `git push` |

---

## 2. Moving Commits to the Correct Branch

If you committed directly to `main` when you should have created a feature branch:

```bash
# 1. Create a new branch pointing at your current commit:
git branch feat/awesome-feature

# 2. Reset local main back to the remote origin/main:
git reset --hard origin/main

# 3. Switch to your newly created branch:
git switch feat/awesome-feature
```

---

## Related Topics

- [Git Reset Overview](/docs/git/reset)
- [Git Revert](/docs/git/revert)
- [Git Reflog Safety Net](/docs/git/reflog)
- [Git Non-Fast-Forward Push Fix](/errors/git/non-fast-forward)
