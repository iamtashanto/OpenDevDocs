---
title: "systemd & systemctl Service Management"
description: Master systemctl commands, create production systemd service unit files, configure auto-restart policies, and manage background daemons.
category: linux
topic: linux
type: guide
level: intermediate
tags:
  - linux
  - systemd
  - systemctl
  - devops
  - services
platforms:
  - linux
tested:
  linux: "Ubuntu 24.04 / Debian 12"
lastVerified: "2026-09-30"
---

## What is systemd?

**systemd** is the default init system and service manager for modern Linux distributions (Ubuntu, Debian, RedHat, CentOS, Arch, SUSE). It initializes the system components in PID 1 and manages all running background services.

---

## 1. Essential `systemctl` Commands

```bash
# Check service status and recent log lines
sudo systemctl status nginx

# Start / Stop service
sudo systemctl start nginx
sudo systemctl stop nginx

# Restart service (drops active connections)
sudo systemctl restart nginx

# Reload configuration gracefully without dropping connections
sudo systemctl reload nginx

# Enable service to launch automatically upon server reboot
sudo systemctl enable nginx

# Disable auto-start on boot
sudo systemctl disable nginx
```

---

## 2. Writing a Custom systemd Service Unit File

Create a unit file to run your Node.js/Go/Python application as a resilient system service:

```ini
# /etc/systemd/system/my-api.service
[Unit]
Description=My Production Node.js API Service
After=network.target postgresql.service

[Service]
Type=simple
User=deployer
WorkingDirectory=/var/www/my-api
ExecStart=/usr/bin/node /var/www/my-api/dist/server.js
Restart=always
RestartSec=5s
Environment=NODE_ENV=production
EnvironmentFile=/var/www/my-api/.env
StandardOutput=journal
StandardError=journal

# Security Sandboxing
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

---

## 3. Activating Your New Service

After creating or modifying any `.service` file:

```bash
# 1. Inform systemd of the new/updated unit configuration
sudo systemctl daemon-reload

# 2. Enable and start the service
sudo systemctl enable --now my-api

# 3. Check status
sudo systemctl status my-api
```
