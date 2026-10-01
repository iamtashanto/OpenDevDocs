---
title: "Next.js + PostgreSQL + Prisma Stack"
description: "End-to-end production recipe: build a full-stack Next.js 16 App Router application with PostgreSQL and Prisma ORM."
category: fullstack
topic: nextjs
type: recipe
level: intermediate
tags:
  - nextjs
  - postgresql
  - prisma
  - app-router
  - fullstack
platforms:
  - web
tested:
  nextjs: "16.x"
  prisma: "6.x"
  postgresql: "16.x"
lastVerified: "2026-10-01"
---

# Next.js + PostgreSQL + Prisma Stack

A complete step-by-step recipe to set up Next.js 16 App Router with PostgreSQL and Prisma.

---

## 1. Project Initialization & Dependencies

<Steps>
  <Step step={1} title="Install Prisma Packages">
    In your Next.js project root:

    <PackageManagerTabs package="@prisma/client" />
    <PackageManagerTabs package="prisma tsx" dev />
  </Step>

  <Step step={2} title="Initialize Prisma">
    ```bash
    npx prisma init --datasource-provider postgresql
    ```
  </Step>

  <Step step={3} title="Define Database Schema">
    Edit `prisma/schema.prisma`:

    ```prisma
    generator client {
      provider = "prisma-client-js"
    }

    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }

    model Task {
      id        String   @id @default(uuid())
      title     String
      completed Boolean  @default(false)
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt

      @@map("tasks")
    }
    ```
  </Step>

  <Step step={4} title="Run Initial Migration">
    ```bash
    npx prisma migrate dev --name init_tasks
    ```
  </Step>
</Steps>

---

## 2. Setting Up the Global Singleton Client

Create `src/lib/prisma.ts`:

```typescript
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

---

## 3. Server Actions for CRUD

Create `src/app/tasks/actions.ts`:

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createTask(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  if (!title) return { error: "Title is required" };

  await prisma.task.create({
    data: { title },
  });

  revalidatePath("/tasks");
  return { success: true };
}

export async function toggleTask(id: string, completed: boolean) {
  await prisma.task.update({
    where: { id },
    data: { completed },
  });

  revalidatePath("/tasks");
}

export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: { id },
  });

  revalidatePath("/tasks");
}
```

---

## 4. Building the UI in Server Components

Create `src/app/tasks/page.tsx`:

```tsx
import { prisma } from "@/lib/prisma";
import { createTask, toggleTask, deleteTask } from "./actions";

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tasks Manager</h1>

      {/* Create Task Form */}
      <form action={createTask} className="flex gap-2">
        <input
          name="title"
          required
          placeholder="New task title..."
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul className="divide-y border rounded-xl">
        {tasks.map((task) => (
          <li key={task.id} className="p-3 flex items-center justify-between">
            <span className={task.completed ? "line-through text-slate-400" : ""}>
              {task.title}
            </span>
            <div className="flex gap-2">
              <form action={toggleTask.bind(null, task.id, !task.completed)}>
                <button type="submit" className="text-xs px-2 py-1 border rounded">
                  {task.completed ? "Undo" : "Complete"}
                </button>
              </form>
              <form action={deleteTask.bind(null, task.id)}>
                <button type="submit" className="text-xs px-2 py-1 bg-rose-50 text-rose-600 rounded">
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

---

## Related Guides

- [Prisma with Next.js App Router](/docs/prisma/nextjs-integration)
- [Prisma Client Singleton](/docs/prisma/prisma-client)
- [PostgreSQL Setup](/docs/postgresql/installation)
