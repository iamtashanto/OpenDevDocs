---
title: "The Prisma Schema File (schema.prisma)"
description: "Mastering the schema.prisma file: datasource blocks, client generators, formatting, schema validation, and database introspection."
category: databases
topic: prisma
type: reference
level: beginner
tags:
  - prisma
  - schema
  - generator
  - datasource
  - syntax
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# The Prisma Schema File (`schema.prisma`)

The `schema.prisma` file is the central configuration file where your database connection, generators, and data models are declared.

---

## 1. Anatomy of `schema.prisma`

```prisma
// 1. Generator Block: Controls what assets Prisma builds (TypeScript client)
generator client {
  provider = "prisma-client-js"
}

// 2. Datasource Block: Specifies the database dialect and connection URL
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 3. Data Models: Define entities, tables, fields, and relationships
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]

  @@map("users") // Maps model to SQL table name 'users'
}

enum Role {
  USER
  ADMIN
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@index([authorId])
  @@map("posts")
}
```

---

## 2. Supported Database Providers

| Provider | `datasource.provider` Value | Connection URL Protocol |
| :--- | :--- | :--- |
| **PostgreSQL** | `"postgresql"` | `postgresql://user:pass@host:5432/db` |
| **MySQL** | `"mysql"` | `mysql://user:pass@host:3306/db` |
| **SQLite** | `"sqlite"` | `file:./dev.db` |
| **SQL Server** | `"sqlserver"` | `sqlserver://host:1433;database=db` |
| **CockroachDB** | `"cockroachdb"` | `postgresql://user:pass@host:26257/db` |
| **MongoDB** | `"mongodb"` | `mongodb+srv://user:pass@cluster.mongodb.net/db` |

---

## 3. Formatting & Linting the Schema

Prisma includes an automated formatter that aligns columns, attributes, and types:

```bash
# Format schema.prisma
npx prisma format

# Validate schema without running migrations
npx prisma validate
```

---

## 4. Introspecting an Existing Database (`db pull`)

If you already have a production database with existing SQL tables, Prisma can reverse-engineer your database schema automatically:

```bash
# Pull existing schema from live database into schema.prisma
npx prisma db pull

# Generate TypeScript client types
npx prisma generate
```

---

## Related Topics

- [Prisma Models & Field Types](/docs/prisma/models)
- [Defining Relations](/docs/prisma/relations)
- [Database Migrations](/docs/prisma/migrations)
