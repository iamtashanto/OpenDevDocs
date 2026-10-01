---
title: "Deploy Go & Gin API on Ubuntu VPS (Systemd + Nginx + SSL)"
description: "Deploy a high-performance Go Gin REST API on Ubuntu VPS using compiled standalone binaries, systemd service management, Nginx reverse proxy, and SSL."
category: devops
topic: deployment
type: recipe
level: intermediate
tags:
  - go
  - gin
  - vps
  - systemd
  - nginx
  - api
platforms:
  - linux
  - all
tested:
  go: "1.23"
  nginx: "1.26"
lastVerified: "2026-10-01"
---

## Goal

Deploy a compiled Go Gin application as a lightweight systemd service running behind an Nginx reverse proxy with HTTPS.

---

<Steps>
  <Step step={1} title="Cross-Compile Go Binary for Linux">
    On your local machine or CI runner, build a stripped, production-optimized standalone static binary:

    ```bash
    # Cross-compile for 64-bit Linux AMD64
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o gin-api main.go
    ```
  </Step>

  <Step step={2} title="Transfer Binary and Environment File to VPS">
    ```bash
    # Create application directory on VPS
    sudo mkdir -p /var/www/go-gin-api
    sudo chown -R $USER:$USER /var/www/go-gin-api

    # Copy binary to VPS
    scp ./gin-api user@vps-ip:/var/www/go-gin-api/
    chmod +x /var/www/go-gin-api/gin-api
    ```

    Create `/var/www/go-gin-api/.env`:
    ```ini
    GIN_MODE=release
    PORT=8080
    DATABASE_URL=postgres://user:pass@localhost:5432/production_db
    ```
  </Step>

  <Step step={3} title="Create Systemd Service Unit">
    Create `/etc/systemd/system/gin-api.service`:

    ```ini
    [Unit]
    Description=Go Gin Production API Service
    After=network.target postgresql.service

    [Service]
    Type=simple
    User=www-data
    Group=www-data
    WorkingDirectory=/var/www/go-gin-api
    ExecStart=/var/www/go-gin-api/gin-api
    EnvironmentFile=/var/www/go-gin-api/.env
    Restart=always
    RestartSec=5s

    # Security Sandboxing
    NoNewPrivileges=true
    ProtectSystem=full

    [Install]
    WantedBy=multi-user.target
    ```

    Enable and start service:
    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable --now gin-api
    sudo systemctl status gin-api
    ```
  </Step>

  <Step step={4} title="Configure Nginx Reverse Proxy">
    Create `/etc/nginx/sites-available/gin.example.com.conf`:

    ```nginx
    server {
        listen 80;
        listen [::]:80;
        server_name gin.example.com;

        location / {
            proxy_pass http://127.0.0.1:8080;
            proxy_http_version 1.1;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```

    Enable and issue SSL:
    ```bash
    sudo ln -s /etc/nginx/sites-available/gin.example.com.conf /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
    sudo certbot --nginx -d gin.example.com
    ```
  </Step>
</Steps>
