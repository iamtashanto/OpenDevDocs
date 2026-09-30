---
title: "git checkout — Legacy Branch & Commit Inspection"
description: "Understanding legacy git checkout: checking out commits (detached HEAD state), legacy branch switching (-b), and modern replacements."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - checkout
  - detached-head
  - history
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git checkout` — Legacy Branch & Commit Inspection

While modern Git uses `git switch` and `git restore`, **`git checkout`** remains widely used for inspecting historical commits in **Detached HEAD state**.

---

## 1. Traditional Branch Switching with `checkout`

```bash
# Switch to existing branch:
git checkout main

# Create and switch to new branch (-b):
git checkout -b feat/user-auth
```

---

## 2. Inspecting Historical Commits (Detached HEAD)

You can check out any historical commit SHA hash to inspect or build older states of your application:

```bash
git checkout 39efcea
```

Output:
```text
Note: switching to '39efcea'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches.
```

### What is "Detached HEAD"?
Normally, `HEAD` points to a named branch pointer (e.g. `main`), which moves forward with each commit. In detached HEAD state, `HEAD` points directly to a raw commit SHA. Any new commits made in detached HEAD will be lost when you switch back to `main` unless you create a branch:

```bash
# Save detached HEAD experiments into a named branch:
git switch -c my-saved-experiment

# Or return safely to main:
git switch main
```

---

## Related Topics

- [Modern Branch Switching (git switch)](/docs/git/git-switch)
- [Git Branches Overview](/docs/git/branches)
- [Git Log History Inspection](/docs/git/git-log)
