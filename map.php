<-- This file shows location on map. It has to be called with &key=..... to pull info from correcponding location fie -->
<html>
<head> <title>Location</title> </head>

<?php
	include "settings.php";
	$key = $_GET['key'];
	$loc_string = file_get_contents($filePath . '-' . $key);
	$info = unserialize($loc_string);
	$lat = $info['lat'];
	$lon = $info['lon'];
?>

<body>
	<?php echo $info['lat']?>,<?php echo $info['lon']?> </br>
	<img src= "http://staticmap.openstreetmap.de/staticmap.php?center=<?php echo $info['lat']?>,<?php echo $info['lon']?>&zoom=14&size=800x600&markers=<?php echo $info['lat']?>,<?php echo $info['lon']?>,ol-marker" >
</body>
</html>

