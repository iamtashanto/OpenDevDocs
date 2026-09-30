---
title: "Fetch API and HTTP Requests"
description: "Making network requests in JavaScript with fetch(): GET/POST payloads, response headers, HTTP error handling, and aborting requests with AbortController."
category: programming
topic: javascript
type: guide
level: beginner
tags:
  - javascript
  - fetch
  - http
  - api
  - network
platforms:
  - web
  - node
tested:
  node: "22.x"
lastVerified: "2026-09-30"
---

# Fetch API and HTTP Requests

The modern **Fetch API** provides a Promise-based global `fetch()` interface for fetching resources asynchronously across networks in both browsers and Node.js.

---

## 1. Making a `GET` Request

```javascript
async function fetchArticles() {
  const response = await fetch("https://api.example.com/articles");

  // CRITICAL: fetch does NOT reject on HTTP 404 or 500 status codes!
  if (!response.ok) {
    throw new Error(`HTTP Request Failed with status ${response.status}`);
  }

  const articles = await response.json();
  return articles;
}
```

---

## 2. Making a `POST` Request with JSON

```javascript
async function createPost(postData) {
  const response = await fetch("https://api.example.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_JWT_TOKEN",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || "Failed to create post");
  }

  return await response.json();
}
```

---

## 3. Request Timeouts and Aborting with `AbortController`

Prevent requests from hanging indefinitely by enforcing a maximum timeout:

```javascript
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
```

---

## Related Topics

- [HTTP and HTTPS Protocols](/docs/fundamentals/http-and-https)
- [Blocked by CORS Policy Troubleshooting](/errors/web/cors-policy)
- [Async and Await](/docs/javascript/async-await)
- [JSON Serialization](/docs/fundamentals/json)
