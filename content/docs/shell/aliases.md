---
title: "Shell Aliases & Custom Shortcuts"
description: Create terminal command shortcuts and aliases in Bash and Zsh, manage persistent alias files, and handle positional arguments.
category: shell
topic: shell-scripting
type: guide
level: beginner
tags:
  - shell
  - bash
  - zsh
  - aliases
  - productivity
platforms:
  - linux
  - macos
tested:
  bash: "5.x"
lastVerified: "2026-09-30"
---

## What is a Shell Alias?

An **Alias** is a custom keyboard shortcut or abbreviation for a longer shell command.

---

## 1. Creating Temporary and Persistent Aliases

```bash
# Temporary (active for current terminal session only)
alias gs="git status"
alias ll="ls -la"
```

To make aliases permanent, add them to your `~/.bashrc` (or `~/.zshrc` on macOS):

```bash
# Append to shell config
cat << 'EOF' >> ~/.bashrc

# Custom Developer Aliases
alias ll="ls -lah"
alias gs="git status -sb"
alias ga="git add"
alias gc="git commit -m"
alias gp="git push"
alias dco="docker compose"
alias pdev="pnpm dev"
alias ports="sudo ss -tulpn"
EOF

# Reload configuration
source ~/.bashrc
```

---

## 2. Listing and Removing Aliases

```bash
# List all active aliases
alias

# Remove specific alias
unalias gs
```

---

## 3. Aliases vs Functions for Arguments

Aliases cannot take positional arguments (e.g. `$1`, `$2`). If you need dynamic arguments, use a **Shell Function** instead:

```bash
# ❌ Aliases cannot interpolate arguments in the middle:
# alias mcd="mkdir -p $1 && cd $1" (Does not work as expected)

# ✅ Use a shell function instead:
mcd() {
    mkdir -p "$1" && cd "$1"
}
```
