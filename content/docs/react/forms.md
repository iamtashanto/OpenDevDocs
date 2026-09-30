---
title: "React Forms & Controlled Components"
description: "Managing form state in React: controlled vs uncontrolled inputs, form submission handling, multi-input state patterns, and React 19 Actions."
category: frontend
topic: react
type: guide
level: beginner
tags:
  - react
  - forms
  - controlled-components
  - inputs
  - validation
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# React Forms & Controlled Components

In React, form inputs can be handled as **controlled components** (where React state serves as the "single source of truth") or **uncontrolled components** (where the DOM manages input state).

---

## 1. Controlled Components Pattern

An input is "controlled" when its `value` is tied directly to React state and updated via `onChange`:

```tsx
import { useState } from "react";

export function SearchForm({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState<string>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search documentation..."
        className="input"
      />
      <button type="submit" className="btn">
        Search
      </button>
    </form>
  );
}
```

---

## 2. Managing Multi-Field Form State

Instead of declaring 10 individual `useState` hooks for a large form, manage a single state object:

```tsx
export function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form>
      <input name="username" value={formData.username} onChange={handleChange} />
      <input name="email" type="email" value={formData.email} onChange={handleChange} />
      <input name="password" type="password" value={formData.password} onChange={handleChange} />
    </form>
  );
}
```

---

## Related Topics

- [HTML Forms & Input Attributes](/docs/html/forms)
- [useState Hook in Depth](/docs/react/use-state)
- [Next.js Server Actions](/docs/nextjs/server-actions)
