---
title: "Handling Events in React"
description: "Handling user interactions in React: SyntheticEvent, onClick, onChange, onSubmit, stopping propagation, and passing parameters."
category: frontend
topic: react
type: guide
level: beginner
tags:
  - react
  - events
  - synthetic-events
  - handlers
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# Handling Events in React

React handles events using **SyntheticEvents**, a cross-browser wrapper around native browser DOM events that ensures consistent behavior across all devices.

---

## 1. Event Handler Syntax

Pass the function reference itself, **not** the result of calling the function:

```tsx
export function ActionButton() {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    console.log("Button clicked at coordinates:", event.clientX, event.clientY);
  }

  return (
    // ✅ Correct: passing function reference
    <button type="button" onClick={handleClick}>
      Click Me
    </button>
  );
}
```

---

## 2. Passing Arguments to Handlers

Use an inline arrow function wrapper when you need to pass custom parameters:

```tsx
export function UserList({ users }: { users: Array<{ id: string; name: string }> }) {
  function handleDelete(userId: string) {
    console.log("Deleting user:", userId);
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
          <button type="button" onClick={() => handleDelete(user.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 3. Stopping Event Propagation & Default Actions

```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault(); // Stop standard browser page reload
  console.log("Form submitted asynchronously.");
}

function handleChildClick(event: React.MouseEvent) {
  event.stopPropagation(); // Stop event bubbling up to parent containers
}
```

---

## Related Topics

- [React State Management](/docs/react/state)
- [React Forms & Controlled Components](/docs/react/forms)
- [DOM Basics](/docs/javascript/dom-basics)
