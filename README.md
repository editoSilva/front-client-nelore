# Ecme - The Ultimate React, Vite & TypeScript Web Template

Ecme is a modern and responsive admin dashboard template built with React and TypeScript. Designed to provide a highly customizable and easy-to-use platform for building admin interfaces, it includes a variety of reusable components, pre-designed pages, and dynamic features. 

This template is perfect for developing dashboards, web applications, CRM systems, e-commerce backends, and more. Whether you're building a small-scale admin panel or a large-scale enterprise application, Ecme is designed to be flexible and scalable.

Key Features:
- **Responsive Layout**: Optimized for all screen sizes and devices.
- **Dark/Light Mode**: Easily switch between light and dark themes.
- **Configurable Themes**: Personalize colors, layouts, and more to fit your needs.
- **Built with React + TypeScript**: Ensures robust type-checking and fast development.
- **Multi-Locale Support**: Easily add and manage multiple languages.
- **RTL Support**: Full Right-to-Left support for languages like Arabic or Hebrew.
- **Tailwind Component-Based Architecture**: Reusable components to streamline your development process.
- **API Ready**: Simple integration with any RESTful API.

---
### Demo
Check out the [Live Demo](https://ecme-react.themenate.net/) to explore the template in action.


### Guide
Please visit our [Online documentation](https://ecme-react.themenate.net/guide/documentation/introduction) for detailed guides, setup instructions, and customization options.

# front-client-nelore
# front-client-nelore


v20.9.0


#!/bin/bash

set -e  # Stop the script if any command fails

echo "🔄 Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo "📥 Installing Nginx..."
sudo apt install -y nginx
sudo systemctl enable --now nginx

echo "📥 Installing PHP 8.3 and required extensions..."
sudo add-apt-repository -y ppa:ondrej/php
sudo apt update
sudo apt install -y php8.3-fpm php8.3-mysql php8.3-xml php8.3-gd php8.3-curl php8.3-zip php8.3-mbstring php8.3-bcmath php8.3-redis php8.3-intl php8.3-cli

echo "📥 Installing MySQL..."
sudo apt install -y mysql-server
sudo systemctl enable --now mysql

echo "🔧 Configuring MySQL..."
sudo mysql -e "CREATE DATABASE my_database DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;"
sudo mysql -e "CREATE USER 'nelore'@'localhost' IDENTIFIED BY 'my_password';"
sudo mysql -e "GRANT ALL PRIVILEGES ON my_database.* TO 'nelore'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

echo "📥 Installing Redis..."
sudo apt install -y redis-server
sudo systemctl enable --now redis

echo "🔧 Configuring Nginx for PHP..."
sudo tee /etc/nginx/sites-available/default > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    root /var/www/html;
    index index.php index.html index.htm;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location ~ \.php\$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }
}
EOF

sudo nginx -t && sudo systemctl restart nginx

echo "✅ Installation completed successfully!"
