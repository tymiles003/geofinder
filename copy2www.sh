#!/bin/bash
zip -b . geofinder.zip *

sudo cp -f geofinder.zip manifest.webapp index.html map.php settings.php tracker.php /var/www/
sudo cp -f icons/* /var/www/icons/
sudo cp -f script/* /var/www/script/
sudo chown -R www-data:www-data /var/www/script/*
sudo chown -R www-data:www-data /var/www/icons/*
sudo chown -R www-data:www-data /var/www/*.php
sudo chown -R www-data:www-data /var/www/*.html
sudo chown -R www-data:www-data /var/www/manifest.webapp
sudo chown -R www-data:www-data /var/www/geofinder.zip
