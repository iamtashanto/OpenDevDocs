---
title: "Remote Repositories (git remote)"
description: "Managing remote repository connections: adding origin and upstream, inspecting remote URLs (git remote -v), renaming, and removing remotes."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - remotes
  - origin
  - upstream
  - github
platforms:
  - all
lastVerified: "2026-09-30"
---

# Remote Repositories (git remote)

A **remote repository** is a version of your project hosted on the internet or a network server (such as GitHub). Connecting local repositories to remotes allows you to push code, fetch team updates, and collaborate.

---

## 1. Viewing Remotes

```bash
# List remote aliases:
git remote

# List remote aliases with complete fetch/push URLs (-v):
git remote -v
```

Example output:
```text
origin  git@github.com:iamtashanto/OpenDevDocs.git (fetch)
origin  git@github.com:iamtashanto/OpenDevDocs.git (push)
```

---

## 2. Adding and Managing Remotes

```bash
# 1. Add primary remote (typically named 'origin'):
git remote add origin git@github.com:iamtashanto/OpenDevDocs.git

# 2. Add upstream remote when working on an open-source fork:
git remote add upstream git@github.com:original-owner/OpenDevDocs.git

# 3. Change remote URL (e.g. switching from HTTPS to SSH):
git remote set-url origin git@github.com:iamtashanto/OpenDevDocs.git

# 4. Rename remote alias:
git remote rename origin staging-origin

# 5. Remove a remote connection:
git remote remove upstream
```

---

## 3. Remote Tracking Branches

Branches starting with `origin/` (e.g. `origin/main`, `origin/feat-auth`) are **remote-tracking branches**. They act as local bookmarks reflecting the state of branches on the remote server the last time you ran `git fetch`.

---

## Related Topics

- [Fetching Updates (git fetch)](/docs/git/fetch)
- [Pulling Remote Changes (git pull)](/docs/git/pull)
- [Pushing to Remotes (git push)](/docs/git/push)
- [GitHub Fork Workflow](/docs/github/fork-workflow)
