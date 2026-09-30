---
title: "Docker: Cannot connect to database from container (ECONNREFUSED / localhost)"
description: Fix database connection errors from Docker containers caused by using localhost instead of bridge network service names or host.docker.internal.
category: devops
topic: docker
type: troubleshooting
level: intermediate
tags:
  - docker
  - networking
  - database
  - postgresql
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
connect ECONNREFUSED 127.0.0.1:5432
```
or
```text
psql: error: connection to server at "localhost" (127.0.0.1), port 5432 failed: Connection refused
```

---

## Symptoms

- An application container crashes on startup when attempting to connect to PostgreSQL, MySQL, Redis, or MongoDB.
- You can connect to the database from your host machine via DBeaver / `psql`, but the app inside Docker fails to connect.

---

## Why It Happens

Inside a Docker container, **`localhost` (127.0.0.1)** points to the container's **own isolated network namespace**, NOT the host machine and NOT other containers!

```
┌───────────────────────────┐      ┌───────────────────────────┐
│ Container A (API Server)  │      │ Container B (PostgreSQL)  │
│ localhost:5432 (Nothing!) │ ──X─►│ localhost:5432 (Listening)│
└───────────────────────────┘      └───────────────────────────┘
```

---

## Solutions

### Solution 1: If Both App and Database are in Docker Compose (Recommended)
Use the **service name** as the hostname. Docker Compose automatically creates a shared DNS bridge:

```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: secret

  api:
    build: .
    environment:
      # Use "db" hostname instead of "localhost"
      - DATABASE_URL=postgresql://postgres:secret@db:5432/postgres
    depends_on:
      - db
```

### Solution 2: If the Database is Running Natively on Your Host OS

#### On macOS & Windows (Docker Desktop):
Use the special DNS name `host.docker.internal`:
```ini
DATABASE_URL=postgresql://postgres:secret@host.docker.internal:5432/postgres
```

#### On Linux:
Pass `--add-host=host.docker.internal:host-gateway` to `docker run`:
```bash
docker run -d --add-host=host.docker.internal:host-gateway \
  -e DATABASE_URL="postgresql://postgres:secret@host.docker.internal:5432/postgres" \
  my-app
```

---

## Related Topics

- [Docker Networks & DNS Discovery](/docs/docker/networks)
- [PostgreSQL with Docker Compose](/recipes/docker/postgres-docker-compose)
- [Docker Compose Guide](/docs/docker/docker-compose)
