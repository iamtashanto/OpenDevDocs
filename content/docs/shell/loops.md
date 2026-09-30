---
title: "Bash Loops: for, while, and Reading Files"
description: Iterate over lists, files, and numbers using for and while loops, and process text line-by-line in Bash.
category: shell
topic: shell-scripting
type: guide
level: beginner
tags:
  - shell
  - bash
  - loops
  - for-loop
  - while-loop
platforms:
  - linux
  - macos
tested:
  bash: "5.x"
lastVerified: "2026-09-30"
---

## 1. `for` Loop Over a List

```bash
#!/usr/bin/env bash

SERVERS=("web-1" "web-2" "db-1" "cache-1")

for SERVER in "${SERVERS[@]}"; do
    echo "Pinging $SERVER..."
    # ssh "$SERVER" "uptime"
done
```

---

## 2. Iterating Over Files (Globbing)

```bash
# Process all markdown files in directory
for FILE in content/docs/*.md; do
    # Verify path is actually a file (handles empty directories safely)
    [[ -f "$FILE" ]] || continue
    echo "Validating $FILE..."
done
```

---

## 3. C-Style Number Ranges

```bash
# Loop from 1 to 5
for ((i = 1; i <= 5; i++)); do
    echo "Attempt #$i"
done

# Brace expansion shorthand
for i in {1..5}; do
    echo "Step $i"
done
```

---

## 4. `while` Loop & Reading Files Line-by-Line

To safely process a file line-by-line without word-splitting issues:

```bash
#!/usr/bin/env bash

INPUT_FILE="urls.txt"

# IFS= prevents trimming leading/trailing whitespace; -r prevents backslash escape interpretation
while IFS= read -r LINE || [[ -n "$LINE" ]]; do
    # Skip comments and empty lines
    [[ "$LINE" =~ ^#.*$ || -z "$LINE" ]] && continue

    echo "Fetching status for: $LINE"
    curl -Is "$LINE" | head -n 1
done < "$INPUT_FILE"
```

---

## 5. Infinite Polling Loop with Sleep

```bash
echo "Waiting for database container to become healthy..."
while ! docker exec postgres-dev pg_isready -q; do
    sleep 1
done
echo "Database is ready!"
```
