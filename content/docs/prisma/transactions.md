---
title: "Prisma Database Transactions ($transaction)"
description: "Executing atomic operations in Prisma: sequential batch transactions and interactive callback transactions with ACID guarantees."
category: databases
topic: prisma
type: guide
level: intermediate
tags:
  - prisma
  - transactions
  - acid
  - concurrency
  - database
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma Database Transactions (`$transaction`)

Transactions ensure **ACID** (Atomicity, Consistency, Isolation, Durability) guarantees. If any step fails, the entire transaction rolls back cleanly without leaving partial data.

---

## 1. Sequential Batch Transactions (Array Form)

When you have multiple independent operations that must succeed or fail together:

```typescript
// Transacting money transfer between two accounts
const [debitedUser, creditedUser] = await prisma.$transaction([
  prisma.account.update({
    where: { id: "acc_sender" },
    data: { balance: { decrement: 100 } },
  }),
  prisma.account.update({
    where: { id: "acc_receiver" },
    data: { balance: { increment: 100 } },
  }),
]);
```

---

## 2. Interactive Transactions (Closure Form)

When the output of one query determines the input of the next operation within the same atomic transaction:

```typescript
const result = await prisma.$transaction(
  async (tx) => {
    // 1. Check sender balance
    const sender = await tx.account.findUniqueOrThrow({
      where: { id: "acc_sender" },
    });

    if (sender.balance < 100) {
      throw new Error("Insufficient funds for transfer");
    }

    // 2. Decrement sender
    await tx.account.update({
      where: { id: "acc_sender" },
      data: { balance: { decrement: 100 } },
    });

    // 3. Increment receiver
    const receiver = await tx.account.update({
      where: { id: "acc_receiver" },
      data: { balance: { increment: 100 } },
    });

    // 4. Create audit log
    const auditRecord = await tx.auditLog.create({
      data: {
        fromAccountId: sender.id,
        toAccountId: receiver.id,
        amount: 100,
      },
    });

    return { success: true, auditId: auditRecord.id };
  },
  {
    maxWait: 5000, // Max time to wait for a database connection (5s)
    timeout: 10000, // Max time transaction can run before aborting (10s)
  }
);
```

---

## Related Topics

- [PostgreSQL Transactions & ACID](/docs/postgresql/transactions)
- [Prisma CRUD Operations](/docs/prisma/crud)
- [Error Handling & Rollbacks](/docs/prisma/common-errors)
