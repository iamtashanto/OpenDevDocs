---
title: Git Commands
description: Complete reference for Git commands — commit, branch, merge, rebase, and more.
---

# Git Commands

Quick reference for the most important Git commands.

## Setup

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Initialize & Clone

```bash
git init                          # Initialize a new repo
git clone <url>                   # Clone a remote repo
git clone <url> --depth 1         # Shallow clone (faster)
```

## Stage & Commit

```bash
git add .                         # Stage all changes
git add <file>                    # Stage a specific file
git commit -m "message"           # Commit with message
git commit --amend                # Amend last commit
```

## Branch

```bash
git branch                        # List branches
git branch <name>                 # Create branch
git switch <name>                 # Switch branch
git switch -c <name>              # Create and switch
git branch -d <name>              # Delete branch
```

## Remote

```bash
git remote -v                     # List remotes
git fetch origin                  # Fetch updates
git pull origin main              # Pull and merge
git push origin <branch>          # Push branch
```

## Stash

```bash
git stash                         # Stash changes
git stash pop                     # Apply last stash
git stash list                    # List stashes
```
