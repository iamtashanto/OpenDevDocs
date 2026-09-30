---
title: "Network Protocols Overview"
description: Overview of standard networking protocols across application, transport, network, and data link layers.
category: networking
topic: networking
type: concept
level: beginner
tags:
  - networking
  - protocols
  - http
  - tcp
  - dns
  - standards
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is a Network Protocol?

A **Protocol** is an established set of rules and data formatting conventions that determines how data is transmitted and received across a network between communicating systems.

---

## Protocol Taxonomy by Layer

```
Application Layer:    [ HTTP / HTTPS ]   [ SSH ]   [ DNS ]   [ WebSocket ]   [ SMTP ]
                              │             │        │            │             │
Transport Layer:              └──────┬──────┴────────┼────────────┴─────────────┘
                                     ▼               ▼
                                  [ TCP ]         [ UDP ]
                                     │               │
Internet / Network:                  └───────┬───────┘
                                             ▼
                                     [ IP (IPv4/IPv6) ]
                                             │
Network Access / Link:                       ▼
                                   [ Ethernet / Wi-Fi ]
```

---

## Key Protocols Summary

| Protocol | Layer | Transport | Primary Purpose |
| :--- | :--- | :--- | :--- |
| **HTTP / HTTPS** | Application | TCP / QUIC | Transferring web pages, REST APIs, JSON data |
| **DNS** | Application | UDP (primary) / TCP | Resolving human domain names to IP addresses |
| **SSH** | Application | TCP | Secure encrypted remote server management |
| **WebSocket** | Application | TCP | Full-duplex persistent bidirectional communication |
| **TCP** | Transport | IP | Reliable, ordered, connection-oriented packet streams |
| **UDP** | Transport | IP | Fast, lightweight, connectionless datagram delivery |
| **IP** | Internet | Link | Routing packet addressing between host nodes |
| **ICMP** | Network | IP | Network diagnostics and error reporting (`ping`) |
| **BGP** | Routing | TCP | Border Gateway Protocol connecting autonomous systems |
