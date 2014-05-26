var tid = "";
var tracker_link = "";
var tracking_active = 0;
var tracking_active_id = 0;
var location_obtained = 0;
var latitude;
var longitude;

function generate_id() {
	var id = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i = 0; i < 5; i++ )
		id += possible.charAt(Math.floor(Math.random() * possible.length));

	return id;
}

function get_location() {
	var options = {
		enableHighAccuracy: true,
		timeout: 6000,
		maximumAge: 1000
	};

	function success(position) {
		latitude  = position.coords.latitude;
		longitude = position.coords.longitude;
		location_obtained = 1; 
	};

	function error() {
		location_obtained = 0; 
	};

	show_location();
	navigator.geolocation.getCurrentPosition(success, error, options);
}

function track_location(lat, lon, id) {
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", server + tracker + "?lat=" + lat + "&lon=" + lon + "&tid=" + id, false );
	xmlHttp.send( null );
}

function show_location() {
	if (!navigator.geolocation){
		$("#info").html("<p>Geolocation is not supported by your browser</p>");
		return;
	}

	if (location_obtained) {
		show_map(map, latitude, longitude);
		track_location(latitude, longitude, tid);
		tracker_link = server + "map.php?tid=" + tid;
		$("#email_link_btn").slideDown();
		$("#sms_link_btn").slideDown();
		$("#map").show();
		$("#info").text("");
	} else {
		$("#info").text("Locating...");
	}

}

function show_map(map, lat, lon) {
	var fromProjection = new OpenLayers.Projection("EPSG:4326");
	var toProjection   = new OpenLayers.Projection("EPSG:900913");
	var osm_layer = new OpenLayers.Layer.OSM( "OpenLayers OSM");
	var position       = new OpenLayers.LonLat(lon, lat).transform( fromProjection, toProjection );
	map.addLayer(osm_layer);
	map.setCenter(position, zoom );

	var markers = new OpenLayers.Layer.Markers( "Markers" );
	map.addLayer(markers);

	var size = new OpenLayers.Size(21,25);
	var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
	var icon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png', size, offset);
	markers.addMarker(new OpenLayers.Marker(position ,icon));
}

function add_track(map, tp) {
	var fromProjection = new OpenLayers.Projection("EPSG:4326");
	var toProjection   = new OpenLayers.Projection("EPSG:900913");
	var track = new OpenLayers.Geometry.LineString();
	for (var i = 0; i < tp.length; i++) {
		var point = new OpenLayers.Geometry.Point( tp[i][1], tp[i][0] ).transform( fromProjection, toProjection );
		track.addComponent(point);
	}
	var feat = new OpenLayers.Feature.Vector(track);

	var styleMap = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults({
				fillOpacity:1,
				strokeWidth:"9",
				strokeColor:"blue"},
				OpenLayers.Feature.Vector.style["default"])
			);

	var track_layer = new OpenLayers.Layer.Vector("Track Layer", {styleMap: styleMap});
	track_layer.addFeatures(feat);
	map.addLayer(track_layer);
}

function toggle_tracking() {
	if ( !tracking_active ) {
		tracking_active = 1;
		tid = generate_id();
		get_location();
		tracking_active_id = setInterval ("get_location()", tracking_interval);
		$("#toggle_tracking_btn").text("Stop tracking");
	} else {
		tracking_active = 0;
		tid = "";
		location_obtained = 0;
		clearInterval (tracking_active_id);
		$("#toggle_tracking_btn").text("Start tracking");
		$("#email_link_btn").slideUp();
		$("#sms_link_btn").slideUp();
		$("#map").slideUp();
	}
}
