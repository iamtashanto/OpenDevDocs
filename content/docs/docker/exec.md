---
title: "Docker Exec & Container Debugging"
description: Complete guide to docker exec, spawning interactive shells inside running containers, running diagnostic commands, and debugging production containers.
category: devops
topic: docker
type: guide
level: beginner
tags:
  - docker
  - exec
  - debugging
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

The `docker exec` command runs a new process inside the execution environment of an **already running** container.

---

## Basic Syntax

```bash
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

---

## Common Use Cases

### 1. Interactive Shell into a Container
```bash
# For bash-equipped images (Ubuntu, Debian, Node Full)
docker exec -it my-container bash

# For minimal Alpine Linux images (sh only)
docker exec -it my-container sh
```

### 2. Running Diagnostic Commands
```bash
# Check container disk usage
docker exec my-container df -h

# Check running processes inside container
docker exec my-container ps aux

# Verify network connectivity from container to another host
docker exec my-container ping -c 3 postgres-db
```

### 3. Running Database CLI Tools
```bash
# Connect directly to Postgres CLI inside running container
docker exec -it postgres-db psql -U postgres -d my_database
```

### 4. Executing as Specific User
```bash
# Run command as root to inspect permissions
docker exec -u 0 -it my-container whoami
```

---

## `docker exec` vs `docker run`

| Feature | `docker run` | `docker exec` |
| :--- | :--- | :--- |
| **State** | Creates a **new** container from an image | Runs a command in an **existing running** container |
| **Lifecycle** | New container PID 1, new writable layer | Sub-process in existing container namespace |
| **Use Case** | Starting services | Live debugging, inspections, CLI client access |

---

## Related Topics

- [Docker Logs](/docs/docker/logs)
- [Container Lifecycle](/docs/docker/container-lifecycle)
- [Troubleshooting: Container Exits Immediately](/errors/docker/container-exits-immediately)
