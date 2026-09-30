---
title: "git log — Inspecting Commit History"
description: "Viewing repository history with git log: formatted oneline logs, commit graphs (--graph), author filtering, and file history inspection."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - log
  - history
  - graph
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git log` — Inspecting Commit History

The **`git log`** command displays committed snapshots in reverse chronological order, starting from the most recent commit on the current branch.

---

## 1. Useful Formatted Output Commands

### 1. Compact One-Line View (`--oneline`)
```bash
git log --oneline -n 10
```

Output:
```text
39efcea feat: implement error library, practical recipes, and developer roadmaps
a18b432 chore: add content validation script
f9012c8 feat: initialize Fumadocs architecture
```

### 2. Beautiful Visual Commit Graph (`--graph`)
```bash
git log --graph --oneline --decorate --all
```

Output:
```text
* 39efcea (HEAD -> main, origin/main) feat: implement roadmaps
*   7b30129 Merge pull request #4 from feature/auth
|\  
| * 2a8f901 feat: add JWT session verification
|/  
* 819c902 chore: update dependencies
```

---

## 2. Filtering History

```bash
# Filter by author name/email:
git log --author="Alex" --oneline

# Filter by commit message content (grep):
git log --grep="PostgreSQL" --oneline

# Show only commits affecting a specific file:
git log -p content/docs/git/git-log.md

# Show commits within a date range:
git log --since="2026-09-01" --until="2026-09-30"
```

---

## Related Topics

- [Git Diff](/docs/git/git-diff)
- [Git Reflog (Safety Net)](/docs/git/reflog)
- [Git Blame Reference](/commands/git/clone-repository)
