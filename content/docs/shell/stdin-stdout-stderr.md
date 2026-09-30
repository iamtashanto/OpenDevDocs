---
title: "Standard Streams: stdin, stdout, and stderr"
description: Master Unix standard I/O streams (File Descriptors 0, 1, 2), stream pipelines, and discarding output with /dev/null.
category: shell
topic: shell-scripting
type: concept
level: beginner
tags:
  - shell
  - bash
  - stdin
  - stdout
  - stderr
  - io
platforms:
  - linux
  - macos
tested:
  bash: "5.x"
lastVerified: "2026-09-30"
---

## Overview

In Unix and Linux, every running process is initialized with three default standard I/O data streams, represented by numeric **File Descriptors (FD)**:

```
                  ┌───────────────────┐
  stdin (FD 0) ──>│                   ├──> stdout (FD 1) [Standard Output]
[Keyboard / Pipe] │  Running Process  │
                  │                   ├──> stderr (FD 2) [Error Messages]
                  └───────────────────┘
```

---

## The Three Streams Explained

| Stream | File Descriptor | Default Source / Destination | Role |
| :--- | :--- | :--- | :--- |
| **`stdin`** | **`0`** | Keyboard / Pipe / Input File | Supplies input data to the process. |
| **`stdout`**| **`1`** | Terminal Display Screen | Receives standard informational output. |
| **`stderr`**| **`2`** | Terminal Display Screen | Receives error messages and diagnostic alerts separately from data. |

---

## Why Separate stdout and stderr?

Separating normal program output from error diagnostics ensures that errors don't corrupt downstream processing pipelines:

```bash
# Process stdout with grep, while errors print to screen without breaking grep
find / -name "*.conf" 2>/dev/null | grep nginx
```

---

## Discarding Output with `/dev/null`

`/dev/null` (the "black hole") is a special virtual device that discards all data written to it:

```bash
# Silence standard output
npm run build > /dev/null

# Silence error messages only
cat non_existent_file.txt 2> /dev/null

# Silence EVERYTHING (stdout and stderr)
command > /dev/null 2>&1
# or modern Bash shorthand:
command &> /dev/null
```
