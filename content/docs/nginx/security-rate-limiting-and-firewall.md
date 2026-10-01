---
title: "Nginx Security, Rate Limiting & Firewall Rules"
description: "Protect your web applications from DDoS, brute-force attacks, and scraping using Nginx rate limiting (limit_req), connection limits, IP whitelists, and security headers."
category: devops
topic: nginx
type: guide
level: intermediate
tags:
  - nginx
  - security
  - rate-limiting
  - ddos
  - firewall
platforms:
  - linux
  - all
tested:
  nginx: "1.26"
lastVerified: "2026-10-01"
---

# Nginx Security, Rate Limiting & Firewall Rules

Nginx provides built-in rate-limiting and connection-limiting modules to mitigate DDoS floods, brute-force login attempts, and scrapers before they exhaust application memory.

---

## 1. Rate Limiting (`limit_req_zone`)

Rate limiting uses the **Leaky Bucket algorithm** to limit the rate of requests processed from a single client IP.

### Step 1: Define Rate Limiting Zone in `http` context
```nginx
# Add in /etc/nginx/nginx.conf inside http { ... }

# Tracks client IP in 10MB memory (~160,000 IPs) with a max rate of 10 requests per second
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

# Strict limit for login/auth endpoints (5 requests per minute)
limit_req_zone $binary_remote_addr zone=login_limit:10m rate=5r/m;

# Return HTTP 429 (Too Many Requests) instead of default HTTP 503
limit_req_status 429;
```

### Step 2: Apply Limit to Specific Location Blocks
```nginx
server {
    listen 443 ssl;
    server_name api.example.com;

    # General API endpoints: Allow burst of 20 with immediate nodelay processing
    location /api/ {
        limit_req zone=api_limit burst=20 nodelay;
        proxy_pass http://127.0.0.1:3000;
    }

    # Sensitive authentication endpoints (Brute-force protection)
    location /api/auth/login {
        limit_req zone=login_limit burst=3 nodelay;
        proxy_pass http://127.0.0.1:3000;
    }
}
```

- `burst=20`: Allows an initial surge of up to 20 requests above the normal rate.
- `nodelay`: Processes the burst requests immediately without introducing artificial artificial sleep delays.

---

## 2. Limiting Concurrent Connections (`limit_conn`)

Limit the number of simultaneous active TCP connections opened by a single IP address:

```nginx
# In http context:
limit_conn_zone $binary_remote_addr zone=conn_limit:10m;

# In server or location block:
server {
    # Allow maximum 15 simultaneous connections from a single IP
    limit_conn conn_limit 15;
    limit_conn_status 429;
}
```

---

## 3. IP Whitelisting & Access Control

Restrict administrative endpoints (such as `/admin`, `/metrics`, or `/pgadmin`) to specific VPN or office IP addresses:

```nginx
location /admin/ {
    # Allow office IP
    allow 203.0.113.50;
    # Allow VPN subnet
    allow 10.8.0.0/24;
    # Block all others
    deny all;

    proxy_pass http://127.0.0.1:3000;
}
```

---

## 4. Blocking Malicious Scanners & User-Agents

```nginx
# Map in http context:
map $http_user_agent $bad_bot {
    default 0;
    ~*(sqlmap|nikto|wpscan|dirbuster|acunetix|masscan) 1;
}

server {
    if ($bad_bot) {
        return 403;
    }
}
```

---

## 5. File Upload Size Restrictions

Prevent buffer-overflow and disk-filling DoS attacks by restricting `client_max_body_size`:

```nginx
# Enforce 10MB maximum request payload size
client_max_body_size 10M;
```
