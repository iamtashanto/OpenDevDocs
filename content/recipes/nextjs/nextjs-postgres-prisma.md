---
title: "Next.js + PostgreSQL + Prisma ORM"
description: Complete step-by-step setup connecting Next.js App Router to a PostgreSQL database with Prisma ORM and singleton client connection management.
category: fullstack
topic: nextjs
type: recipe
level: intermediate
tags:
  - nextjs
  - postgresql
  - prisma
  - orm
  - database
platforms:
  - all
tested:
  nextjs: "16.x"
  prisma: "6.x"
  postgres: "16.x"
lastVerified: "2026-09-30"
---

## Goal

Configure a production-ready PostgreSQL connection inside Next.js App Router using Prisma ORM, supporting local schema migrations, TypeScript autocompletion, and safe singleton client reuse across server actions and route handlers.

---

## Prerequisites

- Node.js 20+ or 22+ installed
- A running PostgreSQL database instance (local Docker, Supabase, Neon, or RDS)
- An existing Next.js App Router project

---

## Architecture Overview

```
[ Next.js Server Components / Actions ]
               │
               ▼
   [ lib/prisma.ts Singleton ]
               │
               ▼ (Connection Pool)
     [ PostgreSQL Database ]
```

---

<Steps>
  <Step step={1} title="Install Prisma CLI and Client">
    Install Prisma CLI as a dev dependency and `@prisma/client` as a runtime dependency:

    <PackageManagerTabs package="@prisma/client" />
    <PackageManagerTabs package="prisma" dev />
  </Step>

  <Step step={2} title="Initialize Prisma Configuration">
    Generate the `prisma/schema.prisma` file and `.env` template:

    <Command>pnpm prisma init --datasource-provider postgresql</Command>
  </Step>

  <Step step={3} title="Configure Database Connection URL">
    Open your `.env` file and define the `DATABASE_URL`:

    ```env
    DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/my_app_db?schema=public"
    ```
  </Step>

  <Step step={4} title="Define Your Data Models">
    Edit `prisma/schema.prisma`:

    ```prisma
    generator client {
      provider = "prisma-client-js"
    }

    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }

    model User {
      id        String   @id @default(cuid())
      email     String   @unique
      name      String?
      createdAt DateTime @default(now())
      posts     Post[]
    }

    model Post {
      id        String   @id @default(cuid())
      title     String
      content   String?
      published Boolean  @default(false)
      authorId  String
      author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
      createdAt DateTime @default(now())
    }
    ```
  </Step>

  <Step step={5} title="Run Initial Schema Migration">
    Apply the schema to your PostgreSQL database:

    <Command>pnpm prisma migrate dev --name init</Command>
  </Step>

  <Step step={6} title="Create Prisma Client Singleton (`lib/prisma.ts`)">
    In Next.js development mode, hot-reloading can instantiate dozens of PrismaClient instances, exhausting database connection limits. Use a singleton pattern to prevent this:

    ```typescript
    // lib/prisma.ts
    import { PrismaClient } from "@prisma/client";

    const globalForPrisma = globalThis as unknown as {
      prisma: PrismaClient | undefined;
    };

    export const prisma =
      globalForPrisma.prisma ??
      new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      });

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prisma;
    }
    ```
  </Step>

  <Step step={7} title="Fetch Data in a Server Component">
    Query the database directly inside an async Server Component:

    ```tsx
    // app/users/page.tsx
    import { prisma } from "@/lib/prisma";

    export default async function UsersPage() {
      const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        include: { posts: true },
      });

      return (
        <main className="p-8">
          <h1 className="text-2xl font-bold mb-4">Users Directory</h1>
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="p-3 rounded border">
                <span className="font-semibold">{user.name ?? "Anonymous"}</span> — {user.email}
                <span className="text-xs text-muted-foreground ml-2">({user.posts.length} posts)</span>
              </li>
            ))}
          </ul>
        </main>
      );
    }
    ```
  </Step>
</Steps>

---

## Verification

Run the dev server and inspect database queries in the terminal:

<Command>pnpm dev</Command>

Open [http://localhost:3000/users](http://localhost:3000/users) to verify records render with zero connection warnings.

---

## Security & Production Considerations

1. **Connection Pooling in Serverless**: If deploying to Vercel or AWS Lambda, use a transaction-level connection pooler like **PgBouncer** or **Neon / Supabase Connection Pooler** with `?pgbouncer=true&connection_limit=1`.
2. **Never Expose Client in Browser**: Keep `lib/prisma.ts` exclusively imported in Server Components, Server Actions, or Route Handlers.
3. **Database URL Secret**: Add `.env` and `.env.local` to `.gitignore`. Never commit database credentials.

---

## Related Documentation

- [PostgreSQL Backup & Restore Reference](/commands/postgresql/dump-database)
- [Dockerize a Next.js Application Recipe](/recipes/docker/dockerize-nextjs)
