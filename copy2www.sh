#!/bin/bash
sudo cp -f manifest.webapp index.html map.php settings.php tracker.php /var/www/geofinder.eu/
sudo cp -f icons/favicon.ico /var/www/geofinder.eu/icons/
sudo chown -R www-data:www-data /var/www/geofinder.eu/*
