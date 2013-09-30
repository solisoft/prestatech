// Application Window Component Constructor
function CalendarWindow() {    
  var osname = Ti.Platform.osname;

  // Create our main window
  var win = Ti.UI.createWindow({
      backgroundColor: 'black',
      modal : true,
      exitOnClose : false
  });

  var view = Titanium.UI.createWebView({
    url: "http://somegec.appliserv.fr/api/planning?apikey="+Ti.App.Properties.getString('apikey'),
    height: Ti.UI.FILL,
    width: Ti.UI.HEIGHT
  });
  win.add(view);

  return win;
}

//make constructor function the public component interface
module.exports = CalendarWindow;
