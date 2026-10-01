---
title: "Basic Git-Based Deployments & CI/CD Webhooks"
description: Complete guide to Git-based deployments, bare repository hooks (post-receive), GitHub Actions CD workflows, and automated deployment pipelines.
category: devops
topic: deployment
type: guide
level: intermediate
tags:
  - git
  - deployment
  - github-actions
  - webhooks
  - ci-cd
platforms:
  - linux
  - cloud
tested:
  git: "2.46.x"
lastVerified: "2026-09-30"
---

A **Git-based deployment** uses Git commits, tags, or branch pushes to trigger automated build, test, and release scripts on your destination production servers.

---

## Method 1: GitHub Actions CI/CD (Recommended)

Create `.github/workflows/deploy.yml` to automatically deploy to your server via SSH when pushing to `main`:

```yaml
name: Production Deployment

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Deploy to VPS via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.PROD_SERVER_HOST }}
          username: appuser
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/api
            git pull origin main
            npm ci --omit=dev
            npm run build
            pm2 reload ecosystem.config.js --env production
```

---

## Method 2: Git `post-receive` Hook (Self-Hosted Git Push-to-Deploy)

Deploy directly to your Linux VPS by running `git push production main`:

<Steps>
  <Step step={1} title="Create Bare Git Repository on Server">
    ```bash
    # On VPS:
    mkdir -p /var/repo/myapp.git
    cd /var/repo/myapp.git
    git init --bare
    ```
  </Step>

  <Step step={2} title="Create post-receive Hook">
    Create `/var/repo/myapp.git/hooks/post-receive`:

    ```bash
    #!/bin/bash
    TARGET="/var/www/myapp"
    GIT_DIR="/var/repo/myapp.git"

    echo "====> Deploying new commit to $TARGET..."
    git --work-tree=$TARGET --git-dir=$GIT_DIR checkout -f

    cd $TARGET
    npm ci --omit=dev
    npm run build
    sudo systemctl restart myapp

    echo "====> Deployment successfully finished!"
    ```

    Make the hook executable:
    ```bash
    chmod +x /var/repo/myapp.git/hooks/post-receive
    ```
  </Step>

  <Step step={3} title="Add Remote and Push from Local Machine">
    ```bash
    # On Local Machine:
    git remote add production appuser@your-server-ip:/var/repo/myapp.git
    git push production main
    ```
  </Step>
</Steps>

---

## Related Guides

- [Deploying Node.js to Linux VPS](/docs/deployment/deploy-nodejs-vps)
- [Rollback Strategies](/docs/deployment/rollback-strategies)
- [Git Fundamentals](/docs/git/commits)
