---
title: "Git Repositories & The .git Directory"
description: "Understanding Git repositories: local vs remote, the internal .git folder structure (objects, refs, HEAD, config), and bare repositories."
category: git
topic: git
type: concept
level: beginner
tags:
  - git
  - repositories
  - git-internals
  - architecture
platforms:
  - all
lastVerified: "2026-09-30"
---

# Git Repositories & The .git Directory

A **Git repository (repo)** is a directory containing your project source code along with a hidden subfolder called **`.git`** that stores the entire metadata and object history database for the project.

---

## 1. What's Inside the `.git` Directory?

If you list hidden files with `ls -la .git`, you will see Git's internal plumbing:

```
.git/
├── HEAD         # Pointer to the currently checked-out branch / commit
├── config       # Local repository configuration settings
├── index        # The binary staging area cache (between working tree & commit)
├── objects/     # Content-addressable object store (blobs, trees, commits, tags)
├── refs/        # Pointers to local branches (heads/), tags, and remote tracking branches
└── hooks/       # Client-side and server-side automation scripts (pre-commit, pre-push)
```

---

## 2. Standard vs. Bare Repositories

- **Standard Repository**: Contains the `.git` metadata folder alongside the visible working files on your hard drive. Used by developers for daily editing and coding.
- **Bare Repository (`--bare`)**: Contains **only** the `.git` metadata directory without any checked-out working files. Used as remote centralized hubs on servers (e.g. GitHub servers, private Git servers) where direct file editing does not occur.

---

## Related Topics

- [Initializing a Repository (git init)](/docs/git/git-init)
- [Cloning Remote Repositories (git clone)](/docs/git/git-clone)
- [Git Status & Working Tree Lifecycle](/docs/git/git-status)
