---
title: "GitHub Issues & Project Tracking"
description: "Managing project tasks with GitHub Issues: bug reports, feature requests, issue templates, labels, milestones, and closing issues via commits."
category: git
topic: github
type: guide
level: beginner
tags:
  - github
  - issues
  - tracking
  - project-management
  - open-source
platforms:
  - all
lastVerified: "2026-09-30"
---

# GitHub Issues & Project Tracking

**GitHub Issues** track ideas, bugs, enhancements, and tasks across a project codebase.

---

## 1. Anatomy of a Great Issue

When filing a bug report or feature proposal, provide structured context:

1. **Descriptive Title**: Clear and actionable (e.g. `[Bug]: TypeError thrown on invalid JSON in route handler`).
2. **Steps to Reproduce**: Minimal step-by-step instructions.
3. **Expected vs. Actual Behavior**: What should happen vs. what actually occurred.
4. **Environment Context**: OS, Node.js version, browser, framework version.
5. **Stack Trace / Screenshots**: Full error logs or visual recordings.

---

## 2. Linking and Auto-Closing Issues via Commits & PRs

You can automatically close an open issue when a Pull Request is merged into `main` by including special keywords in your commit message or PR description:

```markdown
Closes #42
Fixes #108
Resolves #215
```

Supported keywords: `close`, `closes`, `closed`, `fix`, `fixes`, `fixed`, `resolve`, `resolves`, `resolved`.

---

## 3. Labels and Milestones

- **Labels**: Categorize issues by type (`bug`, `documentation`, `good first issue`, `help wanted`).
- **Milestones**: Group related issues and pull requests towards a scheduled release target (e.g. `v2.0-beta`).

---

## Related Topics

- [Pull Requests Workflow](/docs/github/pull-requests)
- [Code Review Standards](/docs/github/code-review)
- [GitHub CLI Commands](/docs/github/github-cli)
