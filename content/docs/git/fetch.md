---
title: "git fetch — Downloading Remote Updates Safely"
description: "How git fetch works: downloading commits and refs without modifying your local working tree, fetch vs pull, and pruning deleted branches (--prune)."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - fetch
  - remotes
  - prune
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git fetch` — Downloading Remote Updates Safely

**`git fetch`** downloads commits, files, and refs from a remote repository into your local `.git` database, updating remote-tracking branches (`origin/main`) **without touching or modifying your local working tree files**.

---

## 1. Why `git fetch` is 100% Safe

Unlike `git pull`, `git fetch` never causes merge conflicts or overwrites uncommitted local code:

```
[ Remote GitHub Repository ]
          │
          ▼ git fetch
[ Local Remote-Tracking Branches (origin/main) ]
          │ (You inspect changes with 'git log origin/main')
          ▼ git merge origin/main
[ Local Working Tree & Branch (main) ]
```

---

## 2. Common Fetch Commands

```bash
# 1. Fetch from default remote (origin):
git fetch origin

# 2. Fetch all remotes and branches:
git fetch --all

# 3. Fetch and clean up local references to deleted remote branches (--prune):
git fetch --prune
```

---

## 3. Inspecting Changes After Fetching

```bash
# Compare your local branch against the freshly fetched remote branch:
git log HEAD..origin/main --oneline

# View diff of incoming changes before merging:
git diff main..origin/main
```

---

## Related Topics

- [Pulling Remote Changes (git pull)](/docs/git/pull)
- [Remote Repositories](/docs/git/remote-repositories)
- [Pushing to Remotes (git push)](/docs/git/push)
