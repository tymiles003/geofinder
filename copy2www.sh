#!/bin/bash
PREFIX=""
#zip -b . geofinder.zip *

sudo cp -f manifest.webapp index.html map.php settings.php tracker.php track_points.php /var/www/$PREFIX/

sudo cp -f images/favicon.ico /var/www/$PREFIX/images/
sudo cp -f images/blue_marker.png /var/www/$PREFIX/images/
sudo cp -f images/geofinder-128x128.png /var/www/$PREFIX/images/
sudo cp -f images/geofinder-16x16.png /var/www/$PREFIX/images/
sudo cp -f images/geofinder-256x256.png /var/www/$PREFIX/images/
sudo cp -f images/geofinder-32x32.png /var/www/$PREFIX/images/
sudo cp -f images/geofinder-60x60.png /var/www/$PREFIX/images/
sudo cp -f images/geofinder-90x90.png /var/www/$PREFIX/images/
sudo cp -f images/geofinder.svg /var/www/$PREFIX/images/

sudo cp -f script/location.js /var/www/$PREFIX/script/
sudo cp -f script/settings.js /var/www/$PREFIX/script/

sudo cp -f style/style.css /var/www/$PREFIX/style/

sudo chown -R www-data:www-data /var/www/$PREFIX/images/*
sudo chown -R www-data:www-data /var/www/$PREFIX/script/*
sudo chown -R www-data:www-data /var/www/$PREFIX/style/*
sudo chown -R www-data:www-data /var/www/$PREFIX/*.php
sudo chown -R www-data:www-data /var/www/$PREFIX/*.html
sudo chown -R www-data:www-data /var/www/$PREFIX/manifest.webapp
#sudo chown -R www-data:www-data /var/www/geofinder.zip
