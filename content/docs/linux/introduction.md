---
title: "Introduction to Linux"
description: Understand the Linux operating system, kernel architecture, distributions (Ubuntu, Debian, Alpine, RHEL), and CLI workflows.
category: linux
topic: linux
type: concept
level: beginner
tags:
  - linux
  - devops
  - kernel
  - distributions
  - os
platforms:
  - linux
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## What is Linux?

Linux is a free, open-source Unix-like operating system kernel created by Linus Torvalds in 1991. Today, Linux powers over 90% of the world's cloud infrastructure, web servers, supercomputers, Android devices, and containerized Docker environments.

---

## Linux Architecture Layers

```
+---------------------------------------------------------+
|                  User Space Applications                |
|             (Web Servers, Databases, Node.js, CLI)      |
+---------------------------------------------------------+
|               GNU C Library (glibc / musl)              |
+---------------------------------------------------------+
|                      System Calls                       |
+---------------------------------------------------------+
|                      Linux Kernel                       |
|   (Process Scheduler, Memory Manager, VFS, Drivers)     |
+---------------------------------------------------------+
|                   Physical Hardware                     |
|                (CPU, RAM, Disks, NICs)                  |
+---------------------------------------------------------+
```

---

## Popular Linux Distributions (Distros)

- **Ubuntu / Debian**: The most widespread server distributions. Known for stability, massive package repositories (`apt`), and extensive community support.
- **Alpine Linux**: Ultra-lightweight (~5MB base image) built on `musl` libc and `busybox`. The industry standard for minimal Docker container images.
- **RHEL / Rocky Linux / AlmaLinux**: Enterprise-grade distributions utilizing RPM package managers (`dnf`/`yum`) and SELinux mandatory access controls.
- **Arch Linux**: Rolling-release distro favored for cutting-edge developer workstations.

---

## The Unix Philosophy

1. **Everything is a File**: Hardware devices, network sockets, running process metrics (`/proc`), and storage disks are exposed through the unified virtual filesystem.
2. **Write Programs That Do One Thing Well**: Small, modular single-purpose utilities.
3. **Write Programs to Work Together**: Connect utility inputs and outputs using pipes (`|`) and text streams.
