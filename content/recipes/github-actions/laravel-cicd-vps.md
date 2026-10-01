---
title: "Laravel CI/CD Pipeline to Ubuntu VPS via GitHub Actions"
description: "Automate testing with PHPUnit, run Composer, execute database migrations, clear and rebuild Artisan caches, and restart queue workers upon Git push."
category: devops
topic: github-actions
type: recipe
level: intermediate
tags:
  - laravel
  - php
  - github-actions
  - ci-cd
  - vps
  - deployment
platforms:
  - all
tested:
  laravel: "11.x / 12.x"
  github-actions: "current"
lastVerified: "2026-10-01"
---

## Goal

Automate testing and deployment for a Laravel application: validate with PHPUnit on pull requests and automatically execute zero-downtime deployments on Ubuntu VPS when merging to `main`.

---

## Complete Workflow Manifest

```yaml
# .github/workflows/laravel-deploy.yml
name: Laravel CI/CD to VPS

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  test:
    name: Run PHPUnit Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP 8.3
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: mbstring, xml, ctype, iconv, intl, pdo_sqlite
          coverage: none

      - name: Install Dependencies
        run: composer install --prefer-dist --no-progress

      - name: Run Test Suite
        run: php artisan test

  deploy:
    name: Deploy to VPS
    needs: test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://laravel.example.com

    steps:
      - name: Execute Deployment Commands via SSH
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_PRIVATE_KEY }}
          port: ${{ secrets.VPS_SSH_PORT || 22 }}
          script: |
            set -e
            cd /var/www/laravel-app

            # Enter maintenance mode
            php artisan down --render="errors::503" --secret="bypass-token-123"

            # Pull latest changes
            git pull origin main

            # Install production dependencies
            composer install --no-dev --optimize-autoloader --no-interaction

            # Run database migrations
            php artisan migrate --force

            # Optimize caches
            php artisan config:cache
            php artisan route:cache
            php artisan view:cache
            php artisan event:cache

            # Restart queue workers
            sudo systemctl restart laravel-queue

            # Exit maintenance mode
            php artisan up

            echo "✅ Laravel deployment complete!"
```
