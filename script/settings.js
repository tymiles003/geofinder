const server = "http://www.geofinder.eu/";
const tracker = "tracker.php/";
const mail_header = "mailto:?subject=GeoFinder%20link&body="
const sms_header = "sms:?body="
const tracking_interval = 10000; 
const marker_file = "images/blue_marker.png";
const zoom = 16;

var fromProjection = new OpenLayers.Projection ( "EPSG:4326" );
var toProjection = new OpenLayers.Projection ( "EPSG:900913" );
