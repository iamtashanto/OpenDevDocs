---
title: "Production Migration Workflow"
description: "Deploying database migrations in CI/CD pipelines, Docker containers, Kubernetes jobs, and zero-downtime database release strategies."
category: databases
topic: prisma
type: guide
level: production
tags:
  - prisma
  - migrations
  - production
  - devops
  - ci-cd
platforms:
  - node
  - linux
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Production Migration Workflow

Deploying database migrations to production environments requires automated, non-interactive execution with zero downtime.

---

## 1. The Production Rule: `migrate deploy`

In production, **always** run `prisma migrate deploy` instead of `prisma migrate dev`.

```bash
npx prisma migrate deploy
```

- Non-interactive (will never prompt to reset the database).
- Applies only pending migrations that have not yet been executed.
- Fails with a non-zero exit code if a migration error occurs, halting CI/CD deployments before bad code goes live.

---

## 2. Running Migrations in GitHub Actions CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run Database Migrations
        env:
          DATABASE_URL: ${{ secrets.PRODUCTION_DATABASE_URL }}
        run: npx prisma migrate deploy

      - name: Build Application
        run: pnpm build
```

---

## 3. Docker Container Entrypoint Pattern

When running in Docker, execute migrations inside an entrypoint script before starting the Node server:

```bash
#!/bin/sh
# docker-entrypoint.sh
set -e

echo "Running database migrations..."
npx prisma migrate deploy

echo "Starting application server..."
exec node dist/index.js
```

---

## 4. Zero-Downtime Migration Principles

To avoid breaking active traffic during deployments:
1. **Additive Changes First**: Add new optional columns (`bio String?`) before updating application code to write to them.
2. **Never Rename Columns in One Step**: Create the new column, dual-write in application code, backfill data, and drop the old column in a later release.
3. **Always Add Default Values**: Never add a required column without a `@default(...)` or nullable modifier on existing tables with data.

---

## Related Topics

- [Prisma Migrations Overview](/docs/prisma/migrations)
- [Connection Management & Pooling](/docs/prisma/connection-management)
- [Deployment Fundamentals](/docs/deployment/zero-downtime-rollbacks)
