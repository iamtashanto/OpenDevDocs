---
title: "Cloudflare WAF, Security & Rate Limiting"
description: "Protect origins from Layer 7 attacks using Cloudflare WAF, custom firewall rules, Bot Fight Mode, rate limiting, and restoring true client IPs in Nginx."
category: devops
topic: cloudflare
type: guide
level: intermediate
tags:
  - cloudflare
  - waf
  - security
  - rate-limiting
  - ddos
  - bot-protection
platforms:
  - all
tested:
  cloudflare: "current"
lastVerified: "2026-10-01"
---

# Cloudflare WAF, Security & Rate Limiting

Cloudflare Web Application Firewall (WAF) inspects incoming traffic at the edge to block malicious payloads (SQL injection, XSS, bots) before they ever reach your origin server.

---

## 1. Custom WAF Firewall Rules

Create rules under **Security -> WAF -> Custom Rules**:

### Rule 1: Block Sensitive File Scanners (.env, .git, .aws)
- **Field**: `URI Path`
- **Operator**: `matches regex`
- **Value**: `\.(env|git|aws|yml|yaml|sql|bak|config)$`
- **Action**: **Block**

### Rule 2: Challenge Admin / Login Paths Outside Home Country
- **Expression**: `(http.request.uri.path contains "/admin" or http.request.uri.path contains "/wp-admin") and (ip.geoip.country ne "BD" and ip.geoip.country ne "US")`
- **Action**: **Managed Challenge**

---

## 2. Restoring Real Visitor IPs in Nginx

When using Cloudflare proxy, `$remote_addr` in Nginx will show Cloudflare's IP address. To restore the real visitor's IP using the `CF-Connecting-IP` header:

### Create `/etc/nginx/conf.d/cloudflare-real-ip.conf`
```nginx
# /etc/nginx/conf.d/cloudflare-real-ip.conf

# Cloudflare IPv4 CIDR Ranges
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 104.16.0.0/13;
set_real_ip_from 104.24.0.0/14;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 131.0.72.0/22;

# Cloudflare IPv6 CIDR Ranges
set_real_ip_from 2400:cb00::/32;
set_real_ip_from 2606:4700::/32;
set_real_ip_from 2803:f800::/32;
set_real_ip_from 2405:b500::/32;
set_real_ip_from 2405:8100::/32;
set_real_ip_from 2a06:98c0::/29;
set_real_ip_from 2c0f:f248::/32;

# Use Cloudflare's CF-Connecting-IP header for real IP
real_ip_header CF-Connecting-IP;
```

Reload Nginx:
```bash
sudo nginx -t && sudo systemctl reload nginx
```
Now `$remote_addr` in Nginx access logs and rate-limiting modules will accurately reflect the real end-user's IP address.
