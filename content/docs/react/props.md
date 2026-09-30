---
title: "React Props and Component Interfaces"
description: "Passing data to React components via props: destructuring, default values, children prop, callbacks, and typing props with TypeScript."
category: frontend
topic: react
type: guide
level: beginner
tags:
  - react
  - props
  - children
  - interfaces
  - typescript
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# React Props and Component Interfaces

**Props (Properties)** are arguments passed into React components. They allow parent components to pass data and callback functions down to child components.

---

## 1. Passing and Consuming Props

```tsx
// 1. Define Props Type Interface
interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary"; // Optional prop
  disabled?: boolean;
  onClick: () => void;
}

// 2. Destructure with default values in function parameters
export function Button({
  label,
  variant = "primary",
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}
```

---

## 2. The Special `children` Prop

The `children` prop represents any JSX elements placed between the opening and closing tags of a component:

```tsx
import type { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Consuming component with nested children:
<Card title="Database Status">
  <p>Connected to PostgreSQL on port 5432.</p>
  <span className="badge">Healthy</span>
</Card>
```

---

## 3. Props are Read-Only (Immutable)

Components must never modify their own props directly. If a value needs to change in response to user input, use **State**.

---

## Related Topics

- [React State Management](/docs/react/state)
- [Component Composition](/docs/react/component-composition)
- [Event Handling](/docs/react/events)
