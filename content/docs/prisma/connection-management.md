---
title: "Prisma Connection Management & Pooling"
description: "Optimizing PostgreSQL connection pools, configuring PgBouncer, preventing connection leaks in serverless functions, and Prisma Accelerate."
category: databases
topic: prisma
type: guide
level: production
tags:
  - prisma
  - connection-pooling
  - pgbouncer
  - performance
  - serverless
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma Connection Management & Pooling

Managing database connection limits is critical for stability in high-traffic and serverless environments.

---

## 1. Connection Pool Sizing Formula

Every instance of `PrismaClient` creates an internal connection pool:

```text
Default pool size = (num_physical_cpus * 2) + 1
```

You can explicitly configure the connection pool limit in your connection URL:

```ini
DATABASE_URL="postgresql://user:pass@localhost:5432/mydb?connection_limit=10&pool_timeout=15"
```

- **`connection_limit`**: Maximum number of concurrent connections this process will open.
- **`pool_timeout`**: Number of seconds to wait for a free connection before throwing an error.

---

## 2. Serverless Environments & PgBouncer

In serverless platforms (Vercel, AWS Lambda), hundreds of function instances can spin up simultaneously, easily exceeding PostgreSQL's connection limit (default 100).

When using PgBouncer (or Supabase/Neon connection poolers):

1. Set `?pgbouncer=true` in `DATABASE_URL` (Disables prepared statements).
2. Set `connection_limit=1` for serverless lambdas.
3. Use a separate `DIRECT_URL` for `prisma migrate` (PgBouncer in transaction mode does not support advisory locks used by migrations).

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

---

## 3. Disconnecting Prisma in Short-Lived Scripts

In CLI scripts, cron jobs, and background workers, always call `$disconnect()`:

```typescript
try {
  await runMaintenanceJob();
} finally {
  await prisma.$disconnect();
}
```

---

## Related Topics

- [Prisma Client Singleton](/docs/prisma/prisma-client)
- [Environment Variables](/docs/prisma/environment-variables)
- [PostgreSQL Connection Basics](/docs/postgresql/connecting)
