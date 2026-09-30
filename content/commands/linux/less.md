---
title: "Interactive File Pager (less)"
description: View and search large text files interactively without loading the entire file into memory using less.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - less
  - pager
  - logs
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>less /var/log/syslog</Command>

---

## Short Description

`less` is a terminal pager program used to view the contents of a text file one page at a time. Unlike `cat`, `less` does not read the entire file before starting, making it fast on multi-gigabyte log files.

---

## Essential Keybindings in `less`

| Key | Action |
| :--- | :--- |
| **`j` / `Down Arrow`** | Scroll down one line |
| **`k` / `Up Arrow`** | Scroll up one line |
| **`Space` / `Page Down`**| Scroll down one full page |
| **`b` / `Page Up`** | Scroll up one full page |
| **`/pattern`** | Search forward for pattern (`n` for next match, `N` for previous) |
| **`?pattern`** | Search backward for pattern |
| **`G`** | Jump to the very end of the file |
| **`g`** | Jump to the very top of the file |
| **`F`** | Follow live log stream in real time (like `tail -f`, press `Ctrl+C` to pause) |
| **`q`** | Quit `less` |

---

## Examples

```bash
# View large nginx access log with line numbers (-N) and preserved color codes (-R)
less -NR /var/log/nginx/access.log
```
