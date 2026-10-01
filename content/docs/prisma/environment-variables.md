---
title: "Prisma Environment Variables & Connection URLs"
description: "Configuring DATABASE_URL, connection pooling parameters, SSL modes, and secret handling across development and production environments."
category: databases
topic: prisma
type: guide
level: beginner
tags:
  - prisma
  - environment-variables
  - database-url
  - postgresql
  - security
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma Environment Variables & Connection URLs

Prisma automatically loads environment variables from a `.env` file in the project root or `prisma/` folder.

---

## 1. Anatomy of a PostgreSQL Connection URL

```text
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA&connection_limit=10&sslmode=prefer
```

- **`USER`**: Database username (e.g. `postgres`).
- **`PASSWORD`**: Password (percent-encode special characters like `@` or `:`).
- **`HOST`**: Hostname or IP address (e.g. `localhost`, `db.example.com`).
- **`PORT`**: Database port (default `5432`).
- **`DATABASE`**: Database name (e.g. `myapp_production`).
- **`schema`**: PostgreSQL schema namespace (default `public`).
- **`connection_limit`**: Maximum connections in the client pool.

---

## 2. Separate URLs for Direct Connections vs Pooled Connections

When deploying behind connection poolers (like AWS RDS Proxy, PgBouncer, Supabase, Neon), configure two URLs in `schema.prisma`:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")        // Pooled connection URL (For app queries)
  directUrl = env("DIRECT_URL")          // Direct connection URL (For prisma migrate)
}
```

```ini
# .env (Production Example)
DATABASE_URL="postgresql://user:pass@ep-cool-pooler.us-east-1.neon.tech/neondb?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://user:pass@ep-cool-direct.us-east-1.neon.tech/neondb?sslmode=require"
```

---

## 3. Best Practices for Secret Handling

<Callout type="warning">
Never commit `.env` files containing real production database passwords to Git. Always add `.env` and `.env*.local` to `.gitignore`, and create a `.env.example` template with dummy values for documentation.
</Callout>

---

## Related Topics

- [Connection Management & Pooling](/docs/prisma/connection-management)
- [PostgreSQL Native Features](/docs/prisma/postgresql)
- [Production Deployment Workflows](/docs/prisma/production-migrations)
