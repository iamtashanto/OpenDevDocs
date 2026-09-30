---
title: "PostgreSQL with Docker Compose"
description: Step-by-step recipe to set up a production-ready PostgreSQL instance with persistent volumes, custom initialization scripts, health checks, and pgAdmin.
category: devops
topic: docker
type: recipe
level: beginner
tags:
  - postgresql
  - docker
  - docker-compose
  - database
platforms:
  - linux
  - macos
  - windows
tested:
  postgres: "16-alpine"
  docker-compose: "v2.x"
lastVerified: "2026-09-30"
---

## Goal

Run a containerized PostgreSQL database with persistent volume storage, automatic SQL schema initialization on first boot, and integrated health checks using Docker Compose.

---

## Step-by-Step Implementation

<Steps>
  <Step step={1} title="Create Project Structure">
    Create a project directory with an `init-scripts/` folder:

    ```bash
    mkdir -p postgres-compose/init-scripts
    cd postgres-compose
    ```
  </Step>

  <Step step={2} title="Create compose.yaml">
    Create `compose.yaml`:

    ```yaml
    services:
      postgres:
        image: postgres:16-alpine
        container_name: dev_postgres
        restart: unless-stopped
        environment:
          POSTGRES_USER: ${POSTGRES_USER:-appuser}
          POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-supersecret}
          POSTGRES_DB: ${POSTGRES_DB:-appdb}
        ports:
          - "127.0.0.1:5432:5432"
        volumes:
          - pgdata:/var/lib/postgresql/data
          - ./init-scripts:/docker-entrypoint-initdb.d:ro
        healthcheck:
          test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-appuser} -d ${POSTGRES_DB:-appdb}"]
          interval: 5s
          timeout: 5s
          retries: 5

      pgadmin:
        image: dpage/pgadmin4:latest
        container_name: dev_pgadmin
        restart: unless-stopped
        environment:
          PGADMIN_DEFAULT_EMAIL: admin@example.com
          PGADMIN_DEFAULT_PASSWORD: adminpassword
        ports:
          - "127.0.0.1:5050:80"
        depends_on:
          postgres:
            condition: service_healthy

    volumes:
      pgdata:
    ```
  </Step>

  <Step step={3} title="Add Initialization SQL (Optional)">
    Any `.sql` or `.sh` script placed in `./init-scripts/` will automatically run on the first container startup:

    ```sql
    -- init-scripts/01-init.sql
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO users (email) VALUES ('alice@example.com'), ('bob@example.com');
    ```
  </Step>

  <Step step={4} title="Start Services">
    ```bash
    docker compose up -d
    ```
  </Step>
</Steps>

---

## Connecting to PostgreSQL

### From Host CLI using `psql`
```bash
psql -h localhost -p 5432 -U appuser -d appdb
```

### From Inside Docker Container
```bash
docker compose exec -it postgres psql -U appuser -d appdb
```

---

## Related Topics

- [PostgreSQL Getting Started](/docs/postgresql/installation)
- [Node + PostgreSQL Compose Recipe](/recipes/docker/node-postgres-compose)
- [Troubleshooting: Cannot Connect to Database](/errors/docker/cannot-connect-to-database)
