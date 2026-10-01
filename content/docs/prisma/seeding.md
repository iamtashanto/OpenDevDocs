---
title: "Database Seeding with Prisma"
description: "How to populate development and staging databases with mock data using prisma/seed.ts and the tsx script runner."
category: databases
topic: prisma
type: guide
level: beginner
tags:
  - prisma
  - seeding
  - mock-data
  - development
platforms:
  - node
tested:
  prisma: "6.x"
lastVerified: "2026-10-01"
---

# Database Seeding with Prisma

Database seeding populates initial test data (admin users, categories, sample articles) into a fresh database.

---

## 1. Writing the Seed Script (`prisma/seed.ts`)

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing tables in development
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Insert admin user with posts
  const admin = await prisma.user.create({
    data: {
      email: "admin@opendevdocs.com",
      name: "Admin User",
      role: "ADMIN",
      posts: {
        create: [
          {
            title: "Welcome to OpenDevDocs",
            content: "The open developer platform for everyone.",
            published: true,
          },
          {
            title: "Docker & Kubernetes Guide",
            content: "Learn container orchestration from scratch.",
            published: true,
          },
        ],
      },
    },
  });

  console.log(`✅ Database seeded successfully! Admin ID: ${admin.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 2. Configuring `package.json`

Tell Prisma how to execute your TypeScript seed script:

```json
{
  "prisma": {
    "seed": "npx tsx prisma/seed.ts"
  }
}
```

---

## 3. Running the Seed Command

```bash
npx prisma db seed
```

> [!NOTE]
> Running `prisma migrate reset` also triggers `prisma db seed` automatically after replaying migrations.

---

## Related Topics

- [Project Setup](/docs/prisma/project-setup)
- [Prisma Migrations](/docs/prisma/migrations)
- [CRUD Operations](/docs/prisma/crud)
