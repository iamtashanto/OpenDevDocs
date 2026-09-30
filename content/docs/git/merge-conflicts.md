---
title: "Resolving Git Merge Conflicts"
description: "Step-by-step guide to resolving merge conflicts: conflict markers (<<<<<<<, =======, >>>>>>>), 3-way merge tools, and preventing conflicts."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - merge-conflicts
  - conflicts
  - troubleshooting
platforms:
  - all
lastVerified: "2026-09-30"
---

# Resolving Git Merge Conflicts

A **merge conflict** occurs when two branches modify the exact same lines of code in different ways, and Git cannot automatically determine which version to keep.

---

## 1. Anatomy of a Merge Conflict

When a conflict occurs, Git pauses the merge and inserts visual **conflict markers** into the affected files:

```text
<<<<<<< HEAD (Current Branch: e.g. main)
const API_URL = "https://api.prod.example.com";
=======
const API_URL = "https://api.staging.example.com";
>>>>>>> feature/new-api (Incoming Branch)
```

- **`<<<<<<< HEAD`**: Start of the conflict. Contains code from your currently checked-out branch.
- **`=======`**: The divider between conflicting versions.
- **`>>>>>>> <branch>`**: End of the conflict. Contains code from the branch being merged in.

---

## 2. Step-by-Step Resolution Process

1. **Locate Conflicted Files**:
   ```bash
   git status
   # Look for files listed under "Unmerged paths" (Both modified)
   ```
2. **Open and Edit**: Open the file in your code editor (e.g. VS Code with built-in conflict resolver buttons). Delete the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) and combine the code properly.
3. **Stage the Resolved Files**:
   ```bash
   git add src/config.ts
   ```
4. **Complete the Merge Commit**:
   ```bash
   git commit -m "merge: resolve API URL configuration conflict"
   ```

---

## 3. Aborting a Merge

If a conflict is too tangled and you want to safely abort and return to your original state before running `git merge`:

```bash
git merge --abort
```

---

## Related Topics

- [Merging Branches (git merge)](/docs/git/merge)
- [Rebasing Branches (git rebase)](/docs/git/rebase)
- [Git Non-Fast-Forward Troubleshooting](/errors/git/non-fast-forward)
- [Undoing Mistakes in Git](/docs/git/undoing-mistakes)
