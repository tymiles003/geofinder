<!-- This file writes location to server file. It should be called with:
	&lat=.....
	&lon=.....
	&key=.....
-->

<?php
	include "settings.php";
	$info['timestamp'] = $_GET['timestamp'];
	$lat = round($_GET['lat'], $accuracy);
	$info['lat'] = $lat;
	$lon = round($_GET['lon'], $accuracy);
	$info['lot'] = $lot;
	$info['lon'] = round($_GET['lon'], $accuracy);
	$info['hdop'] = $_GET['hdop'];
	$info['altitude'] = $_GET['altitude'];
	$info['speed'] = $_GET['speed'];
	$info['bearing'] = $_GET['bearing'];
	$key = $_GET['key'];
	$fpath = $filePath . '-' . $key;
	$fh = fopen($fpath, 'w');
	fwrite($fh, serialize($info));
	fclose($fh);

	$con=mysqli_connect("localhost", "tracker", "write", "geo");
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$sql="INSERT INTO location (timestamp, latitude, longitude) VALUES ( NOW()," . $lat . "," . $lon . ");";

	if (mysqli_query($con,$sql)) {
		echo "Location written";
	} else {
		echo "Error writing location: " . mysqli_error($con);
	}

	mysqli_close($con);
?>
