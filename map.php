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
	<link rel="stylesheet" type="text/css" href="./style/style.css">
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
	$js_track_points_arr = json_encode($track_points_arr);
	echo "<script> var tp_array = " . $js_track_points_arr . "\n";
	echo "var tp_len = " . $arr_len . "; </script>\n";
	?>
	<div id="map" class="map_viewer">
	<script>
		var map = new OpenLayers.Map('map');
	</script>
	<div>
		<button id="toggle_autocenter_btn" class="button_medium button_passive">Autocenter</button>
	</div>
	<script>
		var show_id = 0;
		function show () {
			show_map(map, tp_array[tp_len][0], tp_array[tp_len][1]);
			add_track(map, tp_array);
			add_marker (map, tp_array[tp_len][0], tp_array[tp_len][1]);
		}
		show_id = setInterval ("show()", tracking_interval);
	</script>
</body>
</html>

