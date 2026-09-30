---
title: "Data Fetching in Modern React"
description: "Data fetching paradigms in React: Server Components async/await, TanStack Query (React Query), SWR, and avoiding useEffect fetch waterfalls."
category: frontend
topic: react
type: guide
level: intermediate
tags:
  - react
  - data-fetching
  - server-components
  - tanstack-query
  - swr
platforms:
  - web
tested:
  react: "19.x"
  nextjs: "16.x"
lastVerified: "2026-09-30"
---

# Data Fetching in Modern React

Modern React provides three primary data fetching patterns depending on your architecture.

---

## 1. Paradigm 1: React Server Components (Recommended for Full-Stack)

In frameworks with Server Components (like Next.js), you fetch data directly inside async components on the server without `useEffect` or client-side loading spinners:

```tsx
// Server Component (runs on server only)
export default async function UserList() {
  const users = await db.user.findMany(); // Direct database query!

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

---

## 2. Paradigm 2: Client-Side Server State Libraries (TanStack Query / SWR)

For client-side applications (Vite SPAs) or dynamic user dashboards requiring background refetching and caching:

```tsx
import { useQuery } from "@tanstack/react-query";

export function ProfileWidget() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => fetch("/api/profile").then(res => res.json()),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return <div>Welcome, {user.name}!</div>;
}
```

---

## 3. Why Manual `useEffect` Fetching is an Anti-Pattern

<Callout type="warning" title="Avoid Manual useEffect Data Fetching">
Writing `useEffect(() => { fetch(...) }, [])` suffers from severe architectural flaws:
1. **Network Waterfalls**: Sibling and child components fetch sequentially rather than in parallel.
2. **Race Conditions**: Rapid user interactions (e.g. typing in search) can resolve out of order, rendering stale data.
3. **No Caching / De-duplication**: Navigating back and forth re-triggers requests unnecessarily.
</Callout>

---

## Related Topics

- [Next.js Server Components](/docs/nextjs/server-components)
- [Next.js Data Fetching & Caching](/docs/nextjs/data-fetching)
- [Fetch API & Request Headers](/docs/javascript/fetch)
