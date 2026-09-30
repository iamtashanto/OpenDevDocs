---
title: "tsconfig.json Fundamentals & Compiler Options"
description: "Mastering tsconfig.json: strict mode flags (noImplicitAny, strictNullChecks), target, moduleResolution, paths, and production presets."
category: programming
topic: typescript
type: guide
level: intermediate
tags:
  - typescript
  - tsconfig
  - compiler
  - configuration
  - build
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# `tsconfig.json` Fundamentals & Compiler Options

The **`tsconfig.json`** file specifies the root files and the compiler options required to compile a TypeScript project.

---

## 1. Essential Compiler Options Explained

| Option | Recommended Value | Purpose |
| :--- | :--- | :--- |
| **`strict`** | `true` | Enables ALL strict typechecking options (`noImplicitAny`, `strictNullChecks`, etc.). |
| **`target`** | `"ES2022"` or `"ESNext"` | Target ECMAScript version for emitted JavaScript. |
| **`module`** | `"NodeNext"` or `"ESNext"` | Module system for emitted code. |
| **`moduleResolution`** | `"NodeNext"` or `"Bundler"` | How TypeScript looks up imports. Use `"Bundler"` for Next.js/Vite, `"NodeNext"` for Node.js. |
| **`skipLibCheck`** | `true` | Skips typechecking of all declaration files (`*.d.ts`) in `node_modules`, dramatically speeding up builds. |
| **`noEmit`** | `true` | Do not emit `.js` output files (used when Vite/Next.js handles bundling). |
| **`jsx`** | `"preserve"` or `"react-jsx"` | How JSX is transformed. |

---

## 2. What Does `"strict": true` Actually Enable?

Enabling `"strict": true` activates 8 critical safety flags at once:
1. **`strictNullChecks`**: `null` and `undefined` have their own distinct types and cannot be assigned to strings/numbers without explicit unions (`string | null`).
2. **`noImplicitAny`**: Flags any expression where type inference falls back to `any`.
3. **`strictFunctionTypes`**: Enables stricter checking of function parameter types (bivariance to contravariance).
4. **`strictBindCallApply`**: Checks arguments of `bind`, `call`, and `apply`.
5. **`strictPropertyInitialization`**: Ensures class properties are initialized in the constructor.
6. **`noImplicitThis`**: Flags occurrences where `this` is implicitly `any`.
7. **`alwaysStrict`**: Emits `"use strict"` at top of all files.
8. **`useUnknownInCatchVariables`**: Catch clause error variable defaults to `unknown` rather than `any`.

---

## Related Topics

- [Setting Up TypeScript](/docs/typescript/setup)
- [Common TypeScript Compiler Errors](/docs/typescript/common-typescript-errors)
- [Modules & Path Aliases](/docs/typescript/modules)
