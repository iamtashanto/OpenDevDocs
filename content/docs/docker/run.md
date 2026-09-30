---
title: "Docker Run & Container Execution"
description: Complete guide to running containers with docker run, including interactive modes, detached background mode, auto-removal, restart policies, and environment configuration.
category: devops
topic: docker
type: guide
level: beginner
tags:
  - docker
  - run
  - containers
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

The `docker run` command creates a new container layer over a specified image and starts it.

---

## Basic Syntax

```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

---

## Essential Flags

| Flag | Description | Example |
| :--- | :--- | :--- |
| `-d`, `--detach` | Runs container in the background (detached mode) | `docker run -d nginx` |
| `-i`, `--interactive` | Keeps STDIN open even if not attached | `docker run -it alpine sh` |
| `-t`, `--tty` | Allocates a pseudo-TTY terminal | `docker run -it ubuntu bash` |
| `--name` | Assigns a custom name to the container | `docker run --name my-redis -d redis` |
| `-p`, `--publish` | Maps host port to container port (`HOST:CONTAINER`) | `docker run -p 8080:80 nginx` |
| `-v`, `--volume` | Mounts a volume or bind mount | `docker run -v ./data:/data redis` |
| `-e`, `--env` | Sets environment variables | `docker run -e NODE_ENV=production app` |
| `--rm` | Automatically removes container when it exits | `docker run --rm alpine ls -la` |
| `--restart` | Sets container restart policy | `docker run --restart unless-stopped app` |

---

## Common Examples

### 1. Interactive Ephemeral Shell
```bash
docker run --rm -it alpine:latest sh
```

### 2. Detached Web Server with Port Forwarding
```bash
docker run -d --name web-server -p 80:80 nginx:alpine
```

### 3. Database with Persistent Volume and Env Vars
```bash
docker run -d \
  --name local-postgres \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_USER=postgres \
  -v pgdata:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:16-alpine
```

---

## Restart Policies

| Policy | Behavior |
| :--- | :--- |
| `no` | Do not automatically restart container (Default). |
| `on-failure[:max-retries]` | Restart only if container exits with non-zero exit code. |
| `always` | Always restart regardless of exit status. Restarts on daemon reboot. |
| `unless-stopped` | Always restart unless manually stopped by `docker stop`. |

---

## Related Topics

- [Docker Ports](/docs/docker/ports)
- [Docker Volumes](/docs/docker/volumes)
- [Container Lifecycle](/docs/docker/container-lifecycle)
- [Troubleshooting: Port Already Allocated](/errors/docker/port-already-allocated)
