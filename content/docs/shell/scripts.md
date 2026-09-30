---
title: "Bash Scripting Fundamentals & set -euo pipefail"
description: Write robust, production-ready Bash scripts with shebang lines, argument parsing, error trapping, and strict mode.
category: shell
topic: shell-scripting
type: guide
level: beginner
tags:
  - shell
  - bash
  - scripting
  - automation
  - devops
platforms:
  - linux
  - macos
tested:
  bash: "5.x"
lastVerified: "2026-09-30"
---

## 1. Anatomy of a Robust Bash Script

```bash
#!/usr/bin/env bash
# Strict Bash Mode: Exit immediately on errors or unbound variables
set -euo pipefail

# Script metadata
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly TARGET_ENV="${1:-development}"

echo "Starting deployment for environment: $TARGET_ENV"
echo "Running from directory: $SCRIPT_DIR"

# Clean build directory
rm -rf "$SCRIPT_DIR/dist"
mkdir -p "$SCRIPT_DIR/dist"

echo "Build succeeded!"
```

---

## 2. The Strict Mode Header (`set -euo pipefail`)

Always include `set -euo pipefail` at the start of production automation scripts:

- **`set -e`**: Exit immediately if any command returns a non-zero exit status.
- **`set -u`**: Treat unset/unbound variables as an error and exit immediately (prevents catastrophic bugs like `rm -rf $UNSET_VAR/`).
- **`set -o pipefail`**: If any command in a pipeline `cmd1 | cmd2 | cmd3` fails, the whole pipeline returns a failure exit code.

---

## 3. Special Positional Parameters

| Variable | Description |
| :--- | :--- |
| **`$0`** | Name of the executing script file |
| **`$1, $2, ...`**| Positional arguments passed to script |
| **`$#`** | Total number of arguments passed |
| **`$@`** | Array of all arguments as separate strings (`"$@"`) |
| **`$$`** | Process ID (PID) of the running script |
| **`$?`** | Exit code of the most recently executed command |

---

## 4. Making Scripts Executable

```bash
# Add execute permission
chmod +x deploy.sh

# Run script
./deploy.sh production
```
