---
title: "Dockerize a Node.js Application"
description: Step-by-step recipe to dockerize a production Node.js Express/Fastify application with multi-stage builds, non-root user, and dumb-init signal handling.
category: devops
topic: docker
type: recipe
level: intermediate
tags:
  - nodejs
  - docker
  - devops
  - containers
  - express
platforms:
  - linux
  - macos
  - windows
tested:
  node: "22-alpine"
  docker: "27.x"
lastVerified: "2026-09-30"
---

## Goal

Create a minimal, secure, and production-ready Docker container for a Node.js backend application with proper Linux signal forwarding and multi-stage dependency pruning.

---

## Step-by-Step Implementation

<Steps>
  <Step step={1} title="Create .dockerignore">
    Create `.dockerignore` in your project root:

    ```text
    node_modules
    npm-debug.log
    .git
    .env
    .env.*
    dist
    coverage
    Dockerfile*
    .dockerignore
    README.md
    ```
  </Step>

  <Step step={2} title="Create Multi-Stage Dockerfile">
    Create `Dockerfile`:

    ```dockerfile
    # Stage 1: Dependencies & Build
    FROM node:22-alpine AS builder
    WORKDIR /usr/src/app

    # Install dumb-init for proper PID 1 signal forwarding
    RUN apk add --no-cache dumb-init

    # Copy dependency manifests
    COPY package*.json tsconfig.json ./
    RUN npm ci

    # Copy source and build TypeScript to JavaScript
    COPY src/ ./src/
    RUN npm run build

    # Prune devDependencies to keep only production packages
    RUN npm prune --omit=dev

    # Stage 2: Production Runtime
    FROM node:22-alpine AS runner
    WORKDIR /usr/src/app
    ENV NODE_ENV=production
    ENV PORT=3000

    # Copy dumb-init from builder
    COPY --from=builder /usr/bin/dumb-init /usr/bin/dumb-init

    # Create app user and set permissions
    USER node

    # Copy production dependencies and compiled artifacts
    COPY --from=builder --chown=node:node /usr/src/app/node_modules ./node_modules
    COPY --from=builder --chown=node:node /usr/src/app/dist ./dist
    COPY --from=builder --chown=node:node /usr/src/app/package.json ./package.json

    EXPOSE 3000

    # Use dumb-init to handle SIGTERM / SIGINT gracefully
    ENTRYPOINT ["/usr/bin/dumb-init", "--"]
    CMD ["node", "dist/index.js"]
    ```
  </Step>

  <Step step={3} title="Build and Run Container">
    ```bash
    # Build container
    docker build -t my-node-api:latest .

    # Run in background with port forwarding
    docker run -d \
      --name api-server \
      -p 3000:3000 \
      -e NODE_ENV=production \
      my-node-api:latest
    ```
  </Step>
</Steps>

---

## Graceful Shutdown in Node.js Application Code

Ensure your Node.js application handles termination signals forwarded by `dumb-init`:

```javascript
// src/index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

function shutdown(signal) {
  console.log(`Received ${signal}, closing HTTP server...`);
  server.close(() => {
    console.log('HTTP server closed. Exiting process.');
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
```

---

## Related Topics

- [Docker Multi-Stage Builds](/docs/docker/multi-stage-builds)
- [Node + PostgreSQL Docker Compose](/recipes/docker/node-postgres-compose)
- [Production Best Practices](/docs/docker/production-best-practices)
