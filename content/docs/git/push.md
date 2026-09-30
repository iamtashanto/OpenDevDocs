---
title: "git push — Uploading Local Commits to Remotes"
description: "Uploading commits with git push: upstream tracking (-u), safe force pushes (--force-with-lease), and resolving non-fast-forward rejections."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - push
  - remotes
  - force-push
  - safety
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git push` — Uploading Local Commits to Remotes

The **`git push`** command uploads local branch commits to the corresponding remote repository on GitHub or a Git server.

---

## 1. Syntax and Upstream Tracking (`-u`)

When pushing a newly created branch for the very first time, use the **`-u` (set-upstream)** flag to link your local branch to the remote branch:

```bash
# 1. First push of a new feature branch:
git push -u origin feat/user-auth

# 2. Subsequent pushes on this branch (upstream is saved):
git push
```

---

## 2. Safe Force Pushing (`--force-with-lease`)

If you used `git rebase` or `git commit --amend` on your local feature branch, Git will reject normal `git push` because commit SHA hashes diverged.

<Callout type="danger" title="Never Use Blind 'git push --force'">
`git push --force` blindly overwrites the remote branch, permanently destroying any commits pushed by colleagues.
</Callout>

### Always Use `--force-with-lease`:
`--force-with-lease` checks if anyone else has updated the remote branch before overriding it. If new commits were pushed by a teammate, Git will abort and protect their work:

```bash
git push --force-with-lease origin feat/user-auth
```

---

## Related Topics

- [Git Non-Fast-Forward Troubleshooting](/errors/git/non-fast-forward)
- [Remote Repositories](/docs/git/remote-repositories)
- [Pulling Remote Updates (git pull)](/docs/git/pull)
