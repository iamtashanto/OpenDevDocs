---
title: "Shell Fundamentals & Scripting"
description: "Mastering shell interpreters: bash vs. zsh, configuration files (.zshrc, .bashrc), PATH variable, aliases, and shell scripting basics."
category: fundamentals
topic: shell
type: guide
level: beginner
tags:
  - shell
  - bash
  - zsh
  - cli
  - scripting
  - path
platforms:
  - all
lastVerified: "2026-09-30"
---

# Shell Fundamentals & Scripting

The **shell** is a command language interpreter that executes commands read from standard input devices such as keyboards or from script files.

---

## 1. Shell Configuration Files (`.zshrc` / `.bashrc`)

When you open a new terminal session, the shell reads startup configuration files located in your home directory (`~`):

- **Zsh (macOS & modern Linux)**: `~/.zshrc`
- **Bash (Linux server default)**: `~/.bashrc` and `~/.bash_profile`

Whenever you add custom aliases, export environment variables, or update your `PATH`, edit this file and reload it:

```bash
# Reload changes in current session:
source ~/.zshrc
```

---

## 2. The `PATH` Environment Variable

When you run a command like `git` or `node`, the shell does not search your entire hard drive. Instead, it looks in the colon-separated directory list stored in the **`$PATH`** variable:

```bash
echo $PATH
# Output: /opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin
```

### Adding a Custom Binary to `PATH`
```bash
# Add to ~/.zshrc or ~/.bashrc:
export PATH="$HOME/.local/bin:$PATH"
```

---

## 3. Shell Aliases

Aliases create convenient shortcuts for long or frequently typed commands:

```bash
# Add to ~/.zshrc:
alias gs="git status"
alias gco="git checkout"
alias pdev="pnpm dev"
alias dc="docker compose"
```

---

## 4. Writing a Basic Shell Script

Shell scripts automate multi-step developer routines. Always include a **shebang** (`#!/usr/bin/env bash`) on line 1:

```bash
#!/usr/bin/env bash
# Strict mode: fail immediately if any command returns non-zero error
set -euo pipefail

echo "🚀 Starting database backup routine..."

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
FILENAME="$BACKUP_DIR/db_$TIMESTAMP.sql"

mkdir -p "$BACKUP_DIR"

if [ -f ".env" ]; then
  echo "Found .env file. Proceeding with export..."
  # pg_dump ...
  echo "✅ Backup successfully saved to $FILENAME"
else
  echo "❌ Error: .env file missing!" >&2
  exit 1
fi
```

### Making the Script Executable
```bash
chmod +x backup.sh
./backup.sh
```

---

## Related Topics

- [Terminal Fundamentals](/docs/fundamentals/terminal-fundamentals)
- [Environment Variables](/docs/fundamentals/environment-variables)
- [Processes & Job Control](/docs/fundamentals/processes)
