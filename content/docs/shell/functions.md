---
title: "Bash Functions & Scope"
description: Define modular Bash functions, handle positional arguments ($1, $2, $@), manage local variable scope, and handle return values.
category: shell
topic: shell-scripting
type: guide
level: intermediate
tags:
  - shell
  - bash
  - functions
  - modularity
  - scripting
platforms:
  - linux
  - macos
tested:
  bash: "5.x"
lastVerified: "2026-09-30"
---

## 1. Declaring Functions

```bash
#!/usr/bin/env bash

# Method 1: Standard POSIX style (Recommended)
log_info() {
    echo "[INFO] $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Method 2: With 'function' keyword
function log_error {
    echo "[ERROR] $(date '+%Y-%m-%d %H:%M:%S') - $1" >&2
}

log_info "Server initialization started"
log_error "Failed to bind port 80"
```

---

## 2. Local Variables vs Global Scope

> [!IMPORTANT]
> By default, all variables inside a Bash function are **global**. Always declare variables with the **`local`** keyword to prevent accidental side effects outside the function.

```bash
calculate_total() {
    local price="$1"
    local tax_rate="$2"
    local total

    total=$(echo "$price + ($price * $tax_rate)" | bc)
    echo "$total"
}

ORDER_TOTAL=$(calculate_total 100 0.08)
echo "Total: $$ORDER_TOTAL" # 108.00
```

---

## 3. Handling Multiple Arguments & Flags

```bash
backup_files() {
    local dest_dir="$1"
    shift # Remove first argument ($1) so $@ contains only remaining files

    echo "Backing up $# files to $dest_dir..."
    for file in "$@"; do
        cp "$file" "$dest_dir/"
    done
}

backup_files "/backups" "file1.txt" "file2.txt" "file3.txt"
```

---

## 4. Return Status Code vs Output Value

- **`return 0` / `return 1`**: Returns an exit status code (0 = success, 1-255 = failure). Checked using `if function_call; then ...`
- **`echo "result"`**: Returns data to standard output, captured via `RESULT=$(function_call)`.
