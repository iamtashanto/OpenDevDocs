---
title: "Angular HttpClient & Interceptors"
description: "Perform HTTP requests, configure functional interceptors, and handle errors in Angular."
category: docs
topic: angular
type: guide
level: intermediate
tags:
  - angular
  - http
  - api
  - interceptors
platforms:
  - web
tested:
  angular: "18.x"
lastVerified: "2026-10-01"
---

# Angular HttpClient & Interceptors

The modern `HttpClient` in Angular supports functional interceptors, type-safe API payloads, and integration with RxJS and Signals.

---

## Setting up HttpClient with Interceptor

```typescript
// app.config.ts
import { ApplicationConfig, provideHttpClient, withInterceptors } from '@angular/core';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
```

---

## Functional Auth Interceptor

```typescript
// interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};
```
