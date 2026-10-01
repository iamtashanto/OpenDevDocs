---
title: "Angular Router & Navigation"
description: "Configure routes, functional guards, lazy loading, and route parameters in Angular."
category: docs
topic: angular
type: guide
level: intermediate
tags:
  - angular
  - router
  - navigation
platforms:
  - web
tested:
  angular: "18.x"
lastVerified: "2026-10-01"
---

# Angular Router & Navigation

The Angular Router enables client-side navigation with support for standalone routes, lazy-loaded child routes, and functional route guards.

---

## Route Configuration (`app.routes.ts`)

```typescript
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
```
