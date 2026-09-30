---
title: "GitHub CLI (gh) Command Reference"
description: "Mastering the official GitHub command line tool: gh auth, gh repo clone, gh pr create, gh issue list, and gh workflow run."
category: git
topic: github
type: guide
level: beginner
tags:
  - github
  - gh
  - cli
  - terminal
  - automation
platforms:
  - all
lastVerified: "2026-09-30"
---

# GitHub CLI (`gh`) Command Reference

The **GitHub CLI (`gh`)** brings pull requests, issues, GitHub Actions, and repository management directly into your terminal.

---

## 1. Installation & Authentication

```bash
# Install via Homebrew (macOS/Linux):
brew install gh

# Authenticate your terminal with GitHub:
gh auth login
```

---

## 2. Essential `gh` Commands Cheat Sheet

### Managing Pull Requests
```bash
# 1. Create a pull request interactively from current branch:
gh pr create --web

# 2. View active pull requests:
gh pr list

# 3. Check out a colleague's PR locally:
gh pr checkout 42

# 4. Review, approve, and comment on a PR from terminal:
gh pr review 42 --approve -b "LGTM!"

# 5. Merge PR automatically when CI passes:
gh pr merge 42 --squash --delete-branch
```

### Managing Issues
```bash
# Create a new issue:
gh issue create --title "Fix broken CORS header" --body "Details..."

# List open issues:
gh issue list
```

### Managing GitHub Actions Workflows
```bash
# View recent workflow execution status:
gh run list

# View live log output of a running CI job:
gh run watch
```

---

## Related Topics

- [GitHub Pull Requests](/docs/github/pull-requests)
- [GitHub Actions Introduction](/docs/github/github-actions)
- [Git Configuration](/docs/git/configuration)
