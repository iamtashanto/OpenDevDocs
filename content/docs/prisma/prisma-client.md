---
title: "Prisma Client & Singleton Instantiation"
description: "Initializing PrismaClient, preventing connection pool exhaustion during Next.js hot-reloading using the global singleton pattern, and logging options."
category: databases
topic: prisma
type: guide
level: intermediate
tags:
  - prisma
  - prisma-client
  - singleton
  - nextjs
  - connection-pooling
platforms:
  - node
  - web
tested:
  prisma: "6.x"
  nextjs: "16.x"
lastVerified: "2026-10-01"
---

# Prisma Client & Singleton Instantiation

`PrismaClient` is the auto-generated query builder that connects your application code to your database.

---

## 1. The Next.js Hot-Reloading Problem

In Next.js development mode (`next dev`), files are re-evaluated whenever you save changes. If you write `const prisma = new PrismaClient()` directly inside an API route or Server Component, Next.js instantiates a brand-new database connection pool on **every single code change**, quickly exhausting your PostgreSQL connection limit (`too many clients already`).

---

## 2. The Production-Grade Singleton Pattern

To prevent connection exhaustion, attach the `PrismaClient` instance to Node's `globalThis` object in development, while using a standard singleton in production:

```typescript
// src/lib/prisma.ts (or lib/prisma.ts)
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
```

---

## 3. Importing and Using Prisma

Anywhere across your Server Components, Server Actions, or API Route Handlers:

```typescript
// app/api/users/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
```

---

## Related Topics

- [Prisma CRUD Operations](/docs/prisma/crud)
- [Next.js App Router Integration](/docs/prisma/nextjs-integration)
- [Connection Management & Pooling](/docs/prisma/connection-management)
