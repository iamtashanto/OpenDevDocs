---
title: "Rendering Lists & The Importance of Keys in React"
description: "Transforming arrays into JSX with map(), choosing stable unique keys, and why array index keys cause state corruption bugs."
category: frontend
topic: react
type: guide
level: beginner
tags:
  - react
  - lists
  - keys
  - map
  - reconciliation
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# Rendering Lists & The Importance of Keys in React

To render multiple similar components from a collection of data, use JavaScript's built-in `.map()` method to transform an array of data into an array of JSX elements.

---

## 1. Basic List Rendering

```tsx
interface Article {
  id: string;
  title: string;
}

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <a href={`/docs/${article.id}`}>{article.title}</a>
        </li>
      ))}
    </ul>
  );
}
```

---

## 2. Why React Demands `key` Props

React uses the `key` prop to uniquely identify each item in a list across re-renders. Keys allow React's reconciliation algorithm to determine which items were **added, removed, reordered, or edited**, rather than destroying and re-mounting every DOM node from scratch.

---

## 3. The Array Index Key Anti-Pattern

<Callout type="danger" title="Avoid Using Array Index as Key">
Using `key={index}` causes severe UI bugs (state corruption, focus jumping, broken input values) when list items are sorted, filtered, inserted at the top, or deleted.
</Callout>

### Rules for Keys:
1. **Keys must be unique among siblings**: Items in the same array must have distinct keys.
2. **Keys must be stable**: Do NOT generate keys on the fly like `key={Math.random()}`. Use database IDs (`item.id`) or stable unique slugs.

---

## Related Topics

- [JavaScript Array Methods](/docs/javascript/arrays)
- [Conditional Rendering](/docs/react/conditional-rendering)
- [React State Management](/docs/react/state)
