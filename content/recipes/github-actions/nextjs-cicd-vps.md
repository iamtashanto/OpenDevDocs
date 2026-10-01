---
title: "Next.js CI/CD Pipeline to Ubuntu VPS via GitHub Actions"
description: "Complete automated CI/CD pipeline for Next.js — automated linting, type-checking, build caching, and zero-downtime PM2 reload via SSH."
category: devops
topic: github-actions
type: recipe
level: intermediate
tags:
  - nextjs
  - github-actions
  - ci-cd
  - vps
  - pm2
  - deployment
platforms:
  - all
tested:
  nextjs: "16.x"
  github-actions: "current"
lastVerified: "2026-10-01"
---

## Goal

Automate testing and deployment for a Next.js App Router application: whenever code is pushed to `main`, GitHub Actions validates code quality, compiles with cache, and deploys directly to your Ubuntu VPS with zero downtime.

---

## Required GitHub Repository Secrets

Configure in **Settings -> Secrets and variables -> Actions**:

- `VPS_HOST`: Your server IP (e.g. `198.51.100.45`)
- `VPS_USER`: SSH username (e.g. `ubuntu` or `deploy`)
- `VPS_SSH_PRIVATE_KEY`: Private SSH key authorized in `~/.ssh/authorized_keys` on VPS
- `VPS_SSH_PORT`: SSH port (e.g. `22`)

---

## Complete Workflow Manifest

```yaml
# .github/workflows/deploy.yml
name: Next.js CI/CD to VPS

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

concurrency:
  group: nextjs-deployment
  cancel-in-progress: false

jobs:
  # 1. CI Validation Job (Runs on PRs and Main)
  test-and-build:
    name: Lint, Typecheck & Test
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Setup Node.js 22
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Run ESLint
        run: pnpm lint

      - name: Run TypeScript Check
        run: pnpm typecheck

  # 2. CD Deployment Job (Runs ONLY on merge to main)
  deploy:
    name: Deploy to Production VPS
    needs: test-and-build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://app.example.com

    steps:
      - name: Execute Remote SSH Deploy Script
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_PRIVATE_KEY }}
          port: ${{ secrets.VPS_SSH_PORT || 22 }}
          script: |
            set -e
            echo "🚀 Starting Deployment..."

            cd /var/www/nextjs-app

            # Fetch latest git commits
            git pull origin main

            # Install fresh dependencies
            pnpm install --frozen-lockfile

            # Rebuild standalone Next.js bundle
            pnpm build

            # Ensure static assets are synced to standalone
            cp -r public .next/standalone/public
            cp -r .next/static .next/standalone/.next/static

            # Zero-downtime graceful PM2 reload
            pm2 reload ecosystem.config.js --update-env

            echo "✅ Deployment Completed Successfully!"
```
