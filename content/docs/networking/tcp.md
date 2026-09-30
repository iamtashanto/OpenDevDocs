---
title: "TCP (Transmission Control Protocol)"
description: Master TCP 3-way handshakes, reliable ordered packet delivery, sliding window flow control, congestion management, and termination.
category: networking
topic: networking
type: concept
level: intermediate
tags:
  - networking
  - tcp
  - transport
  - handshake
  - reliability
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is TCP?

**TCP (Transmission Control Protocol)** is a connection-oriented transport layer protocol that provides **reliable**, **ordered**, and **error-checked** delivery of data streams between applications over an IP network.

---

## The TCP 3-Way Handshake (Connection Establishment)

Before any application data can be sent, the client and server must establish a synchronized connection:

```
Client (Browser)                                    Server (Web Host)
      │                                                     │
      │ 1. SYN (Sequence Number = X)                        │
      ├────────────────────────────────────────────────────>│
      │                                                     │
      │ 2. SYN-ACK (Seq = Y, Acknowledgment = X + 1)        │
      │<────────────────────────────────────────────────────┤
      │                                                     │
      │ 3. ACK (Seq = X + 1, Acknowledgment = Y + 1)        │
      ├────────────────────────────────────────────────────>│
      │                                                     │
      │ [ Connection Established: Ready to Send HTTP Data ] │
```

---

## Core TCP Reliability Features

1. **Guaranteed Delivery (Retransmission)**: The receiver sends acknowledgments (ACKs) for received packets. If an ACK isn't received before a timeout, TCP automatically retransmits the missing packet.
2. **Ordered Sequencing**: Packets arriving out of order due to differing internet network routes are reassembled into the exact sequence before being delivered to the application layer.
3. **Flow Control (Sliding Window)**: Prevents a fast sender from overwhelming a slow receiver by continuously advertising available buffer space.
4. **Congestion Control**: Algorithms (e.g. CUBIC, BBR) dynamically detect network congestion and throttle data transfer rates to prevent network collapse.

---

## 4-Way Handshake (Connection Teardown)

When closing a TCP connection:
1. Client $\rightarrow$ Server: `FIN` (Finished sending data)
2. Server $\rightarrow$ Client: `ACK`
3. Server $\rightarrow$ Client: `FIN`
4. Client $\rightarrow$ Server: `ACK` (Connection closed after `TIME_WAIT`)
