---
title: "Git Configuration (git config)"
description: "Setting up user name, email, default branch (main), core editor, credential helper, and global vs local configuration scopes."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - config
  - setup
  - author
  - editor
platforms:
  - all
lastVerified: "2026-09-30"
---

# Git Configuration (git config)

Before making your first commit, you must configure your identity. Git embeds your author name and email into every commit you create.

---

## 1. Setting User Identity

```bash
# Set your display name:
git config --global user.name "Your Name"

# Set your email (must match your GitHub registered email):
git config --global user.email "your.email@example.com"
```

---

## 2. Essential Recommended Defaults

```bash
# Set default initial branch name to 'main':
git config --global init.defaultBranch main

# Set default text editor (e.g. VS Code, nano, or vim):
git config --global core.editor "code --wait"

# Configure pull behavior to prevent merge commits by default:
git config --global pull.rebase true

# Enable automatic colored CLI output:
git config --global color.ui auto
```

---

## 3. Configuration Scopes

| Scope | Flag | Config File Location | Precedence |
| :--- | :--- | :--- | :--- |
| **System** | `--system` | `/etc/gitconfig` | Lowest (system-wide for all users) |
| **Global** | `--global` | `~/.gitconfig` | Standard (applies to all your repositories) |
| **Local** | `--local` | `.git/config` (in repo root) | Highest (overrides global settings for current repo) |

### Viewing All Active Configurations:
```bash
git config --list --show-origin
```

---

## Related Topics

- [Git Repositories](/docs/git/repositories)
- [Git Init Command](/docs/git/git-init)
- [GitHub SSH Authentication](/docs/github/ssh-authentication)
