---
title: "GitHub Actions Environments & Deployments"
description: "Configure staging and production environments, manual approval protection rules, deployment branches, and environment URLs in GitHub Actions."
category: devops
topic: github-actions
type: guide
level: intermediate
tags:
  - github-actions
  - environments
  - deployments
  - approvals
  - production
platforms:
  - all
tested:
  github-actions: "current"
lastVerified: "2026-10-01"
---

# GitHub Actions Environments & Deployments

GitHub **Environments** enable you to target specific deployment destinations (such as `staging`, `preview`, or `production`) with dedicated secrets, manual approval protection rules, and audit logs.

---

## 1. What are Environments?

Environments allow you to:
1. **Require Manual Approvers**: Gate production deployments behind explicit sign-off from designated team leads.
2. **Restrict Deployment Branches**: Restrict production secrets so they can only be used from `main` or release tags.
3. **Environment-scoped Secrets**: Keep `production` database credentials isolated from `staging` credentials.
4. **Track Deployments**: View real-time deployment history and active commit URLs in the GitHub repository UI.

---

## 2. Using Environments in Workflow Jobs

Assign an `environment:` block to a deployment job:

```yaml
jobs:
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://docs.tashanto.com

    steps:
      - uses: actions/checkout@v4

      - name: Deploy Step
        env:
          # Automatically pulls from the 'production' environment secrets
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
        run: |
          echo "Deploying release to production environment..."
          ./scripts/deploy.sh
```

---

## 3. Concurrency Control for Deployments

Avoid simultaneous overlapping deployments that could cause race conditions:

```yaml
concurrency:
  group: production-deployment
  # Set cancel-in-progress: false so deployments queue rather than abruptly cancel midway
  cancel-in-progress: false
```
