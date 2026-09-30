---
title: "TypeError: Cannot read properties of undefined"
description: Fix the most common JavaScript runtime error — accessing nested properties on undefined objects and asynchronous API responses.
category: programming
topic: javascript
type: troubleshooting
level: beginner
tags:
  - javascript
  - typescript
  - react
  - runtime
  - typeerror
platforms:
  - web
  - node
tested:
  v8: "current"
  node: "22.x"
lastVerified: "2026-09-30"
---

## Error Message

```text
TypeError: Cannot read properties of undefined (reading 'name')
    at renderProfile (user-profile.js:14:22)
    at App (App.js:32:7)
```

---

## Symptoms

- Webpage crashes or shows a blank screen / white screen of death.
- Browser DevTools console prints red `Uncaught TypeError: Cannot read properties of undefined`.
- React component throws an error during initial render before an API fetch completes.

---

## Why It Happens

In JavaScript, attempting to access property `x` on `undefined` (or `null`) using the dot accessor `object.x` or bracket accessor `object['x']` throws an immediate `TypeError`.

Common causes:
1. **Asynchronous API fetching**: Component attempts to read `user.profile.avatar` before `user` has loaded from the network.
2. **Missing or optional nested object fields**: Backend API response omits a nested object key.
3. **Array index out of bounds**: Accessing `items[0].title` when `items` is an empty array `[]`.

---

## Quick Fix

Use **Optional Chaining (`?.`)**:

```javascript
// ✅ Safely returns undefined instead of throwing TypeError
const avatarUrl = user?.profile?.avatar;
```

---

## Step-by-Step Solutions

### 1. Optional Chaining with Nullish Coalescing (Recommended)

```javascript
const userName = user?.profile?.name ?? "Anonymous";
```

### 2. Guard Clauses in Functions

```javascript
function formatAddress(user) {
  if (!user || !user.address) {
    return "No address provided";
  }
  return `${user.address.street}, ${user.address.city}`;
}
```

### 3. Safe Destructuring with Defaults

```javascript
const { name = "Guest", role = "Viewer" } = user || {};
```

### 4. React State Initial Value

Always provide a realistic initial shape or render loading fallbacks:

```tsx
function UserCard() {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return <div className="animate-pulse">Loading profile...</div>;
  }

  return <div>Welcome, {user.name}!</div>;
}
```

---

## Prevention

- Enable strict mode in TypeScript (`"strict": true` in `tsconfig.json`).
- Use Zod or schema parsers on API responses to guarantee data shapes at runtime.
- Never assume external API responses will always include optional nested properties.
