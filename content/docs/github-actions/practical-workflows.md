---
title: "Practical GitHub Actions CI/CD Workflows"
description: "Production-ready, copy-paste GitHub Actions workflow examples for Next.js, Node.js lint/typecheck/test, Docker build & push, and SSH VPS deployments."
category: devops
topic: github-actions
type: guide
level: intermediate
tags:
  - github-actions
  - nextjs
  - nodejs
  - docker
  - vps
  - deployment
platforms:
  - all
tested:
  github-actions: "current"
lastVerified: "2026-10-01"
---

# Practical GitHub Actions CI/CD Workflows

Ready-to-use, battle-tested GitHub Actions workflow templates configured with least-privilege security and caching.

---

## 1. Next.js Continuous Integration Pipeline

Validates pull requests targeting `main` with ESLint, TypeScript checking, tests, and a Next.js production build using `.next/cache`:

```yaml
# .github/workflows/nextjs-ci.yml
name: Next.js CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

permissions:
  contents: read

concurrency:
  group: nextjs-ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  validate:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Next.js Build Cache
        uses: actions/cache@v4
        with:
          path: |
            ~/.npm
            ${{ github.workspace }}/.next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/pnpm-lock.yaml') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/pnpm-lock.yaml') }}-

      - name: Run Linter
        run: pnpm lint

      - name: Run Type Check
        run: pnpm typecheck

      - name: Run Production Build
        run: pnpm build
```

---

## 2. Node.js CI (Lint + TypeScript + Tests)

```yaml
# .github/workflows/node-ci.yml
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20, 22]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Clean Install
        run: npm ci

      - name: Lint Check
        run: npm run lint

      - name: TypeScript Check
        run: npx tsc --noEmit

      - name: Run Tests
        run: npm test -- --coverage
```

---

## 3. Docker Image Build & Push to GitHub Container Registry

Builds a container image using Docker Buildx and pushes to `ghcr.io`:

```yaml
# .github/workflows/docker-publish.yml
name: Docker Build & Publish

on:
  push:
    branches: [main]
    tags: ['v*.*.*']

permissions:
  contents: read
  packages: write

jobs:
  docker:
    runs-on: ubuntu-latest
    timeout-minutes: 20

    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract Docker metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}
          tags: |
            type=ref,event=branch
            type=semver,pattern={{version}}
            type=sha,format=short

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

---

## 4. Deploy Node.js App to Linux VPS via SSH

Deploys via SSH to a remote Ubuntu server and restarts PM2 process manager:

```yaml
# .github/workflows/deploy-vps.yml
name: Deploy to Production VPS

on:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://docs.tashanto.com

    steps:
      - name: Execute Remote SSH Commands
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_PRIVATE_KEY }}
          port: ${{ secrets.VPS_SSH_PORT || 22 }}
          script: |
            set -e
            echo "Navigating to app directory..."
            cd /var/www/my-app

            echo "Pulling latest changes from main..."
            git pull origin main

            echo "Installing production dependencies..."
            pnpm install --frozen-lockfile --prod

            echo "Running database migrations..."
            npx prisma migrate deploy

            echo "Restarting application with PM2..."
            pm2 reload ecosystem.config.js --update-env
```
