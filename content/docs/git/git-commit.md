---
title: "git commit — Creating Permanent Snapshots"
description: "Creating commits in Git: writing semantic commit messages, amending the previous commit (--amend), atomic commits, and commit hashes (SHA-1)."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - commit
  - conventional-commits
  - history
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git commit` — Creating Permanent Snapshots

The **`git commit`** command captures a permanent snapshot of the currently staged changes. Each commit receives a unique cryptographic SHA-1/SHA-256 hash that references its parent commits, author identity, timestamp, and message.

---

## 1. Syntax and Basic Usage

```bash
# 1. Commit with inline message flag (-m):
git commit -m "feat: add dark mode theme toggle to site header"

# 2. Open default text editor for multi-line commit messages:
git commit

# 3. Stage all modified tracked files and commit in one step (-am):
git commit -am "fix: resolve mobile responsive padding overflow"
```

---

## 2. Writing Semantic / Conventional Commits

Adopting **Conventional Commits** (`type(scope): message`) makes repository history clean, searchable, and machine-readable for automated changelogs:

| Prefix | Meaning | Example |
| :--- | :--- | :--- |
| **`feat:`** | A new user-facing feature | `feat: implement user registration with JWT` |
| **`fix:`** | A bug fix | `fix: prevent race condition in event loop` |
| **`docs:`** | Documentation updates only | `docs: add troubleshooting steps for EADDRINUSE` |
| **`refactor:`** | Code restructuring without feature or bug change | `refactor: extract reusable Button component` |
| **`chore:`** | Maintenance, dependencies, build scripts | `chore: upgrade Next.js to v16.3.8` |
| **`test:`** | Adding or fixing test suites | `test: add unit tests for date formatter` |

---

## 3. Amending the Last Commit (`--amend`)

If you just made a commit but forgot to include a file, or made a typo in the commit message:

```bash
# 1. Stage the forgotten file:
git add forgotten-file.ts

# 2. Amend into the previous commit:
git commit --amend --no-edit

# Or edit the commit message:
git commit --amend -m "feat: correct commit message title"
```

<Callout type="warning" title="Never Amend Public Commits">
Amending alters the commit SHA hash. Never amend a commit that has already been pushed to a shared remote branch (`origin/main`).
</Callout>

---

## Related Topics

- [Git Status](/docs/git/git-status)
- [Git Log History Inspection](/docs/git/git-log)
- [Git Reset & Undoing Mistakes](/docs/git/reset)
