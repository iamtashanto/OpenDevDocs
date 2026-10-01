---
title: "Angular Signals & Reactivity"
description: "Master Angular Signals, computed signals, effects, and modern change detection."
category: docs
topic: angular
type: guide
level: intermediate
tags:
  - angular
  - signals
  - reactivity
  - state
platforms:
  - web
tested:
  angular: "18.x"
lastVerified: "2026-10-01"
---

# Angular Signals & Reactivity

Signals provide a reactive wrapper around values that notify interested consumers when that value changes. Signals are synchronously readable and automatically track dependencies.

---

## Writable Signals

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  template: `
    <p>User: {{ name() }}</p>
    <button (click)="changeName('Alice')">Set Alice</button>
  `
})
export class UserProfileComponent {
  name = signal<string>('John Doe');

  changeName(newName: string) {
    this.name.set(newName);
  }
}
```

---

## Computed Signals (Derived State)

Computed signals derive their value from other signals and are lazily evaluated and memoized:

```typescript
import { Component, signal, computed } from '@angular/core';

export class CartComponent {
  price = signal(100);
  quantity = signal(2);

  // Automatically recalculates when price or quantity updates
  total = computed(() => this.price() * this.quantity());
}
```
