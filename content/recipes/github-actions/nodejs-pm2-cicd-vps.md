---
title: "Node.js & Express CI/CD Pipeline to VPS via GitHub Actions"
description: "Continuous integration and deployment workflow for Node.js APIs with automated testing, Prisma migrations, and PM2 zero-downtime cluster reloads."
category: devops
topic: github-actions
type: recipe
level: intermediate
tags:
  - nodejs
  - express
  - github-actions
  - ci-cd
  - prisma
  - pm2
platforms:
  - all
tested:
  node: "22.x"
  github-actions: "current"
lastVerified: "2026-10-01"
---

## Goal

Automate testing, database migrations, and zero-downtime deployment for a Node.js REST API on an Ubuntu VPS using PM2.

---

## Complete Workflow Manifest

```yaml
# .github/workflows/api-deploy.yml
name: Node.js API CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  test:
    name: Run Unit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - run: npm ci
      - run: npm test

  deploy:
    name: Deploy to Production
    needs: test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://api.example.com

    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_PRIVATE_KEY }}
          port: ${{ secrets.VPS_SSH_PORT || 22 }}
          script: |
            set -e
            cd /var/www/api-backend

            # Pull latest changes
            git pull origin main

            # Clean install production dependencies
            npm ci --only=production

            # Run database migrations
            npx prisma migrate deploy

            # Compile TypeScript (if applicable)
            npm run build

            # Zero-downtime reload across cluster
            pm2 reload ecosystem.config.cjs --update-env
```
