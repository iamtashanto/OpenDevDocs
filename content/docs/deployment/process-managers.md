---
title: "Process Managers: systemd vs. PM2"
description: Complete guide to background process management in production, auto-restarts, startup on boot, cluster mode, and comparing systemd with PM2.
category: devops
topic: deployment
type: guide
level: intermediate
tags:
  - process-manager
  - systemd
  - pm2
  - nodejs
  - linux
platforms:
  - linux
tested:
  systemd: "255"
  pm2: "5.4.x"
lastVerified: "2026-09-30"
---

In production, long-running backend processes must run in the background, automatically restart if they crash, spawn across multiple CPU cores, and persist across server reboots.

---

## Comparison: `systemd` vs `PM2`

| Feature | `systemd` | `PM2` |
| :--- | :--- | :--- |
| **Layer** | Native Linux OS init system (PID 1) | Node.js ecosystem utility |
| **Dependencies** | Pre-installed on almost all Linux distros | Requires Node.js and global npm install |
| **Cluster Mode** | Requires manual instances or reverse proxy | Built-in Node cluster mode (`instances: 'max'`) |
| **Resource Usage** | Near-zero CPU / memory overhead | Modest Node process overhead |
| **Logs** | Central `journalctl` | Local log files in `~/.pm2/logs/` |
| **Best For** | Generic Linux services, Docker engines, Go/Rust/Node binaries | Node.js specialized development & VPS deployments |

---

## Option 1: Native Linux `systemd` Service (Recommended)

Create `/etc/systemd/system/api.service`:

```ini
[Unit]
Description=Production Node.js API Service
After=network.target postgresql.service

[Service]
Type=simple
User=appuser
WorkingDirectory=/var/www/api
Environment=NODE_ENV=production
EnvironmentFile=/var/www/api/.env
ExecStart=/usr/bin/node dist/server.js
Restart=always
RestartSec=5s
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

```bash
# Reload daemon, enable on boot, and start
sudo systemctl daemon-reload
sudo systemctl enable --now api.service

# Check status and logs
sudo systemctl status api.service
journalctl -u api.service -f
```

---

## Option 2: PM2 Process Manager

```bash
# Start with maximum CPU cluster workers
pm2 start dist/server.js -i max --name "api"

# Save list and generate OS boot startup script
pm2 save
pm2 startup
```

---

## Related Guides

- [PM2 Process Manager Guide](/docs/deployment/pm2-process-manager)
- [Deploying Node.js to Linux VPS](/docs/deployment/deploy-nodejs-vps)
- [Linux Processes & Signals](/docs/linux/processes)
