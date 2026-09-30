---
title: "Docker Health Checks & Probes"
description: Complete guide to Docker HEALTHCHECK instructions, health status monitoring, interval, timeout, retries, and integration with Docker Compose and orchestration.
category: devops
topic: docker
type: guide
level: intermediate
tags:
  - docker
  - healthcheck
  - monitoring
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

By default, Docker only checks if a container's main process (PID 1) is running. A container may be deadlocked or stuck in an infinite loop while still reporting a `running` status. **Health checks** periodically probe the application inside the container to verify it is actually serving traffic.

---

## The `HEALTHCHECK` Dockerfile Instruction

```dockerfile
HEALTHCHECK [OPTIONS] CMD command
```

### Supported Options

- `--interval=DURATION` (default: `30s`): How often the probe runs.
- `--timeout=DURATION` (default: `30s`): Maximum time allowed for the check before failing.
- `--start-period=DURATION` (default: `0s`): Grace period for container bootstrap before failures count towards retries.
- `--retries=N` (default: `3`): Number of consecutive failures needed to mark container `unhealthy`.

---

## Practical Examples

### 1. HTTP Endpoint Health Check (Node.js / Express / Next.js)
```dockerfile
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1
```

### 2. Native Node.js Healthcheck Script (No `curl`/`wget` required)
```javascript
// healthcheck.js
const http = require('http');
const req = http.request('http://localhost:3000/api/health', (res) => {
  process.exit(res.statusCode === 200 ? 0 : 1);
});
req.on('error', () => process.exit(1));
req.end();
```
```dockerfile
HEALTHCHECK --interval=15s --timeout=3s CMD ["node", "healthcheck.js"]
```

---

## Health Checks in Docker Compose

```yaml
services:
  database:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: secret
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d postgres"]
      interval: 5s
      timeout: 3s
      retries: 5

  api:
    build: .
    depends_on:
      database:
        condition: service_healthy
```

Using `condition: service_healthy` ensures dependent services wait until the database is fully initialized and accepting socket connections before starting!

---

## Inspecting Health Status

```bash
# View container status with health status
docker ps

# Inspect detailed health check logs and exit codes
docker inspect --format='{{json .State.Health}}' my-container | jq .
```

---

## Related Topics

- [Docker Compose](/docs/docker/docker-compose)
- [PostgreSQL with Docker Compose](/recipes/docker/postgres-docker-compose)
- [Production Best Practices](/docs/docker/production-best-practices)
