var tid = "";
var tracker_link = "";
var tracking_active = 0;
var locate_id = 0;
var location_obtained = 0;
var latitude;
var longitude;
var track_points = [];
var markers = new OpenLayers.Layer.Markers( "Markers" );
var marker;

function generate_id() {
	var id = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i = 0; i < 5; i++ )
		id += possible.charAt(Math.floor(Math.random() * possible.length));

	return id;
}

function find_location() {
	var options = {
		enableHighAccuracy: true,
		timeout: 6000,
		maximumAge: 1000
	};

	function success(position) {
		latitude  = position.coords.latitude;
		longitude = position.coords.longitude;
		location_obtained = 1; 
		track_points.push([ latitude, longitude ]);
	};

	function error() {
		location_obtained = 0; 
	};

	navigator.geolocation.getCurrentPosition(success, error, options);
}

function locate() {
	find_location();
	show_location();
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

	if (location_obtained == 1)  {
		show_map(map, latitude, longitude);
		add_marker(map, latitude, longitude);
		add_track(map, track_points);
		if (tracking_active == 1) {
			track_location(latitude, longitude, tid);
		}
		$("#info").text("");
	} else {
		$("#info").text (locating_str);
	}

}

function add_marker (map, lat, lon) {
	map.addLayer (markers);
	var marker_size = new OpenLayers.Size (45, 57);
	var offset = new OpenLayers.Pixel (-(marker_size.w/2), -marker_size.h);
	var icon = new OpenLayers.Icon (marker_file, marker_size, offset);
	var position  = new OpenLayers.LonLat (lon, lat).transform (fromProjection, toProjection);
	if (marker) {
		markers.removeMarker (marker); 
	}
	marker = new OpenLayers.Marker (position, icon);
	markers.addMarker(marker);
}

function show_map(map, lat, lon) {
	var osm_layer = new OpenLayers.Layer.OSM( "OpenLayers OSM");
	var position       = new OpenLayers.LonLat(lon, lat).transform( fromProjection, toProjection );
	map.addLayer(osm_layer);
	map.setCenter(position, zoom );
}

function add_track(map, tp) {
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
	if ( tracking_active == 0) {
		tracking_active = 1;
		tid = generate_id();
		tracker_link = server + "map.php?tid=" + tid;
		$("#toggle_tracking_btn").text(track_stop_str);
	} else { 
		tracking_active = 0;
		tid = "";
		location_obtained = 0;
		$("#toggle_tracking_btn").text(track_start_str);
	}
}

function init_locating () {
	locate();
	locate_id = setInterval ("locate()", tracking_interval);
}
