---
title: "Prisma Error P2025: Record to update or delete not found"
description: "How to troubleshoot and fix Prisma error P2025 when attempting to update, delete, or connect a record that does not exist in the database."
category: databases
topic: prisma
type: troubleshooting
level: beginner
tags:
  - prisma
  - errors
  - p2025
  - not-found
  - database
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma Error P2025: Record to update or delete not found

---

## Error Message

```text
Invalid `prisma.post.delete()` invocation:

An operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.
  code: 'P2025',
  clientVersion: '6.x.x',
  meta: { modelName: 'Post', cause: 'Record to delete does not exist.' }
```

---

## Symptoms

- `prisma.model.update()`, `prisma.model.delete()`, or `findUniqueOrThrow()` throws an unhandled exception.
- Error code is `P2025`.
- Occurs when users provide an ID that was already deleted or never existed.

---

## Why It Happens

`prisma.model.update()` and `prisma.model.delete()` strictly require that the target record exists. If zero rows match the `where` filter, Prisma rejects the promise with error code `P2025` to prevent unintended silent failures.

---

## How to Fix It

### Solution 1: Catch `P2025` and Return HTTP 404
```typescript
import { Prisma } from "@prisma/client";

try {
  await prisma.post.delete({
    where: { id: postId },
  });
  return Response.json({ success: true });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
    return Response.json({ error: "Post not found or already deleted" }, { status: 404 });
  }
  return Response.json({ error: "Internal Server Error" }, { status: 500 });
}
```

### Solution 2: Use `deleteMany` or `updateMany` for Tolerant Mutations
If your use case prefers silently ignoring missing records without throwing an exception:
```typescript
// deleteMany returns { count: 0 } instead of throwing P2025
const { count } = await prisma.post.deleteMany({
  where: { id: postId },
});
```

---

## Related Guides

- [Prisma CRUD Operations](/docs/prisma/crud)
- [Prisma Common Errors](/docs/prisma/common-errors)
- [Prisma with Node.js & Express](/docs/prisma/nodejs-integration)
