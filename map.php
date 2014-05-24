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
	<div id="map" style="width:100%; top: 1em; left: 0em; bottom: 0; right: 0em; position: fixed;">
	<script>
		show_map(<?php echo $lat ?>, <?php echo $lon ?>);
	</script>
</body>
</html>

