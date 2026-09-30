---
title: "Zustand: Bearbones State Management for React"
description: Complete developer reference for Zustand, small, fast, and scalable state management for React using simplified hooks without boilerplate or Context providers.
category: packages
topic: state-management
type: reference
level: beginner
tags:
  - zustand
  - react
  - state-management
  - typescript
platforms:
  - browser
  - all
tested:
  zustand: "5.0.x"
  react: "19.x"
  typescript: "5.6.x"
lastVerified: "2026-09-30"
---

## What It Is

**Zustand** is a small, fast, and scalable state-management solution for React. It uses a simplified hook-based API without requiring Context Providers, reducers, or complex Redux boilerplate.

---

## Why Use It

1. **No Provider Boilerplate**: Does not wrap your component tree in `<Provider>` contexts, eliminating unnecessary tree re-renders.
2. **Selective State Subscriptions**: Components only re-render when the exact slice of state they select changes.
3. **Async Actions Out-of-the-Box**: Actions can be async functions without requiring middleware like `redux-thunk` or `redux-saga`.
4. **Tiny Size**: ~1KB minified and gzipped.
5. **Usable Outside React**: Read and update state from vanilla JavaScript files (e.g. Axios interceptors).

---

## Installation

<PackageManagerTabs>
  <Tab value="pnpm">
    ```bash
    pnpm add zustand
    ```
  </Tab>
  <Tab value="npm">
    ```bash
    npm install zustand
    ```
  </Tab>
  <Tab value="yarn">
    ```bash
    yarn add zustand
    ```
  </Tab>
  <Tab value="bun">
    ```bash
    bun add zustand
    ```
  </Tab>
</PackageManagerTabs>

---

## Quick Start

```typescript
import { create } from "zustand";

interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

// 1. Create a store
export const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
```

Using the store in a component:

```tsx
"use client";

import { useBearStore } from "@/stores/bear-store";

export function BearCounter() {
  // Select only the bears count to avoid re-rendering on other state changes
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);

  return (
    <div>
      <h2>Total Bears: {bears}</h2>
      <button onClick={increasePopulation}>Add Bear</button>
    </div>
  );
}
```

---

## Common APIs & Middleware

| Feature | Description | Example |
| :--- | :--- | :--- |
| `create(fn)` | Creates a new Zustand store hook | `create<State>((set, get) => ({ ... }))` |
| `set(partial | fn)` | Merges new state into the store | `set({ count: 5 })` or `set(s => ({ count: s.count + 1 }))` |
| `get()` | Reads current state synchronously inside actions | `const current = get().items;` |
| `persist` middleware | Automatically syncs state to `localStorage` or `sessionStorage` | `persist(..., { name: 'storage-key' })` |
| `devtools` middleware | Connects store to Redux DevTools browser extension | `devtools(...)` |
| `immer` middleware | Enables immutable state updates via direct mutation | `set((state) => { state.nested.val = 1 })` |
| `store.getState()` | Accesses store state outside React | `useBearStore.getState().bears` |
| `store.setState()` | Modifies store state outside React | `useBearStore.setState({ bears: 10 })` |

---

## Examples

### Persistent Store with Middleware
```typescript
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        addItem: (item) => {
          const currentItems = get().items;
          const existing = currentItems.find((i) => i.id === item.id);
          if (existing) {
            set({
              items: currentItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            });
          } else {
            set({ items: [...currentItems, item] });
          }
        },
        removeItem: (id) =>
          set({ items: get().items.filter((i) => i.id !== id) }),
        clearCart: () => set({ items: [] }),
      }),
      {
        name: "shopping-cart-storage",
      }
    )
  )
);
```

---

## Best Practices

1. **Always Use Selectors**: Use `useStore(state => state.property)` instead of `useStore()` without selectors to avoid unnecessary re-renders when other properties change.
2. **Combine Related Actions Inside the Store**: Keep business logic co-located within store actions rather than scattering state updates across components.
3. **Handle Hydration in SSR (Next.js)**: When using `persist`, ensure the component mounts before rendering client-persisted values to avoid React hydration mismatches.

---

## Common Mistakes

- **Destructuring without selectors**: `const { bears } = useBearStore()` causes the component to re-render whenever ANY store state changes.
- **Mutating state directly without `immer` middleware**: Direct assignment (`state.bears = 5`) will not trigger subscriber re-renders.

---

## Alternatives

- **Redux Toolkit (RTK)**: Ideal for massive enterprise apps needing opinionated structure and complex state histories.
- **Jotai**: Atomic primitive state management (inspired by Recoil).
- **Zustand vs Context**: Native React Context triggers re-renders on all consumers whenever the context value changes; Zustand avoids this via selectors.

---

## When Not to Use It

- For server-fetched cache data (use **TanStack Query** / **SWR** instead of copying API responses into Zustand stores).
- For simple local UI toggles (use native `useState`).

---

## Official Resources

- [Official Zustand Documentation](https://zustand.docs.pmnd.rs)
- [Zustand GitHub Repository](https://github.com/pmndrs/zustand)
- [npm Package: zustand](https://www.npmjs.com/package/zustand)
