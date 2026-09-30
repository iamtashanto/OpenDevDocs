---
title: "Docker Images & Layer Architecture"
description: Master Docker images, read-only layer caching, OverlayFS union filesystem, semantic image tagging, and image management.
category: devops
topic: docker
type: concept
level: beginner
tags:
  - docker
  - images
  - layers
  - overlayfs
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

## What is a Docker Image?

A **Docker Image** is a read-only, immutable template containing everything needed to run an application: application code, runtime libraries, system tools, and environment variables.

---

## The Read-Only Layered Architecture (OverlayFS)

Docker images are composed of stacked, read-only **Layers**. Each instruction in a `Dockerfile` (e.g. `FROM`, `COPY`, `RUN`) creates a new immutable layer:

```
┌───────────────────────────────────────────────┐
│ Container Layer (Read-Write Thin Layer)       │ <── Ephemeral changes
├───────────────────────────────────────────────┤
│ Layer 4: CMD ["node", "server.js"]            │ (Read-Only)
├───────────────────────────────────────────────┤
│ Layer 3: COPY . .                             │ (Read-Only)
├───────────────────────────────────────────────┤
│ Layer 2: RUN npm install                      │ (Read-Only - Cached)
├───────────────────────────────────────────────┤
│ Layer 1: FROM node:22-alpine                  │ (Read-Only - Cached Base)
└───────────────────────────────────────────────┘
```

When multiple containers run from the same image, they share the identical underlying read-only layers in memory, writing only to their own private, lightweight **Read-Write Container Layer**.

---

## Image Naming & Tagging Conventions

```
[registry_host[:port]/][namespace/]repository[:tag]
```

Examples:
- `node:22-alpine` $\rightarrow$ Official Node.js 22 image on Alpine Linux.
- `ghcr.io/iamtashanto/opendevdocs:v1.2.0` $\rightarrow$ Explicit registry and semver tag.
- `postgres:latest` $\rightarrow$ Defaults to `latest` if no tag is specified.

---

## Common Image Management Commands

```bash
# List local images with sizes
docker images

# Pull image from Docker Hub
docker pull redis:7-alpine

# Tag an existing image for a registry
docker tag my-app:latest ghcr.io/myorg/my-app:1.0.0

# Remove an image
docker rmi my-app:latest

# Remove all dangling/unused images
docker image prune -a
```
