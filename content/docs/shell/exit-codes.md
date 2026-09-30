---
title: "Shell Exit Codes & Error Propagation"
description: Understand process exit statuses ($?), exit 0 vs non-zero errors, logical chaining (&&, ||), and standard POSIX exit conventions.
category: shell
topic: shell-scripting
type: concept
level: beginner
tags:
  - shell
  - bash
  - exit-codes
  - debugging
  - error-handling
platforms:
  - linux
  - macos
tested:
  bash: "5.x"
lastVerified: "2026-09-30"
---

## What is an Exit Code?

Every command and script executed in a Linux shell returns an integer **Exit Code** (or **Exit Status**) between `0` and `255` upon completion. The exit code of the most recent foreground command is stored in the special variable **`$?`**.

---

## The Golden Rule of Exit Codes

- **`0`**: **Success** (Operation completed normally without errors).
- **`1 – 255`**: **Failure / Error** (A non-zero value signifies an abnormal condition).

---

## Standard Unix Exit Code Conventions

| Code | Meaning | Example Scenario |
| :--- | :--- | :--- |
| **`0`** | Success | Command finished properly |
| **`1`** | General Catch-all Error | `exit 1` or general runtime failure |
| **`2`** | Misuse of shell builtins | Missing required arguments |
| **`126`** | Command cannot execute | Permission denied or not executable |
| **`127`** | Command not found | Binary missing from `$PATH` |
| **`128+N`** | Fatal signal `N` termination | `128 + 9 = 137` (Killed by SIGKILL / OOM Killer) |
| **`130`** | Script terminated by `Ctrl + C` (`SIGINT` = Signal 2) | User interrupted program |

---

## Logical Chaining (`&&` and `||`)

- **`cmd1 && cmd2`**: Runs `cmd2` **only if** `cmd1` succeeds (exit code 0).
- **`cmd1 || cmd2`**: Runs `cmd2` **only if** `cmd1` fails (non-zero exit code).

```bash
# Build and only deploy if build succeeded:
npm run build && scp -r dist/ user@server:/var/www/

# Ping server; if it fails, send alert:
ping -c 1 192.168.1.1 > /dev/null || ./alert_slack.sh "Server Down"
```

---

## Using `exit` in Custom Scripts

```bash
#!/usr/bin/env bash

if [[ ! -f "config.json" ]]; then
    echo "Error: Missing config.json file!" >&2
    exit 1
fi

echo "Configuration loaded successfully."
exit 0
```
