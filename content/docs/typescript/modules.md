---
title: "Modules and Type-Only Imports in TypeScript"
description: "TypeScript module architecture: import type, export type, ambient module declarations (*.d.ts), path aliases (@/*), and module resolution."
category: programming
topic: typescript
type: guide
level: intermediate
tags:
  - typescript
  - modules
  - type-only-imports
  - d-ts
  - path-aliases
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# Modules and Type-Only Imports in TypeScript

TypeScript extends ES Modules with **Type-Only Imports and Exports**, ensuring that types are stripped cleanly from compiled JavaScript output without side effects.

---

## 1. Type-Only Imports (`import type`)

When importing interfaces or types, use `import type` to guarantee the import produces zero runtime JavaScript:

```typescript
// Explicit type-only import:
import type { User, UserRole } from "./types";

// Mixed import with inline type keyword:
import { authenticateUser, type AuthSession } from "./auth";
```

### Why This Matters for Bundlers
Without `import type`, bundlers (like Vite or esbuild with `isolatedModules: true`) might retain imports of files that only contain types, causing runtime module resolution errors.

---

## 2. Ambient Declaration Files (`.d.ts`)

A `.d.ts` file provides type definitions without any runtime code. They are used to declare global types or type third-party JavaScript libraries:

```typescript
// types/global.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PORT: string;
    }
  }
}

// Typing static assets (e.g. SVG imports):
declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
```

---

## 3. Path Aliases (`@/*`)

Map clean root-relative import aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Now import anywhere in your codebase using `@/components/Button` rather than messy `../../../../components/Button`.

---

## Related Topics

- [tsconfig Fundamentals](/docs/typescript/tsconfig-fundamentals)
- [JavaScript Modules (ESM vs CJS)](/docs/javascript/modules)
- [Package Managers](/docs/fundamentals/package-managers)
