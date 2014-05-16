<!-- This file shows location on map. It has to be called with &tid=..... to pull info from correcponding location file -->
<html>
<head> <title>Location</title> </head>

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
	<img src= "http://staticmap.openstreetmap.de/staticmap.php?center=<?php echo $info['lat']?>,<?php echo $info['lon']?>&zoom=14&size=800x600&markers=<?php echo $info['lat']?>,<?php echo $info['lon']?>,ol-marker" >
</body>
</html>

