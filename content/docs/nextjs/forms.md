---
title: Next.js Forms & Mutations
description: Handle form submissions, optimistic updates, and validation in Next.js using Server Actions, useActionState, and useFormStatus.
category: frontend
topic: nextjs
type: guide
level: intermediate
tags:
  - nextjs
  - app-router
  - forms
  - react-19
  - mutations
platforms:
  - web
  - node
tested:
  nextjs: "16.x"
  react: "19.x"
lastVerified: "2026-09-30"
---

## Overview

Modern Next.js leverages native HTML form behaviors and React 19 primitives (`useActionState`, `useFormStatus`) to support progressive enhancement and seamless asynchronous mutations.

---

## Basic Form Submission with Server Actions

Forms can invoke asynchronous server functions directly through the `action` attribute:

```typescript
// app/actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // Save to database...
}
```

```tsx
// app/posts/new/page.tsx
import { createPost } from '@/app/actions';

export default function NewPostPage() {
  return (
    <form action={createPost} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Title</label>
        <input id="title" name="title" required className="w-full border p-2 rounded" />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium">Content</label>
        <textarea id="content" name="content" required className="w-full border p-2 rounded" />
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Submit Post
      </button>
    </form>
  );
}
```

---

## Form State and Validation with `useActionState`

To display server validation errors and state transitions in the UI, use React 19's `useActionState` hook inside a Client Component:

```typescript
// app/actions.ts
'use server';

export interface ActionState {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function registerUser(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return {
      success: false,
      errors: { email: ['Please enter a valid email address.'] },
    };
  }

  return { success: true, message: 'Registration successful!' };
}
```

```tsx
// app/register/page.tsx
'use client';

import { useActionState } from 'react';
import { registerUser, ActionState } from '@/app/actions';

const initialState: ActionState = { success: false };

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  return (
    <form action={formAction} className="space-y-4 max-w-sm">
      <div>
        <input name="email" placeholder="you@example.com" className="w-full border p-2 rounded" />
        {state.errors?.email && (
          <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      {state.message && (
        <p className="text-green-600 text-sm">{state.message}</p>
      )}

      <button disabled={isPending} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        {isPending ? 'Submitting...' : 'Register'}
      </button>
    </form>
  );
}
```

---

## Submit Button State with `useFormStatus`

The `useFormStatus` hook provides access to the pending status of the parent `<form>` without prop drilling:

```tsx
// components/submit-button.tsx
'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({ label = 'Submit' }: { label?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
    >
      {pending ? 'Saving...' : label}
    </button>
  );
}
```

---

## Best Practices

- **Progressive Enhancement**: Simple server action forms work even before client-side JavaScript has finished loading.
- **Server-Side Validation**: Never rely solely on HTML5 client validation. Validate all `FormData` values on the server using schemas like Zod.
- **Form Resetting**: Use client state or native form reset triggers upon successful state returns.
