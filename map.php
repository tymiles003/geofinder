<html>
<head> <title>Location</title>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript" src="http://openlayers.org/api/OpenLayers.js"></script>
<script type="text/javascript" src="script/location.js"></script>
<script type="text/javascript" src="script/settings.js"></script>
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
		var show_id = 0;
		function get_track_points() {
		    $.ajax({
			url: "track_points.php",
			data: "tid=" + tid,
			dataType: "json",
			success: function(response) {
				track_points = response;
			}
		    });
		}
		function show () {
			var l;
			get_track_points();
			l = track_points.length - 1;
			if (l > 0) {
				if (autocenter == 1) {
					show_map(map, track_points[l][0], track_points[l][1]);
				}
				add_track (map, track_points);
				add_marker (map, track_points[l][0], track_points[l][1]);
			}
		}
		show();
		show_id = setInterval ("show()", tracking_interval);
		$("#toggle_autocenter_btn").click(function(){
			toggle_autocenter();
			$("#toggle_autocenter_btn").toggleClass("button_on button_active");
		});
	</script>
</body>
</html>

