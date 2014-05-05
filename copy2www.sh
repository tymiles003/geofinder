#!/bin/bash
sudo cp -f favicon.ico index.html map.php settings.php tracker.php /var/www/geotracker
sudo chown www-data:www-data /var/www/geotracker/*
