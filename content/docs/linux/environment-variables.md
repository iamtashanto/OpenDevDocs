---
title: "Linux Environment Variables"
description: Configure system-wide and user-level environment variables, PATH manipulation, and shell persistence (.bashrc, /etc/environment).
category: linux
topic: linux
type: guide
level: beginner
tags:
  - linux
  - environment-variables
  - bashrc
  - path
  - configuration
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## 1. Setting and Exporting Variables

In Linux, a variable created without `export` is private to the current shell. Using **`export`** makes the variable available to all child processes and commands spawned by the shell:

```bash
# Temporary variable for current shell session only
export PORT=3000
export API_KEY="sk_live_12345"

# View variable value
echo $PORT

# Unset variable
unset API_KEY
```

---

## 2. Inspecting Active Environment Variables

```bash
# Print all exported environment variables
printenv

# Filter for specific variable
printenv PATH
# or
env | grep NODE_
```

---

## 3. Persistent User Configuration (`~/.bashrc` / `~/.zshrc`)

Variables set via terminal export disappear when the shell session closes. To persist them across logins:

```bash
# Append to user's shell configuration
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
echo 'export EDITOR="nano"' >> ~/.bashrc

# Reload shell configuration in current session
source ~/.bashrc
```

---

## 4. System-Wide Environment Variables (`/etc/environment`)

For variables that must be available globally to all users and system services:

```ini
# /etc/environment
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
NODE_ENV="production"
TZ="UTC"
```

---

## 5. Understanding the `$PATH` Variable

`PATH` is a colon-separated list of directories where the shell searches for executable binary commands:

```bash
echo $PATH
# Output: /usr/local/bin:/usr/bin:/bin:/usr/sbin
```

When you type `node`, Linux checks `/usr/local/bin/node`, then `/usr/bin/node`, running the first executable match it discovers.
