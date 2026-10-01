---
title: "Deploy Native PHP Web Apps on Ubuntu VPS (PHP-FPM + Nginx + SSL)"
description: "Deploy and host native PHP 8.3/8.4 web applications on Ubuntu VPS with PHP-FPM, OPcache performance tuning, Nginx FastCGI socket, and SSL."
category: devops
topic: deployment
type: recipe
level: beginner
tags:
  - php
  - php-fpm
  - vps
  - nginx
  - lemp
  - deployment
platforms:
  - linux
  - all
tested:
  php: "8.3"
  nginx: "1.26"
lastVerified: "2026-10-01"
---

## Goal

Deploy a native PHP web application on an Ubuntu VPS using PHP 8.3 FastCGI Process Manager (PHP-FPM) and Nginx with OPcache enabled.

---

<Steps>
  <Step step={1} title="Install PHP 8.3 & Essential Extensions">
    ```bash
    sudo apt update
    sudo apt install -y php8.3-fpm php8.3-cli php8.3-mysql php8.3-curl \
                        php8.3-gd php8.3-mbstring php8.3-xml php8.3-zip \
                        php8.3-opcache nginx certbot python3-certbot-nginx
    ```
  </Step>

  <Step step={2} title="Tune php.ini for Production Performance">
    Edit `/etc/php/8.3/fpm/php.ini`:

    ```ini
    upload_max_filesize = 50M
    post_max_size = 50M
    memory_limit = 256M
    max_execution_time = 60
    expose_php = Off

    ; Enable Zend OPcache for pre-compiled bytecode caching
    opcache.enable=1
    opcache.memory_consumption=128
    opcache.interned_strings_buffer=16
    opcache.max_accelerated_files=10000
    opcache.validate_timestamps=0
    ```

    Restart PHP-FPM:
    ```bash
    sudo systemctl restart php8.3-fpm
    ```
  </Step>

  <Step step={3} title="Configure Web Files & Permissions">
    ```bash
    sudo mkdir -p /var/www/php-app
    sudo chown -R www-data:www-data /var/www/php-app
    sudo chmod -R 755 /var/www/php-app
    ```
  </Step>

  <Step step={4} title="Configure Nginx Server Block">
    Create `/etc/nginx/sites-available/php.example.com.conf`:

    ```nginx
    server {
        listen 80;
        listen [::]:80;
        server_name php.example.com;

        root /var/www/php-app;
        index index.php index.html;

        client_max_body_size 50M;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/run/php/php8.3-fpm.sock;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }

        location ~ /\.ht {
            deny all;
        }
    }
    ```

    Enable site and obtain SSL:
    ```bash
    sudo ln -s /etc/nginx/sites-available/php.example.com.conf /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
    sudo certbot --nginx -d php.example.com
    ```
  </Step>
</Steps>
