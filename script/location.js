const server = "http://www.geofinder.eu/";
const tracker = "tracker.php/";
const mail_header = "mailto:?subject=GeoFinder%20link&body="
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
	var map_img = document.getElementById("map");

	if (!navigator.geolocation){
		$("#info").html("<p>Geolocation is not supported by your browser</p>");
		return;
	}

	if (location_obtained) {
		var xmlHttp = null;
		var img = new Image();

		img.src = "http://staticmap.openstreetmap.de/staticmap.php?center=" + latitude + "," + longitude + "&zoom=14&size=300x300&markers=" + latitude + "," + longitude + ",ol-marker";
		map_img.appendChild(img);
		$("#info").html("Lat: " + latitude + " Lon:" + longitude);
		id = generate_id();
		track_location(latitude, longitude, id);
		tracker_link = "http://www.geofinder.eu/map.php?tid=" + id;
	} else {
		$("#info").html("Locating...");
	}

}

function toggle_tracking() {
	if ( !tracking_active ) {
		tracking_active = 1;
		get_location();
		tracking_active_id = setInterval ("get_location()", 10000);
		$("#toggle_tracking_btn").text("Stop tracking");
	} else {
		tracking_active = 0;
		clearInterval (tracking_active_id);
		$("#toggle_tracking_btn").text("Start tracking");
	}
}
