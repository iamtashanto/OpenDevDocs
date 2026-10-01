---
title: "Prisma Common Errors & Troubleshooting"
description: "Diagnose and fix the most common Prisma error codes: P2002 (Unique constraint), P2025 (Record not found), P1001 (Unreachable database), and P2003 (Foreign key constraint)."
category: databases
topic: prisma
type: troubleshooting
level: beginner
tags:
  - prisma
  - errors
  - troubleshooting
  - debugging
  - p2002
  - p2025
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma Common Errors & Troubleshooting

Prisma returns structured error codes starting with **`P`** for all known database exceptions.

---

## 1. Top Prisma Error Codes

| Error Code | Meaning | Common Cause | Quick Fix |
| :--- | :--- | :--- | :--- |
| **`P1001`** | Can't reach database server | Database is offline, incorrect host/port, or firewall blocking connection. | Check DB status, verify `DATABASE_URL` credentials. |
| **`P1002`** | Database server timed out | Network latency or slow query. | Increase connection timeout in URL parameters. |
| **`P2002`** | Unique constraint failed | Inserting duplicate value into `@unique` column (e.g. email). | Catch error and return `409 Conflict` or use `upsert`. |
| **`P2003`** | Foreign key constraint failed | Referencing a parent ID that does not exist. | Verify parent record exists before creating child. |
| **`P2025`** | Record required but not found | Calling `update` or `delete` on an ID that doesn't exist. | Check existence with `findUnique` first or handle `P2025`. |

---

## 2. Handling Known Request Errors in Code

```typescript
import { Prisma } from "@prisma/client";

try {
  await prisma.user.create({
    data: { email: "existing@example.com" },
  });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      console.error("This email is already in use.");
    }
  }
}
```

---

## Related Troubleshooting Articles

- [P2002 Unique Constraint Troubleshooting](/errors/prisma/p2002-unique-constraint)
- [P2025 Record Not Found Troubleshooting](/errors/prisma/p2025-record-not-found)
- [P1001 Cannot Reach Database Troubleshooting](/errors/prisma/p1001-cannot-reach-database)
