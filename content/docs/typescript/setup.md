---
title: "Setting Up TypeScript"
description: "How to initialize TypeScript in a Node.js project: installing typescript dev dependencies, generating tsconfig.json, running tsc, and tsx execution."
category: programming
topic: typescript
type: guide
level: beginner
tags:
  - typescript
  - setup
  - tsconfig
  - tsc
  - node
platforms:
  - all
tested:
  typescript: "5.x"
  node: "22.x"
lastVerified: "2026-09-30"
---

# Setting Up TypeScript

Setting up TypeScript in a new or existing Node.js project takes less than two minutes.

---

## 1. Installation

Install TypeScript and Node.js type definitions as development dependencies:

```bash
# Using pnpm:
pnpm add -D typescript @types/node

# Using npm:
npm install --save-dev typescript @types/node
```

---

## 2. Generating `tsconfig.json`

Generate a starter compiler configuration file:

```bash
pnpm tsc --init
```

### Recommended Modern `tsconfig.json` Foundation:
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
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 3. Running and Compiling TypeScript

### Typechecking without Emitting Code:
```bash
pnpm tsc --noEmit
```

### Compiling to JavaScript (`dist/`):
```bash
pnpm tsc
```

### Fast Direct Execution with `tsx` (No manual build step):
```bash
# Run TypeScript files instantly in development:
pnpm dlx tsx src/index.ts
```

---

## Related Topics

- [tsconfig Fundamentals in Depth](/docs/typescript/tsconfig-fundamentals)
- [Primitive Types](/docs/typescript/primitive-types)
- [Package Managers](/docs/fundamentals/package-managers)
