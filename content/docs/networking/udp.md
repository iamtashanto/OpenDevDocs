---
title: "UDP (User Datagram Protocol)"
description: Understand UDP connectionless datagram delivery, low-latency performance, and use cases in DNS, WebRTC, live streaming, and HTTP/3 QUIC.
category: networking
topic: networking
type: concept
level: intermediate
tags:
  - networking
  - udp
  - transport
  - quic
  - streaming
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is UDP?

**UDP (User Datagram Protocol)** is a lightweight, connectionless transport protocol defined in RFC 768. Unlike TCP, UDP does not establish a handshake, does not guarantee packet delivery, and does not reorder out-of-sequence packets.

---

## TCP vs UDP Direct Comparison

| Feature | TCP | UDP |
| :--- | :--- | :--- |
| **Connection** | Connection-oriented (3-way handshake) | Connectionless ("Fire-and-forget") |
| **Reliability** | 100% guaranteed (Automatic retransmission) | Best-effort (Lost packets are discarded) |
| **Ordering** | Strictly preserved in sequence | Packets may arrive out-of-order |
| **Header Overhead** | Large (20 to 60 bytes) | Minimal (8 bytes) |
| **Latency** | Higher (Handshake + ACK roundtrips) | Ultra-low (0-RTT initial transmission) |
| **Flow/Congestion Control** | Built-in | None (Application layer must handle if needed) |

---

## When is UDP Preferred?

1. **Real-Time Video & Voice (WebRTC / VoIP)**: Dropping 1 frame of a live video call is preferable to freezing the video while waiting for a retransmission.
2. **Online Multiplayer Gaming**: Real-time player coordinate updates require the lowest possible latency ($<20\text{ms}$).
3. **DNS Queries**: Resolving domain names requires a single request-response cycle; if no reply arrives, the client simply re-queries.
4. **HTTP/3 & QUIC**: Modern HTTP/3 runs over **QUIC**, which is built on top of UDP to achieve zero roundtrip (0-RTT) handshakes and eliminate TCP Head-of-Line blocking.

---

## UDP Packet Header (8 Bytes)

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Length             |           Checksum            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                            Payload                            |
```
