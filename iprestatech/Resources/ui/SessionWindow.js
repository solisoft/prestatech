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
    hintText: 'Identifiant'
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
  	
  });
  view.add(button);
  
  return self;
}

//make constructor function the public component interface
module.exports = SessionWindow;
