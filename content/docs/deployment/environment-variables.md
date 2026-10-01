---
title: "Environment Variables in Production Deployment"
description: Complete guide to managing configuration across environments, Twelve-Factor principles, secret rotation, Doppler, Vault, and build vs runtime variables.
category: devops
topic: deployment
type: guide
level: intermediate
tags:
  - deployment
  - env
  - secrets
  - configuration
platforms:
  - linux
  - macos
  - windows
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

Production applications must strictly separate **configuration** from **code**. Storing credentials, database URLs, and third-party API keys in environment variables allows the same compiled binary to run across staging, preview, and production environments without rebuilding.

---

## Build-Time vs. Runtime Environment Variables

Understanding when a variable is evaluated is critical, especially in full-stack frameworks (Next.js, Vite):

```
┌─────────────────────────────────────────────────────────────┐
│ Variable Lifecycles                                         │
├──────────────────────────────┬──────────────────────────────┤
│ Build-Time Variables         │ Runtime Variables            │
│ (Inlined into JS bundles)    │ (Evaluated per request / run)│
├──────────────────────────────┼──────────────────────────────┤
│ NEXT_PUBLIC_API_URL          │ DATABASE_URL                 │
│ VITE_APP_TITLE               │ JWT_SECRET_KEY               │
│ Embedded directly into HTML/ │ Evaluated on server backend; │
│ client-side JS bundles.      │ NEVER exposed to browser.    │
└──────────────────────────────┴──────────────────────────────┘
```

> [!CAUTION]
> Any variable prefixed with `NEXT_PUBLIC_` or `VITE_` is publicly readable by anyone inspecting your web application in browser DevTools. **Never prefix private API keys or database connection strings with `NEXT_PUBLIC_`!**

---

## Managing Secrets in Production

### 1. Platform Secret Managers (Vercel, Render, Railway, AWS ECS)
Set variables directly in the cloud provider's dashboard or CLI:
```bash
vercel env add DATABASE_URL production
```

### 2. Linux VPS with `systemd` or PM2
Use environment files with restricted OS permissions (`chmod 600`):
```bash
# /etc/myapp/.env.production
sudo chmod 600 /etc/myapp/.env.production
sudo chown appuser:appuser /etc/myapp/.env.production
```

### 3. Dedicated Secret Vaults (Enterprise)
- **Doppler / HashiCorp Vault / AWS Secrets Manager**: Centralized secret stores with automatic encryption at rest, access audit logging, and automated token rotation.

---

## Secret Rotation Checklist

When rotating a compromised or expiring secret (e.g. database password):
1. **Support Dual Credentials**: Configure the database/service to temporarily accept both old and new credentials.
2. **Update App Variables**: Update the secret in your staging and production environments.
3. **Trigger Zero-Downtime Rolling Redeploy**: Deploy the updated application instances.
4. **Revoke Old Credentials**: Disable the old credential in the upstream service once traffic has shifted.

---

## Related Guides

- [Docker Environment Variables](/docs/docker/environment-variables)
- [Validating Env with Zod](/packages/zod)
- [Twelve-Factor App Configuration](/docs/deployment/dev-vs-prod)
