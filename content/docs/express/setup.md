---
title: Express.js Setup & Quickstart
description: Initialize a modern TypeScript Express.js server with JSON parsing, CORS, environment variables, and graceful lifecycle management.
category: backend
topic: express
type: guide
level: beginner
tags:
  - express
  - backend
  - typescript
  - nodejs
  - setup
platforms:
  - node
tested:
  node: "22.x"
  express: "4.21.x"
lastVerified: "2026-09-30"
---

## Overview

[Express](https://expressjs.com/) is a minimal, unopinionated, and flexible Node.js web application framework providing a robust set of features for building web and mobile APIs.

---

## Project Initialization with TypeScript

### 1. Initialize and Install Dependencies

```bash
mkdir my-express-api && cd my-express-api
pnpm init
pnpm add express dotenv cors helmet
pnpm add -D typescript tsx @types/node @types/express @types/cors
```

### 2. Configure TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

---

## Basic Server Setup

```typescript
// src/app.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app: Express = express();

// Security and body parser middlewares
app.use(helmet());
app.use(cors());
app.use(express.json()); // Parses application/json
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

export default app;
```

```typescript
// src/server.ts
import app from './app.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## Running in Development with `tsx`

In `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

Start the server:

```bash
pnpm dev
```
