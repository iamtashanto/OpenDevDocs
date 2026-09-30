---
title: "IPv4 Architecture & Dotted-Decimal Notation"
description: Master IPv4 32-bit addressing, octet structure, binary representation, and IPv4 address pool exhaustion.
category: networking
topic: networking
type: concept
level: beginner
tags:
  - networking
  - ipv4
  - ip
  - binary
  - subnetting
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is IPv4?

**IPv4 (Internet Protocol version 4)** is the foundational networking protocol of the modern Internet, defined in RFC 791 (1981).

---

## The 32-Bit Binary Structure

An IPv4 address is a **32-bit binary number** divided into 4 groups of 8 bits (called **Octets** or bytes). For human readability, it is expressed in **Dotted-Decimal Notation**:

```
Dotted-Decimal:        192   .    168   .     1    .     10
Binary Representation: 11000000 . 10101000 . 00000001 . 00001010
```

Each octet can range in value from `0` to `255` ($2^8 = 256$ possible values per octet).

---

## Total Address Capacity & Exhaustion

The 32-bit address space provides a theoretical maximum of:
$$2^{32} \approx 4,294,967,296 \text{ total addresses (4.29 billion)}$$

Due to global internet expansion, smartphones, cloud virtual machines, and IoT devices, the unallocated global IPv4 address pool was officially exhausted by IANA in 2011.

---

## Solutions to IPv4 Exhaustion

1. **NAT (Network Address Translation)**: Enables thousands of private devices to share a single public IPv4 address.
2. **Private IP Address Ranges (RFC 1918)**: Reusable non-routable subnets.
3. **IPv6**: Next-generation 128-bit addressing with virtually limitless addresses.
