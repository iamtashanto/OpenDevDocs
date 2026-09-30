---
title: Backend Request Validation & Sanitization
description: Validate request bodies, query parameters, and route parameters with schemas (Zod) to prevent malformed data and security exploits.
category: backend
topic: backend-concepts
type: guide
level: intermediate
tags:
  - backend
  - validation
  - zod
  - sanitization
  - security
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

## Why Backend Validation is Mandatory

Frontend form validation exists exclusively for user experience. Malicious users, automated bots, and cURL scripts bypass browser validation entirely. Every piece of external data entering your backend must be strictly validated and sanitized.

---

## Validation vs Sanitization

- **Validation**: Verifying that incoming data matches expected types, lengths, ranges, and formats (e.g. "Is this a valid email? Is age a positive integer?"). If invalid, reject with `400 Bad Request` or `422 Unprocessable Entity`.
- **Sanitization**: Cleaning or modifying input to remove harmful characters or strip unexpected fields (e.g. trimming whitespace, stripping script tags, normalizing email lowercase).

---

## Schema-Based Validation with Zod

[Zod](https://zod.dev/) provides TypeScript-first schema declaration and runtime validation:

```typescript
import { z } from 'zod';

export const CreateUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address').toLowerCase().trim(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    age: z.number().int().min(18, 'Must be at least 18 years old').optional(),
    role: z.enum(['user', 'admin']).default('user'),
  }),
  params: z.object({}),
  query: z.object({
    referrer: z.string().optional(),
  }),
});

// Infer TypeScript type directly from schema
export type CreateUserInput = z.infer<typeof CreateUserSchema>['body'];
```

---

## Standard Structured Error Response Format

When validation fails, return clear, machine-readable error structures:

```json
{
  "error": "Validation Error",
  "statusCode": 422,
  "details": [
    {
      "field": "body.email",
      "message": "Invalid email address"
    },
    {
      "field": "body.password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

---

## Best Practices

1. **Strip Unknown Properties**: Configure schemas to disallow or strip unlisted payload fields to prevent mass-assignment vulnerabilities.
2. **Coerce Types on Query Strings**: HTTP query parameters arrive as strings (`?page=2`). Use `z.coerce.number()` to cast them safely before validation.
3. **Validate Early in Middleware**: Run validation before the request reaches database queries or controller logic.
