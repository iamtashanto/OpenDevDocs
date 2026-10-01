---
title: "What is Deployment? Core Concepts & Lifecycle"
description: Complete introduction to software deployment, the deployment lifecycle, continuous delivery vs continuous deployment, and deployment targets.
category: devops
topic: deployment
type: concept
level: beginner
tags:
  - deployment
  - devops
  - ci-cd
  - production
platforms:
  - linux
  - macos
  - windows
tested:
  git: "2.46.x"
lastVerified: "2026-09-30"
---

**Software Deployment** is the process of building, packaging, transferring, and activating software artifacts from a development environment onto target infrastructure where end users can access it reliably.

---

## The Deployment Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│ The Modern Deployment Pipeline                              │
├─────────────┬─────────────┬─────────────┬───────────────────┤
│ 1. Code     │ 2. Build    │ 3. Test     │ 4. Release & Run  │
│ Feature PR  │ Compile TS, │ Run unit    │ Deploy to target, │
│ & review    │ bundle CSS  │ & e2e tests │ migrate DB, start │
└─────────────┴─────────────┴─────────────┴───────────────────┘
```

1. **Code & Commit**: Developers commit source code to version control (Git).
2. **Build & Package**: Continuous Integration (CI) compiles TypeScript, bundles static assets, and builds immutable artifacts (e.g. Docker images or static output directories).
3. **Automated Verification**: Automated test suites verify linting, type safety, unit tests, and security scans.
4. **Release & Activation**: The compiled artifact is transferred to servers/edge networks, environment variables are loaded, database migrations run, and traffic is routed to the new version.

---

## Continuous Delivery vs. Continuous Deployment

| Concept | Description | Production Release Trigger |
| :--- | :--- | :--- |
| **Continuous Integration (CI)** | Automatically builds and tests every commit / PR | Automated on push |
| **Continuous Delivery (CD)** | Code is always in a deployable state; staging is auto-updated | **Manual approval button** for production |
| **Continuous Deployment (CD)** | Every commit that passes automated tests deploys directly to production | **Fully automated** |

---

## Common Deployment Targets

- **Static Hosting & CDNs** (Vercel, Cloudflare Pages, Netlify, AWS S3/CloudFront): Best for client-side single-page apps (SPAs) and static documentation.
- **Serverless & Edge Platforms** (Vercel, AWS Lambda, Cloudflare Workers): Code executes in response to incoming HTTP requests with auto-scaling to zero.
- **Platform as a Service (PaaS)** (Render, Railway, Fly.io, Heroku): Managed container runtimes with automated Git deployments and attached managed databases.
- **Virtual Private Servers (VPS)** (DigitalOcean, AWS EC2, Hetzner, Linode): Full root access to Linux virtual machines managed via SSH, Docker, systemd, or PM2.
- **Container Orchestrators** (Kubernetes, AWS ECS, Docker Swarm): Multi-node container clustering with automated healing, rolling updates, and service mesh.

---

## Related Guides

- [Development vs Production Environments](/docs/deployment/dev-vs-prod)
- [Deploying Next.js to Vercel](/docs/deployment/deploy-nextjs-vercel)
- [Deploying Node.js to a Linux VPS](/docs/deployment/deploy-nodejs-vps)
