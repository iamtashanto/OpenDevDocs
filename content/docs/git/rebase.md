---
title: "git rebase — Rewriting and Linearizing History"
description: "Mastering git rebase: standard rebase, interactive rebase (squash, reword, drop, edit), and the Golden Rule of Rebasing."
category: git
topic: git
type: guide
level: intermediate
tags:
  - git
  - rebase
  - interactive-rebase
  - linear-history
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git rebase` — Rewriting and Linearizing History

**`git rebase`** moves or reapplies a sequence of commits to a new base commit. Rebasing produces a completely linear, chronological commit history without cluttering your graph with unnecessary 3-way merge commits.

---

## 1. How Rebase Works

```
Before Rebase:
main ────► [C1] ──► [C2] ──► [C3]
            │
            └──► [C4] ──► [C5] (feature)

After 'git rebase main' on feature branch:
main ────► [C1] ──► [C2] ──► [C3] ──► [C4'] ──► [C5'] (feature)
```

Git temporarily removes your feature branch commits (`C4`, `C5`), fast-forwards your branch to the tip of `main` (`C3`), and then reapplies your commits one by one on top of `C3`.

---

## 2. Interactive Rebase (`git rebase -i`)

Interactive rebasing allows you to clean up, squash, reorder, or rename local commits before opening a pull request:

```bash
git rebase -i HEAD~3
```

Git opens your editor with a list of commits:
```text
pick 7a8b901 feat: add user model
pick 4c2d189 fix: typo in model name
pick 9e0f312 test: add model validation tests

# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# s, squash = meld into previous commit
# d, drop = remove commit
```

Change the second line from `pick` to `squash` to merge the typo fix directly into the feature commit!

---

## 3. The Golden Rule of Rebasing

<Callout type="danger" title="Never Rebase Public Shared Branches">
Rebasing creates brand new commit SHA hashes. **Never rebase commits that have already been pushed to a public shared branch like `main`**. Only rebase your own private local feature branches before merging.
</Callout>

---

## Related Topics

- [Merging Branches (git merge)](/docs/git/merge)
- [Git Non-Fast-Forward Push Troubleshooting](/errors/git/non-fast-forward)
- [Git Reflog](/docs/git/reflog)
