---
title: "Angular Overview & Architecture"
description: "A comprehensive guide to modern Angular, standalone components, Signals, hydration, and enterprise web architecture."
category: docs
topic: angular
type: guide
level: beginner
tags:
  - angular
  - typescript
  - spa
  - frontend
  - signals
platforms:
  - web
tested:
  angular: "18.x"
  typescript: "5.x"
lastVerified: "2026-10-01"
---

# Angular Overview & Architecture

Angular is an enterprise-grade, batteries-included TypeScript framework developed by Google. Modern Angular features **Standalone Components**, fine-grained reactivity via **Signals**, built-in SSR hydration, and typed dependency injection.

---

## Key Pillars of Modern Angular

1. **Standalone Components**: Eliminate NgModules for leaner, modular component architecture.
2. **Signals (`signal()`, `computed()`, `effect()`)**: Fine-grained reactive state management with optimal change detection.
3. **Built-in Router**: Powerful client-side navigation with lazy loading, functional guards, and resolver pipelines.
4. **Typed Forms**: Comprehensive validation and reactive state tracking for enterprise form workflows.
5. **Dependency Injection (DI)**: Declarative hierarchical injector system for shared singleton and scoped services.

---

## Quick Start: Creating a New Angular App

```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Create a new standalone Angular application
ng new my-angular-app --standalone --routing --style=css

# Navigate and start the development server
cd my-angular-app
ng serve --open
```

---

## Minimal Standalone Component Example

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div class="card">
      <h3>Counter: {{ count() }}</h3>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update(c => c + 1);
  }
}
```
