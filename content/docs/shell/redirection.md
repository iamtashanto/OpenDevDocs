---
title: "Shell I/O Redirection (>, >>, <, 2>&1)"
description: Redirect standard input, overwrite files with >, append with >>, capture stderr with 2>, and merge streams with 2>&1.
category: shell
topic: shell-scripting
type: guide
level: beginner
tags:
  - shell
  - bash
  - redirection
  - io
  - cli
platforms:
  - linux
  - macos
tested:
  bash: "5.x"
lastVerified: "2026-09-30"
---

## Redirection Operators Reference

| Operator | Action | Example |
| :--- | :--- | :--- |
| **`>`** | Redirect `stdout`, overwriting destination file | `echo "Hello" > output.txt` |
| **`>>`** | Redirect `stdout`, appending to destination file | `echo "New Line" >> logs.txt` |
| **`<`** | Redirect `stdin` from a file | `mysql -u root < dump.sql` |
| **`2>`** | Redirect `stderr` (errors only) | `ls /root 2> error.log` |
| **`2>>`** | Append `stderr` to a file | `backup.sh 2>> backup_errors.log` |
| **`2>&1`** | Merge `stderr` into `stdout` | `app.sh > full.log 2>&1` |
| **`&>`** | Modern Bash shorthand for `> file 2>&1` | `app.sh &> full.log` |
| **`<<<`** | Here-string (passes string as stdin) | `grep "foo" <<< "foobar"` |

---

## Practical Examples

### 1. Separate Standard Logs from Error Logs

```bash
python3 train_model.py > output.log 2> errors.log
```

### 2. Capture Both Outputs to Single File

```bash
# Classic POSIX syntax
./build.sh > build.log 2>&1

# Modern Bash shorthand
./build.sh &> build.log
```

### 3. Multi-Line Here-Documents (`<< EOF`)

```bash
cat << 'EOF' > /etc/nginx/conf.d/api.conf
server {
    listen 80;
    server_name api.example.com;
    location / {
        proxy_pass http://localhost:3000;
    }
}
EOF
```
