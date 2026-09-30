---
title: "git add — Staging Working Tree Changes"
description: "How to stage changes in Git: git add ., staging specific files, interactive patch staging (git add -p), and unstaging files."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - add
  - staging
  - patch
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git add` — Staging Working Tree Changes

The **`git add`** command adds changes in your working directory to the staging area (the index). It tells Git that you want to include updates to a particular file in the next commit snapshot.

---

## 1. Common Staging Commands

```bash
# 1. Stage a specific individual file:
git add src/components/Header.tsx

# 2. Stage multiple files:
git add package.json pnpm-lock.yaml

# 3. Stage all modified, deleted, and new files in the entire project:
git add .
# or:
git add -A
```

---

## 2. Interactive Patch Staging (`git add -p`)

When you have modified multiple parts of a single file but only want to commit some of the changes, use interactive patch staging:

```bash
git add -p src/utils/format.ts
```

Git splits the file into visual diff chunks ("hunks") and prompts you for each hunk:
- **`y`**: Stage this hunk.
- **`n`**: Do not stage this hunk.
- **`s`**: Split the hunk into smaller hunks.
- **`q`**: Quit interactive staging.

---

## 3. Unstaging Files (`git restore --staged`)

If you accidentally staged a file that you do not want in the upcoming commit:

```bash
# Unstage a specific file (preserves disk changes):
git restore --staged sensitive-config.json

# Unstage all currently staged files:
git restore --staged .
```

---

## Related Topics

- [Git Status Command](/docs/git/git-status)
- [Git Commit](/docs/git/git-commit)
- [Git Diff Inspection](/docs/git/git-diff)
- [Configuring .gitignore](/docs/git/gitignore)
