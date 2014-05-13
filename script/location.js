const server = "http://www.geofinder.eu/";
const tracker = "tracker.php/";

function generate_id() {
	var key = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i = 0; i < 5; i++ )
		key += possible.charAt(Math.floor(Math.random() * possible.length));

	return key;
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
	};

	function error() {
		info.innerHTML = "Unable to retrieve your location";
	};

	info.innerHTML = "<p>Locating..</p>";
	navigator.geolocation.getCurrentPosition(success, error, options);
}

function track_location() {
	var tracker_div = document.getElementById("tracker");

	id = generate_id();
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", server + tracker + "?lat=" + latitude + "&lon=" + longitude + "&key=" + id, false );
	alert( server + tracker + "?lat=" + latitude + "&lon=" + longitude + "&key=" + id );
	xmlHttp.send( null );

	tracker_div.innerHTML = "<a href=http://www.geofinder.eu/map.php?key=" + id + ">Link to your tracker</a>";
}

