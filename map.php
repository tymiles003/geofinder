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
?>

<body>
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
		$arr_len = $i - 1;
	} else {
		echo "Error reading track: " . mysqli_error($con);
	}

	mysqli_close($con);
$js_array = json_encode($track_points_arr);
echo "<script> var javascript_array = ". $js_array . ";</script>\n";
	?>
	<div id="map" style="width:100%; top: 1em; left: 0em; bottom: 0; right: 0em; position: fixed;">
	<script>
		show_map(<?php echo $track_points_arr[$arr_len][0] ?>, <?php echo $track_points_arr[$arr_len][1] ?>);
	</script>
</body>
</html>

