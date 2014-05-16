const server = "http://www.geofinder.eu/";
const tracker = "tracker.php/";

function generate_id() {
	var tid = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i = 0; i < 5; i++ )
		tid += possible.charAt(Math.floor(Math.random() * possible.length));

	return tid;
}

function show_location() {
	var options = {
		enableHighAccuracy: true,
		timeout: 6000,
		maximumAge: 1000
	};

	var info = document.getElementById("info");
	var map_img = document.getElementById("map");

	if (!navigator.geolocation){
		info.innerHTML = "<p>Geolocation is not supported by your browser</p>";
		return;
	}

	function success(position) {
		var latitude  = position.coords.latitude;
		var longitude = position.coords.longitude;
		var xmlHttp = null;
		var img = new Image();

		img.src = "http://staticmap.openstreetmap.de/staticmap.php?center=" + latitude + "," + longitude + "&zoom=14&size=300x300&markers=" + latitude + "," + longitude + ",ol-marker";
		map_img.appendChild(img);
		info.innerHTML = "Lat: " + latitude + " Lon:" + longitude;
		id = generate_id();
		track_location(latitude, longitude, id);
	};

	function error() {
		info.innerHTML = "Unable to retrieve your location";
	};

	info.innerHTML = "<p>Locating..</p>";
	navigator.geolocation.getCurrentPosition(success, error, options);
}

function track_location(lat, lon, id) {
	var tracker_div = document.getElementById("tracker");

	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", server + tracker + "?lat=" + lat + "&lon=" + lon + "&tid=" + id, false );
	xmlHttp.send( null );

	tracker_div.innerHTML = "<a href=http://www.geofinder.eu/map.php?tid=" + id + ">Link to your tracker</a>";
}

