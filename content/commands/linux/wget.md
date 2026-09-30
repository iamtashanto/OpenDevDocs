---
title: "Non-Interactive Network Downloader (wget)"
description: Download files, resume interrupted downloads, and mirror web directories non-interactively using wget.
category: linux
topic: linux-commands
type: reference
level: beginner
tags:
  - linux
  - wget
  - download
  - networking
  - cli
platforms:
  - linux
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Command

<Command>wget -c https://example.com/large_archive.iso</Command>

---

## Short Description

`wget` is a free utility for non-interactive downloading of files from the web, supporting HTTP, HTTPS, and FTP protocols.

---

## Examples

### 1. Download File to Current Directory

```bash
wget https://nodejs.org/dist/v22.11.0/node-v22.11.0-linux-x64.tar.xz
```

### 2. Resume Interrupted Download (`-c`)

```bash
wget -c https://example.com/large_dataset.zip
```

### 3. Save to Specific Output Filename (`-O`)

```bash
wget -O package.tar.gz https://example.com/download?id=123
```

### 4. Download in Background (`-b`)

```bash
wget -b https://example.com/massive_backup.dump
```
