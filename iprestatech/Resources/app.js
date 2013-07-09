/*
 * HTML Application Template:
 * A basic starting point for your application.  Mostly a blank canvas with a web view.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

var coords = "";
var test = "olivier_the_boss"
var scanditsdk = require("com.mirasense.scanditsdk");
var picker;
var apikey = "";
var window = Titanium.UI.createWindow({  
		title:'Scandit SDK',
		navBarHidden:true
});

var openScanner = function() {
	// Instantiate the Scandit SDK Barcode Picker view
	picker = scanditsdk.createView({
		width:"100%",
		height:"100%"
	});
	// Initialize the barcode picker, remember to paste your own app key here.
	picker.init("of5PyuecEeKfNaSozOznICdMoDG3AeCrp04WBzA9Q6s", 0);


	picker.showSearchBar(true);
	// add a tool bar at the bottom of the scan view with a cancel button (iphone/ipad only)
	picker.showToolBar(true);

	// Set callback functions for when scanning succeedes and for when the 
	// scanning is canceled.
	picker.setSuccessCallback(function(e) {
		alert("success (" + e.symbology + "): " + e.barcode);
		closeScanner();
	});
	picker.setCancelCallback(function(e) {
		closeScanner();
	});

	window.add(picker);
	window.addEventListener('open', function(e) {
		// Adjust to the current orientation.
		// since window.orientation returns 'undefined' on ios devices 
		// we are using Ti.UI.orientation (which is deprecated and no longer 
	    // working on Android devices.)
		if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
    		picker.setOrientation(Ti.UI.orientation);
		}	
		else {
			picker.setOrientation(window.orientation);
		}
		
		picker.setSize(Ti.Platform.displayCaps.platformWidth, 
					   Ti.Platform.displayCaps.platformHeight);
		picker.startScanning();		// startScanning() has to be called after the window is opened. 
	});
	window.open();
}

// Stops the scanner, removes it from the window and closes the latter.
var closeScanner = function() {
	if (picker != null) {
		picker.stopScanning();
		window.remove(picker);
	}
	window.close();
}

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later'); 
} else {
	//require and open top level UI component
	Titanium.API.info('Launching webservice');
	var SECONDS = 60; // every 10 seconds
	var intent = Titanium.Android.createServiceIntent({
  		url: 'posservice.js'
	});
	intent.putExtra('interval', SECONDS * 1000); // Needs to be milliseconds
	Titanium.Android.startService(intent);
	
	//alert('Launching webservice');
	
	// create start scanner button
	//ApplicationWindow.add(button);
	apikey = Ti.App.Properties.getString('apikey', '');
	if(apikey && apikey != "") {
		var ApplicationWindow = require('ui/ApplicationWindow');
    new ApplicationWindow().open();
	} else {
		var SessionWindow = require('ui/SessionWindow');
		new SessionWindow().open();	
	}
	
	//openScanner();
}
