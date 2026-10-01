---
title: "Nginx Core Configuration (nginx.conf)"
description: "Master the structure of nginx.conf — context hierarchy (main, events, http, server, location), worker process tuning, buffers, and performance optimization."
category: devops
topic: nginx
type: guide
level: intermediate
tags:
  - nginx
  - nginx-conf
  - performance
  - optimization
  - devops
platforms:
  - linux
  - all
tested:
  nginx: "1.26"
lastVerified: "2026-10-01"
---

# Nginx Core Configuration (`nginx.conf`)

The primary configuration file for Nginx is located at `/etc/nginx/nginx.conf`. Nginx configuration uses a hierarchical structure divided into **Contexts** (blocks enclosed by curly braces `{}`).

---

## 1. Context Hierarchy

```
Main (Global) Context
├── events { ... }
└── http { ... }
    ├── upstream backend_pool { ... }
    ├── server { ... }
    │   ├── location / { ... }
    │   └── location /api { ... }
    └── server { ... }
```

- **Main Context**: Directives that affect the entire Nginx application (user, worker processes, error log location, PID file).
- **`events` Context**: Controls low-level network connection processing.
- **`http` Context**: Defines universal HTTP configurations, MIME types, logging formats, gzip compression, and includes child server blocks.
- **`server` Context**: Represents a specific virtual host (website / domain) listening on a port.
- **`location` Context**: Handles specific URI paths (e.g. `/`, `/static`, `/api`) within a server.

---

## 2. Complete Production-Tuned `nginx.conf`

Below is an optimized, battle-tested `nginx.conf` for a high-traffic production VPS:

```nginx
# Run as the unprivileged web user
user www-data;

# Auto-detect CPU cores and spawn 1 worker per core
worker_processes auto;

# Maximum number of open file descriptors per worker process
worker_rlimit_nofile 65535;

# Location of process ID file
pid /run/nginx.pid;

# Global error log
error_log /var/log/nginx/error.log warn;

events {
    # Maximum simultaneous connections per worker process
    worker_connections 4096;

    # Allow a worker to accept all new connections simultaneously
    multi_accept on;

    # Use the Linux kernel's high-performance epoll event method
    use epoll;
}

http {
    ##
    # Basic Settings & File Streaming
    ##
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Zero-copy kernel file transfers (skips userspace buffering)
    sendfile on;

    # Send HTTP response headers in one packet rather than one-by-one
    tcp_nopush on;

    # Disable Nagle's algorithm for low-latency real-time response delivery
    tcp_nodelay on;

    # How long to keep keep-alive client connections open (seconds)
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Hide Nginx version number in HTTP headers and error pages
    server_tokens off;

    ##
    # Buffer Sizes (Mitigates buffer overflow and disk swapping)
    ##
    client_body_buffer_size 128k;
    client_header_buffer_size 1k;
    client_max_body_size 50M; # Max file upload size
    large_client_header_buffers 4 8k;

    ##
    # Logging Configuration
    ##
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for" '
                    'rt=$request_time uct="$upstream_connect_time" uht="$upstream_header_time" urt="$upstream_response_time"';

    access_log /var/log/nginx/access.log main buffer=16k flush=2m;

    ##
    # Gzip Compression
    ##
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 5;
    gzip_min_length 256;
    gzip_types
        application/atom+xml
        application/geo+json
        application/javascript
        application/x-javascript
        application/json
        application/ld+json
        application/manifest+json
        application/rss+xml
        application/vnd.ms-fontobject
        application/wasm
        application/x-web-app-manifest+json
        application/xhtml+xml
        application/xml
        font/otf
        font/ttf
        image/bmp
        image/svg+xml
        text/cache-manifest
        text/calendar
        text/css
        text/javascript
        text/markdown
        text/plain
        text/vcard
        text/vnd.rim.location.xloc
        text/vtt
        text/x-component
        text/x-cross-domain-policy;

    ##
    # Modular Virtual Host Includes
    ##
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

---

## 3. Explanation of Critical Directives

### `worker_processes auto;`
Tells Nginx to inspect the host machine's hardware and spawn exactly one worker process per physical/virtual CPU core.

### `sendfile on;`
Enables the `sendfile()` Linux kernel system call. Instead of reading a static file into Nginx application memory and writing it back out to the network socket, the kernel transfers bytes directly from disk cache to the network card.

### `server_tokens off;`
Hides the exact Nginx version from the `Server:` response header and default error pages, preventing automated scanners from profiling unpatched CVEs.
