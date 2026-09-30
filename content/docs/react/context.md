---
title: "React Context & Global State"
description: "Sharing global state with React Context: createContext, useContext, Provider patterns, avoiding prop drilling, and performance considerations."
category: frontend
topic: react
type: guide
level: intermediate
tags:
  - react
  - context
  - global-state
  - providers
  - prop-drilling
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# React Context & Global State

**React Context** provides a way to pass data through the component tree without having to pass props down manually at every level (**prop drilling**).

---

## 1. Creating and Providing Context

```tsx
// 1. Define Context and Provider
import { createContext, useContext, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 2. Custom Hook to Consume Context Safely
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

---

## 2. Consuming Context in Components

```tsx
export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme} (Click to toggle)
    </button>
  );
}
```

---

## 3. Context Performance Caveat

Whenever the value of a Context Provider changes, **all consuming components re-render**.
- **Best Practice**: Use Context for low-frequency global updates (theme, authenticated user, language). For high-frequency state (e.g. real-time canvas coordinates, chat message streams), prefer dedicated state libraries like **Zustand** or server-state tools like **TanStack Query**.

---

## Related Topics

- [Component Composition (Alternative to Context)](/docs/react/component-composition)
- [Custom Hooks](/docs/react/custom-hooks)
- [Performance Basics in React](/docs/react/performance-basics)
