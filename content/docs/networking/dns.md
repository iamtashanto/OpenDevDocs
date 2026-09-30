---
title: "DNS Architecture & Record Types"
description: Master the Domain Name System (DNS), hierarchical resolution flow, TTL caching, and essential record types (A, AAAA, CNAME, MX, TXT).
category: networking
topic: networking
type: concept
level: beginner
tags:
  - networking
  - dns
  - domain
  - cname
  - routing
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is DNS?

The **Domain Name System (DNS)** is the phonebook of the Internet. It translates human-friendly domain names (e.g. `docs.tashanto.com`) into machine-routable IP addresses (e.g. `76.76.21.21`).

---

## The 4-Stage DNS Resolution Process

```
Client (Browser) ──> [ 1. Local / ISP Recursive Resolver ] (e.g. 1.1.1.1 or 8.8.8.8)
                              │
                              ├──> [ 2. Root Nameserver (.) ] ──> Points to .com TLD
                              │
                              ├──> [ 3. TLD Nameserver (.com) ] ──> Points to tashanto.com NS
                              │
                              └──> [ 4. Authoritative Nameserver ] (Cloudflare / Route53)
                                            │
                                            ▼ Returns A Record: 76.76.21.21
```

---

## Essential DNS Record Types

| Record Type | Name | Purpose | Example |
| :--- | :--- | :--- | :--- |
| **`A`** | Address Record | Maps a domain directly to an **IPv4** address | `docs.tashanto.com -> 76.76.21.21` |
| **`AAAA`** | IPv6 Address Record | Maps a domain to an **IPv6** address | `example.com -> 2606:4700::6810` |
| **`CNAME`** | Canonical Name | Maps an alias subdomain to another domain name | `www.example.com -> example.com` |
| **`MX`** | Mail Exchange | Directs incoming emails to mail servers | `example.com -> mail.protonmail.ch (Priority 10)` |
| **`TXT`** | Text Record | Arbitrary text used for domain verification, SPF, DKIM, and SSL certificates | `"v=spf1 include:_spf.google.com ~all"` |
| **`NS`** | Name Server | Delegates a DNS zone to authoritative nameservers | `ns1.cloudflare.com` |
| **`PTR`** | Pointer Record | Reverse DNS lookup (Maps IP address back to domain) | `1.0.0.127.in-addr.arpa -> localhost` |

---

## Time-To-Live (TTL) & Propagation

- **`TTL (Time-To-Live)`**: Number of seconds recursive resolvers are permitted to cache a DNS response before querying authoritative nameservers again.
- Setting a low TTL (e.g. `300` seconds = 5 minutes) before migrating server infrastructure ensures DNS changes take effect quickly across global caches.
