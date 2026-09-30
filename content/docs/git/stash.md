---
title: "git stash — Temporarily Shelving Changes"
description: "How to stash uncommitted changes: git stash save, git stash pop, stashing untracked files (-u), viewing stash lists, and dropping stashes."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - stash
  - working-tree
  - workflow
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git stash` — Temporarily Shelving Changes

The **`git stash`** command takes your uncommitted changes (both staged and unstaged) and saves them onto a dirty working directory stack, reverting your working tree back to a clean state matching the last commit (`HEAD`).

---

## 1. When to Use `git stash`

Use `git stash` when you are in the middle of writing a feature and need to immediately switch branches to fix an urgent bug without creating an incomplete "work in progress" commit.

---

## 2. Common Stash Commands

```bash
# 1. Save all tracked changes with an optional descriptive message:
git stash push -m "WIP: dark mode styling"

# 2. Include untracked files in the stash (-u):
git stash -u

# 3. View the list of saved stashes:
git stash list

# 4. Apply the most recent stash and remove it from the stack:
git stash pop

# 5. Apply a specific stash from the list without removing it:
git stash apply stash@{1}

# 6. Delete a specific stash:
git stash drop stash@{0}

# 7. Clear all saved stashes completely:
git stash clear
```

---

## Related Topics

- [Git Status](/docs/git/git-status)
- [Modern Branch Switching (git switch)](/docs/git/git-switch)
- [Undoing Mistakes in Git](/docs/git/undoing-mistakes)
