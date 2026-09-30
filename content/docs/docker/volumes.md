---
title: "Docker Volumes & Data Persistence"
description: Complete guide to Docker data storage, including named volumes, bind mounts, tmpfs mounts, volume drivers, and backup/restore strategies.
category: devops
topic: docker
type: guide
level: intermediate
tags:
  - docker
  - volumes
  - storage
  - persistence
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

Containers are ephemeral by default; any data written to the container's writable layer is destroyed when the container is removed. Docker provides three mechanisms for persistent data storage:

```
┌─────────────────────────────────────────────────────────────┐
│ Docker Storage Types                                        │
├─────────────────┬─────────────────────────┬─────────────────┤
│ Named Volumes   │ Bind Mounts             │ tmpfs Mounts    │
│ Managed by      │ Direct mapping to host  │ Stored in host  │
│ Docker daemon   │ file or directory path  │ memory (RAM)    │
│ (/var/lib/docker)                         │ (Linux only)    │
└─────────────────┴─────────────────────────┴─────────────────┘
```

---

## 1. Named Volumes (Production Recommended)

Managed by Docker and isolated from host core filesystems.

```bash
# Create a named volume
docker volume create pg_data

# Run container with volume mounted
docker run -d \
  --name db \
  -v pg_data:/var/lib/postgresql/data \
  postgres:16-alpine

# Inspect volume details (Mountpoint on host)
docker volume inspect pg_data

# List all volumes
docker volume ls

# Delete unused volumes
docker volume prune
```

---

## 2. Bind Mounts (Local Development)

Maps an exact host directory into the container. Ideal for live code reloading.

```bash
# Mount current working directory into /app
docker run -d \
  --name dev-app \
  -v "$(pwd):/app" \
  -p 3000:3000 \
  node:22-alpine
```

### Modern `--mount` Syntax
```bash
docker run -d \
  --name dev-app \
  --mount type=bind,source="$(pwd)",target=/app \
  node:22-alpine
```

---

## 3. Backing Up and Restoring Volumes

### Backup Volume to Tar Archive
```bash
docker run --rm \
  -v pg_data:/data \
  -v "$(pwd)":/backup \
  alpine tar -czvf /backup/pg_data_backup.tar.gz -C /data .
```

### Restore Volume from Tar Archive
```bash
docker run --rm \
  -v pg_data:/data \
  -v "$(pwd)":/backup \
  alpine tar -xzvf /backup/pg_data_backup.tar.gz -C /data
```

---

## Related Topics

- [Docker Compose](/docs/docker/docker-compose)
- [PostgreSQL with Docker Compose](/recipes/docker/postgres-docker-compose)
- [Troubleshooting: Disk Space Issues](/errors/docker/disk-space-issues)
