---
title: "Linux Networking Commands Reference"
description: Inspect network interfaces with ip, check listening ports with ss, test connectivity with ping and curl, and configure firewalls with ufw.
category: linux
topic: linux
type: guide
level: intermediate
tags:
  - linux
  - networking
  - ip
  - ss
  - curl
  - ping
platforms:
  - linux
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## 1. Network Interface & IP Inspection (`ip`)

The modern `ip` command replaces deprecated legacy tools like `ifconfig`:

```bash
# Show all network interfaces and assigned IPv4/IPv6 addresses
ip a
# or
ip addr show

# Show default gateway and routing table
ip route show
```

---

## 2. Checking Listening Ports & Sockets (`ss`)

The `ss` (Socket Statistics) utility is the modern, high-performance replacement for `netstat`:

```bash
# List all listening TCP/UDP ports with process names and PIDs
sudo ss -tulpn

# Filter for a specific listening port (e.g. 3000 or 5432)
sudo ss -tulpn | grep :3000
```

### Flags Breakdown:
- **`-t`**: TCP sockets.
- **`-u`**: UDP sockets.
- **`-l`**: Listening sockets only.
- **`-p`**: Show process name and PID.
- **`-n`**: Numeric port numbers (shows `5432` instead of `postgresql`).

---

## 3. Connectivity & DNS Testing

```bash
# Test ICMP echo network latency
ping -c 4 1.1.1.1

# HTTP request inspection
curl -Iv https://example.com

# Test raw TCP port connectivity using netcat
nc -zv 192.168.1.50 5432

# Trace network routing hops
traceroute 8.8.8.8

# DNS resolution query
dig api.example.com +short
```

---

## 4. Uncomplicated Firewall (`ufw`) on Ubuntu

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check firewall rules
sudo ufw status verbose
```
