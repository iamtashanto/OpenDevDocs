---
title: "Docker Multi-Stage Builds"
description: Complete guide to optimizing image sizes, stripping build tools, caching dependencies, and creating secure production images using multi-stage builds.
category: devops
topic: docker
type: guide
level: intermediate
tags:
  - docker
  - multi-stage
  - optimization
  - security
  - devops
platforms:
  - linux
  - macos
  - windows
tested:
  docker: "27.x"
lastVerified: "2026-09-30"
---

**Multi-stage builds** allow you to use multiple `FROM` statements in a single `Dockerfile`. Each `FROM` instruction begins a new build stage with a distinct base image. You can selectively copy artifacts from previous stages, leaving behind build tools, compilers, and dev dependencies.

---

## Why Use Multi-Stage Builds?

1. **Drastically Smaller Images**: Reduce final image footprint from ~1 GB to <100 MB.
2. **Enhanced Security**: Compilers (`gcc`, `python`, `git`) and package managers are excluded from production images, reducing the attack surface.
3. **No Intermediate Image Management**: No need to write separate build scripts or clean up temporary build containers.

---

## TypeScript / Node.js Multi-Stage Example

```dockerfile
# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Builder
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm prune --omit=dev

# Stage 3: Production Runner
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
USER node

# Copy only production artifacts
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/package.json ./package.json

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

---

## Building Specific Stages

You can stop the build at a specific stage (e.g. for running unit tests in CI):

```bash
docker build --target deps -t myapp:deps .
docker build --target builder -t myapp:builder .
```

---

## Related Guides

- [Dockerize Next.js App Recipe](/recipes/docker/dockerize-nextjs)
- [Dockerize Node.js App Recipe](/recipes/docker/dockerize-nodejs)
- [Production Best Practices](/docs/docker/production-best-practices)
