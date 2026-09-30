---
title: "GitHub SSH Key Authentication Setup"
description: "Setting up secure passwordless SSH keys with GitHub: generating Ed25519 keypairs, ssh-agent configuration, and adding keys to GitHub settings."
category: git
topic: github
type: guide
level: beginner
tags:
  - github
  - ssh
  - authentication
  - security
  - keys
platforms:
  - all
lastVerified: "2026-09-30"
---

# GitHub SSH Key Authentication Setup

Using **SSH (Secure Shell) keys** provides secure, passwordless authentication between your local terminal and GitHub.

---

## 1. Generating a Modern Ed25519 SSH Key

The **Ed25519** algorithm provides superior cryptographic security and performance compared to legacy RSA keys:

```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

When prompted:
1. Press `Enter` to accept the default file location (`~/.ssh/id_ed25519`).
2. Enter a secure passphrase (or press `Enter` for no passphrase).

---

## 2. Adding Key to SSH Agent

```bash
# 1. Start the ssh-agent background process:
eval "$(ssh-agent -s)"

# 2. Add your private key to ssh-agent:
ssh-add ~/.ssh/id_ed25519
```

*(On macOS, configure `~/.ssh/config` with `UseKeychain yes` to persist passphrase across reboots).*

---

## 3. Copying Public Key to GitHub

Copy the contents of your **public key** (`.pub`):

```bash
# macOS:
pbcopy < ~/.ssh/id_ed25519.pub

# Linux (with xclip):
xclip -selection clipboard < ~/.ssh/id_ed25519.pub

# Or display and copy manually:
cat ~/.ssh/id_ed25519.pub
```

1. Go to [github.com/settings/keys](https://github.com/settings/keys).
2. Click **New SSH Key**.
3. Paste the key into the **Key** field and give it a descriptive title (e.g. "Work MacBook Pro").
4. Click **Add SSH Key**.

---

## 4. Testing Your SSH Connection

```bash
ssh -T git@github.com
```

Expected response:
```text
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## Related Topics

- [Personal Access Tokens](/docs/github/personal-access-tokens)
- [Cloning Remote Repositories](/docs/git/git-clone)
- [Remote Repositories (git remote)](/docs/git/remote-repositories)
