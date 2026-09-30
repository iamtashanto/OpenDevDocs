---
title: "Linux Users & Groups Management"
description: Manage Linux user accounts, groups, /etc/passwd, /etc/shadow, sudo privileges, and security best practices.
category: linux
topic: linux
type: guide
level: intermediate
tags:
  - linux
  - users
  - groups
  - sudo
  - security
platforms:
  - linux
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Overview

Linux is a multi-user operating system where access rights and process privileges are segregated by **User IDs (UID)** and **Group IDs (GID)**.

---

## 1. Creating Users and Groups

```bash
# Create a new user with home directory and bash shell
sudo useradd -m -s /bin/bash deployer

# Set or change user password
sudo passwd deployer

# Create a new group
sudo groupadd docker_users

# Add user to a secondary group
sudo usermod -aG sudo,docker_users deployer
```

---

## 2. Managing `sudo` Privileges

The `sudo` (Superuser Do) command allows authorized users to execute commands with root administrative privileges without logging in directly as `root`.

Granting a user sudo access on Ubuntu/Debian:
```bash
sudo usermod -aG sudo alice
```

### Editing the Sudoers File (`visudo`)
Always use `visudo` to edit `/etc/sudoers` because it validates syntax before saving:
```bash
sudo visudo
```
Example passwordless sudo rule for deployment bots:
```
deployer ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx
```

---

## 3. Important User Files

- **`/etc/passwd`**: World-readable database of all local user accounts (`username:x:UID:GID:comment:home:shell`).
- **`/etc/shadow`**: Strictly protected file containing salted cryptographic password hashes (readable only by root).
- **`/etc/group`**: List of all system groups and their respective members.

---

## 4. Deleting Users

```bash
# Delete user while removing their home directory and mail spool
sudo userdel -r old_user
```
