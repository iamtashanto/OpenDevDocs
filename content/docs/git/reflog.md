---
title: "git reflog — The Developer Safety Net"
description: "How to rescue lost commits and branches with git reflog: reference logs, recovering from accidental git reset --hard, and recovering deleted branches."
category: git
topic: git
type: guide
level: intermediate
tags:
  - git
  - reflog
  - recovery
  - rescue
  - safety
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git reflog` — The Developer Safety Net

**`git reflog` (Reference Logs)** is Git's ultimate safety net. It records every single update to the `HEAD` pointer on your local machine—including commits, branch switches, resets, and rebases.

Even if you run `git reset --hard` and think you destroyed your commits, the commits still exist in the Git object store for at least 30 to 90 days.

---

## 1. Viewing the Reference Log

```bash
git reflog
```

Output:
```text
39efcea (HEAD -> main) HEAD@{0}: reset: moving to 39efcea
8a1b2c3 HEAD@{1}: commit: feat: awesome feature that got deleted
7b4c901 HEAD@{2}: checkout: moving from feat/auth to main
```

Every entry shows:
- Commit SHA hash (`8a1b2c3`)
- `HEAD@{n}` index (how many moves ago it occurred)
- Action description

---

## 2. Rescuing Lost Commits

If you accidentally wiped `feat: awesome feature` with a hard reset:

1. Run `git reflog` to locate the lost commit hash (`8a1b2c3`).
2. Point your current branch back to that commit, or create a new branch from it:
   ```bash
   # Option A (Recommended): Create a new rescue branch at that commit
   git branch rescued-work 8a1b2c3

   # Option B: Reset your current branch directly back to that state
   git reset --hard 8a1b2c3
   ```

<Callout type="warning">
Option A (`git branch rescued-work <hash>`) is safer than Option B because it does not discard uncommitted working directory changes. If you use Option B (`git reset --hard`), ensure you have stashed or committed any active working tree modifications first.
</Callout>

---

## Related Topics

- [Undoing Commits with git reset](/docs/git/reset)
- [Undoing Mistakes in Git](/docs/git/undoing-mistakes)
- [Git Commit History](/docs/git/git-log)
