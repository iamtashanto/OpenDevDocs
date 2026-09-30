---
title: "Print Working Directory (pwd)"
description: Display the absolute pathname of the current working directory in Linux and Unix shells.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - pwd
  - navigation
  - cli
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>pwd</Command>

---

## Short Description

`pwd` (Print Working Directory) outputs the exact absolute directory path where your current shell session is located.

---

## Examples

### 1. Basic Usage

```bash
pwd
# Output: /home/ubuntu/projects
```

### 2. Print Physical Path (Resolving Symlinks)

```bash
pwd -P
```
