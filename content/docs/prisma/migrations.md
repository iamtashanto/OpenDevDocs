---
title: "Prisma Migrations & CLI Workflow"
description: "Master database migrations with Prisma Migrate: dev migrations, applying production migrations, resetting development databases, and tracking history."
category: databases
topic: prisma
type: guide
level: intermediate
tags:
  - prisma
  - migrations
  - cli
  - sql
  - devops
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma Migrations & CLI Workflow

**Prisma Migrate** keeps your database schema synchronized with your `schema.prisma` file by generating and executing deterministic SQL migration files.

---

## 1. Development Migrations (`migrate dev`)

Whenever you make changes to `schema.prisma`:

```bash
npx prisma migrate dev --name add_user_avatar
```

This single command:
1. Compares your `schema.prisma` against your database structure.
2. Generates a new SQL migration file in `prisma/migrations/20260101_add_user_avatar/migration.sql`.
3. Executes the migration SQL against your local development database.
4. Triggers `prisma generate` to update the TypeScript types in `@prisma/client`.

---

## 2. Production Migrations (`migrate deploy`)

In production environments (CI/CD pipelines, Docker containers, VPS deployments), **never** run `migrate dev`. Use `migrate deploy`:

```bash
npx prisma migrate deploy
```

- Applies all pending migration files from `prisma/migrations/` to the target database.
- Does **not** generate new migration files.
- Does **not** ask for interactive prompts or reset databases.

---

## 3. Resetting Development Database (`migrate reset`)

If your local development database becomes corrupted or out of sync:

```bash
npx prisma migrate reset
```

<Callout type="warning">
`prisma migrate reset` drops the entire database, reapplies all historical migrations from scratch, and triggers the seed script. Never run this in production!
</Callout>

---

## 4. Prototyping Without Migrations (`db push`)

When rapidly prototyping or experimenting with schema shapes before committing to a permanent migration history:

```bash
npx prisma db push
```

Syncs the database schema directly with `schema.prisma` without generating migration files.

---

## Related Topics

- [Production Migration Workflow in CI/CD](/docs/prisma/production-migrations)
- [Database Seeding](/docs/prisma/seeding)
- [Prisma Schema Definition](/docs/prisma/schema.prisma)
