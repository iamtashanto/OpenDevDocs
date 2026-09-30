---
title: "Node.js + PostgreSQL with Docker Compose"
description: Complete full-stack development environment setup connecting a Node.js Express/TypeScript backend with a containerized PostgreSQL database using Docker Compose.
category: devops
topic: docker
type: recipe
level: intermediate
tags:
  - nodejs
  - postgresql
  - docker-compose
  - devops
  - fullstack
platforms:
  - linux
  - macos
  - windows
tested:
  node: "22-alpine"
  postgres: "16-alpine"
  docker-compose: "v2.x"
lastVerified: "2026-09-30"
---

## Goal

Create a complete local development environment where a Node.js application connects to a PostgreSQL container over an isolated internal Docker bridge network with health checks and volume persistence.

---

## Step-by-Step Implementation

<Steps>
  <Step step={1} title="Create Project Files">
    Create a project directory with your Node.js application and Docker configuration:

    ```
    ├── Dockerfile
    ├── compose.yaml
    ├── package.json
    ├── .env
    └── src/
        └── server.js
    ```
  </Step>

  <Step step={2} title="Write compose.yaml">
    ```yaml
    services:
      db:
        image: postgres:16-alpine
        restart: unless-stopped
        environment:
          POSTGRES_USER: devuser
          POSTGRES_PASSWORD: devpassword
          POSTGRES_DB: app_development
        volumes:
          - pg_data:/var/lib/postgresql/data
        ports:
          - "127.0.0.1:5432:5432"
        healthcheck:
          test: ["CMD-SHELL", "pg_isready -U devuser -d app_development"]
          interval: 5s
          timeout: 5s
          retries: 5
        networks:
          - internal-net

      api:
        build:
          context: .
          dockerfile: Dockerfile
        ports:
          - "3000:3000"
        environment:
          - PORT=3000
          - DATABASE_URL=postgresql://devuser:devpassword@db:5432/app_development
        depends_on:
          db:
            condition: service_healthy
        volumes:
          - ./src:/app/src
        networks:
          - internal-net

    volumes:
      pg_data:

    networks:
      internal-net:
        driver: bridge
    ```
  </Step>

  <Step step={3} title="Connect in Node.js (src/server.js)">
    ```javascript
    const express = require('express');
    const { Pool } = require('pg');

    const app = express();
    const port = process.env.PORT || 3000;

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    app.get('/api/users', async (req, res) => {
      try {
        const { rows } = await pool.query('SELECT NOW() as current_time');
        res.json({ success: true, server_time: rows[0].current_time });
      } catch (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database connection failed' });
      }
    });

    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`);
    });
    ```
  </Step>

  <Step step={4} title="Start Multi-Container Application">
    ```bash
    # Build and start all containers in detached mode
    docker compose up -d --build

    # View live logs
    docker compose logs -f
    ```
  </Step>
</Steps>

---

## Verification

Test your API endpoint from the host terminal:

```bash
curl http://localhost:3000/api/users
```

Response:
```json
{
  "success": true,
  "server_time": "2026-09-30T12:00:00.000Z"
}
```

---

## Related Topics

- [PostgreSQL with Docker Compose Recipe](/recipes/docker/postgres-docker-compose)
- [Docker Compose Guide](/docs/docker/docker-compose)
- [Troubleshooting: Cannot Connect to Database](/errors/docker/cannot-connect-to-database)
