---
title: "Conditional Rendering in React"
description: "Techniques for conditional UI rendering: ternary operators, logical AND (&&), if/else return statements, and preventing the zero rendering bug."
category: frontend
topic: react
type: guide
level: beginner
tags:
  - react
  - conditional-rendering
  - jsx
  - ternary
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# Conditional Rendering in React

In React, you can render different JSX elements depending on component props or state values using standard JavaScript branching logic.

---

## 1. Ternary Operator (`condition ? trueJSX : falseJSX`)

Best for switching between two visual states (e.g. Logged In vs. Logged Out):

```tsx
export function AuthButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? (
        <button type="button">Dashboard</button>
      ) : (
        <button type="button">Sign In</button>
      )}
    </div>
  );
}
```

---

## 2. Logical AND Operator (`&&`) & The "Zero Bug"

Use `&&` to render an element only when a condition is `true`:

```tsx
{unreadMessages.length > 0 && (
  <span className="badge">{unreadMessages.length}</span>
)}
```

<Callout type="warning" title="Beware the Numeric 0 Bug">
Never write `{count && <Badge />}` with numbers. If `count` is `0`, JavaScript evaluates `0 && ...` as `0`, which React will literally render as a visible number `0` onto your webpage! Always write `{count > 0 && <Badge />}` or `{Boolean(count) && <Badge />}`.
</Callout>

---

## 3. Early Return Guard Clauses

Return early with `null` or a loading skeleton to keep component bodies clean:

```tsx
export function UserProfile({ user, isLoading }: { user: User | null; isLoading: boolean }) {
  if (isLoading) {
    return <div className="skeleton-loader">Loading profile...</div>;
  }

  if (!user) {
    return <div className="error-card">User not found.</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

---

## Related Topics

- [JSX Syntax](/docs/react/jsx)
- [React State](/docs/react/state)
- [Lists and Keys](/docs/react/lists-and-keys)
