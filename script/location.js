function generate_id() {
	var key = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i = 0; i < 5; i++ )
		key += possible.charAt(Math.floor(Math.random() * possible.length));

	return key;
}

function geo_show_location() {
	var options = {
		enableHighAccuracy: false,
		timeout: 5000,
		maximumAge: 0
	};

	var tracker = "http://geofinder.eu/tracker.php";
	var output = document.getElementById("out");

	if (!navigator.geolocation){
		output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
		return;
	}

	function success(position) {
		id = generate_id();
		var latitude  = position.coords.latitude;
		var longitude = position.coords.longitude;
		var xmlHttp = null;
		var img = new Image();

		xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", tracker + "?lat=" + latitude + "&lon=" + longitude + "&key=" + id, false );
		xmlHttp.send( null );

		output.innerHTML = "<a href=http://geofinder.eu/map.php?key=" + id + ">Link to your tracker</a>";

		img.src = "http://staticmap.openstreetmap.de/staticmap.php?center=" + latitude + "," + longitude + "&zoom=14&size=300x300&markers=" + latitude + "," + longitude + ",ol-marker";
		output.appendChild(img);
	};

	function error() {
		output.innerHTML = "Unable to retrieve your location";
	};

	output.innerHTML = "<p>Locating..</p>";
	navigator.geolocation.getCurrentPosition(success, error, options);
}

