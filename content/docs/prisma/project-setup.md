---
title: "Prisma Project Setup & TypeScript Configuration"
description: "Recommended project structure, TypeScript compiler settings, tsx script runner, and package.json scripts for Prisma."
category: databases
topic: prisma
type: guide
level: beginner
tags:
  - prisma
  - typescript
  - project-structure
  - setup
platforms:
  - node
tested:
  prisma: "6.x"
  typescript: "5.x"
lastVerified: "2026-10-01"
---

# Prisma Project Setup & TypeScript Configuration

A clean project structure and proper TypeScript configuration ensure smooth migrations, seeding, and auto-generated types.

---

## 1. Recommended Directory Structure

```
my-app/
├── .env                     # Local environment variables (DO NOT COMMIT)
├── .env.example             # Template environment variables
├── package.json
├── tsconfig.json
├── prisma/
│   ├── schema.prisma        # Primary database schema definition
│   ├── seed.ts              # Database seeding script
│   └── migrations/          # Auto-generated SQL migration history
│       ├── 20260101_init/
│       │   └── migration.sql
│       └── migration_lock.toml
└── src/
    └── lib/
        └── prisma.ts        # Singleton PrismaClient instance
```

---

## 2. TypeScript `tsconfig.json` Settings

Ensure your `tsconfig.json` includes modern module resolution:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

## 3. Helpful `package.json` Scripts

Add shortcut scripts to `package.json`:

```json
{
  "scripts": {
    "db:migrate": "prisma migrate dev",
    "db:deploy": "prisma migrate deploy",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio",
    "db:format": "prisma format",
    "db:generate": "prisma generate"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  },
  "devDependencies": {
    "prisma": "^6.0.0",
    "tsx": "^4.19.0",
    "typescript": "^5.0.0"
  }
}
```

---

## 4. Prisma Studio (Visual GUI)

Prisma includes a built-in visual database browser and editor. Start it anytime with:

```bash
npx prisma studio
```

It opens an interactive web UI at `http://localhost:5555` to view, filter, insert, and edit table records directly.

---

## Related Topics

- [Prisma Schema Definition](/docs/prisma/schema.prisma)
- [Prisma Client Singleton](/docs/prisma/prisma-client)
- [Database Seeding](/docs/prisma/seeding)
