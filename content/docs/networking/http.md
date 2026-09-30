---
title: "HTTP Evolution: HTTP/1.1, HTTP/2, and HTTP/3"
description: Compare HTTP/1.1 text protocol, HTTP/2 binary framing and multiplexing, and modern HTTP/3 over QUIC/UDP.
category: networking
topic: networking
type: concept
level: intermediate
tags:
  - networking
  - http
  - http2
  - http3
  - quic
  - web
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## Evolution of the Hypertext Transfer Protocol

```
HTTP/1.1 (1997)        ──> HTTP/2 (2015)          ──> HTTP/3 (2022)
Plaintext Streams           Binary Framing Streams       QUIC (UDP-Based)
Head-of-Line Blocking       Multiplexing on Single TCP   0-RTT Connection Migration
```

---

## 1. HTTP/1.1 (The Plaintext Standard)

- **Text-Based Messages**: Headers and request lines are readable plaintext strings.
- **Head-of-Line (HoL) Blocking**: Only 1 request can be active on a TCP connection at a time. Browsers had to open 6 separate parallel TCP connections per domain to load multiple assets simultaneously.
- **Keep-Alive**: Connections can be reused for sequential requests, but responses must still arrive in the exact order requested.

---

## 2. HTTP/2 (Binary Framing & Multiplexing)

- **Binary Framing Layer**: Parses HTTP semantics into discrete binary frames (`DATA`, `HEADERS`).
- **Full Multiplexing**: Multiple requests and responses interleave concurrently over a **single TCP connection** without blocking each other.
- **HPACK Header Compression**: Compresses repetitive HTTP headers (cookies, user-agents), reducing bandwidth overhead.

---

## 3. HTTP/3 (QUIC Protocol over UDP)

While HTTP/2 fixed HTTP-level blocking, packet drops on the underlying TCP connection still stalled all multiplexed streams (**TCP-level Head-of-Line blocking**).

- **Built on QUIC (UDP)**: Independent streams are isolated at the transport layer; a single dropped packet delays only that specific stream.
- **0-RTT Resumed Handshakes**: Combines transport and cryptographic TLS 1.3 handshakes into a single roundtrip.
- **Connection Migration**: Switching networks (e.g. moving from Wi-Fi to cellular data on mobile) does not drop active downloads because connections are identified by a 64-bit Connection ID rather than IP/port tuples.

---

## Summary Comparison

| Metric | HTTP/1.1 | HTTP/2 | HTTP/3 |
| :--- | :--- | :--- | :--- |
| **Transport Layer** | TCP | TCP | **QUIC (UDP)** |
| **Data Format** | Plaintext ASCII | Binary Frames | Binary Frames |
| **Multiplexing** | No (Sequential) | Yes (Single TCP) | Yes (Independent UDP Streams) |
| **Encryption** | Optional (HTTPS) | Enforced in browsers | **Mandatory TLS 1.3 Built-in** |
| **Handshake Latency** | 2-3 RTTs (TCP + TLS) | 2-3 RTTs | **0-1 RTT** |
