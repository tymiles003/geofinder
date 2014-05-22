#!/bin/bash
ICON_FILE=geofinder
SIZE_LIST="16x16 30x30 60x60 90x90 128x128 256x256"
for size in $SIZE_LIST; do
	convert -density 200x200 -background none -gravity center $ICON_FILE'.svg' -geometry $size -extent $size png32:$ICON_FILE'-'$size'.png';
done;
convert geofinder-16x16.png -extent 16x16 -geometry 16x16 favicon.ico

