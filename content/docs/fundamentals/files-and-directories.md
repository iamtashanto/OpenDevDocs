---
title: "Files and Directories"
description: "Core filesystem concepts: hierarchical trees, POSIX permissions, ownership, hidden files, and essential directory navigation."
category: fundamentals
topic: filesystem
type: guide
level: beginner
tags:
  - filesystem
  - linux
  - posix
  - permissions
  - terminal
platforms:
  - all
lastVerified: "2026-09-30"
---

# Files and Directories

All modern operating systems organize stored data into a hierarchical tree of **directories** (folders) and **files**. Understanding filesystem structure and POSIX permissions is essential for every developer.

---

## 1. The Hierarchical Directory Tree

In Unix-like systems (Linux and macOS), everything originates from a single root directory represented by a forward slash **`/`**:

```
/ (Root Directory)
├── etc/         # System-wide configuration files (nginx.conf, hosts)
├── var/         # Variable data (logs, database files, caches)
├── usr/         # User utilities and installed programs
├── bin/         # Essential command binaries (ls, cp, rm, bash)
└── Users/ (or /home/) # Personal user home directories
    └── alex/
        ├── Desktop/
        ├── Downloads/
        └── Projects/
            └── OpenDevDocs/
```

*(Windows uses drive letters like `C:\` and backslashes `\` as directory separators.)*

---

## 2. Essential Navigation Commands

| Command | Action | Example |
| :--- | :--- | :--- |
| `pwd` | Print Working Directory (shows where you currently are) | `pwd` → `/Users/alex/Projects` |
| `ls` | List files in current directory | `ls -la` (shows hidden files & details) |
| `cd` | Change directory | `cd Projects/OpenDevDocs` |
| `mkdir` | Make new directory | `mkdir -p src/components` |
| `touch` | Create empty file or update timestamp | `touch .env.local` |
| `cp` | Copy files or directories | `cp -r src/ src-backup/` |
| `mv` | Move or rename files/directories | `mv old-name.ts new-name.ts` |
| `rm` | Remove files | `rm config.json` or `rm -rf dist/` |

---

## 3. Hidden Files (Dotfiles)

Any file or directory whose name starts with a period `.` is considered a **hidden file** (e.g. `.gitignore`, `.env`, `.github/`).

- By default, `ls` ignores dotfiles.
- Use `ls -a` (all) or `ls -la` (long format all) to view hidden configuration files.

---

## 4. POSIX File Permissions

In Linux/macOS, every file has permissions for three categories of users: **Owner (u)**, **Group (g)**, and **Others (o)**.

When running `ls -l`, you see permission strings like `-rwxr-xr--`:

```
-  rwx  r-x  r--
┬  ──┬── ─┬─  ─┬─
│    │    │    └─ Others: Read only (4)
│    │    └────── Group: Read + Execute (4+1 = 5)
│    └─────────── Owner: Read + Write + Execute (4+2+1 = 7)
└──────────────── File type (- for file, d for directory)
```

### Permission Values
- **`r` (Read = 4)**: Permission to open and read file contents.
- **`w` (Write = 2)**: Permission to edit, overwrite, or delete file.
- **`x` (Execute = 1)**: Permission to run file as a program or script.

### Changing Permissions with `chmod`
```bash
# Make a deployment shell script executable:
chmod +x deploy.sh
# or numeric:
chmod 755 deploy.sh
```

---

## Related Topics

- [Absolute vs. Relative Paths](/docs/fundamentals/absolute-vs-relative-paths)
- [Terminal Fundamentals](/docs/fundamentals/terminal-fundamentals)
- [Shell Fundamentals & Scripting](/docs/fundamentals/shell-fundamentals)
- [Linux Disk Usage Reference](/commands/linux/disk-usage)
