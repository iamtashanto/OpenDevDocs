---
title: "Developer Network Diagnostic Tools Cheatsheet"
description: Master essential network diagnostic utilities (curl, ping, traceroute, dig, ss, netstat, lsof, netcat) for debugging connectivity.
category: networking
topic: developer-networking
type: guide
level: intermediate
tags:
  - networking
  - tools
  - curl
  - ping
  - ss
  - lsof
  - diagnostics
platforms:
  - linux
  - macos
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## 1. Quick Diagnostic Decision Matrix

| Problem | Recommended Tool | Command Example |
| :--- | :--- | :--- |
| Is the remote host reachable? | `ping` | `ping -c 4 1.1.1.1` |
| Where is network latency or packet loss occurring? | `traceroute` | `traceroute 8.8.8.8` |
| Is a specific TCP port open on remote host? | `nc` (netcat) | `nc -zv 192.168.1.10 5432` |
| What is the HTTP status code and response timing? | `curl` | `curl -Iv https://example.com` |
| What IP does this domain resolve to? | `dig` | `dig @1.1.1.1 example.com +short` |
| Which local ports are currently listening? | `ss` | `sudo ss -tulpn` |
| Which process/PID is holding port 3000? | `lsof` | `lsof -i :3000` |

---

## 2. Advanced `curl` Latency Profiling

Measure exact DNS lookup, TCP connect, TLS handshake, and Time to First Byte (TTFB) durations:

```bash
curl -w "DNS: %{time_namelookup}s | TCP: %{time_connect}s | TLS: %{time_appconnect}s | TTFB: %{time_starttransfer}s | Total: %{time_total}s\n" \
  -o /dev/null -s https://docs.tashanto.com
```

---

## 3. Testing Raw TCP Socket Connections with Netcat (`nc`)

Verify if a database or Redis instance is accepting connections without needing the full DB client installed:

```bash
# -z = Zero-I/O mode (scan only); -v = Verbose
nc -zv database.internal.net 5432
```

---

## 4. Socket Inspection with `ss`

```bash
# Show summary statistics of all active socket connections
ss -s

# Filter for active established HTTPS connections
ss -t state established '( dport = :https or sport = :https )'
```
