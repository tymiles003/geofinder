#!/bin/bash
zip -b . geofinder.zip *

sudo cp -f geofinder.zip manifest.webapp index.html map.php settings.php tracker.php /var/www/geofinder.eu/
sudo cp -f icons/* /var/www/geofinder.eu/icons/
sudo chown -R www-data:www-data /var/www/geofinder.eu/*
