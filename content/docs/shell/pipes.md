---
title: "Shell Pipes & Pipeline Processing"
description: Chain Linux commands together using the pipe operator (|) to construct powerful data processing pipelines.
category: shell
topic: shell-scripting
type: guide
level: beginner
tags:
  - shell
  - bash
  - pipes
  - cli
  - devops
platforms:
  - linux
  - macos
tested:
  bash: "5.x"
lastVerified: "2026-09-30"
---

## What is a Pipe (`|`)?

The pipe operator **`|`** connects the **`stdout`** of the command on its left directly to the **`stdin`** of the command on its right. Data streams in memory between processes without creating temporary files on disk.

```
[ Command A ] ──(stdout)──> [ Pipe | ] ──(stdin)──> [ Command B ]
```

---

## Classic Pipeline Examples

### 1. Count Total Lines Matching a Pattern

```bash
# Count number of 404 errors in web log
cat /var/log/nginx/access.log | grep " 404 " | wc -l
```

### 2. Extract Top 10 Most Frequent IP Addresses

```bash
cat /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head -n 10
```

### 3. Find Large Files and Format Display

```bash
du -sh * | sort -hr | head -n 5
```

---

## Inspecting Intermediate Stream Data (`tee`)

`tee` splits a stream, writing data both to a file and continuing down the pipe to `stdout`:

```bash
# Save intermediate filtered results while continuing pipeline
cat data.csv | grep "active" | tee active_users.csv | wc -l
```

---

## Critical Bash Note: `pipefail`

By default, Bash evaluates a pipeline's exit code based *only* on the final command in the chain. In scripts, always enable `set -o pipefail` so failures anywhere in the pipeline trigger an error:

```bash
set -o pipefail
```
