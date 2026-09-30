---
title: Next.js Database Integration
description: Connect databases, manage connection pooling, and use ORMs like Prisma and Drizzle inside the Next.js App Router.
category: frontend
topic: nextjs
type: guide
level: intermediate
tags:
  - nextjs
  - database
  - orm
  - prisma
  - drizzle
  - postgresql
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

## Overview

In Next.js App Router, database queries are executed directly on the server inside Server Components, Server Actions, or Route Handlers without exposing database credentials to the browser.

---

## The Database Client Singleton Pattern

In development mode, Next.js hot-reloading can create multiple database client instances, quickly exhausting available database connection pools. Use a global singleton to reuse the client instance:

### Prisma Singleton Example

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### Drizzle ORM Example

```typescript
// lib/db.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for Transaction Pool mode
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
```

---

## Querying in Server Components

You can directly query the database asynchronously inside Server Components:

```tsx
// app/users/page.tsx
import { prisma } from '@/lib/prisma';

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <h1 className="text-xl font-bold">User Directory</h1>
      <ul className="mt-4 space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-3 border rounded">
            <span className="font-semibold">{user.name}</span> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Connection Pooling in Serverless & Edge

When deploying to serverless platforms (Vercel, AWS Lambda), each function invocation may spawn separate runtime containers.

- **Connection Poolers**: Use tools like PgBouncer, Neon Serverless Pooler, Supabase Connection Pooler, or Prisma Accelerate to handle hundreds of concurrent serverless connections safely.
- **Set Max Pool Limits**: Limit local pool sizing per instance (e.g. `max: 1` or `max: 5`) to prevent overloading your database instance.
