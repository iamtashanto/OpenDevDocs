---
title: "Configuring .gitignore"
description: "How .gitignore works: glob patterns, ignoring node_modules and .env secrets, untracking previously committed files, and global gitignore."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - gitignore
  - configuration
  - secrets
  - security
platforms:
  - all
lastVerified: "2026-09-30"
---

# Configuring .gitignore

A **`.gitignore`** file specifies intentionally untracked files that Git should ignore. Files already tracked by Git are not affected.

---

## 1. Standard Production `.gitignore` Template (Node/Next.js)

```text
# Dependencies
node_modules/
.pnpm-store/

# Local Environment & Secrets
.env
.env*.local
*.pem
*.key

# Build outputs
.next/
dist/
out/
build/

# OS and Editor metadata
.DS_Store
Thumbs.db
.vscode/*
!.vscode/settings.json
!.vscode/launch.json
```

---

## 2. `.gitignore` Pattern Syntax

| Pattern | Behavior | Example |
| :--- | :--- | :--- |
| `filename` | Ignores file anywhere in repository | `secret.key` |
| `/dir/` | Ignores directory relative to location of `.gitignore` | `/dist/` |
| `*.log` | Glob wildcard matching all `.log` files | `debug.log`, `app.log` |
| `!important.log` | **Negation**: Tracks `important.log` even if `*.log` was ignored | `!important.log` |
| `logs/**/err.txt` | Recursively matches nested directories | `logs/2026/09/err.txt` |

---

## 3. Untracking Files Already Committed to Git

If a sensitive file or `node_modules/` was committed to Git before you added it to `.gitignore`, Git will continue tracking it until you remove it from the index:

```bash
# Remove from Git index while preserving file on local disk:
git rm --cached sensitive-config.json

# Or untrack an entire directory:
git rm -r --cached node_modules/

# Commit the removal:
git commit -m "chore: remove tracked node_modules from Git index"
```

---

## Related Topics

- [Environment Variables & Secrets](/docs/fundamentals/environment-variables)
- [Git Add & Staging Area](/docs/git/git-add)
- [Git Repositories](/docs/git/repositories)
