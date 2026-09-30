---
title: "Linux Disk Usage & Inode Management"
description: Monitor disk partition capacity with df, inspect directory sizes with du, diagnose inode exhaustion, and reclaim disk space safely.
category: linux
topic: linux
type: guide
level: intermediate
tags:
  - linux
  - disk
  - df
  - du
  - inodes
  - devops
platforms:
  - linux
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## 1. Checking Partition Free Space (`df -h`)

The `df` (Disk Free) command reports filesystem disk space usage in human-readable units (MB/GB):

```bash
df -h
```

Output example:
```
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        50G   42G  8.0G  84% /
/dev/nvme0n1p1  512M  120M  392M  24% /boot/efi
tmpfs           3.9G     0  3.9G   0% /dev/shm
```

---

## 2. Diagnosing Directory Sizes (`du`)

The `du` (Disk Usage) command estimates the file space used by directories:

```bash
# Show summary size of current directory
du -sh .

# List sizes of all top-level items sorted from smallest to largest
du -sh * | sort -h

# Inspect top 10 largest folders inside /var
sudo du -h --max-depth=1 /var | sort -hr | head -n 10
```

---

## 3. Inode Exhaustion (`df -i`)

An **Inode** is a data structure storing file metadata. A disk can run out of inodes (e.g. millions of tiny 0-byte log or session files created) even when gigabytes of disk space remain free:

```bash
# Check inode usage percentage per partition
df -i
```

If `Use%` reaches 100%, the system throws `"No space left on device"` errors.

---

## 4. Finding and Cleaning Large Files Safely

```bash
# Find files larger than 100MB on root filesystem
sudo find / -type f -size +100M -exec ls -lh {} \; 2>/dev/null

# Clean systemd journal logs older than 7 days
sudo journalctl --vacuum-time=7d

# Clean journal logs exceeding 500MB total
sudo journalctl --vacuum-size=500M

# Clean apt package cache
sudo apt clean
```
