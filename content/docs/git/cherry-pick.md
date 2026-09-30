---
title: "git cherry-pick — Applying Specific Commits"
description: "How to copy specific commits across branches using git cherry-pick: syntax, conflict handling, and backporting bugfixes."
category: git
topic: git
type: guide
level: intermediate
tags:
  - git
  - cherry-pick
  - branches
  - hotfix
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git cherry-pick` — Applying Specific Commits

**`git cherry-pick`** allows you to pick an individual commit from one branch and apply it to your current active branch as a new commit.

---

## 1. When to Use Cherry-Pick

- **Backporting Hotfixes**: You fixed a critical bug on `main`, and need to backport that exact patch into a legacy `v1.2-release` branch without merging other experimental `main` features.
- **Rescuing Work from Abandoned Branches**: A team member started a branch with one great utility function, but the rest of the branch was scrapped.

---

## 2. Syntax and Usage

```bash
# 1. Switch to target branch where you want the commit applied:
git switch release/v1.2

# 2. Cherry-pick the specific commit SHA:
git cherry-pick 7a8b901

# 3. Cherry-pick without creating a commit (stages changes only):
git cherry-pick -n 7a8b901
```

---

## 3. Resolving Cherry-Pick Conflicts

If changes conflict with the target branch:
1. Git pauses and highlights conflicting files in `git status`.
2. Open files and resolve conflict markers (`<<<<<<<` / `>>>>>>>`).
3. Stage resolved files: `git add <file>`.
4. Continue cherry-pick:
   ```bash
   git cherry-pick --continue
   ```
5. Or abort and return to original branch state:
   ```bash
   git cherry-pick --abort
   ```

---

## Related Topics

- [Merging Branches (git merge)](/docs/git/merge)
- [Rebasing Branches (git rebase)](/docs/git/rebase)
- [Resolving Merge Conflicts](/docs/git/merge-conflicts)
