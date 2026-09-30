---
title: Production REST API Structure
description: Scalable, maintainable directory structure and 3-tier layered architecture for production Express and Node.js backends.
category: backend
topic: express
type: guide
level: intermediate
tags:
  - express
  - architecture
  - project-structure
  - rest
  - best-practices
platforms:
  - node
tested:
  node: "22.x"
  express: "4.21.x"
lastVerified: "2026-09-30"
---

## Scalable Project Directory Structure

```
my-express-api/
├── src/
│   ├── config/              # Environment variables, database configs, logger setup
│   │   ├── env.ts
│   │   ├── database.ts
│   │   └── logger.ts
│   ├── controllers/         # Handles HTTP requests, extracts params, sends responses
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── services/            # Pure business logic and domain rules
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── repositories/        # Database queries (Prisma, Drizzle, Knex, Mongoose)
│   │   └── user.repository.ts
│   ├── middleware/          # Custom middlewares (auth, validation, error handler)
│   │   ├── auth.ts
│   │   ├── validate.ts
│   │   └── errorHandler.ts
│   ├── routes/              # Express route declarations
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   └── user.routes.ts
│   ├── schemas/             # Request validation schemas (Zod)
│   │   ├── auth.schema.ts
│   │   └── user.schema.ts
│   ├── errors/              # Custom HTTP error classes
│   │   └── AppError.ts
│   ├── utils/               # Helper utilities and formatters
│   ├── app.ts               # Express application initialization & middleware setup
│   └── server.ts            # Server entrypoint (app.listen & graceful shutdown)
├── tests/                   # Integration and unit tests (Vitest / Supertest)
├── tsconfig.json
├── package.json
└── .env.example
```

---

## The 3-Tier Layered Flow

```
1. Route Layer        -> Maps HTTP path & verb to controller with middleware guards
        │
2. Controller Layer   -> Extracts & sanitizes inputs, calls services, sends HTTP response
        │
3. Service Layer      -> Executes business rules, orchestrates operations, hashes passwords
        │
4. Repository Layer   -> Interacts directly with database tables or third-party APIs
```

---

## Why Separate Controller and Service?

- **Testability**: Service methods are pure async JavaScript functions that can be unit-tested without mocking Express `req` and `res` objects.
- **Reusability**: The same `userService.createUser(...)` logic can be called from an Express HTTP endpoint, a background BullMQ queue worker, or a CLI command.
- **Clean Maintenance**: Route handlers never contain raw SQL queries or complex hashing logic.
