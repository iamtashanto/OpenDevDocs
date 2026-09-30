---
title: "git switch — Modern Branch Switching"
description: "How to switch branches cleanly in modern Git: creating and switching (-c), switching to existing branches, and why switch replaces checkout."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - switch
  - branches
  - modern-git
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git switch` — Modern Branch Switching

Introduced in Git 2.23, **`git switch`** is the dedicated, modern command designed specifically for switching and creating branches, replacing the overloaded legacy `git checkout` command.

---

## 1. Syntax and Basic Usage

```bash
# 1. Switch to an existing local branch:
git switch main

# 2. Create a new branch and switch to it immediately (-c):
git switch -c feat/dark-mode

# 3. Switch to a remote tracking branch from GitHub:
git switch feature-from-colleague

# 4. Switch back to the previous branch you were just on (-):
git switch -
```

---

## 2. Why `git switch` Replaced `git checkout`

Historically, `git checkout` was used for two completely unrelated tasks:
1. Switching branches (`git checkout main`)
2. Overwriting/discarding uncommitted file changes (`git checkout -- file.txt`)

This ambiguity caused developers to accidentally discard uncommitted work. Modern Git separated these responsibilities:
- **`git switch`**: Exclusively switches and creates branches.
- **`git restore`**: Exclusively discards and restores files.

---

## Related Topics

- [Git Branches Overview](/docs/git/branches)
- [Legacy Checkout (git checkout)](/docs/git/git-checkout)
- [Merging Branches (git merge)](/docs/git/merge)
