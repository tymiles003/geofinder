<!-- This file writes location to server file. It should be called with:
	&lat=.....
	&lon=.....
	&tid=.....
-->

<?php
	include "settings.php";
	$lat = round($_GET['lat'], $accuracy);
	$info['lat'] = $lat;
	$lon = round($_GET['lon'], $accuracy);
	$info['lon'] = $lon;
	$tid = $_GET['tid'];

	$con=mysqli_connect("localhost", "tracker", "write", "geo");
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$sql="INSERT INTO location (tid, timestamp, latitude, longitude) VALUES ('" . $tid . "', NOW()," . $lat . "," . $lon . ");";

	if (mysqli_query($con,$sql)) {
		echo "Location written";
	} else {
		echo "Error writing location: " . mysqli_error($con);
	}

	mysqli_close($con);
?>
