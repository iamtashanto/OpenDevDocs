---
title: "git status — Checking Working Tree State"
description: "Mastering git status: tracked vs untracked files, staged vs unstaged modifications, short format (-s), and branch sync status."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - status
  - working-tree
  - staging
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git status` — Checking Working Tree State

The **`git status`** command displays the state of the working directory and the staging area. It shows which changes have been staged, which haven't, and which files aren't being tracked by Git.

---

## 1. Reading Standard Output

```bash
git status
```

Example output:
```text
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   content/docs/git/git-status.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   package.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	scratch-notes.txt
```

### Key Sections:
1. **Changes to be committed (Staged)**: In the index, ready to become part of the next `git commit`.
2. **Changes not staged for commit (Unstaged)**: Tracked files with local modifications not yet added to the index.
3. **Untracked files**: New files created on disk that Git is not yet tracking.

---

## 2. Short / Compact Status (`-s` or `-sb`)

For a clean, concise overview of modified files:

```bash
git status -s
```

Output:
```text
M  package.json      # Staged modification (Green M)
 M app/layout.tsx    # Unstaged modification (Red M)
MM src/index.ts      # Modified both staged and unstaged
A  new-file.ts       # Added / Staged (Green A)
?? notes.txt         # Untracked (Red ??)
```

---

## Related Topics

- [Git Add & Staging Area](/docs/git/git-add)
- [Git Commit](/docs/git/git-commit)
- [Git Diff Inspection](/docs/git/git-diff)
