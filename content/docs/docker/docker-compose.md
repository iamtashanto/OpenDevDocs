---
title: "Docker Compose & Multi-Container Apps"
description: Complete guide to Docker Compose v2, compose.yaml specification, services, volumes, networks, environment files, and multi-container orchestration.
category: devops
topic: docker
type: guide
level: intermediate
tags:
  - docker
  - docker-compose
  - orchestration
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

**Docker Compose** is a declarative tool for defining and running multi-container Docker applications using a single YAML configuration file (`compose.yaml` or `docker-compose.yml`).

---

## Compose File Specification (`compose.yaml`)

```yaml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:secret@db:5432/myapp
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - .:/app
      - /app/node_modules
    networks:
      - app-network

  db:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    ports:
      - "127.0.0.1:5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - app-network

volumes:
  pgdata:

networks:
  app-network:
    driver: bridge
```

---

## Essential Compose Commands (Compose V2)

> [!NOTE]
> Modern Compose is integrated directly into the Docker CLI as `docker compose` (without a hyphen).

```bash
# Start all services in detached background mode (builds if needed)
docker compose up -d

# Rebuild images and start
docker compose up -d --build

# View logs from all services or a specific service
docker compose logs -f
docker compose logs -f web

# Check status of running compose services
docker compose ps

# Execute command inside a compose service
docker compose exec web npm test
docker compose exec db psql -U postgres

# Stop all services (preserves volumes)
docker compose stop

# Stop and remove containers, networks, and anonymous volumes
docker compose down

# Stop and destroy everything including named volumes
docker compose down -v
```

---

## Related Recipes

- [PostgreSQL with Docker Compose](/recipes/docker/postgres-docker-compose)
- [Node + PostgreSQL Docker Compose](/recipes/docker/node-postgres-compose)
- [Docker Networks](/docs/docker/networks)
