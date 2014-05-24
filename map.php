<!-- This file shows location on map. It has to be called with &tid=..... to pull info from correcponding location file -->
<html>
<head> <title>Location</title>
<script type="text/javascript" src="http://openlayers.org/api/OpenLayers.js"></script>
<script type="text/javascript" src="script/location.js"></script>
<script type="text/javascript" src="script/settings.js"></script>
</head>

<?php
	include "settings.php";
	$tid = $_GET['tid'];
	$loc_string = file_get_contents($filePath . '-' . $tid);
	$info = unserialize($loc_string);
	$lat = $info['lat'];
	$lon = $info['lon'];
        $timestamp = $info['timestamp'];
        $hdop = $info['hdop'];
        $altitude = $info['altitude'];
        $speed = $info['speed'];
        $bearing = $info['bearing'];
?>

<body>
	<?php echo $lat?>,<?php echo $lon?> </br>
	<?php echo $timestamp?></br>
	<?php echo $hdop?></br>
	<?php echo $altitude?> </br>
	<?php echo $speed?></br>
	<?php echo $bearing?></br>
	<?php $con=mysqli_connect("localhost", "tracker", "write", "geo");
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	$sql="SELECT latitude, longitude FROM location WHERE tid = '" . $tid . "';";
	$i = 0;
	if ($track_points = mysqli_query($con,$sql)) {
		while ($row = mysqli_fetch_array($track_points)):
			$latsql = $row['latitude'];
			$lonsql = $row['longitude'];
			$track_points_arr[$i][0] = $latsql;
			$track_points_arr[$i][1] = $lonsql;
			$i = $i + 1;
		endwhile;
	} else {
		echo "Error reading track: " . mysqli_error($con);
	}

	mysqli_close($con);
	?>
	<div id="map" style="width:100%; top: 1em; left: 0em; bottom: 0; right: 0em; position: fixed;">
	<script>
		show_map(<?php echo $track_points_arr[0][0] ?>, <?php echo $track_points_arr[0][1] ?>);
	</script>
</body>
</html>

