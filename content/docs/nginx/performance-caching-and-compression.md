---
title: "Nginx Performance, Caching & Compression"
description: "Accelerate response times using Nginx proxy caching, microcaching, static asset browser caching headers, Gzip compression, and open_file_cache."
category: devops
topic: nginx
type: guide
level: advanced
tags:
  - nginx
  - performance
  - caching
  - gzip
  - microcaching
platforms:
  - linux
  - all
tested:
  nginx: "1.26"
lastVerified: "2026-10-01"
---

# Nginx Performance, Caching & Compression

Nginx can act as an ultra-fast edge cache, serving cached responses directly from memory/disk without ever hitting your upstream Node.js, Go, or PHP application servers.

---

## 1. Upstream Reverse Proxy Caching (Microcaching)

### Step 1: Define `proxy_cache_path` in `http` context
```nginx
# Add inside http { ... } in /etc/nginx/nginx.conf
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=API_CACHE:10m max_size=1g inactive=60m use_temp_path=off;
```

- `levels=1:2`: Creates a two-level directory hierarchy to prevent filesystem performance degradation.
- `keys_zone=API_CACHE:10m`: Allocates 10MB of shared memory for active cache keys (~80,000 keys).
- `max_size=1g`: Maximum disk space allowed for cached payloads.
- `inactive=60m`: Deletes items that haven't been accessed for 60 minutes.

### Step 2: Apply Proxy Caching to Location Block
```nginx
server {
    listen 443 ssl;
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;

        # Activate Cache
        proxy_cache API_CACHE;
        proxy_cache_key "$scheme$request_method$host$request_uri";

        # Cache HTTP 200/302 responses for 10 minutes; 404s for 1 minute
        proxy_cache_valid 200 302 10m;
        proxy_cache_valid 404 1m;

        # Serve stale cached copy if backend server crashes or times out
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;

        # Add diagnostic cache status header (HIT, MISS, BYPASS, EXPIRED)
        add_header X-Cache-Status $upstream_cache_status always;
    }
}
```

---

## 2. Browser Caching for Static Assets

Cache images, fonts, JavaScript bundles, and CSS stylesheets in visitors' browsers:

```nginx
# Immutable static assets with content hashes
location ~* \.(?:css|js|woff2?|ttf|eot|svg|png|jpe?g|gif|webp|avif|ico)$ {
    root /var/www/example.com/html;
    expires 1y;
    add_header Cache-Control "public, immutable, max-age=31536000";
    access_log off; # Save disk I/O by not logging static asset hits
}
```

---

## 3. Open File Descriptor Cache

Caches open file handles, directory lookups, and error statuses in memory to reduce Linux disk I/O operations:

```nginx
# Add to http context in nginx.conf
open_file_cache max=10000 inactive=30s;
open_file_cache_valid 60s;
open_file_cache_min_uses 2;
open_file_cache_errors on;
```
