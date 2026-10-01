---
title: "Rollback Strategies & Zero-Downtime Releases"
description: Complete guide to zero-downtime deployments, Blue-Green deployments, Canary releases, atomic symlinks, and safe database migration rollbacks.
category: devops
topic: deployment
type: concept
level: advanced
tags:
  - rollbacks
  - blue-green
  - canary
  - zero-downtime
  - devops
platforms:
  - all
tested:
  git: "2.46.x"
lastVerified: "2026-09-30"
---

When a production release introduces critical regressions or crashes, having an immediate, deterministic **Rollback Strategy** prevents extended outages.

---

## 1. Instant Git / Platform Rollbacks (Vercel / PaaS)

On modern platforms (Vercel, Render, Cloudflare Pages), every deployment generates an immutable preview URL. Rolling back takes **1 second**:
- The platform shifts traffic back to the previous deployment's immutable artifact.
- No code rebuild is required.

---

## 2. Blue-Green Deployment Pattern

```
                 Incoming Traffic (Router / Load Balancer)
                                     │
                        ┌────────────┴────────────┐
                        ▼                         │ (Idle / New Release)
               [ Blue Environment ]      [ Green Environment ]
               (Active Production: v1)   (Staging / Testing: v2)
```

1. Deploy new version (`v2`) onto the idle **Green environment**.
2. Run automated integration and smoke tests against Green.
3. Switch the load balancer router to direct 100% of live traffic to Green.
4. If an anomaly occurs, switch the router back to Blue instantly.

---

## 3. Atomic Symlink Deployments (VPS / Bare Metal)

Deploy each release into a timestamped directory and flip a symlink atomically:

```
/var/www/app/
├── releases/
│   ├── 20260930_120000/    (v1 - Previous)
│   └── 20260930_130000/    (v2 - Current)
└── current ───► releases/20260930_130000/
```

```bash
# Atomic symlink switch in Linux:
ln -sfn /var/www/app/releases/20260930_130000 /var/www/app/current

# Instant rollback to previous release:
ln -sfn /var/www/app/releases/20260930_120000 /var/www/app/current
sudo systemctl reload myapp
```

---

## 4. The Database Migration Trap (Expand and Contract)

Rolling back application code is easy; rolling back database schemas with existing production data is difficult.

### The Expand & Contract Pattern:
1. **Expand (Phase 1)**: Add new nullable columns or tables. Old code and new code both run safely.
2. **Deploy Code (Phase 2)**: Deploy code that writes to the new column while reading from both.
3. **Contract (Phase 3)**: Once the release is verified, deploy a subsequent migration to remove deprecated columns.

> [!WARNING]
> Never drop a column or rename a table in the same release that deploys new application code. If you have to roll back the code, the old code will immediately crash because the dropped column is gone!

---

## Related Guides

- [Database Migrations & PostgreSQL](/docs/postgresql/tables)
- [Deploying Node.js to Linux VPS](/docs/deployment/deploy-nodejs-vps)
- [Deploying Next.js to Vercel](/docs/deployment/deploy-nextjs-vercel)
