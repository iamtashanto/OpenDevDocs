---
title: "Bash Conditions & Comparison Operators"
description: Master if/elif/else statements, test conditions ([[ ... ]]), string/numeric operators, file tests (-f, -d), and case statements.
category: shell
topic: shell-scripting
type: guide
level: beginner
tags:
  - shell
  - bash
  - conditions
  - if-else
  - operators
platforms:
  - linux
  - macos
tested:
  bash: "5.x"
lastVerified: "2026-09-30"
---

## 1. Syntax of `if / elif / else`

> [!TIP]
> In modern Bash scripts, always prefer double brackets **`[[ ... ]]`** over single brackets `[ ... ]`. Double brackets handle spaces gracefully, support regex (`=~`), and prevent word splitting bugs.

```bash
#!/usr/bin/env bash

ENV="production"

if [[ "$ENV" == "production" ]]; then
    echo "Deploying to Live Production Cluster..."
elif [[ "$ENV" == "staging" ]]; then
    echo "Deploying to Staging..."
else
    echo "Running locally in development..."
fi
```

---

## 2. File and Directory Test Operators

| Operator | True If... | Example |
| :--- | :--- | :--- |
| **`-f <file>`** | Path exists and is a regular file | `[[ -f ".env" ]]` |
| **`-d <dir>`** | Path exists and is a directory | `[[ -d "/var/log" ]]` |
| **`-e <path>`** | Path exists (file, directory, or socket) | `[[ -e "$TARGET" ]]` |
| **`-s <file>`** | File exists and has a size greater than 0 | `[[ -s "output.log" ]]` |
| **`-x <file>`** | File is executable | `[[ -x "./build.sh" ]]` |

---

## 3. String Comparison Operators

| Operator | True If... | Example |
| :--- | :--- | :--- |
| **`==`** | Strings are equal | `[[ "$STATUS" == "ok" ]]` |
| **`!=`** | Strings are not equal | `[[ "$ROLE" != "admin" ]]` |
| **`-z`** | String is empty (zero length) | `[[ -z "$API_KEY" ]]` |
| **`-n`** | String is not empty | `[[ -n "$USER" ]]` |
| **`=~`** | String matches regex pattern | `[[ "$EMAIL" =~ ^[A-Za-z0-9._%+-]+@ ]]` |

---

## 4. Integer Comparison Operators

| Operator | Comparison | Example |
| :--- | :--- | :--- |
| **`-eq`** | Equal to (`==`) | `[[ "$COUNT" -eq 0 ]]` |
| **`-ne`** | Not equal to (`!=`) | `[[ "$PORT" -ne 80 ]]` |
| **`-gt`** / **`-ge`** | Greater than / Greater or equal | `[[ "$MEM" -ge 1024 ]]` |
| **`-lt`** / **`-le`** | Less than / Less or equal | `[[ "$RETRIES" -lt 3 ]]` |

---

## 5. Pattern Matching with `case` Statements

```bash
ACTION="${1:-help}"

case "$ACTION" in
    start)
        echo "Starting server..."
        ;;
    stop)
        echo "Stopping server..."
        ;;
    restart|reload)
        echo "Restarting service..."
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
        ;;
esac
```
