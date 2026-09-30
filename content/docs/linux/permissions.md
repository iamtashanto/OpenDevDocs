---
title: "Linux File Permissions & chmod / chown"
description: Master Linux permissions, read-write-execute (rwx) bits, octal values (755, 644, 600), chmod, chown, and file ownership.
category: linux
topic: linux
type: guide
level: intermediate
tags:
  - linux
  - permissions
  - chmod
  - chown
  - security
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## Reading File Permissions (`ls -la`)

```
-rwxr-xr--  1 alice developers  4096 Oct 01 02:00 deploy.sh
┬───┬───┬───
│ User Group Other
│ (rwx) (r-x) (r--)
│
└── File Type: '-' = regular file, 'd' = directory, 'l' = symlink
```

---

## Permission Bits & Numerical (Octal) Values

Each entity class (**User / Owner**, **Group**, **Others**) has three permission flags:

| Permission | Symbol | Value | Meaning for Files | Meaning for Directories |
| :--- | :--- | :--- | :--- | :--- |
| **Read** | `r` | **4** | Read file content | List folder contents (`ls`) |
| **Write** | `w` | **2** | Modify/overwrite file | Create, rename, or delete files inside |
| **Execute** | `x` | **1** | Run as a binary/script | Enter/traverse directory (`cd`) |
| **None** | `-` | **0** | No permissions | No access |

---

## Common Standard Permission Numbers

- **`755` (`rwxr-xr-x`)**: Standard for executable scripts and public directories. Owner can read/write/execute; everyone else can read/execute.
- **`644` (`rw-r--r--`)**: Standard for regular public/web files (HTML, images, JS). Owner can read/write; others can read only.
- **`600` (`rw-------`)**: Standard for private secrets and SSH private keys (`~/.ssh/id_ed25519`). Only the owner can read/write.
- **`700` (`rwx------`)**: Standard for private directories (`~/.ssh`).

---

## Modifying Permissions (`chmod`)

```bash
# Octal notation
chmod 755 deploy.sh
chmod 600 ~/.ssh/id_rsa

# Symbolic notation
chmod +x script.sh          # Add execute to everyone
chmod u=rw,go=r file.txt    # Owner rw, group and others r
chmod -R 755 /var/www/html  # Recursive mode
```

---

## Changing Ownership (`chown` & `chgrp`)

```bash
# Change owner to www-data
sudo chown www-data /var/www/html/index.html

# Change owner and group simultaneously
sudo chown -R nodejs:nodejs /app

# Change group only
sudo chgrp developers /shared_folder
```
