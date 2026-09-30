---
title: "Linux SSH Configuration & Hardening"
description: Generate Ed25519 SSH keypairs, configure ~/.ssh/config, manage authorized_keys, and harden sshd_config against unauthorized access.
category: linux
topic: linux
type: guide
level: intermediate
tags:
  - linux
  - ssh
  - security
  - devops
  - authentication
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## 1. Generating Modern SSH Keypairs (Ed25519)

> [!NOTE]
> Modern cryptographic standards recommend **Ed25519** over legacy RSA keys because Ed25519 offers stronger security with faster signature computation and compact key lengths.

```bash
# Generate Ed25519 keypair with an email label
ssh-keygen -t ed25519 -C "admin@example.com" -f ~/.ssh/id_ed25519
```

This produces two files:
- **`~/.ssh/id_ed25519`**: **Private Key** (Never share, permissions `600`).
- **`~/.ssh/id_ed25519.pub`**: **Public Key** (Copied to remote servers, permissions `644`).

---

## 2. Copying Public Key to Remote Server

```bash
# Automated copy to remote server's ~/.ssh/authorized_keys
ssh-copy-id -i ~/.ssh/id_ed25519.pub deployer@192.0.2.10
```

---

## 3. Simplifying Connections with `~/.ssh/config`

Configure aliases and key mappings so you can connect via `ssh production`:

```
# ~/.ssh/config
Host production
    HostName 192.0.2.10
    User deployer
    Port 22
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 60
```

Connect:
```bash
ssh production
```

---

## 4. Server-Side SSH Hardening (`/etc/ssh/sshd_config`)

To protect your Linux server from automated brute-force attacks:

```ini
# /etc/ssh/sshd_config

# Disable root direct SSH login
PermitRootLogin no

# Disable insecure password authentication (Keys ONLY)
PasswordAuthentication no
PermitEmptyPasswords no

# Use modern cryptographic algorithms
PubkeyAuthentication yes
```

Test syntax and restart SSH daemon:
```bash
sudo sshd -t && sudo systemctl restart sshd
```
