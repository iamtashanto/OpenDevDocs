---
title: "Docker: no space left on device / Disk space issues"
description: Fix no space left on device errors in Docker by cleaning dangling images, build caches, stopped containers, and unattached volumes.
category: devops
topic: docker
type: troubleshooting
level: beginner
tags:
  - docker
  - disk
  - prune
  - storage
  - errors
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

## Error Message

```text
ERROR: failed to solve: failed to compute cache key: failed to copy: write /var/lib/docker/overlay2/...: no space left on device
```
or
```text
docker: Error response from daemon: mkdir /var/lib/docker/overlay2/...: no space left on device.
```

---

## Symptoms

- `docker build`, `docker pull`, or `docker run` fails with `no space left on device`.
- Docker Desktop or host disk usage reaches 100%.

---

## Why It Happens

Over time, Docker accumulates:
1. **Dangling images**: Untagged intermediate layers from repeated builds (`<none>:<none>`).
2. **BuildKit cache**: Gigabytes of cached build step results.
3. **Stopped containers**: Preserved container layers with local logs and tmp files.
4. **Orphaned volumes**: Unattached persistent data volumes.

---

## Quick Fix (Reclaim Maximum Disk Space)

```bash
# Clean stopped containers, unused networks, dangling images, and build cache
docker system prune -a --volumes -f
```

> [!WARNING]
> The `--volumes` flag deletes all volumes not attached to a currently running container. Ensure your database data is backed up before pruning volumes!

---

## Step-by-Step Diagnostic and Clean Up

<Steps>
  <Step step={1} title="Check Docker Disk Usage Breakdown">
    Inspect exactly how much disk space images, containers, volumes, and build cache are consuming:

    ```bash
    docker system df
    ```
  </Step>

  <Step step={2} title="Prune BuildKit Cache">
    BuildKit cache is often the largest consumer of disk space (frequently 20GB+):

    ```bash
    docker builder prune -a -f
    ```
  </Step>

  <Step step={3} title="Prune Unused Images">
    Remove all images not referenced by any running container:

    ```bash
    docker image prune -a -f
    ```
  </Step>

  <Step step={4} title="Prune Anonymous and Unused Volumes">
    ```bash
    docker volume prune -f
    ```
  </Step>

  <Step step={5} title="Docker Desktop (macOS / Windows): Resize Virtual Disk">
    If running Docker Desktop, the virtual disk image (`Docker.raw` or WSL2 `ext4.vhdx`) may need resizing or compacting:
    - Open **Docker Desktop Settings** $\rightarrow$ **Resources** $\rightarrow$ **Advanced**.
    - Adjust **Virtual disk limit** or click **Clean / Purge data**.
  </Step>
</Steps>

---

## Related Topics

- [Docker Volumes](/docs/docker/volumes)
- [Docker Logs Rotation](/docs/docker/logs)
- [Linux df and du Commands](/commands/linux/df)
