---
title: "How the Internet Works"
description: "A practical guide to internet plumbing: packets, IP addresses, routers, TCP/IP, and how data travels across global networks."
category: fundamentals
topic: networking
type: concept
level: beginner
tags:
  - networking
  - internet
  - tcp-ip
  - packets
  - fundamentals
platforms:
  - all
lastVerified: "2026-09-30"
---

# How the Internet Works

The internet is a global network of interconnected computers communicating via standardized protocols. It is not a single centralized entity, but rather a decentralized mesh of physical cables, wireless signals, routers, and servers.

---

## 1. The Core Mental Model: Packets and Routing

When you load a webpage or stream a video, data is not sent as a single unbroken stream. Instead, it is broken down into small chunks called **packets** (typically 1,500 bytes each).

```
[ Sender Computer ]
        │ (Breaks payload into Packets: P1, P2, P3)
        ▼
   [ Local Router ] ──► [ Internet Service Provider (ISP) ]
                                    │
                                    ▼ (Fiber optic / Undersea cables)
                             [ Global Internet Core ]
                                    │
                                    ▼
                         [ Destination Web Server ]
                                    │ (Reassembles P1 + P2 + P3)
```

Each packet contains two main parts:
1. **Header**: Metadata including sender IP, destination IP, packet sequence number, and protocol type.
2. **Payload**: The actual data (HTML fragment, image byte chunk, API response).

Routers inspect the packet header and forward it along the fastest available path. Packets may take different physical routes and arrive out of order; the receiving device uses sequence numbers to reassemble them.

---

## 2. The TCP/IP Protocol Suite

The internet operates on the **TCP/IP** (Transmission Control Protocol / Internet Protocol) model, structured in four layers:

| Layer | Protocol Examples | Role |
| :--- | :--- | :--- |
| **Application** | HTTP, HTTPS, SSH, DNS, SMTP | User-facing protocols and data formatting |
| **Transport** | TCP, UDP | End-to-end reliability, ordering, and flow control |
| **Network (Internet)** | IP (IPv4, IPv6), ICMP | Addressing and packet routing across networks |
| **Link (Physical)** | Ethernet, Wi-Fi, Fiber Optic | Physical transmission over hardware media |

### TCP vs. UDP

- **TCP (Transmission Control Protocol)**: Connection-oriented. Establishes a 3-way handshake (`SYN` → `SYN-ACK` → `ACK`). Guarantees that all packets arrive without errors and in order (used for HTTP, APIs, file downloads).
- **UDP (User Datagram Protocol)**: Connectionless. Sends packets without handshakes or retransmission guarantees. Prioritizes speed and low latency (used for live video streaming, DNS lookups, online gaming).

---

## 3. Practical Example: Tracing a Packet Route

You can observe the physical hops a packet takes across the internet using `traceroute` (macOS/Linux) or `tracert` (Windows):

```bash
traceroute cloudflare.com
```

Example output:
```text
1  192.168.1.1 (Local Home Gateway)  2.124 ms
2  10.200.0.1 (ISP Local Exchange)   8.450 ms
3  198.32.176.1 (Internet Exchange Point) 14.210 ms
4  104.16.132.229 (Cloudflare Edge Node)  15.110 ms
```

---

## 4. Common Mistakes & Misconceptions

| Misconception | Reality |
| :--- | :--- |
| "The internet is in the cloud / satellites" | Over 95% of international internet traffic flows through physical undersea fiber-optic cables. |
| "Packets always travel the same path" | Routers dynamically recalculate paths based on network congestion, BGP routing tables, and cable outages. |
| "Bandwidth equals speed" | **Bandwidth** is how much data fits through the pipe (volume); **Latency** (ping) is how long it takes for a packet to travel back and forth (delay). |

---

## Related Topics

- [Client and Server Architecture](/docs/fundamentals/client-and-server)
- [IP Addresses Explained](/docs/fundamentals/ip-addresses)
- [DNS Basics & Resolution Lifecycle](/docs/fundamentals/dns-basics)
- [HTTP and HTTPS Protocols](/docs/fundamentals/http-and-https)
