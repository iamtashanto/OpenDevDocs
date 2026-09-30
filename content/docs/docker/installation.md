---
title: "Installing Docker Engine & Docker Desktop"
description: Install official Docker Engine on Ubuntu/Debian Linux, Docker Desktop on macOS/Windows, and configure non-root user permissions.
category: devops
topic: docker
type: guide
level: beginner
tags:
  - docker
  - installation
  - devops
  - linux
  - macos
  - windows
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

## 1. Ubuntu / Debian Linux (Official Docker Engine)

```bash
# 1. Remove obsolete unofficial packages
sudo apt remove -y docker.io docker-doc docker-compose podman-docker containerd runc

# 2. Setup Docker apt repository
sudo apt update
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# 3. Add repository to apt sources
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 4. Install Docker packages
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

## 2. Post-Installation: Run Docker without `sudo`

By default, the Docker daemon binds to a Unix socket owned by `root:docker`. Add your non-root user to the `docker` group:

```bash
# Add current user to docker group
sudo usermod -aG docker $USER

# Apply group changes to current shell session (or log out and back in)
newgrp docker

# Verify permissions by running hello-world without sudo
docker run hello-world
```

---

## 3. macOS & Windows (Docker Desktop)

- **macOS**: Install via Homebrew: `brew install --cask docker`. Runs a lightweight Linux virtual machine behind the scenes to provide the Linux kernel.
- **Windows**: Install Docker Desktop with **WSL 2 (Windows Subsystem for Linux)** backend for near-native Linux kernel execution.

---

## 4. Verifying Docker & Compose Installation

```bash
docker --version
# Output: Docker version 27.2.0

docker compose version
# Output: Docker Compose version v2.29.2
```
