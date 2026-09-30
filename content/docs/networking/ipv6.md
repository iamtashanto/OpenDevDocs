---
title: "IPv6 Overview & Addressing Format"
description: Understand IPv6 128-bit hexadecimal notation, address compression rules, dual-stack deployments, and benefits over IPv4.
category: networking
topic: networking
type: concept
level: beginner
tags:
  - networking
  - ipv6
  - ip
  - dual-stack
  - future
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is IPv6?

**IPv6 (Internet Protocol version 6)** was designed by the IETF to replace IPv4 and permanently eliminate address exhaustion bottlenecks.

---

## 128-Bit Hexadecimal Format

IPv6 uses **128 bits**, providing $2^{128} \approx 3.4 \times 10^{38}$ unique addresses (roughly 340 undecillion addresses).

An IPv6 address is written as 8 groups of 4 hexadecimal digits separated by colons:

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

---

## Address Compression Rules

To simplify writing long IPv6 addresses:

1. **Omit Leading Zeros in Each Group**:
   `2001:0db8:...` becomes `2001:db8:...`
2. **Double Colon (`::`) for Consecutive Zeros**:
   Consecutive sections of zeros can be compressed to `::` **once per address**:
   `2001:db8:85a3:0000:0000:8a2e:0370:7334` $\rightarrow$ `2001:db8:85a3::8a2e:370:7334`
3. **Loopback Address**:
   `0000:0000:0000:0000:0000:0000:0000:0001` compresses to **`::1`** (IPv6 equivalent of `127.0.0.1`).

---

## IPv4 vs IPv6 Comparison

| Metric | IPv4 | IPv6 |
| :--- | :--- | :--- |
| **Address Length** | 32 bits | 128 bits |
| **Format** | Decimal (`192.168.1.1`) | Hexadecimal (`2001:db8::1`) |
| **Loopback** | `127.0.0.1` | `::1` |
| **All Interfaces** | `0.0.0.0` | `::` |
| **NAT Required?** | Yes (Widespread) | No (End-to-end direct routing) |
| **Packet Header** | Variable size (20-60 bytes) | Fixed simplified size (40 bytes) |

---

## Dual-Stack Architecture

Most modern cloud servers and mobile networks run in **Dual-Stack** mode, meaning network interfaces are assigned both an IPv4 and an IPv6 address concurrently.
