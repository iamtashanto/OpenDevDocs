---
title: "The .dockerignore File & Build Optimization"
description: Complete guide to using .dockerignore to exclude unnecessary files from the build context, speed up builds, and protect secrets.
category: devops
topic: docker
type: guide
level: beginner
tags:
  - docker
  - dockerignore
  - optimization
  - security
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

The `.dockerignore` file tells the Docker CLI which files and directories to exclude when packing the **Build Context** to send to the Docker daemon.

---

## Why `.dockerignore` is Critical

1. **Faster Build Times**: Prevents transferring gigabytes of local files (like `node_modules` or `.git`) across the Docker daemon socket.
2. **Deterministic Builds**: Ensures local platform binaries (`node_modules` built on macOS) do not leak into Linux containers.
3. **Security**: Prevents accidental inclusion of `.env` files, SSH keys, credentials, and local logs into image layers.

---

## Recommended `.dockerignore` Template

```text
# Git & version control
.git
.gitignore

# Dependencies
node_modules
npm-debug.log
yarn-error.log
pnpm-lock.yaml

# Build outputs & caches
dist
build
.next
.turbo
coverage
.cache

# Environment variables & secrets
.env
.env.*
!.env.example
*.pem
*.key
id_rsa

# IDE & OS files
.vscode
.idea
.DS_Store
Thumbs.db

# Docker files
Dockerfile*
docker-compose*.yml
.dockerignore
README.md
```

---

## Pattern Matching Rules

- Line starting with `#` is a comment.
- Leading `/` matches paths relative to root context.
- Wildcards `*` match zero or more characters.
- `**` matches any number of directories recursively.
- `!` exception prefix overrides previously matched patterns.

---

## Related Guides

- [Docker Build](/docs/docker/build)
- [Dockerfile Reference](/docs/docker/dockerfile)
- [Security Basics](/docs/docker/security)
