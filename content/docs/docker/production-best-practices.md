---
title: "Docker Production Best Practices"
description: Comprehensive checklist for deploying Docker containers into production, covering image size optimization, security, logging, graceful shutdown, and orchestration readiness.
category: devops
topic: docker
type: guide
level: advanced
tags:
  - docker
  - production
  - best-practices
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

Deploying containers to production requires strict adherence to security, reliability, reproducibility, and observability standards.

---

## Production Checklist

### 1. Minimal & Specific Base Images
- Pin exact major and minor tags (e.g. `node:22.11.0-alpine3.20` rather than `node:latest`).
- Prefer minimal base images like Alpine Linux or Google Distroless to eliminate attack surface and bloated dependencies.

### 2. Multi-Stage Builds & Dependency Pruning
- Separate build tools, TypeScript compilers, and test runners into builder stages.
- Ship only compiled production bundles and production dependencies (`npm ci --omit=dev`).

### 3. Non-Root Execution
- Ensure container processes execute as an unprivileged user (`USER node` or custom UID).

### 4. Forward Linux Signals & Graceful Termination (PID 1)
- Always use the **Exec form** for `CMD` (`CMD ["node", "dist/server.js"]`).
- Implement `SIGTERM` and `SIGINT` handlers in your application code to finish in-flight requests and close database connections before exiting.

```javascript
// Server graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  await server.close();
  await db.disconnect();
  process.exit(0);
});
```

### 5. Health Checks & Readiness Probes
- Add a `HEALTHCHECK` instruction to your Dockerfile or compose file so orchestrators (Docker Swarm, Kubernetes, AWS ECS) can replace deadlocked containers.

### 6. Resource Limits
- Always define CPU and memory limits (`--memory`, `--cpus`) to prevent rogue containers from degrading host stability.

### 7. Structured Logging
- Log strictly to `stdout` and `stderr` formatted as JSON for ingestion by central log management pipelines.

---

## Related Topics

- [Multi-Stage Builds](/docs/docker/multi-stage-builds)
- [Security Basics](/docs/docker/security)
- [Dockerize Node.js App Recipe](/recipes/docker/dockerize-nodejs)
- [Dockerize Next.js App Recipe](/recipes/docker/dockerize-nextjs)
