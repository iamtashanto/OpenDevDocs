---
title: "Enums and Modern Alternatives in TypeScript"
description: "TypeScript Enums: numeric vs string enums, const enums, bundle size pitfalls, and modern alternatives using union types and 'as const' objects."
category: programming
topic: typescript
type: guide
level: intermediate
tags:
  - typescript
  - enums
  - as-const
  - union-types
  - best-practices
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# Enums and Modern Alternatives in TypeScript

**Enums** allow developers to define a set of named constants. However, in modern TypeScript, plain objects with `as const` or string union types are widely preferred due to JavaScript emit quirks.

---

## 1. Traditional TypeScript Enums

```typescript
// Numeric Enum (Auto-increments 0, 1, 2)
enum LogLevel {
  Debug = 0,
  Info = 1,
  Error = 2,
}

// String Enum
enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER",
}
```

---

## 2. Why Modern TypeScript Avoids Enums

1. **Non-Standard Runtime Code Generation**: Unlike types and interfaces (which vanish completely during compilation), enums generate JavaScript IIFE objects that cannot be tree-shaken.
2. **Numeric Enum Insecurity**: Numeric enums in older TS versions allowed assigning arbitrary out-of-bounds numbers without error.

---

## 3. The Modern Alternative: `as const` Objects

The industry standard pattern uses a plain JavaScript object with `as const` combined with a derived union type:

```typescript
// 1. Plain constant object with 'as const':
export const Roles = {
  Admin: "admin",
  Editor: "editor",
  Viewer: "viewer",
} as const;

// 2. Derive the Type automatically:
export type Role = (typeof Roles)[keyof typeof Roles];
// Role is type: "admin" | "editor" | "viewer"

// 3. Usage:
function assignRole(role: Role) {
  console.log("Assigned role:", role);
}

assignRole(Roles.Admin); // ✅ Valid
assignRole("admin");     // ✅ Valid (string literal also accepted!)
```

---

## Related Topics

- [Literal Types and as const](/docs/typescript/literal-types)
- [Union Types](/docs/typescript/union-types)
- [Type Aliases](/docs/typescript/type-aliases)
