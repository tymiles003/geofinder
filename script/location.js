var tracker_link = "";
var tracking_active = 0;
var tracking_active_id = 0;
var location_obtained = 0;
var latitude;
var longitude;

function generate_id() {
	var tid = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i = 0; i < 5; i++ )
		tid += possible.charAt(Math.floor(Math.random() * possible.length));

	return tid;
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
		show_map(latitude, longitude);
		id = generate_id();
		track_location(latitude, longitude, id);
		tracker_link = server + "map.php?tid=" + id;
		$("#tracker_link_btn").slideDown();
	} else {
		$("#info").text("Locating...");
	}

}
function show_map(lat, lon) {
	var map = new OpenLayers.Map('map');
	var osm_layer = new OpenLayers.Layer.OSM( "OpenLayers OSM");
	var fromProjection = new OpenLayers.Projection("EPSG:4326");
	var toProjection   = new OpenLayers.Projection("EPSG:900913");
	var position       = new OpenLayers.LonLat(lon, lat).transform( fromProjection, toProjection );
	var zoom           = 14;
	map.addLayer(osm_layer);
	map.setCenter(position, zoom );
}

function toggle_tracking() {
	if ( !tracking_active ) {
		tracking_active = 1;
		get_location();
		tracking_active_id = setInterval ("get_location()", tracking_interval);
		$("#toggle_tracking_btn").text("Stop tracking");
	} else {
		tracking_active = 0;
		location_obtained = 0;
		clearInterval (tracking_active_id);
		$("#toggle_tracking_btn").text("Start tracking");
		$("#tracker_link_btn").slideUp();
	}
}
