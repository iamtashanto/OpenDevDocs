---
title: "TLS 1.3 Handshake & Cryptography"
description: Master Transport Layer Security (TLS 1.3), 1-RTT cryptographic handshakes, Diffie-Hellman ephemeral key exchange, SNI, and cipher suites.
category: networking
topic: networking
type: concept
level: intermediate
tags:
  - networking
  - tls
  - security
  - cryptography
  - ssl
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## What is TLS?

**TLS (Transport Layer Security)** is the cryptographic protocol that secures communications over computer networks. TLS replaces the deprecated legacy SSL (Secure Sockets Layer) standard.

---

## The Modern TLS 1.3 Handshake (1-RTT)

TLS 1.3 reduced handshake latency from 2 roundtrips (TLS 1.2) to a single roundtrip (**1-RTT**) using Ephemeral Elliptic Curve Diffie-Hellman (ECDHE):

```
Client                                              Server
  │                                                   │
  │ 1. ClientHello                                    │
  │    - Supported Cipher Suites                      │
  │    - Key Share (Diffie-Hellman public key)        │
  │    - SNI (server_name: api.example.com)           │
  │    - ALPN (h2, http/1.1)                          │
  ├──────────────────────────────────────────────────>│
  │                                                   │
  │ 2. ServerHello                                    │
  │    - Selected Cipher Suite                        │
  │    - Server Key Share                             │
  │    - Server Certificate Chain (Encrypted)         │
  │    - Finished Verification Signature              │
  │<──────────────────────────────────────────────────┤
  │                                                   │
  │ [ Shared Encryption Key Derived on Both Sides ]   │
  │                                                   │
  │ 3. Client Sends Encrypted HTTP Request            │
  ├──────────────────────────────────────────────────>│
```

---

## Critical TLS Extensions

### 1. Server Name Indication (SNI)
Informs the server which specific hostname the client is connecting to during the initial `ClientHello`. This enables a single IP address and web server (like NGINX) to host multiple secure domains with different TLS certificates.

### 2. Application-Layer Protocol Negotiation (ALPN)
Allows the client and server to negotiate the application protocol (e.g. `h2` for HTTP/2 or `http/1.1`) inside the TLS handshake without extra roundtrips.

---

## Modern TLS 1.3 Cipher Suites

TLS 1.3 removed insecure legacy algorithms (MD5, SHA-1, RC4, static RSA key exchange). Only 5 modern authenticated encryption with associated data (AEAD) cipher suites are permitted:

1. `TLS_AES_256_GCM_SHA384`
2. `TLS_CHACHA20_POLY1305_SHA256`
3. `TLS_AES_128_GCM_SHA256`
4. `TLS_AES_128_CCM_SHA256`
5. `TLS_AES_128_CCM_8_SHA256`
