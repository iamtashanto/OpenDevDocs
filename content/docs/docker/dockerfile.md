---
title: "Dockerfile Reference & Instructions"
description: Complete reference for writing clean, efficient, and secure Dockerfiles using standard instructions like FROM, WORKDIR, COPY, RUN, CMD, and ENTRYPOINT.
category: devops
topic: docker
type: guide
level: beginner
tags:
  - docker
  - dockerfile
  - devops
  - containers
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

A **Dockerfile** is a plain text recipe containing sequential instructions that Docker uses to automatically build a container image.

---

## Core Dockerfile Instructions

| Instruction | Purpose | Example |
| :--- | :--- | :--- |
| `FROM` | Sets the base image for subsequent instructions | `FROM node:22-alpine` |
| `WORKDIR` | Sets the active working directory inside the image | `WORKDIR /app` |
| `COPY` | Copies files/directories from host to image filesystem | `COPY package*.json ./` |
| `ADD` | Like `COPY`, but supports auto-extracting tar archives and URLs | `ADD archive.tar.gz /data/` |
| `RUN` | Executes commands during image build time (creates a layer) | `RUN npm ci --only=production` |
| `ENV` | Sets persistent environment variables | `ENV NODE_ENV=production` |
| `EXPOSE` | Documents network ports the application listens on | `EXPOSE 3000` |
| `VOLUME` | Defines a mount point for external data persistence | `VOLUME ["/var/lib/data"]` |
| `USER` | Sets the non-root user UID/GID for subsequent commands | `USER node` |
| `CMD` | Default command and arguments executed when container runs | `CMD ["node", "dist/index.js"]` |
| `ENTRYPOINT`| Configures a container to run as an executable | `ENTRYPOINT ["docker-entrypoint.sh"]` |

---

## Standard Dockerfile Example

```dockerfile
# 1. Choose minimal base image
FROM node:22-alpine

# 2. Set working directory
WORKDIR /usr/src/app

# 3. Copy package manifests first for optimal layer caching
COPY package.json package-lock.json ./

# 4. Install production dependencies
RUN npm ci --omit=dev

# 5. Copy remaining application source code
COPY . .

# 6. Set unprivileged user for security
USER node

# 7. Expose documentation port
EXPOSE 3000

# 8. Start application with exec form
CMD ["node", "src/server.js"]
```

---

## Shell Form vs. Exec Form

Instructions like `RUN`, `CMD`, and `ENTRYPOINT` support two syntax forms:

### 1. Exec Form (Recommended)
JSON array syntax that invokes the binary directly without spawning a shell:
```dockerfile
CMD ["node", "server.js"]
```
- Passes Linux signals (`SIGTERM`, `SIGINT`) directly to the process (PID 1).
- Allows graceful container shutdown.

### 2. Shell Form
Raw string parsed and executed through `/bin/sh -c`:
```dockerfile
CMD node server.js
```
- Spawns `/bin/sh` as PID 1, which may swallow termination signals and prevent clean exit.

---

## `ENTRYPOINT` vs `CMD`

- **`ENTRYPOINT`**: Defines the fixed command that is always executed.
- **`CMD`**: Supplies default parameters to `ENTRYPOINT` or acts as default command if no `ENTRYPOINT` is defined.

```dockerfile
ENTRYPOINT ["node"]
CMD ["server.js"]
```
Overriding at runtime:
```bash
docker run my-image app.js # Executes: node app.js
```

---

## Related Guides

- [Docker Multi-Stage Builds](/docs/docker/multi-stage-builds)
- [.dockerignore Syntax](/docs/docker/dockerignore)
- [Docker Buildx](/docs/docker/build)
- [Production Best Practices](/docs/docker/production-best-practices)
