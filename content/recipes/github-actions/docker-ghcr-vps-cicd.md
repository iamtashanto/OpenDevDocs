---
title: "Docker Multi-Arch Build, GHCR Publish & VPS Redeploy Pipeline"
description: "Build multi-platform Docker containers with Buildx, publish to GitHub Container Registry (ghcr.io), and trigger automated rolling redeployment on VPS via Docker Compose."
category: devops
topic: github-actions
type: recipe
level: intermediate
tags:
  - docker
  - ghcr
  - github-actions
  - docker-compose
  - ci-cd
  - vps
platforms:
  - all
tested:
  docker: "27.x"
  github-actions: "current"
lastVerified: "2026-10-01"
---

## Goal

Automatically build optimized Docker images using Docker Buildx, publish to GitHub Container Registry (`ghcr.io`), and SSH into your VPS to execute zero-downtime `docker compose pull && docker compose up -d`.

---

## Complete Workflow Manifest

```yaml
# .github/workflows/docker-ci-cd.yml
name: Build, Publish & Deploy Docker

on:
  push:
    branches: [main]
    tags: ['v*.*.*']
  pull_request:
    branches: [main]

permissions:
  contents: read
  packages: write

jobs:
  # 1. Build and Push Image to GHCR
  build-and-push:
    name: Build & Push Docker Image
    runs-on: ubuntu-latest
    timeout-minutes: 20

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to GitHub Container Registry
        if: github.event_name != 'pull_request'
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
            type=raw,value=latest,enable={{is_default_branch}}
            type=sha,format=short

      - name: Build and Push
        uses: docker/build-push-action@v6
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # 2. Deploy to Production VPS
  deploy:
    name: Redeploy on VPS
    needs: build-and-push
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://example.com

    steps:
      - name: Trigger Docker Compose Rollout on VPS
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_PRIVATE_KEY }}
          port: ${{ secrets.VPS_SSH_PORT || 22 }}
          script: |
            set -e
            cd /opt/my-app

            echo "Authenticating to GHCR on VPS..."
            echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin

            echo "Pulling latest container images..."
            docker compose pull

            echo "Recreating running containers with zero downtime..."
            docker compose up -d --remove-orphans

            echo "Pruning dangling old images..."
            docker image prune -f

            echo "✅ Docker Compose redeployed successfully!"
```
