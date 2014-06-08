<html>
<head> <title>Location</title>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript" src="http://openlayers.org/api/OpenLayers.js"></script>
<script type="text/javascript" src="script/location.js"></script>
<script type="text/javascript" src="script/settings.js"></script>
<script type="text/javascript" src="script/viewer.js"></script>
<link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
</head>

<body>
	<link rel="stylesheet" type="text/css" href="./style/style.css">
	<div id="map" class="map_viewer">
	<script>
		var map = new OpenLayers.Map('map');
	</script>
	<div>
		<button id="toggle_autocenter_btn" class="button_small button_active">
			<i class="fa fa-crosshairs"></i>
		</button>
	</div>
	<script>
		<?php echo "tid = \"" . $_GET['tid'] . "\";\n"; ?>
		refresh_map();
		refresh_map_id = setInterval ("refresh_map()", tracking_interval);
		$("#toggle_autocenter_btn").click(function(){
			toggle_autocenter();
			show_viewer_map();
			$("#toggle_autocenter_btn").toggleClass("button_on button_active");
		});
	</script>
</body>
</html>

