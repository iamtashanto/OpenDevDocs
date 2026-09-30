---
title: Next.js Server Actions
description: Deep dive into asynchronous server functions, cache revalidation, optimistic updates, and security in the Next.js App Router.
category: frontend
topic: nextjs
type: guide
level: intermediate
tags:
  - nextjs
  - app-router
  - server-actions
  - mutations
  - fullstack
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

## Overview

Server Actions are asynchronous functions that execute securely on the server. They can be invoked from both Server Components and Client Components to handle data mutations, authentication, and background processing.

---

## Defining Server Actions

### In a Dedicated File

To share actions across components or use them in Client Components, declare `'use server'` at the top of the file:

```typescript
// app/actions/todos.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function addTodo(formData: FormData) {
  const title = formData.get('title') as string;

  // Insert into DB
  // await db.todo.create({ data: { title } });

  // Revalidate cached page to show the new todo immediately
  revalidatePath('/todos');
}
```

### Inline in a Server Component

You can also define Server Actions directly inside Server Components:

```tsx
// app/todos/page.tsx
import { revalidatePath } from 'next/cache';

export default async function TodoPage() {
  async function deleteTodo(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    // await db.todo.delete({ where: { id } });
    revalidatePath('/todos');
  }

  return (
    <form action={deleteTodo}>
      <input type="hidden" name="id" value="123" />
      <button type="submit" className="text-red-500">Delete</button>
    </form>
  );
}
```

---

## Invoking Actions Outside Forms

Server Actions can be called programmatically via event handlers or `useTransition`:

```tsx
// components/like-button.tsx
'use client';

import { useTransition } from 'react';
import { likePost } from '@/app/actions/posts';

export function LikeButton({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await likePost(postId);
        });
      }}
      className="px-3 py-1 border rounded"
    >
      {isPending ? 'Liking...' : 'Like'}
    </button>
  );
}
```

---

## Cache Invalidation and Redirects

Next.js provides cache revalidation primitives specifically for Server Actions:

```typescript
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
  const name = formData.get('name') as string;
  // const project = await db.project.create({ data: { name } });

  // Revalidate specific path or tag
  revalidatePath('/projects');
  revalidateTag('projects-list');

  // Navigate user to newly created page
  redirect('/projects');
}
```

---

## Security Best Practices

1. **Treat Actions as Public API Endpoints**: Anyone can invoke a Server Action POST endpoint. Always verify authentication and user permissions inside the action.
2. **Validate Input Data**: Never trust client input. Parse and validate arguments with schemas (e.g. Zod).
3. **Avoid Exposing Secrets in Return Values**: Only return what the client needs to render the next UI state.
