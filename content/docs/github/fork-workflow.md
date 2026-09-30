---
title: "The Open-Source Fork Workflow"
description: "Contributing to open-source via forks: forking on GitHub, configuring upstream remotes, syncing main, and opening cross-repo pull requests."
category: git
topic: github
type: guide
level: beginner
tags:
  - github
  - fork
  - open-source
  - contribution
  - remotes
platforms:
  - all
lastVerified: "2026-09-30"
---

# The Open-Source Fork Workflow

When contributing to open-source repositories where you do not have direct push access, the standard model is the **Fork Workflow**.

---

## 1. Step-by-Step Fork Contribution Workflow

```
[ Upstream Repo (iamtashanto/OpenDevDocs) ]
                     │ (Fork on GitHub)
                     ▼
[ Your Remote Fork (yourname/OpenDevDocs) ]
                     │ (git clone)
                     ▼
[ Your Local Machine (Working Tree) ]
```

### Step 1: Fork on GitHub
Navigate to the target repository (e.g. `github.com/iamtashanto/OpenDevDocs`) and click the **Fork** button in the top right.

### Step 2: Clone Your Fork Locally
```bash
git clone git@github.com:yourname/OpenDevDocs.git
cd OpenDevDocs
```

### Step 3: Add the Upstream Remote
Configure a connection to the original parent repository so you can pull future updates:

```bash
git remote add upstream https://github.com/iamtashanto/OpenDevDocs.git

# Verify remotes:
git remote -v
# origin   git@github.com:yourname/OpenDevDocs.git (push/fetch)
# upstream https://github.com/iamtashanto/OpenDevDocs.git (fetch)
```

### Step 4: Keep Your Fork Synced with Upstream
Before starting new work, pull the latest changes from the upstream main branch:

```bash
git switch main
git pull --rebase upstream main
git push origin main
```

### Step 5: Create a Branch, Commit, and Open PR
```bash
git switch -c docs/add-css-grid
# ... edit markdown files ...
git add .
git commit -m "docs: add comprehensive CSS grid guide"
git push -u origin docs/add-css-grid
```
Go to GitHub to open a Pull Request from `yourname/OpenDevDocs:docs/add-css-grid` to `iamtashanto/OpenDevDocs:main`.

---

## Related Topics

- [GitHub Pull Requests](/docs/github/pull-requests)
- [Remote Repositories](/docs/git/remote-repositories)
- [Git Branches](/docs/git/branches)
