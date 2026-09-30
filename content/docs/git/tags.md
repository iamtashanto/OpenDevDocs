---
title: "Git Tags & Semantic Versioning Releases"
description: "Creating and managing Git tags: lightweight vs annotated tags (-a), signing tags (-s), pushing tags to GitHub, and release management."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - tags
  - semver
  - releases
platforms:
  - all
lastVerified: "2026-09-30"
---

# Git Tags & Semantic Versioning Releases

**Git tags** are permanent reference markers pointing to specific points in repository history. Tags are universally used to mark release milestones (e.g. `v1.0.0`, `v2.4.1`) following Semantic Versioning.

---

## 1. Lightweight vs. Annotated Tags

| Type | Syntax | Stored Data | Best Used For |
| :--- | :--- | :--- | :--- |
| **Lightweight** | `git tag v1.0.0` | Just a pointer to a commit SHA | Temporary personal bookmarks |
| **Annotated** | `git tag -a v1.0.0 -m "Release v1.0.0"` | Full object: tagger name, email, date, GPG signature, and release notes | **Production releases & public milestones** |

---

## 2. Managing Tags

```bash
# 1. Create an annotated release tag:
git tag -a v1.0.0 -m "Release version 1.0.0 with Error Library"

# 2. Tag a past historical commit:
git tag -a v0.9.0 39efcea -m "Release v0.9.0"

# 3. List all tags:
git tag -l

# 4. Show tag details and associated commit:
git show v1.0.0

# 5. Delete a local tag:
git tag -d v1.0.0
```

---

## 3. Pushing Tags to Remote (GitHub)

By default, `git push` does **not** transfer tags to remote servers:

```bash
# Push a specific tag:
git push origin v1.0.0

# Push ALL local tags to remote at once:
git push origin --tags

# Delete a tag from remote server:
git push --delete origin v1.0.0
```

---

## Related Topics

- [GitHub Releases & Assets](/docs/github/releases)
- [Semantic Versioning in Package Managers](/docs/fundamentals/package-managers)
- [Git Commit History](/docs/git/git-commit)
