---
title: Docker Installation on Ubuntu
description: Install and configure Docker Engine, containerd, and Docker Compose on Ubuntu Linux.
category: devops
topic: docker
type: guide
level: beginner
tags:
  - docker
  - ubuntu
  - containers
  - linux
platforms:
  - linux
tested:
  docker: "27.x"
  ubuntu: "24.04"
lastVerified: "2026-09-30"
---

## Overview

This guide walks through configuring the official Docker APT repository and installing Docker Engine, containerd, and the Docker Compose plugin on Ubuntu.

---

<Steps>
  <Step step={1} title="Uninstall Conflicting Packages">
    Ubuntu includes unofficial distribution packages that can conflict with the official Docker Engine.
    
    ```bash
    for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do
      sudo apt-get remove -y $pkg
    done
    ```
  </Step>

  <Step step={2} title="Set Up Docker APT Repository">
    Install prerequisites and add Docker's official GPG key:

    ```bash
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```
  </Step>

  <Step step={3} title="Install Docker Engine">
    Update APT index and install the latest Docker packages:

    ```bash
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```
  </Step>

  <Step step={4} title="Manage Docker as a Non-Root User">
    Add your user to the `docker` group to run docker commands without `sudo`:

    ```bash
    sudo usermod -aG docker $USER
    newgrp docker
    ```
  </Step>
</Steps>

---

## Verify Installation

```bash
docker run hello-world
```
