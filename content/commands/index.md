---
title: Commands Reference Library
description: Fast, searchable CLI command reference with copy-paste ready syntax, flag breakdowns, and common usage examples.
category: reference
topic: commands
type: reference
level: beginner
tags:
  - commands
  - cli
  - terminal
  - reference
lastVerified: "2026-09-30"
---

## Overview

The OpenDevDocs Commands Library is built to give developers instant, copy-paste ready CLI syntax without scrolling through bloated manuals. Every command is tested, documented with common flag breakdowns, and explained with real-world use cases.

---

## Browse Command Categories

| Tool / Category | Description | Featured Commands |
| :--- | :--- | :--- |
| **[Git](/commands/git/git-commands)** | Branching, rebasing, squashing, cherry-picking, and commit recovery. | `git reset --soft`, `git rebase -i` |
| **[Docker](/commands/docker/run)** | Container lifecycle, volume persistence, networking, and cleanup. | `docker run`, `docker system prune` |
| **[Linux](/commands/linux/kill-process-port)** | Process management, permissions, file search, and systemd daemons. | `lsof -i :3000 -t \| xargs kill -9` |
| **[Networking](/commands/networking/check-open-ports)** | Socket statistics, DNS lookups, SSL inspection, and latency tests. | `ss -tulnp`, `curl -Iv` |
| **[pnpm / Node](/commands/pnpm/clean-install)** | Deterministic package management, lockfile freezes, and script execution. | `pnpm install --frozen-lockfile` |
| **[PostgreSQL](/commands/postgresql/dump-database)** | Logical backups, database restores, user roles, and maintenance. | `pg_dump -F c`, `pg_restore` |
| **[SSH & Security](/commands/ssh/generate-key)** | Cryptographic keypairs, agent forwarding, and remote server tunnels. | `ssh-keygen -t ed25519` |

---

## Featured Quick References

### 1. Undo Git Commit (Keep Changes Staged)

<Command>git reset --soft HEAD~1</Command>

See the full [git reset --soft guide](/commands/git/reset-soft).

### 2. Kill Zombie Process on Port 3000

<Command>lsof -i :3000 -t | xargs kill -9</Command>

See the full [Kill Process on Port guide](/commands/linux/kill-process-port).

### 3. Reclaim Docker Disk Space

<Command>docker system prune -a --volumes -f</Command>

See the full [Docker system prune guide](/commands/docker/system-prune).

---

## Contributing New Commands

All commands are stored in plain Markdown files in `content/commands/<tool>/<command-name>.md`. 

To contribute a new command:
1. Fork the repo and add a file under `content/commands/`
2. Include the strict frontmatter header with `type: reference`
3. Add the command syntax, examples, flags table, when to use, and warnings
4. Run `pnpm validate-content` and open a PR!
