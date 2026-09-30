---
title: "git diff — Inspecting File Changes"
description: "Comparing changes in Git: working directory vs staging area, staged changes (--staged), comparing commits, and comparing branches."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - diff
  - staging
  - inspection
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git diff` — Inspecting File Changes

The **`git diff`** command computes and displays changes between files in your working directory, the staging area, historical commits, or distinct Git branches.

---

## 1. Core Comparison Commands

| Command | Compares What? |
| :--- | :--- |
| **`git diff`** | Unstaged changes in working directory vs. Staging Area (the index). |
| **`git diff --staged`** (or `--cached`) | Staged changes in the index vs. the last commit (`HEAD`). |
| **`git diff HEAD`** | ALL changes (staged + unstaged) vs. the last commit. |
| **`git diff commitA..commitB`** | Differences between two specific commit SHA hashes. |
| **`git diff main..feature-branch`** | Differences between the tips of two branches. |

---

## 2. Reading Git Diff Output

```diff
diff --git a/app/page.tsx b/app/page.tsx
index 8a34bc1..9f8012e 100644
--- a/app/page.tsx
+++ b/app/page.tsx
@@ -12,4 +12,4 @@ export default function Page() {
-  const title = "Docs";
+  const title = "OpenDevDocs";
```

- **`--- a/app/page.tsx`**: Original version of the file.
- **`+++ b/app/page.tsx`**: New modified version.
- **`@@ -12,4 +12,4 @@`**: Line numbers and range modified in original vs. new file.
- **`-` (Red)**: Deleted lines.
- **`+` (Green)**: Added lines.

---

## 3. Comparing Specific Files or Summary

```bash
# Compare only a single file:
git diff src/components/Header.tsx

# Word-level diff rather than line-level diff:
git diff --word-diff

# Show summary of modified files and inserted/deleted line counts:
git diff --stat
```

---

## Related Topics

- [Git Status](/docs/git/git-status)
- [Git Add & Staging Area](/docs/git/git-add)
- [Git Merge Conflicts](/docs/git/merge-conflicts)
