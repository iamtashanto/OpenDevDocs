---
title: "Docker: permission denied while connecting to daemon socket"
description: Fix Linux Docker daemon permission errors without needing to run sudo docker on every command.
category: devops
topic: docker
type: troubleshooting
level: beginner
tags:
  - docker
  - permissions
  - linux
  - socket
platforms:
  - linux
tested:
  docker: "27.x"
  ubuntu: "24.04"
lastVerified: "2026-09-30"
---

## Error Message

```text
docker: Got permission denied while trying to connect to the Docker daemon socket
at unix:///var/run/docker.sock: Get "http://%2Fvar%2Frun%2Fdocker.sock/v1.47/containers/json":
dial unix /var/run/docker.sock: connect: permission denied.
```

---

## Symptoms

- Running any docker command (`docker ps`, `docker run`) fails with permission denied.
- Prepending `sudo docker ps` works, but requiring `sudo` on every command breaks VS Code containers, Docker Compose, and developer tooling.

---

## Why It Happens

The Docker daemon always runs as the `root` superuser and communicates over the Unix domain socket `/var/run/docker.sock`. By default, this socket file is owned by `root:docker` with `rw-rw----` permissions.

If your Linux user account is not an active member of the `docker` system group, the operating system blocks unprivileged access to the socket.

---

## Quick Fix (1-Liner)

```bash
sudo usermod -aG docker $USER && newgrp docker
```

---

## Step-by-Step Fix

<Steps>
  <Step step={1} title="Create Docker Group (If Missing)">
    ```bash
    sudo groupadd docker
    ```
  </Step>

  <Step step={2} title="Add Current User to Docker Group">
    ```bash
    sudo usermod -aG docker $USER
    ```
  </Step>

  <Step step={3} title="Apply Group Membership Immediately">
    Activate the new group permissions without having to reboot or log out:
    ```bash
    newgrp docker
    ```
  </Step>

  <Step step={4} title="Verify Docker Access">
    ```bash
    docker run --rm hello-world
    ```
  </Step>
</Steps>
