---
title: "Linux Package Management (apt, dnf, apk)"
description: Install, update, upgrade, and manage operating system packages across Ubuntu/Debian (apt), RedHat/Fedora (dnf), and Alpine Linux (apk).
category: linux
topic: linux
type: guide
level: beginner
tags:
  - linux
  - package-manager
  - apt
  - dnf
  - apk
  - devops
platforms:
  - linux
tested:
  linux: "Ubuntu 24.04 / Alpine 3.20"
lastVerified: "2026-09-30"
---

## Overview

Linux package managers download pre-compiled software binaries, resolve dependency trees, and handle automated security updates.

---

## 1. Debian & Ubuntu (`apt`)

```bash
# Update repository package metadata list
sudo apt update

# Upgrade all installed packages to latest versions
sudo apt upgrade -y

# Install new packages
sudo apt install -y curl git nginx build-essential

# Remove a package (keeps config files)
sudo apt remove nginx

# Purge package and all associated configuration files
sudo apt purge nginx

# Remove orphaned dependencies no longer needed
sudo apt autoremove -y

# Clean downloaded .deb cache
sudo apt clean
```

---

## 2. RHEL / CentOS / Rocky / Fedora (`dnf` / `yum`)

```bash
# Check for updates and upgrade system
sudo dnf upgrade -y

# Install packages
sudo dnf install -y nginx git

# Remove package
sudo dnf remove -y nginx
```

---

## 3. Alpine Linux (`apk`) (Docker Containers)

```bash
# Update package index and install without caching tarballs (keeps Docker image small)
apk update && apk add --no-cache curl ca-certificates bash

# Remove package
apk del curl
```

---

## Command Quick Reference

| Action | Ubuntu/Debian (`apt`) | RHEL/Fedora (`dnf`) | Alpine (`apk`) |
| :--- | :--- | :--- | :--- |
| **Update Index** | `apt update` | `dnf check-update` | `apk update` |
| **Upgrade System** | `apt upgrade` | `dnf upgrade` | `apk upgrade` |
| **Install Package** | `apt install <pkg>` | `dnf install <pkg>` | `apk add <pkg>` |
| **Remove Package** | `apt remove <pkg>` | `dnf remove <pkg>` | `apk del <pkg>` |
| **Search Package** | `apt search <term>` | `dnf search <term>` | `apk search <term>` |
