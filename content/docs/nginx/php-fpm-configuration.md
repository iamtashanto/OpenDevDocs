---
title: "Nginx PHP-FPM Configuration & Performance"
description: "Configure Nginx with PHP-FPM (PHP 8.2 / 8.3 / 8.4) via Unix domain sockets, fastcgi parameters, FastCGI caching, and PHP worker pool tuning."
category: devops
topic: nginx
type: guide
level: intermediate
tags:
  - nginx
  - php
  - php-fpm
  - fastcgi
  - laravel
  - wordpress
platforms:
  - linux
  - all
tested:
  nginx: "1.26"
  php: "8.3"
lastVerified: "2026-10-01"
---

# Nginx PHP-FPM Configuration & Performance

Nginx cannot execute dynamic PHP scripts natively. It delegates PHP processing to **PHP-FPM** (FastCGI Process Manager) using the FastCGI binary protocol over a Unix domain socket or TCP port.

---

## 1. Unix Domain Socket vs TCP Port

| Connection Type | Syntax | Performance | Common Use Case |
| :--- | :--- | :--- | :--- |
| **Unix Domain Socket** | `unix:/run/php/php8.3-fpm.sock` | **Highest** (Bypasses network stack) | Nginx and PHP-FPM on the same physical VPS. |
| **TCP Port** | `127.0.0.1:9000` | Good (TCP overhead) | PHP-FPM running in a separate Docker container. |

---

## 2. Standard PHP-FPM Server Block

```nginx
server {
    listen 80;
    server_name php.example.com;

    root /var/www/my-app/public;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Pass all .php files to PHP-FPM socket
    location ~ \.php$ {
        # Security: Prevent execution of non-existent PHP files
        try_files $uri =404;

        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_index index.php;

        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;

        # FastCGI Buffering & Timeouts
        fastcgi_buffer_size 128k;
        fastcgi_buffers 4 256k;
        fastcgi_busy_buffers_size 256k;
        fastcgi_read_timeout 60s;
    }

    # Deny access to hidden files (.env, .git)
    location ~ /\. {
        deny all;
    }
}
```

---

## 3. FastCGI Micro-Caching for Dynamic PHP Apps

Dramatically accelerate dynamic CMS platforms (like WordPress or Drupal) by caching generated HTML pages for unauthenticated users:

```nginx
# In http context:
fastcgi_cache_path /var/cache/nginx/php levels=1:2 keys_zone=PHP_CACHE:100m max_size=2g inactive=60m;
fastcgi_cache_key "$scheme$request_method$host$request_uri";
fastcgi_cache_use_stale error timeout invalid_header http_500;

# In server location ~ \.php$ block:
fastcgi_cache PHP_CACHE;
fastcgi_cache_valid 200 301 302 10m;
fastcgi_cache_bypass $skip_cache;
fastcgi_no_cache $skip_cache;

add_header X-FastCGI-Cache $upstream_cache_status;
```

---

## 4. Tuning PHP-FPM Pool (`www.conf`)

Edit `/etc/php/8.3/fpm/pool.d/www.conf`:

```ini
pm = dynamic
pm.max_children = 50
pm.start_servers = 10
pm.min_spare_servers = 5
pm.max_spare_servers = 20
pm.max_requests = 500
```

> [!TIP]
> **Formula for `pm.max_children`**:  
> `pm.max_children = (Total Available Server RAM - 1GB for OS & Nginx) / (Average RAM per PHP Process ~40MB - 60MB)`  
> On a 4GB RAM VPS: `(4000MB - 1000MB) / 50MB = 60 max_children`.
