---
title: "Network Firewalls & Packet Filtering"
description: Understand network firewalls, stateful packet inspection, ingress/egress rules, iptables, nftables, and security groups.
category: networking
topic: networking
type: concept
level: intermediate
tags:
  - networking
  - firewall
  - security
  - iptables
  - ufw
  - devops
platforms:
  - linux
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## What is a Firewall?

A **Firewall** is a network security system that monitors and controls incoming (**Ingress**) and outgoing (**Egress**) network traffic based on predetermined security rules.

---

## Stateless vs Stateful Firewalls

- **Stateless Packet Filtering**: Inspects individual packets in isolation (Source IP, Destination IP, Port). It cannot tell if an incoming packet is part of an existing requested connection or an unprompted intrusion attempt.
- **Stateful Inspection (Modern Standard)**: Tracks active connection states (`NEW`, `ESTABLISHED`, `RELATED`). When a local server initiates an outbound request to an external API, the stateful firewall automatically permits the return response traffic without requiring open incoming ports.

---

## Ingress vs Egress Rules

- **Ingress (Incoming Traffic)**: Controls who can connect to your server.
  - *Example*: Allow incoming TCP traffic on port `80` (HTTP) and `443` (HTTPS) from `0.0.0.0/0` (everyone); allow port `22` (SSH) only from the company VPN IP.
- **Egress (Outgoing Traffic)**: Controls what external destinations your server can connect to.
  - *Best Practice*: Block arbitrary outbound internet access from sensitive database servers to prevent data exfiltration if compromised.

---

## Linux Firewall Implementations

```bash
# Ubuntu UFW (Uncomplicated Firewall)
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Inspect active iptables / nftables rules
sudo iptables -L -n -v
```
