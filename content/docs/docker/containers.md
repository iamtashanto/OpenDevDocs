---
title: Docker Container Lifecycle & Management
description: Managing Docker containers, environment variables, port forwarding, bind mounts, and volume persistence.
category: devops
topic: docker
type: guide
level: beginner
tags:
  - docker
  - containers
  - devops
  - linux
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
  ubuntu: "24.04"
lastVerified: "2026-09-30"
---

## Overview

A Docker container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.

---

## Core Container Commands

```bash
# 1. Run container in background with port forwarding
docker run -d --name my-app -p 3000:3000 node:22-alpine

# 2. View running containers
docker ps

# 3. Stream real-time container logs
docker logs -f my-app

# 4. Open interactive shell inside running container
docker exec -it my-app sh

# 5. Stop and remove container
docker stop my-app && docker rm my-app
```

---

## Volume Persistence vs Bind Mounts

| Type | Syntax | Best Use Case |
| :--- | :--- | :--- |
| **Named Volume** | `-v pgdata:/var/lib/postgresql/data` | Database storage managed safely by Docker daemon. |
| **Bind Mount** | `-v $(pwd):/app` | Local development live code reload. |
| **tmpfs Mount** | `--tmpfs /tmp` | Sensitive ephemeral in-memory storage. |

<Callout type="tip" title="Graceful Shutdown">
Docker sends a `SIGTERM` signal to process PID 1 when `docker stop` is run. If the process does not terminate within 10 seconds, `SIGKILL` is sent.
</Callout>
