const server = "http://www.geofinder.eu/";
const tracker = "tracker.php/";
const mail_header = "mailto:?subject=GeoFinder%20link&body="
const sms_header = "sms:?body="
const tracking_interval = 10000; 
const marker_file = "images/blue_marker.png";
const zoom = 16;
const locating_str = "Locating...";
const track_start_str = "<i class=\"fa fa-road\"></i> Track!";
const track_stop_str = "<i class=\"fa fa-ban\"></i> Stop!";
const autocenter_off_str = "<i class=\"fa fa-globe\"></i>";
const autocenter_on_str = "<i class=\"fa fa-crosshairs\"></i>";
const email_link_str = "<i class=\"fa fa-send\"></i> Email tracker link";
const sms_link_str = "<i class=\"fa fa-share-alt\"></i> SMS tracker link";

var fromProjection = new OpenLayers.Projection ( "EPSG:4326" );
var toProjection = new OpenLayers.Projection ( "EPSG:900913" );
