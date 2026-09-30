---
title: "Concatenate & Display Files (cat)"
description: Concatenate, display, and combine files in Linux and Unix shells.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - cat
  - files
  - text
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>cat file.txt</Command>

---

## Short Description

`cat` (Concatenate) reads files sequentially and prints their standard output to the terminal screen.

---

## Examples

### 1. Print File to Terminal

```bash
cat /etc/os-release
```

### 2. Display with Line Numbers (`-n`)

```bash
cat -n server.js
```

### 3. Combine Multiple Files into One

```bash
cat header.html body.html footer.html > index.html
```

### 4. Create Multi-Line File with Heredoc

```bash
cat << 'EOF' > setup.sh
#!/usr/bin/env bash
echo "Initializing..."
EOF
```
