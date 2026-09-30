---
title: "docker run"
description: Create and start a new container from a Docker image with port mapping and environment variables.
category: devops
topic: docker
type: reference
level: beginner
tags:
  - docker
  - containers
  - cli
  - run
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

## Command

<Command>docker run -d --name web-app -p 3000:3000 -e NODE_ENV=production node:22-alpine</Command>

---

## Short Description

`docker run` creates a writeable container layer over the specified image and executes it with provided environment variables, network port mappings, and volume mounts.

---

## Syntax

```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

---

## Examples

### 1. Run Background Web Server with Port Mapping

```bash
docker run -d \
  --name my-nginx \
  -p 8080:80 \
  -v $(pwd)/html:/usr/share/nginx/html:ro \
  --restart unless-stopped \
  nginx:alpine
```

### 2. Run Interactive Ephemeral Container

```bash
docker run --rm -it ubuntu:24.04 bash
```

---

## Common Options

| Option | Shorthand | Description |
| :--- | :--- | :--- |
| `--detach` | `-d` | Run container in background and print container ID. |
| `--name` | | Assign a custom name to the container. |
| `--publish` | `-p host:container` | Map host port to container port (e.g. `8080:80`). |
| `--volume` | `-v host_path:container_path` | Mount a host directory or named volume. |
| `--env` | `-e KEY=VALUE` | Pass an environment variable. |
| `--rm` | | Automatically remove container when it exits. |
| `--restart` | | Restart policy (`no`, `always`, `unless-stopped`, `on-failure`). |

---

## When to Use

- Launching local services (Redis, PostgreSQL, Nginx) for development.
- Running microservices in containerized production environments.
- Executing one-off testing scripts inside clean isolated containers.

---

## Warnings

<Warning title="Port Collisions">
If the host port specified in `-p <host_port>:<container_port>` is already bound by another application, Docker will fail with `Error: bind: address already in use`.
</Warning>
