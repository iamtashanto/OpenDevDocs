---
title: "DNS Basics (Domain Name System)"
description: "How DNS translates human-readable domain names into IP addresses: recursive resolvers, root servers, TLDs, and DNS record types (A, CNAME, TXT, MX)."
category: fundamentals
topic: networking
type: guide
level: beginner
tags:
  - dns
  - networking
  - domains
  - records
  - fundamentals
platforms:
  - all
lastVerified: "2026-09-30"
---

# DNS Basics (Domain Name System)

The **Domain Name System (DNS)** is the phonebook of the internet. Humans access information through domain names like `docs.tashanto.com` or `github.com`. Web browsers interact through numerical IP addresses (like `104.21.55.2`). DNS translates domain names into IP addresses so browsers can load internet resources.

---

## 1. The DNS Resolution Lifecycle

When you type `https://docs.tashanto.com` into your browser for the first time, a 4-step resolution process occurs:

```
[ User Browser ]
       │
       ▼ (1. Query: Where is docs.tashanto.com?)
[ Recursive DNS Resolver ] (e.g., ISP, 1.1.1.1, 8.8.8.8)
       │
       ├─► (2. Asks Root Server: Who knows .com?) ──► [ Root Nameserver (.) ]
       │                                                      │
       ├─► (3. Asks TLD Server: Who manages tashanto.com?) ◄──┘
       │        │
       │        ▼
       │   [ .com TLD Nameserver ]
       │        │
       └─► (4. Asks Authoritative Server: What is the IP for docs.tashanto.com?) ──► [ Cloudflare DNS ]
                │                                                                        │
                ◄────────────────────────────────────────────────────────────────────────┘
                    Returns IP: 104.21.55.2 (Cached via TTL)
```

---

## 2. Common DNS Record Types

DNS records are stored in authoritative zone files. The most important records for developers are:

| Record Type | Purpose | Example Value |
| :--- | :--- | :--- |
| **`A`** | Maps a domain name directly to an **IPv4** address. | `example.com` → `93.184.216.34` |
| **`AAAA`** | Maps a domain name directly to an **IPv6** address. | `example.com` → `2606:2800:220:1:248:1893:25c8:1946` |
| **`CNAME`** | Canonical Name; aliases one domain to another domain name. | `www.example.com` → `example.com` |
| **`TXT`** | Arbitrary text used for domain verification, SPF, and DKIM email security. | `v=spf1 include:_spf.google.com ~all` |
| **`MX`** | Mail Exchange; specifies email mail servers for the domain. | `10 mail.example.com` |
| **`NS`** | Nameserver; delegates a DNS zone to use given authoritative servers. | `ns1.cloudflare.com` |

---

## 3. Time To Live (TTL) & Caching

Every DNS record contains a **TTL (Time To Live)** in seconds (e.g. `300` for 5 minutes, `86400` for 24 hours).
- **High TTL (e.g. 86400s)**: Reduces DNS query load and speeds up resolution, but changes take up to 24 hours to propagate globally.
- **Low TTL (e.g. 300s)**: Ideal before performing server migrations so traffic switches over quickly.

---

## 4. Querying DNS from the Terminal

Inspect live DNS records from your command line using `dig` or `nslookup`:

### Query A Record
```bash
dig docs.tashanto.com +short
```

### Query All Record Types
```bash
dig github.com ANY
```

### Query Specific Nameserver Directly
```bash
dig @1.1.1.1 docs.tashanto.com
```

---

## 5. Common DNS Gotchas

1. **CNAME on Root Domain**: Standard DNS RFCs prohibit creating a `CNAME` record on the root/apex domain (`example.com`). Use **ANAME** or **CNAME Flattening** (provided by Cloudflare, Route53) instead.
2. **DNS Propagation Delays**: Changes to DNS records are cached by ISP resolvers for the duration of the old record's TTL. Flush local cache on macOS with `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`.

---

## Related Topics

- [IP Addresses (IPv4 vs IPv6)](/docs/fundamentals/ip-addresses)
- [How the Internet Works](/docs/fundamentals/how-the-internet-works)
- [Ports & Sockets](/docs/fundamentals/ports)
