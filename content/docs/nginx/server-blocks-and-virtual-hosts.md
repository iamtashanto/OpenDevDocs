---
title: "Nginx Server Blocks & Virtual Hosts"
description: "Host multiple websites and API services on a single server using Nginx Server Blocks, sites-available symlinks, server_name matching, and default catch-alls."
category: devops
topic: nginx
type: guide
level: intermediate
tags:
  - nginx
  - server-blocks
  - virtual-hosts
  - domain
  - multi-site
platforms:
  - linux
  - all
tested:
  nginx: "1.26"
lastVerified: "2026-10-01"
---

# Nginx Server Blocks & Virtual Hosts

A **Server Block** (equivalent to an Apache VirtualHost) defines how Nginx responds to incoming requests for specific domain names, IP addresses, or ports.

---

## 1. Debian/Ubuntu Standard Directory Structure

```
/etc/nginx/
├── sites-available/       # Storage directory for ALL configured domain configs
│   ├── default
│   ├── api.example.com.conf
│   └── example.com.conf
└── sites-enabled/         # SYMLINKS to sites-available (Active sites only!)
    ├── api.example.com.conf -> /etc/nginx/sites-available/api.example.com.conf
    └── example.com.conf -> /etc/nginx/sites-available/example.com.conf
```

### Enabling and Disabling Sites via Symlinks

```bash
# To ENABLE a site:
sudo ln -s /etc/nginx/sites-available/example.com.conf /etc/nginx/sites-enabled/

# Test syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# To DISABLE a site (without deleting the config):
sudo rm /etc/nginx/sites-enabled/example.com.conf
sudo systemctl reload nginx
```

---

## 2. Basic Static Website Server Block

```nginx
# /etc/nginx/sites-available/example.com.conf
server {
    listen 80;
    listen [::]:80; # IPv6 support

    server_name example.com www.example.com;

    root /var/www/example.com/html;
    index index.html index.htm;

    # Custom access and error log locations
    access_log /var/log/nginx/example.com.access.log;
    error_log /var/log/nginx/example.com.error.log warn;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

---

## 3. Server Name Matching Order

When an HTTP request arrives, Nginx determines which server block handles it by evaluating the `Host:` header in this exact order:

1. **Exact Name**: `server_name example.com;`
2. **Wildcard starting with asterisk**: `server_name *.example.com;`
3. **Wildcard ending with asterisk**: `server_name example.*;`
4. **Regular Expression**: `server_name ~^(www\.)?example\.com$;`

---

## 4. Default Catch-All Block (Security Best Practice)

To prevent attackers from accessing your server directly via its raw public IP address or using spoofed `Host` headers, configure a default server block that drops or returns HTTP 444 (Connection Closed Without Response):

```nginx
# /etc/nginx/sites-available/00-default-catchall.conf
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    # Close connection without sending headers or response body
    return 444;
}
```
