---
title: "Angular Components & Templates"
description: "Learn standalone component architecture, template syntax, control flow blocks (@if, @for), and input/output bindings in Angular."
category: docs
topic: angular
type: guide
level: beginner
tags:
  - angular
  - components
  - templates
platforms:
  - web
tested:
  angular: "18.x"
lastVerified: "2026-10-01"
---

# Angular Components & Templates

Components are the fundamental building blocks of Angular applications. They consist of a TypeScript class, an HTML template, and CSS styles.

---

## Modern Control Flow (`@if`, `@for`, `@switch`)

Angular 17+ introduced built-in template control flow syntax with improved performance and type narrowing:

```html
<!-- Conditional rendering -->
@if (isLoggedIn()) {
  <p>Welcome back, {{ userName() }}!</p>
} @else {
  <button (click)="login()">Log In</button>
}

<!-- Optimized iteration -->
<ul>
  @for (item of items(); track item.id) {
    <li>{{ item.name }} - ${{ item.price }}</li>
  } @empty {
    <li>No items available</li>
  }
</ul>
```

---

## Signal Inputs and Outputs

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <h4>{{ title() }}</h4>
    <button (click)="addToCart.emit(id())">Add to Cart</button>
  `
})
export class ProductCardComponent {
  id = input.required<string>();
  title = input<string>('Default Product');
  addToCart = output<string>();
}
```
