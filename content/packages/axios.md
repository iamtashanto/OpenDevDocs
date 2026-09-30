---
title: "Axios: Promise-Based HTTP Client"
description: Complete developer reference for Axios, HTTP request/response interceptors, cancellation tokens, timeout configuration, and TypeScript interfaces.
category: packages
topic: http
type: reference
level: beginner
tags:
  - axios
  - http
  - api
  - rest
platforms:
  - nodejs
  - browser
  - all
tested:
  axios: "1.7.x"
  typescript: "5.6.x"
lastVerified: "2026-09-30"
---

## What It Is

**Axios** is a promise-based HTTP client for the browser and Node.js. It provides an isomorphic API for performing HTTP requests with automatic JSON parsing, request/response interceptors, request cancellation, and timeout management.

---

## Why Use It

1. **Automatic JSON Serialization**: Automatically converts JavaScript request objects to JSON and parses incoming response bodies.
2. **Request & Response Interceptors**: Intercept requests to inject authentication tokens (JWTs) or intercept responses for global 401 refresh token flows.
3. **Built-in Timeouts**: Easily specify timeout limits to prevent hanging network requests.
4. **Isomorphic**: Executes seamlessly in Node.js backends and browser frontend applications.

---

## Installation

<PackageManagerTabs>
  <Tab value="pnpm">
    ```bash
    pnpm add axios
    ```
  </Tab>
  <Tab value="npm">
    ```bash
    npm install axios
    ```
  </Tab>
  <Tab value="yarn">
    ```bash
    yarn add axios
    ```
  </Tab>
  <Tab value="bun">
    ```bash
    bun add axios
    ```
  </Tab>
</PackageManagerTabs>

---

## Quick Start

```typescript
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

// 1. GET Request
async function fetchUser(userId: number): Promise<User> {
  const response = await axios.get<User>(`https://api.example.com/users/${userId}`, {
    timeout: 5000,
  });
  return response.data;
}

// 2. POST Request
async function createUser(name: string, email: string) {
  const response = await axios.post("https://api.example.com/users", {
    name,
    email,
  });
  console.log("Created user with ID:", response.data.id);
}
```

---

## Common APIs

| API | Description | Example |
| :--- | :--- | :--- |
| `axios.create(config)` | Creates a custom client instance with base URLs and headers | `const api = axios.create({ baseURL: '/api' })` |
| `axios.get(url, config)` | Executes HTTP GET request | `axios.get('/users')` |
| `axios.post(url, data, config)` | Executes HTTP POST request | `axios.post('/auth/login', { email, pass })` |
| `axios.put(url, data)` | Executes HTTP PUT request | `axios.put('/users/1', updatedData)` |
| `axios.patch(url, data)` | Executes HTTP PATCH request | `axios.patch('/users/1', { status })` |
| `axios.delete(url, config)` | Executes HTTP DELETE request | `axios.delete('/users/1')` |
| `axios.interceptors.request.use` | Hooks into outgoing requests | Attaching Bearer tokens |
| `axios.interceptors.response.use`| Hooks into incoming responses | Global error handling / Token refresh |
| `axios.isAxiosError(err)` | Type guard for Axios errors | Narrowing error handling |

---

## Examples

### Custom API Client with Auth Interceptor
```typescript
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT token
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Global 401 Unauthorized handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Redirect to login or trigger token refresh
      console.warn("Session expired. Redirecting to login...");
    }
    return Promise.reject(error);
  }
);
```

---

## Best Practices

1. **Always Create Custom Instances (`axios.create()`)**: Avoid modifying the global `axios` object directly to prevent cross-module configuration leaks.
2. **Always Set Timeouts**: Set `timeout: 5000` or `10000` to prevent unhandled zombie requests.
3. **Use `axios.isAxiosError()` for Type Narrowing**: Safely inspect `error.response?.data` without TypeScript `any` assertions.

---

## Common Mistakes

- **Not checking `error.response`**: In network drops, `error.response` is `undefined`. Always guard access to status codes.
- **Leaking sensitive headers to external domains**: Ensure interceptors verify the destination URL hostname before appending authorization headers.

---

## Alternatives

- **Native `fetch`**: Standard built-in browser and Node.js 18+ API (zero bundle size).
- **Ky**: Elegant, lightweight HTTP client based on `fetch` with retries and hooks.
- **Wretch**: Intuitive wrapper around `fetch` with chainable error handling.
- **Ofetch**: Fast fetch wrapper used in Nuxt and Nitro with smart auto-parsing.

---

## When Not to Use It

- In lightweight frontend apps where minimizing bundle size is the top priority and native `fetch()` suffices.
- In Next.js App Router Server Components where Next.js provides deep caching extensions on native `fetch()`.

---

## Official Resources

- [Official Axios Documentation](https://axios-http.com)
- [Axios GitHub Repository](https://github.com/axios/axios)
- [npm Package: axios](https://www.npmjs.com/package/axios)
