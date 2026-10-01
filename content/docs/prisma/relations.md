---
title: "Prisma Relations (1:1, 1:N, N:M)"
description: "Model relationships in Prisma: one-to-one, one-to-many, many-to-many (implicit vs explicit), @relation attribute, and cascade deletes."
category: databases
topic: prisma
type: guide
level: intermediate
tags:
  - prisma
  - relations
  - foreign-keys
  - cascade-delete
  - join-tables
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma Relations (1:1, 1:N, N:M)

Prisma supports all standard relational database associations.

---

## 1. One-to-Many (1:N) Relationship

The most common relationship (e.g. one User has many Posts):

```prisma
model User {
  id    String @id @default(uuid())
  email String @unique
  posts Post[] // Virtual relation field (no column in SQL)
}

model Post {
  id        Int    @id @default(autoincrement())
  title     String
  authorId  String // Foreign key column in SQL table
  author    User   @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@index([authorId])
}
```

---

## 2. One-to-One (1:1) Relationship

For exclusive relationships (e.g. one User has one Profile):

```prisma
model User {
  id      String   @id @default(uuid())
  profile Profile?
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String
  userId String @unique // @unique enforces exactly 1 profile per user
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 3. Many-to-Many (N:M) Relationships

### Implicit Many-to-Many (Prisma manages the Join Table)
When you don't need extra metadata on the relation:

```prisma
model Post {
  id         Int        @id @default(autoincrement())
  title      String
  categories Category[] // Prisma automatically creates _CategoryToPost join table
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}
```

### Explicit Many-to-Many (Custom Join Table with Metadata)
When you need to track timestamp, role, or custom attributes on the association:

```prisma
model User {
  id          String       @id @default(uuid())
  memberships Membership[]
}

model Team {
  id          String       @id @default(uuid())
  memberships Membership[]
}

model Membership {
  userId String
  teamId String
  role   String   @default("MEMBER")
  joined DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  team Team @relation(fields: [teamId], references: [id], onDelete: Cascade)

  @@id([userId, teamId])
}
```

---

## 4. Referential Actions (`onDelete` & `onUpdate`)

| Action | Description |
| :--- | :--- |
| `Cascade` | Deleting the parent automatically deletes all dependent child records. |
| `Restrict` | Prevents deleting the parent if dependent child records exist. |
| `SetNull` | Sets the foreign key to `null` if the parent record is deleted. |
| `NoAction` | Lets the database default referential constraint handle the action. |

---

## Related Topics

- [Prisma Models](/docs/prisma/models)
- [Nested CRUD Queries](/docs/prisma/crud)
- [Database Migrations](/docs/prisma/migrations)
