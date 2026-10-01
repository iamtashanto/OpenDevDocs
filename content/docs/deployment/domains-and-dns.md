---
title: "Domains, DNS Records & Propagation"
description: Complete guide to domain name resolution, apex domains vs subdomains, A, AAAA, CNAME, and ALIAS records, TTL caching, and DNS propagation.
category: devops
topic: deployment
type: guide
level: beginner
tags:
  - dns
  - domains
  - networking
  - deployment
platforms:
  - all
tested:
  dns: "standard"
lastVerified: "2026-09-30"
---

The **Domain Name System** (DNS) maps human-readable domain names (e.g. `docs.tashanto.com`) to machine-routable IP addresses (e.g. `76.76.21.21`).

---

## Domain Hierarchy

```
        .              (Root Domain)
        │
       com             (Top-Level Domain - TLD)
        │
    tashanto           (Second-Level Domain / Apex / Root)
        │
      docs             (Subdomain)
```

- **Apex / Naked / Root Domain**: `tashanto.com` (domain without `www` or subdomains).
- **Subdomain**: `docs.tashanto.com`, `api.tashanto.com`.

---

## Common DNS Record Types for Deployment

| Record Type | Purpose | Example Host | Example Target / Value |
| :--- | :--- | :--- | :--- |
| **`A`** | Points a hostname directly to an **IPv4 address** | `@` (or `example.com`) | `198.51.100.42` |
| **`AAAA`** | Points a hostname directly to an **IPv6 address** | `@` | `2001:0db8:85a3::8a2e:0370:7334` |
| **`CNAME`** | Aliases one hostname to another canonical domain | `docs` | `cname.vercel-dns.com` |
| **`ALIAS` / `ANAME`** | Pseudo-CNAME at the root apex domain level | `@` | `cname.vercel-dns.com` |
| **`TXT`** | Arbitrary text used for domain verification and SPF/DKIM | `@` | `v=spf1 include:_spf.google.com ~all` |
| **`MX`** | Directs incoming emails to mail servers | `@` | `aspmx.l.google.com` (Priority 10) |

> [!WARNING]
> The DNS RFC standard prohibits creating a `CNAME` record on the root apex domain (`@` or `example.com`). If deploying your root apex domain to PaaS/Vercel/Cloudflare, use an `ALIAS` record or Cloudflare CNAME flattening.

---

## Time-To-Live (TTL) & DNS Propagation

**TTL** (Time To Live) is the number of seconds intermediate DNS resolvers and ISPs cache a DNS record before querying the authoritative nameserver again.

### Planning a Migration:
- **Normal Operations**: Set TTL to `3600` (1 hour) or `86400` (24 hours) for performance.
- **24–48 Hours Before Server Migration**: Lower TTL to `300` (5 minutes) so changes propagate worldwide within minutes when switching IP addresses.

---

## Related Guides

- [HTTPS & TLS Certificates](/docs/deployment/https-and-ssl)
- [Deploying Next.js to Vercel](/docs/deployment/deploy-nextjs-vercel)
- [DNS Fundamentals](/docs/fundamentals/dns)
