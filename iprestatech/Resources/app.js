var coords = [];
var scanditsdk = require("com.mirasense.scanditsdk");
var picker;
var apikey = "";

var _ = require('underscore')._;

var window = Titanium.UI.createWindow({  
		title:'Scanner un code mission',
		navBarHidden:true
});

var mainWindow = Titanium.UI.createWindow({  
    title:'iPrestatech',
    exitonclose: true
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
	

	apikey = Ti.App.Properties.getString('apikey', '');
	if(apikey && apikey != "") {
		var dw = require('ui/DashboardWindow');
    new dw().open();
	} else {
		var dw = require('ui/SessionWindow');
		new dw().open();
	}

}
