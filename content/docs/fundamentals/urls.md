---
title: "URLs (Uniform Resource Locators)"
description: "Anatomy of a URL: protocol schemes, hostnames, ports, pathnames, query parameters, URL encoding, and hash fragments."
category: fundamentals
topic: networking
type: guide
level: beginner
tags:
  - urls
  - uri
  - query-parameters
  - web
  - fundamentals
platforms:
  - all
lastVerified: "2026-09-30"
---

# URLs (Uniform Resource Locators)

A **URL** (Uniform Resource Locator) is the standard address used to locate and identify resources on the internet. Every URL specifies the protocol, target host, path to the resource, and optional query parameters.

---

## 1. Anatomy of a URL

Consider the following full URL:

```
https://api.example.com:8080/v1/products/search?category=shoes&sort=asc#results
└─┬─┘   └──────┬──────┘ └─┬─┘ └──────┬────────┘ └───────────┬─────────┘ └──┬──┘
Scheme      Hostname     Port     Pathname            Query String       Fragment
```

### Component Breakdown

| Component | Example | Description |
| :--- | :--- | :--- |
| **Scheme (Protocol)** | `https://` | How the client communicates (`http`, `https`, `ftp`, `ws`, `mailto`). |
| **Subdomain** | `api.` | Logical partition under the main domain. |
| **Domain (Hostname)** | `example.com` | Registered domain name or IP address. |
| **Port** | `:8080` | Specific server port (default `:80` for HTTP, `:443` for HTTPS). |
| **Path** | `/v1/products/search` | Hierarchical path pointing to a route or file. |
| **Query String** | `?category=shoes&sort=asc` | Key-value parameter pairs preceded by `?` and separated by `&`. |
| **Fragment (Hash)** | `#results` | Client-side anchor. **Never sent to the server** in HTTP requests. |

---

## 2. Query Parameters and URL Encoding

Query strings pass structured key-value pairs in `GET` requests. Because URLs only support a limited set of ASCII characters, special characters (spaces, ampersands, slashes) must be **percent-encoded**:

| Character | Percent Encoding | Example |
| :--- | :--- | :--- |
| Space ` ` | `%20` or `+` | `search?q=open%20source` |
| Ampersand `&` | `%26` | `tag=rock%26roll` |
| Slash `/` | `%2F` | `filter=2026%2F10` |
| Question mark `?` | `%3F` | `query=what%3F` |

### Parsing and Building URLs in JavaScript

Modern JavaScript provides the built-in `URL` and `URLSearchParams` web APIs:

```javascript
const myUrl = new URL("https://example.com/search?category=books");

// Read parameter
console.log(myUrl.searchParams.get("category")); // "books"

// Add / Modify parameters
myUrl.searchParams.set("page", "2");
myUrl.searchParams.append("tag", "javascript");

console.log(myUrl.toString());
// https://example.com/search?category=books&page=2&tag=javascript
```

---

## 3. Relative vs. Absolute URLs

- **Absolute URL**: Contains the full scheme and hostname (`https://docs.tashanto.com/docs/javascript`). Always resolves to the exact destination regardless of the current page.
- **Root-Relative URL**: Starts with a leading slash (`/docs/javascript`). Resolves relative to the current domain root (`https://current-domain.com/docs/javascript`).
- **Path-Relative URL**: Starts without a leading slash (`javascript/variables`). Resolves relative to the current directory path.

---

## 4. Common Mistakes

1. **Constructing Query Strings Manually with String Concatenation**:
   ```javascript
   // ❌ Bad: will break if searchTerm has spaces or &
   const url = "https://api.com/search?q=" + userInput;

   // ✅ Good: automatically percent-encodes values
   const url = new URL("https://api.com/search");
   url.searchParams.set("q", userInput);
   ```
2. **Expecting the Hash Fragment `#` on the Server**: Server-side Route Handlers and Server Components never receive `#fragment` because browsers strip it before transmitting HTTP requests.

---

## Related Topics

- [HTTP and HTTPS Protocols](/docs/fundamentals/http-and-https)
- [DNS Basics & Resolution](/docs/fundamentals/dns-basics)
- [Ports & localhost](/docs/fundamentals/localhost)
