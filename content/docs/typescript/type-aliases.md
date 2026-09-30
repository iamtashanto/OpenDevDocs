---
title: "Type Aliases in TypeScript"
description: "Creating custom type definitions with the 'type' keyword: primitives, tuples, unions, object types, and recursive types."
category: programming
topic: typescript
type: guide
level: beginner
tags:
  - typescript
  - type-aliases
  - types
  - syntax
platforms:
  - all
tested:
  typescript: "5.x"
lastVerified: "2026-09-30"
---

# Type Aliases in TypeScript

A **Type Alias** assigns a custom name to any type definition using the `type` keyword.

---

## 1. Syntax and Capabilities

Unlike interfaces, type aliases can represent primitives, unions, tuples, functions, and mapped types in addition to object shapes:

```typescript
// 1. Primitive Alias
type UUID = string;

// 2. Union Alias
type Status = "draft" | "in-review" | "published" | "archived";

// 3. Tuple Alias
type Point = [x: number, y: number];

// 4. Object Alias
type ArticleMetadata = {
  id: UUID;
  title: string;
  status: Status;
  tags: string[];
};

// 5. Function Signature Alias
type Formatter<T> = (input: T) => string;
```

---

## 2. Recursive Type Aliases

Type aliases can reference themselves to model nested hierarchical data structures (like JSON or file trees):

```typescript
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

type FileTreeNode = {
  name: string;
  sizeBytes: number;
  children?: FileTreeNode[];
};
```

---

## Related Topics

- [Interfaces in TypeScript](/docs/typescript/interfaces)
- [Union and Literal Types](/docs/typescript/union-types)
- [Generics](/docs/typescript/generics)
