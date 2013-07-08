Titanium.Geolocation.preferredProvider = "gps";
Titanium.Geolocation.purpose = "user coordinates";
Titanium.Geolocation.distanceFilter = 10;

Titanium.Geolocation.getCurrentPosition(function(e) {
  if (!e.success || e.error) {
    alert('error ' + JSON.stringify(e.error));
    return;
  }
  var longitude = e.coords.longitude;
  var latitude = e.coords.latitude;
  coords += "|"+longitude+"@"+latitude;
  if(Titanium.Network.online) {
	 var url = "http://solisoft.net";
	 var client = Ti.Network.createHTTPClient({
	  onload : function(e) {
	    Ti.API.info("Received text: " + this.responseText);
	    coords = "";
	  },
	     // function called when an error occurs, including a timeout
	  onerror : function(e) {
	    Ti.API.debug(e.error);
	  },
	  timeout : 5000  // in milliseconds
	});
	// Prepare the connection.
	client.open("POST", url);
	// Send the request.
    client.send("data="+coords);
  }
});