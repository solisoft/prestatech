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
  if(Titanium.Network.online && apikey != "") {
	 var url = "http://somegec.appliserv.fr/api/update_position.json?_method=POST";
	 var client = Ti.Network.createHTTPClient({
	  onload : function(e) {
	    coords = "";
	    //alert("Coords sent");
	  },
	     // function called when an error occurs, including a timeout
	  onerror : function(e) {
	    //Ti.API.debug(e.error);
	    //alert("ERROR Coords sent");
	  },
	  timeout : 5000  // in milliseconds
	});
	// Prepare the connection.
	client.open("POST", url);
	//client.setRequestHeader("Content-Type", "application/json; charset=utf-8");
	// Send the request.
	client.send("api="+apikey+"&data="+coords);
  }
});