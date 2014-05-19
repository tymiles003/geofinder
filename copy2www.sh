#!/bin/bash
zip -b . geofinder.zip *

sudo cp -f geofinder.zip manifest.webapp index.html map.php settings.php tracker.php /var/www/
sudo cp -f images/* /var/www/images/
sudo cp -f script/* /var/www/script/
sudo cp -f style/* /var/www/style/
sudo chown -R www-data:www-data /var/www/images/*
sudo chown -R www-data:www-data /var/www/script/*
sudo chown -R www-data:www-data /var/www/style/*
sudo chown -R www-data:www-data /var/www/*.php
sudo chown -R www-data:www-data /var/www/*.html
sudo chown -R www-data:www-data /var/www/manifest.webapp
sudo chown -R www-data:www-data /var/www/geofinder.zip
