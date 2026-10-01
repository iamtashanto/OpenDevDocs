---
title: "Prisma Error P2002: Unique constraint failed"
description: "How to troubleshoot and fix Prisma error P2002 when attempting to insert or update a record with a duplicate unique field value."
category: databases
topic: prisma
type: troubleshooting
level: beginner
tags:
  - prisma
  - errors
  - p2002
  - unique-constraint
  - database
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma Error P2002: Unique constraint failed

---

## Error Message

```text
Invalid `prisma.user.create()` invocation:

Unique constraint failed on the constraint: `users_email_key`
    at ...
  code: 'P2002',
  clientVersion: '6.x.x',
  meta: { modelName: 'User', target: [ 'email' ] }
```

---

## Symptoms

- `prisma.user.create()`, `createMany()`, or `update()` rejects with a `PrismaClientKnownRequestError`.
- Error code is `P2002`.
- `meta.target` lists the conflicting unique column (e.g. `['email']` or `['slug']`).

---

## Why It Happens

In your `schema.prisma`, a field is annotated with `@unique` (or a model with `@@unique([...])`). The database rejected the insert/update operation because a row with the exact same value already exists.

---

## How to Fix It

### Solution 1: Use `upsert` (Update if exists, Create if new)
```typescript
const user = await prisma.user.upsert({
  where: { email: "user@example.com" },
  update: { name: "Updated Name" },
  create: { email: "user@example.com", name: "New Name" },
});
```

### Solution 2: Catch `P2002` in API Route Handlers
```typescript
import { Prisma } from "@prisma/client";

try {
  const user = await prisma.user.create({ data });
  return Response.json(user, { status: 201 });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    return Response.json(
      { error: "An account with this email already exists." },
      { status: 409 }
    );
  }
  return Response.json({ error: "Internal Server Error" }, { status: 500 });
}
```

---

## Related Guides

- [Prisma CRUD Operations](/docs/prisma/crud)
- [Prisma Common Errors](/docs/prisma/common-errors)
- [PostgreSQL Constraints Overview](/docs/postgresql/constraints)
