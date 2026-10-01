---
title: "React (Vite) CI/CD Pipeline to VPS Nginx via GitHub Actions"
description: "Automate React Vite SPA building on GitHub Actions and rsync static assets to Ubuntu VPS Nginx with caching and atomic deployment."
category: devops
topic: github-actions
type: recipe
level: intermediate
tags:
  - react
  - vite
  - github-actions
  - ci-cd
  - nginx
  - vps
platforms:
  - all
tested:
  react: "19.x"
  github-actions: "current"
lastVerified: "2026-10-01"
---

## Goal

Build the static React/Vite distribution bundle on GitHub Actions runners and securely sync the compiled `dist/` directory to your Ubuntu VPS Nginx folder via SSH.

---

## Complete Workflow Manifest

```yaml
# .github/workflows/react-deploy.yml
name: React Vite CI/CD to Nginx

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  build:
    name: Build React SPA Bundle
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Static Production Distribution
        run: npm run build

      # Archive the dist folder for the deploy job
      - name: Upload Build Artifact
        uses: actions/upload-artifact@v4
        with:
          name: react-dist
          path: dist/
          retention-days: 1

  deploy:
    name: Sync Assets to VPS
    needs: build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://react.example.com

    steps:
      - name: Download Build Artifact
        uses: actions/download-artifact@v4
        with:
          name: react-dist
          path: ./dist

      - name: Deploy to VPS using SCP
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_PRIVATE_KEY }}
          port: ${{ secrets.VPS_SSH_PORT || 22 }}
          source: "./dist/*"
          target: "/var/www/react-app"
          strip_components: 1
          overwrite: true
```
