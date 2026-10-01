---
title: "Deploy WordPress on Ubuntu VPS (LEMP + FastCGI Micro-Cache + SSL)"
description: "Host WordPress on Ubuntu VPS using high-performance LEMP stack, MariaDB, PHP 8.3-FPM, Nginx FastCGI micro-caching, and SSL."
category: devops
topic: deployment
type: recipe
level: intermediate
tags:
  - wordpress
  - lemp
  - php
  - mariadb
  - nginx
  - caching
platforms:
  - linux
  - all
tested:
  wordpress: "6.x"
  php: "8.3"
  nginx: "1.26"
lastVerified: "2026-10-01"
---

## Goal

Deploy a high-speed WordPress website on an Ubuntu VPS capable of handling heavy traffic spikes using Nginx FastCGI micro-caching, PHP 8.3-FPM, and MariaDB.

---

<Steps>
  <Step step={1} title="Install MariaDB, PHP 8.3, and Nginx">
    ```bash
    sudo apt update
    sudo apt install -y nginx mariadb-server php8.3-fpm php8.3-mysql php8.3-curl \
                        php8.3-gd php8.3-mbstring php8.3-xml php8.3-zip php8.3-imagick \
                        certbot python3-certbot-nginx curl
    ```
  </Step>

  <Step step={2} title="Create WordPress Database & User">
    Open MySQL shell:
    ```bash
    sudo mysql
    ```

    Execute database setup queries:
    ```sql
    CREATE DATABASE wp_database DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'StrongSecretPassword123!';
    GRANT ALL ON wp_database.* TO 'wp_user'@'localhost';
    FLUSH PRIVILEGES;
    EXIT;
    ```
  </Step>

  <Step step={3} title="Download WordPress Core Files">
    ```bash
    sudo mkdir -p /var/www/wordpress
    cd /tmp
    curl -O https://wordpress.org/latest.tar.gz
    tar -xzvf latest.tar.gz
    sudo cp -a wordpress/. /var/www/wordpress/

    # Set correct ownership for uploads and updates
    sudo chown -R www-data:www-data /var/www/wordpress
    sudo find /var/www/wordpress/ -type d -exec chmod 755 {} \;
    sudo find /var/www/wordpress/ -type f -exec chmod 644 {} \;
    ```
  </Step>

  <Step step={4} title="Configure Nginx with FastCGI Micro-Caching">
    Create `/etc/nginx/sites-available/wp.example.com.conf`:

    ```nginx
    # Define cache bypass logic based on cookies and request methods
    map $http_cookie $skip_cache {
        default 0;
        ~*comment_author 1;
        ~*wordpress_logged_in 1;
        ~*woocommerce_items_in_cart 1;
    }

    server {
        listen 80;
        listen [::]:80;
        server_name wp.example.com;

        root /var/www/wordpress;
        index index.php index.html;

        client_max_body_size 100M;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/run/php/php8.3-fpm.sock;

            # Bypass cache for POST requests or logged-in users
            fastcgi_cache_bypass $skip_cache;
            fastcgi_no_cache $skip_cache;

            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        }

        # Cache static media files
        location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp|svg|woff2?)$ {
            expires 30d;
            add_header Cache-Control "public, no-transform";
            access_log off;
        }

        # Block access to sensitive files
        location ~* /(?:uploads|files)/.*\.php$ {
            deny all;
        }
    }
    ```

    Enable site and obtain SSL:
    ```bash
    sudo ln -s /etc/nginx/sites-available/wp.example.com.conf /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
    sudo certbot --nginx -d wp.example.com
    ```
  </Step>
</Steps>

---

## Verification

Open `https://wp.example.com` in your browser to complete the 5-minute WordPress installation wizard.
