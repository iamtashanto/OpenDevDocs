---
title: "git init — Initializing a New Repository"
description: "How to initialize a brand new Git repository: creating the .git directory, specifying initial branch names, and best practices."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - init
  - repository
  - commands
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git init` — Initializing a New Repository

The **`git init`** command creates a new, empty Git repository or reinitializes an existing one. It creates the hidden `.git` directory containing all necessary metadata.

---

## 1. Syntax and Basic Usage

```bash
# 1. Navigate to your project root folder:
cd /path/to/my-project

# 2. Initialize Git:
git init
```

Output:
```text
Initialized empty Git repository in /path/to/my-project/.git/
```

---

## 2. Specifying the Default Branch Name

To guarantee the primary branch is named `main` (the modern standard) rather than legacy `master`:

```bash
git init --initial-branch=main
# or short flag:
git init -b main
```

---

## 3. What to Do Immediately After `git init`

1. **Create a `.gitignore` file** before staging any files:
   ```bash
   echo "node_modules/\n.env*\ndist/" > .gitignore
   ```
2. **Stage your files**:
   ```bash
   git add .
   ```
3. **Make your initial commit**:
   ```bash
   git commit -m "chore: initial commit"
   ```

---

## Related Topics

- [Git Status Command](/docs/git/git-status)
- [Git Add & Staging Area](/docs/git/git-add)
- [Git Commit & History](/docs/git/git-commit)
- [Configuring .gitignore](/docs/git/gitignore)
