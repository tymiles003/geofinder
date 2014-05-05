<!-- This file writes location to server file. It should be called with:
	&lat=.....
	&lon=.....
	&key=.....
-->

<?php
	include "settings.php";
	$info['lat'] = round($_GET['lat'], $accuracy);
	$info['lon'] = round($_GET['lon'], $accuracy);
	$key = $_GET['key'];
	$fpath = $filePath . '-' . $key;
	$fh = fopen($fpath, 'w');
	fwrite($fh, serialize($info));
	fclose($fh);
?>
