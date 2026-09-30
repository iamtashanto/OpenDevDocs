---
title: "Docker Resource Management & Limits"
description: Complete guide to limiting container CPU, memory, swap, and disk I/O using Linux control groups (cgroups v2) to prevent noisy neighbor and OOM kills.
category: devops
topic: docker
type: guide
level: intermediate
tags:
  - docker
  - resources
  - memory
  - cpu
  - cgroups
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

By default, a Docker container has no resource constraints and can consume as much CPU, RAM, and swap as the host kernel scheduler allows. In production, setting resource constraints protects hosts from crashing due to memory leaks and rogue processes.

---

## Memory Constraints (`--memory`)

| Flag | Description | Example |
| :--- | :--- | :--- |
| `-m`, `--memory` | Hard memory limit (triggers Out-Of-Memory killer if exceeded) | `--memory=512m` |
| `--memory-reservation` | Soft memory limit (Docker attempts to free memory when host is low) | `--memory-reservation=256m` |
| `--memory-swap` | Total amount of memory plus swap (set to equal `--memory` to disable swap) | `--memory=512m --memory-swap=512m` |
| `--oom-kill-disable` | Prevents kernel OOM killer from terminating the container | Use with caution |

### Running with Memory Limits
```bash
docker run -d --name api-service \
  --memory=512m \
  --memory-swap=512m \
  my-api-image
```

---

## CPU Constraints (`--cpus`)

| Flag | Description | Example |
| :--- | :--- | :--- |
| `--cpus` | Maximum fractional CPU cores the container can use | `--cpus=1.5` |
| `--cpu-shares` | Relative CPU weighting priority (default 1024) | `--cpu-shares=512` |
| `--cpuset-cpus` | Pins container execution to specific core IDs | `--cpuset-cpus="0,1"` |

```bash
# Limit container to at most 2 CPU cores
docker run -d --name worker --cpus=2.0 worker-image
```

---

## Resource Limits in Docker Compose

```yaml
services:
  web:
    image: my-app:latest
    deploy:
      resources:
        limits:
          cpus: '0.75'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

---

## Live Monitoring (`docker stats`)

Stream real-time CPU, RAM, Network, and Disk I/O usage across all running containers:

```bash
docker stats

# Non-streaming snapshot
docker stats --no-stream
```

---

## Related Topics

- [Docker Security Basics](/docs/docker/security)
- [Production Best Practices](/docs/docker/production-best-practices)
- [Linux Control Groups (cgroups)](/docs/linux/processes)
