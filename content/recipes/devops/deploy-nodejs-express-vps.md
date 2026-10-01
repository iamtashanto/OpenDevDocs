---
title: "Deploy Node.js & Express API on Ubuntu VPS (PM2 + Nginx + SSL)"
description: "Deploy a Node.js Express/NestJS REST API server on Ubuntu VPS with PM2 cluster mode, automatic reboot recovery, Nginx reverse proxy, and SSL."
category: devops
topic: deployment
type: recipe
level: intermediate
tags:
  - nodejs
  - express
  - vps
  - pm2
  - nginx
  - api
platforms:
  - linux
  - all
tested:
  node: "22.x"
  express: "4.x"
  nginx: "1.26"
lastVerified: "2026-10-01"
---

## Goal

Deploy a production Node.js Express or NestJS API backend on an Ubuntu VPS with multi-core clustering, automated zero-downtime reloads, and secure Nginx proxying.

---

<Steps>
  <Step step={1} title="Clone Project and Install Dependencies on VPS">
    ```bash
    sudo mkdir -p /var/www/api-backend
    sudo chown -R $USER:$USER /var/www/api-backend
    cd /var/www/api-backend

    git clone https://github.com/your-username/api-backend.git .
    npm ci --only=production
    ```
  </Step>

  <Step step={2} title="Create PM2 Ecosystem Config">
    Create `/var/www/api-backend/ecosystem.config.cjs`:

    ```javascript
    module.exports = {
      apps: [
        {
          name: "api-backend",
          script: "./dist/index.js", // or index.js
          instances: "max",          // Cluster across all CPU cores
          exec_mode: "cluster",
          watch: false,
          max_memory_restart: "500M",
          env_production: {
            NODE_ENV: "production",
            PORT: 5000,
          },
        },
      ],
    };
    ```

    Start and persist PM2:
    ```bash
    pm2 start ecosystem.config.cjs --env production
    pm2 save
    pm2 startup
    ```
  </Step>

  <Step step={3} title="Configure Nginx Reverse Proxy">
    Create `/etc/nginx/sites-available/api.example.com.conf`:

    ```nginx
    server {
        listen 80;
        listen [::]:80;
        server_name api.example.com;

        # Max payload size for file uploads
        client_max_body_size 25M;

        location / {
            proxy_pass http://127.0.0.1:5000;
            proxy_http_version 1.1;

            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # Timeouts for heavy API queries
            proxy_connect_timeout 60s;
            proxy_read_timeout 60s;
        }
    }
    ```

    Enable and reload:
    ```bash
    sudo ln -s /etc/nginx/sites-available/api.example.com.conf /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
    sudo certbot --nginx -d api.example.com
    ```
  </Step>
</Steps>
