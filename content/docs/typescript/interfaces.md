---
title: "Interfaces vs. Type Aliases in TypeScript"
description: "Understanding interfaces in TypeScript: declaration merging, extending interfaces (extends), implementing in classes, and choosing between interface and type."
category: programming
topic: typescript
type: guide
level: beginner
tags:
  - typescript
  - interfaces
  - type-aliases
  - oop
  - types
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# Interfaces vs. Type Aliases in TypeScript

**Interfaces** define contractual object shapes and are the foundation of object-oriented TypeScript design.

---

## 1. Defining and Extending Interfaces

Interfaces support inheritance via the **`extends`** keyword:

```typescript
interface BaseEntity {
  id: string;
  createdAt: Date;
}

interface User extends BaseEntity {
  name: string;
  email: string;
  role: "admin" | "member";
}

const adminUser: User = {
  id: "usr_10",
  name: "Alex",
  email: "alex@example.com",
  role: "admin",
  createdAt: new Date(),
};
```

---

## 2. Declaration Merging (Interfaces Only)

If you declare an interface multiple times with the same name, TypeScript automatically merges their declarations into a single unified interface:

```typescript
// 1. Initial declaration:
interface Window {
  myAppConfig: { apiUrl: string };
}

// 2. Secondary declaration (merges with above):
interface Window {
  analyticsLoaded: boolean;
}

// window now has BOTH myAppConfig and analyticsLoaded!
```

---

## 3. Interfaces vs. Type Aliases: When to Use Which?

| Feature | `interface` | `type` alias |
| :--- | :--- | :--- |
| **Object shapes** | ✅ Yes | ✅ Yes |
| **Primitives / Unions / Tuples** | ❌ No | ✅ Yes (`type ID = string \| number`) |
| **Inheritance** | `extends Interface` | Intersection `&` (`type C = A & B`) |
| **Declaration Merging** | ✅ Yes (great for third-party library typing) | ❌ No (duplicate name throws error) |
| **Performance** | Slightly faster compiler caching for objects | Flexible for complex mapped types |

### Best Practice Rule
- Use **`interface`** for public API object contracts, library declarations, and class implementations.
- Use **`type`** for unions, primitives, tuples, function signatures, and complex utility transformations.

---

## Related Topics

- [Type Aliases](/docs/typescript/type-aliases)
- [Generics](/docs/typescript/generics)
- [Objects and Index Signatures](/docs/typescript/objects)
