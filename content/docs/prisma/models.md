---
title: "Prisma Models & Field Types"
description: "Defining data models, scalar types (String, Int, Boolean, DateTime, Json), field attributes (@id, @default, @unique), and table mapping."
category: databases
topic: prisma
type: reference
level: beginner
tags:
  - prisma
  - models
  - data-types
  - attributes
  - schema
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Prisma Models & Field Types

Models in Prisma represent tables (in SQL relational databases) or collections (in MongoDB).

---

## 1. Scalar Types

| Prisma Type | TypeScript Type | PostgreSQL Type Equivalent |
| :--- | :--- | :--- |
| `String` | `string` | `text` / `varchar(n)` |
| `Boolean` | `boolean` | `boolean` |
| `Int` | `number` | `integer` (4 bytes) |
| `BigInt` | `bigint` | `bigint` (8 bytes) |
| `Float` | `number` | `double precision` |
| `Decimal` | `Decimal` (`decimal.js`) | `numeric` / `decimal` (Exact precision) |
| `DateTime` | `Date` | `timestamp(3)` |
| `Json` | `JsonValue` | `jsonb` |
| `Bytes` | `Buffer` | `bytea` |

---

## 2. Field Modifiers

- **Required Field**: `title String` (Value cannot be null)
- **Optional Field (`?`)**: `bio String?` (Value can be `null` or `undefined`)
- **List / Array Field (`[]`)**: `tags String[]` (Supported natively in PostgreSQL)

---

## 3. Essential Field Attributes

| Attribute | Description | Example |
| :--- | :--- | :--- |
| `@id` | Declares the primary key | `id Int @id @default(autoincrement())` |
| `@default(...)` | Sets a default column value | `createdAt DateTime @default(now())` |
| `@unique` | Enforces unique constraint | `email String @unique` |
| `@updatedAt` | Automatically updates timestamp on edit | `updatedAt DateTime @updatedAt` |
| `@map("col_name")` | Maps field to a specific SQL column | `createdAt DateTime @map("created_at")` |

---

## 4. Model-Level Attributes

| Attribute | Description | Example |
| :--- | :--- | :--- |
| `@@map("table_name")` | Maps model to SQL table name | `@@map("auth_users")` |
| `@@unique([...])` | Compound unique constraint | `@@unique([tenantId, slug])` |
| `@@index([...])` | Creates an index on columns | `@@index([authorId, status])` |
| `@@id([...])` | Composite primary key | `@@id([userId, organizationId])` |

---

## 5. Comprehensive Example

```prisma
model OrganizationMember {
  organizationId String   @map("org_id")
  userId         String   @map("user_id")
  role           String   @default("member")
  joinedAt       DateTime @default(now()) @map("joined_at")

  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Composite primary key (Many-to-many join table)
  @@id([organizationId, userId])
  @@index([userId])
  @@map("organization_members")
}
```

---

## Related Topics

- [Defining Relations](/docs/prisma/relations)
- [PostgreSQL Native Types](/docs/prisma/postgresql)
- [Database Migrations](/docs/prisma/migrations)
