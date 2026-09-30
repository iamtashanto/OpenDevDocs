---
title: "Shell Variables & Parameter Expansion"
description: Define shell variables, understand double vs single quoting rules, command substitution $(), and default parameter expansion in Bash.
category: shell
topic: shell-scripting
type: guide
level: beginner
tags:
  - shell
  - bash
  - variables
  - scripting
  - expansion
platforms:
  - linux
  - macos
tested:
  bash: "5.x"
lastVerified: "2026-09-30"
---

## 1. Declaring and Accessing Variables

> [!IMPORTANT]
> In Bash, never place spaces around the equals sign `=` during assignment (`NAME="Alice"`, not `NAME = "Alice"`).

```bash
# Correct
APP_NAME="OpenDevDocs"
PORT=3000

# Accessing
echo "Running $APP_NAME on port $PORT"
echo "Running ${APP_NAME}_service" # Curly braces prevent ambiguity
```

---

## 2. Quoting Rules: Double Quotes vs Single Quotes

- **Double Quotes (`"..."`)**: Expands variables and interprets escape characters (`"Hello $USER"` $\rightarrow$ `"Hello alice"`).
- **Single Quotes (`'...'`)**: Preserves the literal string without expanding variables (`'Hello $USER'` $\rightarrow$ `'Hello $USER'`).

---

## 3. Command Substitution (`$(command)`)

Capture the standard output of a command into a variable:

```bash
CURRENT_DATE=$(date +%Y%m%d)
CURRENT_COMMIT=$(git rev-parse --short HEAD)

BACKUP_NAME="backup_${CURRENT_DATE}_${CURRENT_COMMIT}.tar.gz"
echo "Created $BACKUP_NAME"
```

---

## 4. Parameter Expansion Tricks

```bash
# Fallback default value if variable is unset or empty
ENVIRONMENT="${NODE_ENV:-development}"

# Assign fallback value if variable is unset
API_PORT="${PORT:=3000}"

# Throw error if required variable is missing
DB_URL="${DATABASE_URL:?Error: DATABASE_URL must be defined}"

# String manipulation
FILENAME="server.config.js"
echo "${FILENAME%.js}"       # Strip extension -> "server.config"
echo "${FILENAME##*.}"       # Extract extension -> "js"
```
