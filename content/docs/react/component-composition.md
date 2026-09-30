---
title: "Component Composition in React"
description: "Why composition beats inheritance in React: slot patterns, compound components, layout containers, and eliminating prop drilling."
category: frontend
topic: react
type: guide
level: intermediate
tags:
  - react
  - composition
  - architecture
  - patterns
  - slots
platforms:
  - web
tested:
  react: "19.x"
lastVerified: "2026-09-30"
---

# Component Composition in React

React favors a powerful composition model over class inheritance. **Component composition** is the practice of combining smaller, specialized components together to build rich user interfaces.

---

## 1. The Slot Pattern (Container Components)

Instead of passing dozens of data props through intermediary components, pass components directly as props (slots):

```tsx
interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function SplitPane({ left, right }: SplitPaneProps) {
  return (
    <div className="flex w-full min-h-screen">
      <aside className="w-64 border-r">{left}</aside>
      <main className="flex-1 p-8">{right}</main>
    </div>
  );
}

// Consuming component:
<SplitPane
  left={<SidebarNav items={navItems} />}
  right={<ArticleContent content={currentArticle} />}
/>
```

---

## 2. Compound Components Pattern

Compound components work together as a cohesive group to share implicit state (e.g. Tabs, Select dropdowns, Accordions):

```tsx
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">Overview Details...</Tabs.Content>
  <Tabs.Content value="settings">Settings Form...</Tabs.Content>
</Tabs>
```

---

## Related Topics

- [React Props & Children](/docs/react/props)
- [React Context](/docs/react/context)
- [React Components Architecture](/docs/react/components)
