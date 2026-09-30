---
title: "Objects and Index Signatures in TypeScript"
description: "Defining object types in TypeScript: optional properties (?), readonly modifiers, index signatures, and Record<K, V> utility."
category: programming
topic: typescript
type: guide
level: beginner
tags:
  - typescript
  - objects
  - index-signatures
  - types
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# Objects and Index Signatures in TypeScript

TypeScript allows you to declare precise object shapes with optional, required, and immutable properties.

---

## 1. Object Type Declarations

```typescript
type UserProfile = {
  readonly id: string;       // Cannot be reassigned after initialization
  username: string;
  email: string;
  avatarUrl?: string;        // Optional property (string | undefined)
};

const user: UserProfile = {
  id: "usr_102",
  username: "iamtashanto",
  email: "alex@example.com",
};

// ❌ Error: Cannot assign to 'id' because it is a read-only property.
// user.id = "usr_999";
```

---

## 2. Dynamic Keys with Index Signatures

When you don't know the property names in advance (e.g. dictionary / lookup map), use an **Index Signature**:

```typescript
type HeaderDictionary = {
  [headerName: string]: string | undefined;
};

const requestHeaders: HeaderDictionary = {
  "Content-Type": "application/json",
  "Authorization": "Bearer token123",
  "X-Custom-Header": undefined,
};
```

---

## 3. `Record<K, V>` Utility Type

`Record<Keys, ValueType>` is a cleaner shorthand for index signatures when key names belong to a specific set:

```typescript
type Environment = "development" | "staging" | "production";

const apiEndpoints: Record<Environment, string> = {
  development: "http://localhost:3000/api",
  staging: "https://staging.api.example.com",
  production: "https://api.example.com",
};
```

---

## Related Topics

- [Interfaces vs. Type Aliases](/docs/typescript/interfaces)
- [Utility Types in TypeScript](/docs/typescript/utility-types)
- [Functions in TypeScript](/docs/typescript/functions)
