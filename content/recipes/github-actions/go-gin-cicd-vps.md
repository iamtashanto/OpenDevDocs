---
title: "Go & Gin CI/CD Pipeline to VPS via GitHub Actions"
description: "Cross-compile Go Gin static binaries on GitHub Actions runners, test code, upload binary via SSH, and perform zero-downtime systemd restarts."
category: devops
topic: github-actions
type: recipe
level: intermediate
tags:
  - go
  - gin
  - github-actions
  - ci-cd
  - systemd
  - binary
platforms:
  - all
tested:
  go: "1.23"
  github-actions: "current"
lastVerified: "2026-10-01"
---

## Goal

Compile an optimized standalone Linux binary on GitHub Actions runners, run automated tests, and securely deploy the binary to an Ubuntu VPS with automated `systemctl restart`.

---

## Complete Workflow Manifest

```yaml
# .github/workflows/go-deploy.yml
name: Go Gin CI/CD to VPS

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  test-and-build:
    name: Test & Cross-Compile
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Go
        uses: actions/setup-go@v5
        with:
          go-version: '1.23'
          cache: true

      - name: Run Go Unit Tests
        run: go test -v ./...

      - name: Cross-Compile Standalone Linux Binary
        run: |
          CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o gin-api main.go

      - name: Upload Binary Artifact
        uses: actions/upload-artifact@v4
        with:
          name: gin-api-binary
          path: gin-api
          retention-days: 1

  deploy:
    name: Deploy to VPS
    needs: test-and-build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://gin.example.com

    steps:
      - name: Download Binary
        uses: actions/download-artifact@v4
        with:
          name: gin-api-binary

      - name: Copy Binary to VPS
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_PRIVATE_KEY }}
          port: ${{ secrets.VPS_SSH_PORT || 22 }}
          source: "gin-api"
          target: "/var/www/go-gin-api"
          overwrite: true

      - name: Restart Systemd Service
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_PRIVATE_KEY }}
          port: ${{ secrets.VPS_SSH_PORT || 22 }}
          script: |
            chmod +x /var/www/go-gin-api/gin-api
            sudo systemctl restart gin-api
            sudo systemctl status gin-api --no-pager
```
