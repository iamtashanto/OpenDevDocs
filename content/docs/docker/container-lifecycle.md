---
title: "Docker Container Lifecycle & States"
description: Complete guide to container lifecycle states (created, running, paused, stopped, dead), transitions, and lifecycle commands.
category: devops
topic: docker
type: concept
level: beginner
tags:
  - docker
  - lifecycle
  - containers
  - states
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

A Docker container moves through well-defined lifecycle states from creation to destruction.

---

## Container State Transition Diagram

```
                 docker create
   [ Image ] ─────────────────────► [ CREATED ]
                                        │
                                        │ docker start
                                        ▼
    docker pause                  [ RUNNING ] ◄───────────────────┐
 ┌─────────────── [ PAUSED ]            │                         │ docker restart
 │                    │                 │ docker stop (SIGTERM)   │
 │ docker unpause     │                 ▼                         │
 └────────────────────┴──────────► [ STOPPED / EXITED ] ──────────┘
                                        │
                                        │ docker rm
                                        ▼
                                  [ DESTROYED ]
```

---

## Container Lifecycle Commands

| Command | Action | Signal Sent |
| :--- | :--- | :--- |
| `docker create` | Creates writable container layer without starting PID 1 | None |
| `docker start` | Starts an existing created or stopped container | None |
| `docker stop` | Gracefully stops container (default 10s timeout before kill) | `SIGTERM` $\rightarrow$ `SIGKILL` |
| `docker restart`| Stops and starts container | `SIGTERM` $\rightarrow$ `SIGKILL` $\rightarrow$ Start |
| `docker pause` | Freezes container processes using cgroups freezer | `SIGSTOP` |
| `docker unpause`| Unfreezes container processes | `SIGCONT` |
| `docker kill` | Immediately terminates container process | `SIGKILL` |
| `docker rm` | Deletes stopped container and its writable layer | None |

---

## Cleaning Up Containers

```bash
# Stop all running containers
docker stop $(docker ps -q)

# Remove all stopped containers
docker rm $(docker ps -a -q)

# Prune all stopped containers in one step
docker container prune -f
```

---

## Related Topics

- [Docker Run](/docs/docker/run)
- [Docker Logs](/docs/docker/logs)
- [Troubleshooting: Container Exits Immediately](/errors/docker/container-exits-immediately)
