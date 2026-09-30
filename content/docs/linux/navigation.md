---
title: "Linux Command-Line Navigation"
description: Navigate directories efficiently using pwd, cd, relative and absolute paths, tilde shortcuts, and pushd/popd.
category: linux
topic: linux
type: guide
level: beginner
tags:
  - linux
  - navigation
  - cd
  - pwd
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## 1. Print Working Directory (`pwd`)

Displays the absolute path of your current location in the filesystem:

```bash
pwd
# Output: /home/alice/projects/api
```

---

## 2. Absolute vs Relative Paths

- **Absolute Path**: Begins with `/` and specifies the complete path from the filesystem root (e.g. `/var/log/nginx/access.log`). Always points to the exact same file regardless of current directory.
- **Relative Path**: Specifies a path relative to your current working directory without a leading `/` (e.g. `src/index.js` or `../config.json`).

---

## 3. Special Directory Symbols

| Symbol | Meaning | Example |
| :--- | :--- | :--- |
| **`.`** | Current directory | `./run.sh` |
| **`..`** | Parent directory (one level up) | `cd ..` |
| **`~`** | Current user's home directory (`/home/username`) | `cd ~/downloads` |
| **`-`** | Previous working directory (toggle back and forth) | `cd -` |
| **`/`** | Filesystem root | `cd /` |

---

## 4. Advanced Directory Stacks (`pushd` & `popd`)

Instead of losing your place when navigating deeply into temporary subdirectories:

```bash
# Save current location and switch to /var/log
pushd /var/log/nginx

# Inspect files...
ls -la

# Pop back to your exact previous working directory
popd
```
