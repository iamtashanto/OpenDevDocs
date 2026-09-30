---
title: "Introduction to Git Version Control"
description: "Understanding Git: distributed version control vs centralized systems, snapshots vs deltas, and the three-tree architecture."
category: git
topic: git
type: concept
level: beginner
tags:
  - git
  - vcs
  - version-control
  - collaboration
  - fundamentals
platforms:
  - all
lastVerified: "2026-09-30"
---

# Introduction to Git Version Control

**Git** is a free and open-source **Distributed Version Control System (DVCS)** created by Linus Torvalds in 2005. It tracks changes in source code files over time, allowing multiple developers to collaborate without overwriting each other's work.

---

## 1. Centralized vs. Distributed Version Control

- **Centralized VCS (SVN, Perforce)**: Relies on a single central server. If the server goes offline or the network drops, developers cannot commit or view project history.
- **Distributed VCS (Git)**: Every developer clones a **full copy** of the repository, including its entire historical commit graph, onto their local machine. Full operations (committing, branching, diffing, logging) occur offline.

---

## 2. The Git Mental Model: Snapshots, Not Deltas

Unlike older version control systems that store file changes as differences/deltas, Git records a **snapshot of the entire project filesystem** at every commit:

```
Version 1 ──► [ File A ] [ File B ] [ File C ]
                   │          │          │
Version 2 ──► [ File A1] [ File B ] [ File C1] (File B unchanged -> stores reference)
                   │          │          │
Version 3 ──► [ File A1] [ File B1] [ File C2]
```

If a file has not changed, Git does not store it again; it stores a pointer linking back to the identical file blob already stored.

---

## 3. The Three Sections of a Git Project

Git manages files across three local states:

```
┌───────────────────────────┐
│     WORKING DIRECTORY     │  (Files currently visible on your disk)
└─────────────┬─────────────┘
              │  git add
              ▼
┌───────────────────────────┐
│       STAGING AREA        │  (Index: snapshot prepared for next commit)
└─────────────┬─────────────┘
              │  git commit
              ▼
┌───────────────────────────┐
│      LOCAL REPOSITORY     │  (.git directory: permanently stored commit history)
└───────────────────────────┘
```

---

## Related Topics

- [Git Installation & Setup](/docs/git/installation)
- [Git Global Configuration](/docs/git/configuration)
- [Git Initializing & Cloning](/docs/git/git-init)
