//Ti.Geolocation.preferredProvider = "gps";
/*
Ti.Geolocation.purpose = "user coordinates";
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
*/

var gpsProvider = Ti.Geolocation.Android.createLocationProvider({
    name: Ti.Geolocation.PROVIDER_GPS,
    minUpdateTime: 60, 
    minUpdateDistance: 0
});
Ti.Geolocation.Android.addLocationProvider(gpsProvider);

var gpsRule = Ti.Geolocation.Android.createLocationRule({
    provider: Ti.Geolocation.PROVIDER_GPS,
    // Updates should be accurate to 100m
    accuracy: 50,
    // Updates should be no older than 5m
    maxAge: 60000,
    // But  no more frequent than once per 10 seconds
    minAge: 30000
});
Ti.Geolocation.Android.addLocationRule(gpsRule);
Ti.Geolocation.Android.manualMode = true;


/*Ti.Geolocation.getCurrentPosition(function(e) {
  if (!e.success || e.error) {
    alert('error ' + JSON.stringify(e.error));
    return;
  }
  var longitude = e.coords.longitude;
  var latitude = e.coords.latitude;
  coords.push(longitude+"@"+latitude);
  if(Ti.Network.online && apikey != "") {
	 var url = "http://somegec.appliserv.fr/api/update_position.json?_method=POST";
	 var client = Ti.Network.createHTTPClient({
	  onload : function(e) {
	    coords = [];	    
	  },
	  onerror : function(e) {
	  },
	  timeout : 5000  // in milliseconds
	});
	client.open("POST", url);
	client.send("api="+apikey+"&data="+coords.join("|"));
  }
});
*/

Ti.Geolocation.addEventListener('location', function(e) {
  if (!e.success || e.error) {
  	Ti.API.info(e.error);
    //alert('error ' + JSON.stringify(e.error));
    return;
  }
  Ti.API.info(e.coords);
  var longitude = e.coords.longitude;
  var latitude = e.coords.latitude;
  var time= +new Date();
  coords.push(time+"@"+longitude+"@"+latitude);
  if(Ti.Network.online && apikey != "") {
	 	var url = "http://somegec.appliserv.fr/api/update_position.json?_method=POST";
	 	var client = Ti.Network.createHTTPClient({
	  	onload : function(e) {
	    	coords = [];	    
	  	},
	  	onerror : function(e) {
	  	},
	  	timeout : 5000  // in milliseconds
		});
		client.open("POST", url);
		client.send("api="+apikey+"&data="+coords.join("|"));
		//Ti.Geolocation.removeEventListener('location', function() {});
  }
});