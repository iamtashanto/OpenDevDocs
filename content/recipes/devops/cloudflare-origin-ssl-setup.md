---
title: "Setup Cloudflare Origin CA SSL & Full (Strict) Mode on Nginx"
description: "Step-by-step setup of 15-year Cloudflare Origin CA certificates on Nginx, enabling Full (Strict) SSL encryption, and locking down UFW firewall to Cloudflare IPs."
category: devops
topic: cloudflare
type: recipe
level: intermediate
tags:
  - cloudflare
  - ssl
  - tls
  - nginx
  - origin-ca
  - ufw
platforms:
  - linux
  - all
tested:
  nginx: "1.26"
  cloudflare: "current"
lastVerified: "2026-10-01"
---

## Goal

Configure end-to-end encrypted HTTPS using free 15-year Cloudflare Origin CA certificates on Nginx, enable **Full (Strict)** SSL mode in Cloudflare, and lock down the VPS firewall so all public traffic MUST route through Cloudflare edge proxy.

---

<Steps>
  <Step step={1} title="Generate Origin Certificate in Cloudflare">
    1. Log into your Cloudflare Dashboard.
    2. Go to **SSL/TLS -> Origin Server -> Create Certificate**.
    3. Hostnames: `example.com`, `*.example.com`.
    4. Certificate Validity: **15 years**.
    5. Click **Create** and leave the page open to copy both the **Origin Certificate** and **Private Key**.
  </Step>

  <Step step={2} title="Install Certificates on Ubuntu VPS">
    ```bash
    # Create directory for Cloudflare certs
    sudo mkdir -p /etc/ssl/cloudflare

    # Save Certificate to /etc/ssl/cloudflare/origin.pem
    sudo nano /etc/ssl/cloudflare/origin.pem

    # Save Private Key to /etc/ssl/cloudflare/origin.key
    sudo nano /etc/ssl/cloudflare/origin.key

    # Lock down file permissions
    sudo chmod 600 /etc/ssl/cloudflare/origin.key
    sudo chmod 644 /etc/ssl/cloudflare/origin.pem
    ```
  </Step>

  <Step step={3} title="Configure Nginx Server Block">
    Edit your site configuration `/etc/nginx/sites-available/example.com.conf`:

    ```nginx
    server {
        listen 80;
        listen [::]:80;
        server_name example.com www.example.com;
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl;
        listen [::]:443 ssl;
        http2 on;

        server_name example.com www.example.com;

        # Cloudflare Origin CA Certificates
        ssl_certificate /etc/ssl/cloudflare/origin.pem;
        ssl_certificate_key /etc/ssl/cloudflare/origin.key;

        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $http_cf_connecting_ip;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```

    Reload Nginx:
    ```bash
    sudo nginx -t && sudo systemctl reload nginx
    ```
  </Step>

  <Step step={4} title="Set Cloudflare Mode to Full (Strict)">
    In Cloudflare Dashboard:
    - Go to **SSL/TLS -> Overview**.
    - Select **Full (Strict)**.
  </Step>

  <Step step={5} title="Lock Down VPS Firewall to Cloudflare IPs Only">
    Prevent attackers from bypassing Cloudflare by restricting ports 80 and 443 to Cloudflare's published IP ranges in UFW:

    ```bash
    # Allow SSH first!
    sudo ufw allow 22/tcp

    # Allow Cloudflare IPv4 ranges
    for ip in $(curl -s https://www.cloudflare.com/ips-v4); do
        sudo ufw allow proto tcp from $ip to any port 80,443
    done

    # Enable firewall
    sudo ufw enable
    ```
  </Step>
</Steps>
