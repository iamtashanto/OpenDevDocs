---
title: "Docker Build & BuildKit"
description: Complete guide to building Docker images with docker build, BuildKit features, build contexts, build arguments, and caching strategies.
category: devops
topic: docker
type: guide
level: beginner
tags:
  - docker
  - build
  - buildkit
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

The `docker build` command compiles a `Dockerfile` and its surrounding context into a runnable Docker image.

---

## Basic Build Syntax

```bash
docker build [OPTIONS] PATH | URL | -
```

```bash
# Build an image from current directory and tag it
docker build -t myapp:1.0.0 .

# Build with a custom Dockerfile name
docker build -f Dockerfile.prod -t myapp:prod .

# Build without using cached layers
docker build --no-cache -t myapp:fresh .
```

---

## The Build Context

The final argument (`.`) specifies the **Build Context**. The Docker CLI packages and sends this entire directory to the Docker daemon/BuildKit engine before executing instructions.

> [!WARNING]
> If you run `docker build -t myapp .` from your root folder without a `.dockerignore` file, you may accidentally send hundreds of megabytes (like `node_modules` or `.git`) to the Docker daemon.

---

## BuildKit: Next-Generation Builder

Modern Docker versions enable BuildKit by default. BuildKit features include:
- Parallel stage execution in multi-stage builds.
- Efficient mount caches (`RUN --mount=type=cache,target=/root/.npm`).
- Secret mounts that do not leak into final image layers (`RUN --mount=type=secret,id=npmrc`).

```bash
# Explicitly enable BuildKit (if disabled)
export DOCKER_BUILDKIT=1
docker build -t myapp:latest .
```

---

## Build Arguments (`ARG`)

Build arguments pass dynamic values at build time that are NOT persisted in the running container environment:

```dockerfile
# Dockerfile
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine
ARG APP_ENV=production
RUN echo "Building for $APP_ENV"
```

```bash
# CLI execution
docker build --build-arg NODE_VERSION=20 --build-arg APP_ENV=staging -t myapp:staging .
```

---

## Multi-Platform Builds (`docker buildx`)

Build images for multiple CPU architectures (e.g. `linux/amd64` and `linux/arm64`) using Buildx:

```bash
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 -t username/myapp:latest --push .
```

---

## Related Topics

- [Dockerfile Reference](/docs/docker/dockerfile)
- [.dockerignore File](/docs/docker/dockerignore)
- [Multi-Stage Builds](/docs/docker/multi-stage-builds)
