---
title: "IP Addresses (IPv4 vs. IPv6)"
description: "Understanding IP addresses, public vs. private networks, CIDR notation, subnetting, NAT, and IPv4 vs IPv6 differences."
category: fundamentals
topic: networking
type: guide
level: beginner
tags:
  - ip-address
  - ipv4
  - ipv6
  - networking
  - cidr
  - fundamentals
platforms:
  - all
lastVerified: "2026-09-30"
---

# IP Addresses (IPv4 vs. IPv6)

An **IP (Internet Protocol) address** is a unique numerical identifier assigned to every device connected to a computer network. IP addresses enable packets to find their destination across local networks and the global internet.

---

## 1. IPv4 vs. IPv6

| Feature | IPv4 | IPv6 |
| :--- | :--- | :--- |
| **Address Length** | 32 bits (4 bytes) | 128 bits (16 bytes) |
| **Format** | Dot-decimal: `192.0.2.1` | Hexadecimal colons: `2001:0db8:85a3::8a2e:0370:7334` |
| **Total Addresses** | $\approx 4.3 \times 10^9$ ($\approx 4.3$ billion) | $\approx 3.4 \times 10^{38}$ (virtually unlimited) |
| **Current Status** | Depleted; relies on NAT | The modern standard for mobile and cloud networks |

---

## 2. Public vs. Private IP Addresses

### Public IP Addresses
- Globally unique across the entire public internet.
- Assigned by ISPs and cloud providers (e.g. AWS, DigitalOcean).
- Directly routable across global internet backbones.

### Private IP Addresses (RFC 1918)
- Used exclusively within private local networks (home Wi-Fi, office LANs, cloud VPCs).
- **Not routable** on the public internet.
- Three reserved private address ranges:
  1. `10.0.0.0` to `10.255.255.255` (Class A - large corporate networks)
  2. `172.16.0.0` to `172.31.255.255` (Class B - default for Docker bridge networks)
  3. `192.168.0.0` to `192.168.255.255` (Class C - home Wi-Fi routers)

---

## 3. Network Address Translation (NAT)

Because the world ran out of free IPv4 addresses, home and corporate routers use **NAT (Network Address Translation)**:

```
[ Laptop: 192.168.1.10 ] ──┐
[ Phone:  192.168.1.20 ] ──┼──► [ Home Router (Public IP: 203.0.113.50) ] ──► [ Internet ]
[ TV:     192.168.1.30 ] ──┘          (Rewrites packet ports via NAT table)
```

The router maps all private devices onto a single shared public IP address by tracking unique outbound port numbers.

---

## 4. CIDR Notation (Classless Inter-Domain Routing)

Developers configuring cloud firewalls, AWS security groups, and Docker networks frequently encounter **CIDR notation** (e.g. `192.168.1.0/24` or `0.0.0.0/0`):

- **`/32`**: A single specific IP address (e.g., `192.168.1.50/32` = 1 IP).
- **`/24`**: A subnet containing 256 addresses (`192.168.1.0` to `192.168.1.255`).
- **`/16`**: A subnet containing 65,536 addresses (`10.0.0.0` to `10.0.255.255`).
- **`0.0.0.0/0`**: **Every possible IPv4 address** on the entire internet (anywhere).

---

## 5. Checking Your IP Address

### Check Public IP in Terminal:
```bash
curl -s https://api.ipify.org
```

### Check Local Interface Private IP:
```bash
# macOS
ipconfig getifaddr en0

# Linux
ip addr show

# Windows
ipconfig
```

---

## Related Topics

- [DNS Basics & Resolution](/docs/fundamentals/dns-basics)
- [localhost & Loopback](/docs/fundamentals/localhost)
- [Ports & Sockets](/docs/fundamentals/ports)
