---
title: "Nginx Location Blocks & Routing Priority"
description: "Master Nginx location block routing — matching priority rules (=, ^~, ~, ~*), try_files SPA fallback, rewrite rules, and root vs alias."
category: devops
topic: nginx
type: guide
level: intermediate
tags:
  - nginx
  - location-blocks
  - routing
  - try-files
  - regex
platforms:
  - linux
  - all
tested:
  nginx: "1.26"
lastVerified: "2026-10-01"
---

# Nginx Location Blocks & Routing Priority

`location` blocks define how Nginx processes requests for specific Request URIs.

---

## 1. Syntax & Matching Modifiers

```nginx
location [modifier] /path {
    ...
}
```

### Matching Priority Order

When a request arrives, Nginx matches location blocks according to this strict priority order:

| Modifier | Description | Priority |
| :--- | :--- | :--- |
| **`=`** | **Exact match**: The URI must match identically. Evaluation stops immediately. | 1 (Highest) |
| **`^~`** | **Preferential prefix match**: If this is the longest prefix match, skip all regex checks. | 2 |
| **`~`** | **Case-sensitive regular expression**. | 3 |
| **`~*`** | **Case-insensitive regular expression**. | 3 |
| *(None)* | **Standard prefix match**: Matches any URI starting with `/path`. | 4 (Lowest) |

---

## 2. Real-World Location Priority Example

```nginx
server {
    listen 80;
    server_name example.com;

    # 1. Exact match (Only matches http://example.com/login)
    location = /login {
        # Instant match, skips all other checks
    }

    # 2. Preferential prefix match (Matches /images/logo.png, skips regex)
    location ^~ /images/ {
        root /var/www/assets;
    }

    # 3. Case-insensitive Regex match for media files
    location ~* \.(jpg|jpeg|png|gif|ico|webp|svg|css|js)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # 4. Standard prefix fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 3. The `try_files` Directive

`try_files` tests for the existence of files in sequence and serves the first one found:

```nginx
# 1. Check if $uri exists as a static file on disk
# 2. Check if $uri/ exists as a directory
# 3. Fallback to /index.html (Essential for React/Vue/Angular SPAs)
location / {
    try_files $uri $uri/ /index.html;
}

# For PHP/Laravel applications:
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

---

## 4. `root` vs `alias` (Critical Difference)

> [!CAUTION]
> Confusing `root` and `alias` is the most common cause of `404 Not Found` and `500 Internal Server Error` in Nginx.

### `root`: Appends the Full Request URI to Path
```nginx
location /static/ {
    root /var/www/app;
}
# Request: GET /static/logo.png
# File looked up on disk: /var/www/app/static/logo.png
```

### `alias`: Replaces the Matched Location Path
```nginx
location /static/ {
    alias /var/www/app/assets/;
}
# Request: GET /static/logo.png
# File looked up on disk: /var/www/app/assets/logo.png
```
