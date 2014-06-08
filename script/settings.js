const server = "http://www.geofinder.eu/";
const tracker = "tracker.php/";
const mail_header = "mailto:?subject=GeoFinder%20link&body="
const sms_header = "sms:?body="
const tracking_interval = 10000; 
const marker_file = "images/blue_marker.png";
const zoom = 16;
const locating_str = "Locating...";
const track_start_str = "Track!";
const track_stop_str = "Stop!";
const email_link_str = "Email tracker link";
const sms_link_str = "SMS tracker link";

var fromProjection = new OpenLayers.Projection ( "EPSG:4326" );
var toProjection = new OpenLayers.Projection ( "EPSG:900913" );
