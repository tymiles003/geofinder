<?php
function makeid($length = 5) {
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$id = '';
	for ($i = 0; $i < $length; $i++) {
		$id .= $characters[rand(0, strlen($characters) - 1)];
	}
	return $id;
}

	include "settings.php";
	$info['lat'] = round($_GET['lat'], $accuracy);
	$info['lon'] = round($_GET['lon'], $accuracy);
	$id = makeid();
	$fpath = $filePath . '-' . $id;
	$fh = fopen($fpath, 'w');
	fwrite($fh, serialize($info));
	fclose($fh);
	echo "<a href=http://balinkrowka.dlinkddns.com/map/map.php?key=" . $id . ">Link to your tracker</a>";
?>
