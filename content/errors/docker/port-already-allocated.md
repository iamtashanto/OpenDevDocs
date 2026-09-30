---
title: "Docker: Bind for 0.0.0.0:PORT failed: port is already allocated"
description: Fix port conflict errors in Docker and Docker Compose when another container or host service is already listening on the requested port.
category: devops
topic: docker
type: troubleshooting
level: beginner
tags:
  - docker
  - networking
  - ports
  - errors
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

## Error Message

```text
docker: Error response from daemon: driver failed programming external connectivity on endpoint my-app:
Bind for 0.0.0.0:3000 failed: port is already allocated.
```

or in Docker Compose:
```text
Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:5432 -> 0.0.0.0:0: listen tcp 0.0.0.0:5432: bind: address already in use
```

---

## Symptoms

- `docker run -p 3000:3000` or `docker compose up` fails to start.
- The container immediately terminates or fails during initialization.
- Error message states `port is already allocated` or `bind: address already in use`.

---

## Why It Happens

A network port on a given network interface (e.g. `0.0.0.0:3000`) can only be bound by **one single operating system process** at any given moment. This error happens when:
1. An existing background Docker container is already publishing that port.
2. A native host service (e.g. local PostgreSQL running via `systemd` or Homebrew, or a stray Node.js process) is already listening on the host port.

---

## Quick Fix (1-Liner)

### Check and stop the conflicting Docker container:
```bash
docker ps --filter "publish=3000" --format "{{.ID}}" | xargs -r docker stop
```

---

## Step-by-Step Fix

<Steps>
  <Step step={1} title="Find What is Using the Port">
    **Check Docker containers first:**
    ```bash
    docker ps -a --filter "publish=3000"
    ```

    **Check native host processes (macOS/Linux):**
    ```bash
    # Find process ID using port 3000
    lsof -i :3000
    # or with ss
    ss -tulpn | grep 3000
    ```

    **Check native host processes (Windows PowerShell):**
    ```powershell
    Get-NetTCPConnection -LocalPort 3000 | Format-Table -Property OwningProcess
    ```
  </Step>

  <Step step={2} title="Stop the Conflicting Process or Container">
    If it is an existing container:
    ```bash
    docker stop <container_name_or_id>
    docker rm <container_name_or_id>
    ```

    If it is a host process (e.g. PID 14232):
    ```bash
    kill -9 14232
    ```
  </Step>

  <Step step={3} title="Alternative: Change the Host Port Mapping">
    If the conflicting service needs to keep running, map a different host port:

    ```bash
    # Map host port 3001 to container port 3000
    docker run -d -p 3001:3000 my-image
    ```

    In `compose.yaml`:
    ```yaml
    ports:
      - "3001:3000"
    ```
  </Step>
</Steps>

---

## Related Topics

- [Docker Ports Reference](/docs/docker/ports)
- [Error: EADDRINUSE](/errors/node/eaddrinuse)
- [Docker Compose Guide](/docs/docker/docker-compose)
