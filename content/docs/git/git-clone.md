---
title: "git clone — Cloning a Remote Repository"
description: "How to clone remote Git repositories: HTTPS vs SSH cloning, shallow clones (--depth 1), branch targeting (-b), and directory naming."
category: git
topic: git
type: guide
level: beginner
tags:
  - git
  - clone
  - remotes
  - github
platforms:
  - all
lastVerified: "2026-09-30"
---

# `git clone` — Cloning a Remote Repository

The **`git clone`** command copies an existing remote Git repository (from GitHub, GitLab, or a self-hosted server) onto your local machine, creating a new directory with the complete historical commit graph and remote tracking branches.

---

## 1. HTTPS vs. SSH Cloning

```bash
# HTTPS (Requires Personal Access Token or GitHub CLI credential helper):
git clone https://github.com/iamtashanto/OpenDevDocs.git

# SSH (Recommended: uses cryptographic SSH key without password prompts):
git clone git@github.com:iamtashanto/OpenDevDocs.git
```

---

## 2. Cloning into a Custom Folder Name

By default, Git creates a folder matching the repository name. You can specify a custom destination directory name as the second argument:

```bash
git clone git@github.com:iamtashanto/OpenDevDocs.git my-custom-folder
```

---

## 3. High-Performance Clone Options

### 1. Shallow Clone (`--depth 1`)
For large repositories with gigabytes of commit history where you only need the latest state (e.g. in CI/CD build runners or quick testing):

```bash
git clone --depth 1 git@github.com:iamtashanto/OpenDevDocs.git
```

### 2. Single Branch Clone (`-b`)
```bash
git clone -b feature-darkmode --single-branch git@github.com:iamtashanto/OpenDevDocs.git
```

---

## Related Topics

- [Git Clone Command Reference](/commands/git/clone-repository)
- [GitHub SSH Authentication](/docs/github/ssh-authentication)
- [Remote Repositories (git remote)](/docs/git/remote-repositories)
