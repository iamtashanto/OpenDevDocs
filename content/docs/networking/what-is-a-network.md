---
title: "What is a Computer Network?"
description: Understand computer networking, packets, OSI 7-layer model, and TCP/IP protocol suite for modern software developers.
category: networking
topic: networking
type: concept
level: beginner
tags:
  - networking
  - osi-model
  - tcp-ip
  - packets
  - architecture
platforms:
  - web
  - node
  - linux
lastVerified: "2026-09-30"
---

## Overview

A **Computer Network** is a collection of interconnected computing devices (nodes) that communicate and exchange data using standardized protocols.

---

## How Data Moves: Packets

Information transferred across the internet is not sent as one continuous stream. Large payloads (files, images, web pages) are sliced into smaller units called **Packets**. Each packet contains:
1. **Header**: Metadata including Source IP, Destination IP, sequence number, and protocol type.
2. **Payload**: The actual application data slice.
3. **Trailer / Checksum**: Error detection bits to verify data was not corrupted in transit.

---

## The OSI 7-Layer Model vs TCP/IP Model

The **OSI Model** describes network communication across 7 conceptual layers, while the practical **TCP/IP Model** condenses this into 4 functional layers:

| Layer # | OSI Layer Name | TCP/IP Layer | Primary Role | Key Protocols / Examples |
| :--- | :--- | :--- | :--- | :--- |
| **7** | Application | **Application** | High-level user & app protocols | HTTP, HTTPS, SSH, DNS, WebSockets |
| **6** | Presentation | | Data formatting, TLS encryption | JSON, TLS/SSL, Gzip, UTF-8 |
| **5** | Session | | Manages persistent connections | Sockets, RPC sessions |
| **4** | **Transport** | **Transport** | End-to-end reliability & ports | **TCP**, **UDP**, QUIC |
| **3** | **Network** | **Internet** | Routing packets between hosts | **IP (IPv4/IPv6)**, ICMP, BGP |
| **2** | Data Link | **Network Access** | Physical frame delivery on local link | Ethernet, Wi-Fi (802.11), MAC addresses |
| **1** | Physical | | Raw bit transmission over cables/radio | Fiber optics, copper cables, radio signals |

---

## Encapsulation & Decapsulation

When a developer calls `fetch("https://api.example.com")`:
1. **Application Layer**: Generates the HTTP request string.
2. **Transport Layer**: Wraps HTTP string into TCP segments with source and destination ports.
3. **Network Layer**: Wraps TCP segment into IP packets with source and destination IP addresses.
4. **Data Link Layer**: Wraps IP packet into Ethernet frames with MAC addresses.
5. **Physical Layer**: Converts frames into electrical voltages or light pulses over wire.

Upon reaching the server, the reverse process (**Decapsulation**) extracts the payload back up to the web server.
