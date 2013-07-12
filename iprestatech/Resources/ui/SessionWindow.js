// Application Window Component Constructor
function SessionWindow() {    
  var osname = Ti.Platform.osname;

  // Create our main window
  var self = Ti.UI.createWindow({
      // If no image desired, you can remove this line and set the backgroundColor instead.
      //backgroundImage : '/images/background.png',
      backgroundColor: 'white',
      modal : true,
      exitOnClose : true  // Android only
  });

  var view = Titanium.UI.createView({

  });
  
  self.add(view);

  var login = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color: '#336699',
    top: 20,
		width: 250, height: 60,
    hintText: 'Identifiant',
    keyboardType: Titanium.UI.KEYBOARD_EMAIL
  });

  view.add(login);	

  var pass = Ti.UI.createTextField({
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    color: '#336699',
    top: 80,
    width: 250, height: 60,
    hintText: 'Mot de passe',
    passwordMask: true
  });

  view.add(pass); 

  var button = Titanium.UI.createButton({
  	width:200,
  	height: 80,
    top: 160,
  	title: "Connexion"
  });

  button.addEventListener('click', function() {
  	var url = "http://somegec.appliserv.fr/api/auth.json?_method=POST";
    var client = Ti.Network.createHTTPClient({
      onload : function(e) {
        Ti.API.info("Received text: " + this.responseText);
        var json = JSON.parse(this.responseText);
        if(json["ok"]) {
          apikey = json["ok"];
          var dw = require('ui/DashboardWindow');
          Ti.App.Properties.setString('apikey', apikey);
          new dw().open();
          
        } else {
          button.show();
        }
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
    client.send("email="+login.getValue()+"&password="+pass.getValue());
    button.hide();

  });
  view.add(button);
  
  return self;
}

//make constructor function the public component interface
module.exports = SessionWindow;
