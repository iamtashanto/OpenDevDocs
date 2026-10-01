---
title: "Deploy Next.js to Vercel"
description: Complete step-by-step guide to deploying Next.js App Router applications to Vercel with automatic CI/CD, preview deployments, and environment variables.
category: devops
topic: deployment
type: guide
level: beginner
tags:
  - nextjs
  - vercel
  - deployment
  - serverless
platforms:
  - cloud
tested:
  nextjs: "16.x"
  vercel: "61.x"
lastVerified: "2026-09-30"
---

Vercel is the native cloud deployment platform created by the authors of Next.js, featuring automatic edge routing, incremental static regeneration (ISR), serverless functions, and Git-integrated preview deployments.

---

## Step-by-Step Deployment

<Steps>
  <Step step={1} title="Push Code to GitHub / GitLab / Bitbucket">
    Ensure your Next.js project is pushed to a remote Git repository:

    ```bash
    git add .
    git commit -m "feat: ready for initial production deployment"
    git push origin main
    ```
  </Step>

  <Step step={2} title="Import Project in Vercel Dashboard">
    1. Sign in to [vercel.com](https://vercel.com).
    2. Click **Add New...** $\rightarrow$ **Project**.
    3. Select your GitHub repository and click **Import**.
  </Step>

  <Step step={3} title="Configure Environment Variables">
    In the **Environment Variables** accordion:
    - Add production keys (e.g. `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`).
    - Select target environments: **Production**, **Preview**, and **Development**.
  </Step>

  <Step step={4} title="Deploy & Configure Custom Domain">
    1. Click **Deploy**. Vercel builds the project and assigns a `.vercel.app` domain.
    2. Navigate to **Project Settings** $\rightarrow$ **Domains**.
    3. Add your custom domain (e.g. `docs.tashanto.com`).
    4. In your DNS provider (Cloudflare, Namecheap, GoDaddy), add the CNAME record:
       ```
       CNAME docs -> cname.vercel-dns.com
       ```
  </Step>
</Steps>

---

## Deploying via Vercel CLI

```bash
# Install CLI globally
npm install -g vercel

# Link local folder and deploy preview build
vercel

# Deploy directly to production
vercel --prod
```

---

## Related Guides

- [Deploying Static Frontends](/docs/deployment/deploy-static-frontend)
- [Dockerize Next.js App Recipe](/recipes/docker/dockerize-nextjs)
- [Domains & DNS Records](/docs/deployment/domains-and-dns)
