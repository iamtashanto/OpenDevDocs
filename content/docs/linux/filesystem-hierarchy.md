---
title: "Linux Filesystem Hierarchy Standard (FHS)"
description: Master the Linux directory tree layout (/etc, /var, /home, /bin, /usr, /proc, /tmp) and where software stores files.
category: linux
topic: linux
type: concept
level: beginner
tags:
  - linux
  - filesystem
  - fhs
  - directories
  - devops
platforms:
  - linux
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Overview

Unlike Windows with drive letters (`C:\`, `D:\`), Linux organizes all storage drives, partitions, and virtual filesystems beneath a single root directory denoted by forward slash **`/`**.

---

## The Linux Directory Tree

```
/ (Root)
├── bin -> usr/bin       # Essential user executable binaries (ls, cp, cat)
├── boot                 # Linux kernel bootloader files (vmlinuz, initrd)
├── dev                  # Device nodes (/dev/null, /dev/random, /dev/sda)
├── etc                  # Host-wide system configuration files (nginx.conf, sshd_config)
├── home                 # User home directories (/home/alice)
├── lib -> usr/lib       # Shared system libraries and kernel modules
├── media / mnt          # Mount points for removable media and network shares
├── opt                  # Optional add-on third-party software packages
├── proc                 # Virtual pseudo-filesystem exposing kernel & process metrics
├── root                 # Home directory of the root superuser
├── run                  # Runtime transient data since last boot (PID files, sockets)
├── sbin -> usr/sbin     # System administration binaries (fdisk, iptables, reboot)
├── sys                  # Virtual filesystem exposing kernel hardware devices & drivers
├── tmp                  # Temporary scratch files (cleared upon reboot)
├── usr                  # User utilities and applications (/usr/local/bin)
└── var                  # Variable data (logs in /var/log, databases in /var/lib)
```

---

## Key Directories for Developers & DevOps

- **`/etc/`**: Where application and server configuration files live (e.g. `/etc/nginx/`, `/etc/environment`, `/etc/hosts`).
- **`/var/log/`**: Where system logs and service outputs are written (e.g. `/var/log/syslog`, `/var/log/nginx/access.log`).
- **`/var/lib/`**: Persistent state of databases (e.g. PostgreSQL data directory in `/var/lib/postgresql/data`).
- **`/proc/`**: In-memory inspection directory. Reading `/proc/cpuinfo` or `/proc/meminfo` queries real-time kernel hardware statistics.
- **`/tmp/`**: Safe place for temporary downloads, build scripts, and socket files.
