---
title: "Docker Environment Variables & Configuration"
description: Complete guide to injecting environment variables into Docker containers using CLI flags, env files, Docker Compose, and Dockerfile defaults.
category: devops
topic: docker
type: guide
level: beginner
tags:
  - docker
  - env
  - configuration
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

Environment variables configure applications across development, staging, and production without rebuilding Docker images.

---

## 1. Setting Variables via CLI (`-e`)

```bash
# Pass single variables
docker run -d -e NODE_ENV=production -e PORT=8080 -p 8080:8080 myapp

# Pass variable from host environment (without explicit value)
export API_KEY="secret-123"
docker run -d -e API_KEY myapp
```

---

## 2. Using Environment Files (`--env-file`)

Store configuration in `.env` files:

```ini
# .env.production
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@db:5432/production
REDIS_HOST=redis
LOG_LEVEL=info
```

Run with `--env-file`:
```bash
docker run -d --env-file .env.production -p 3000:3000 myapp
```

> [!CAUTION]
> Never commit `.env` files containing production credentials or API keys to version control. Add `.env*` to your `.gitignore` and `.dockerignore`.

---

## 3. Setting Defaults in Dockerfile (`ENV`)

```dockerfile
FROM node:22-alpine
ENV NODE_ENV=production \
    PORT=3000

WORKDIR /app
COPY . .
EXPOSE $PORT
CMD ["node", "server.js"]
```

`ENV` values persist in both the image and the running container unless overridden at runtime with `-e` or `--env-file`.

---

## Inspecting Container Environment

```bash
# Print all environment variables inside a running container
docker exec <container_name> env

# Inspect via docker inspect JSON output
docker inspect -f '{{range .Config.Env}}{{println .}}{{end}}' <container_name>
```

---

## Related Topics

- [Dockerfile ENV Reference](/docs/docker/dockerfile)
- [Docker Compose Env Files](/docs/docker/docker-compose)
- [Node + PostgreSQL Compose Recipe](/recipes/docker/node-postgres-compose)
