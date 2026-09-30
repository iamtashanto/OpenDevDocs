---
title: "Search Text with Regular Expressions (grep)"
description: Search plain-text files and streams for regular expression patterns in Linux using grep.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - grep
  - search
  - regex
  - text
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>grep -rn "search_string" ./src</Command>

---

## Short Description

`grep` searches for lines matching a regular expression or text string in files or standard input streams.

---

## Essential Flags

- **`-i`**: Case-insensitive search.
- **`-r` / `-R`**: Recursive directory search.
- **`-n`**: Print line numbers of matches.
- **`-v`**: Invert match (print lines that do **not** match).
- **`-E`**: Extended Regular Expressions (regex).
- **`-l`**: Print filenames only.
- **`-c`**: Count matching lines.

---

## Examples

### 1. Case-Insensitive Search in File

```bash
grep -i "error" /var/log/syslog
```

### 2. Recursive Codebase Search with Line Numbers

```bash
grep -rn "TODO" ./src
```

### 3. Filter Running Processes

```bash
ps aux | grep -i node | grep -v grep
```

### 4. Search with Extended Regex

```bash
grep -E "404|500" /var/log/nginx/access.log
```
