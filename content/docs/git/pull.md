---
title: "git pull — Fetching and Merging Remote Updates"
description: "How git pull works: git fetch + git merge combination, rebase pulls (git pull --rebase), fast-forward only, and preventing unwanted merge commits."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - pull
  - fetch
  - rebase
  - remotes
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git pull` — Fetching and Merging Remote Updates

The **`git pull`** command is shorthand for two consecutive actions:
1. `git fetch` (download new commits from remote)
2. `git merge` (or `git rebase`) to integrate them into your current local branch.

```
git pull = git fetch + git merge (or git rebase)
```

---

## 1. Syntax and Basic Usage

```bash
# Pull changes from default upstream remote branch:
git pull

# Explicitly pull from remote branch:
git pull origin main
```

---

## 2. Rebase Pull (`git pull --rebase`) — Best Practice

By default, running `git pull` when local and remote branches have diverged generates a messy 3-way merge commit ("Merge branch 'main' of github.com...").

Using `--rebase` keeps your local commit history completely clean and linear by replaying your local commits on top of incoming remote updates:

```bash
git pull --rebase origin main
```

### Configure Rebase as Global Default:
```bash
git config --global pull.rebase true
```

---

## 3. Fast-Forward Only Pull (`--ff-only`)

If you want `git pull` to fail immediately rather than creating an unexpected merge commit when history diverges:

```bash
git pull --ff-only origin main
```

---

## Related Topics

- [Fetching Updates (git fetch)](/docs/git/fetch)
- [Pushing to Remotes (git push)](/docs/git/push)
- [Git Non-Fast-Forward Push Troubleshooting](/errors/git/non-fast-forward)
- [Resolving Merge Conflicts](/docs/git/merge-conflicts)
