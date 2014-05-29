#!/bin/bash
#zip -b . geofinder.zip *

sudo cp -f manifest.webapp index.html map.php settings.php tracker.php /var/www/

sudo cp -f images/favicon.ico /var/www/images/
sudo cp -f images/geofinder-128x128.png /var/www/images/
sudo cp -f images/geofinder-16x16.png /var/www/images/
sudo cp -f images/geofinder-256x256.png /var/www/images/
sudo cp -f images/geofinder-32x32.png /var/www/images/
sudo cp -f images/geofinder-60x60.png /var/www/images/
sudo cp -f images/geofinder-90x90.png /var/www/images/
sudo cp -f images/geofinder.svg /var/www/images/

sudo cp -f script/location.js /var/www/script/
sudo cp -f script/settings.js /var/www/script/

sudo cp -f style/style.css /var/www/style/

sudo chown -R www-data:www-data /var/www/images/*
sudo chown -R www-data:www-data /var/www/script/*
sudo chown -R www-data:www-data /var/www/style/*
sudo chown -R www-data:www-data /var/www/*.php
sudo chown -R www-data:www-data /var/www/*.html
sudo chown -R www-data:www-data /var/www/manifest.webapp
#sudo chown -R www-data:www-data /var/www/geofinder.zip
