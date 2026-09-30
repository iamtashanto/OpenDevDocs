---
title: "DNS Troubleshooting & Cache Flushing"
description: Diagnose DNS propagation issues, query authoritative nameservers with dig and nslookup, and flush local OS DNS caches.
category: networking
topic: developer-networking
type: guide
level: intermediate
tags:
  - networking
  - dns
  - dig
  - nslookup
  - troubleshooting
platforms:
  - linux
  - macos
  - windows
tested:
  linux: "Ubuntu 24.04"
lastVerified: "2026-09-30"
---

## 1. Querying Specific Nameservers with `dig`

When updating domain DNS records, your local ISP cache might show old cached records. Query public resolvers directly with `dig`:

```bash
# Query Cloudflare DNS (1.1.1.1)
dig @1.1.1.1 api.example.com +short

# Query Google DNS (8.8.8.8)
dig @8.8.8.8 api.example.com +short

# Query Authoritative Nameserver directly (Bypasses all caches)
dig @ns1.cloudflare.com api.example.com A
```

---

## 2. Inspecting DNS Record Types

```bash
# Query MX (Mail Exchange) records
dig example.com MX +short

# Query TXT records (SPF, DKIM, site verification)
dig example.com TXT +short

# Trace full resolution chain from root nameservers down (+trace)
dig example.com +trace
```

---

## 3. Flushing Local Operating System DNS Caches

When a server IP changes, your local OS might cache the previous IP until TTL expires:

### macOS
```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

### Linux (systemd-resolved)
```bash
sudo resolvectl flush-caches
# or on older Ubuntu:
sudo systemd-resolve --flush-caches
```

### Windows (PowerShell / Command Prompt)
```powershell
ipconfig /flushdns
```

---

## 4. Temporary Overrides via `/etc/hosts`

To test a new server deployment before switching live public DNS:

```ini
# /etc/hosts
203.0.113.50   api.example.com
```

This forces your local computer to route `api.example.com` to `203.0.113.50` immediately, bypassing all DNS queries.
