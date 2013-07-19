
function MissionWindow(missionID) {    
  var osname = Ti.Platform.osname;
  var view;

  var refreshData = function() {
    var url = "http://somegec.appliserv.fr/api/mission.json?id="+missionID+"&api="+Ti.App.Properties.getString('apikey');
    var client = Ti.Network.createHTTPClient({
      onload : function(e) {
      	var label = Ti.UI.createLabel({
      	  text:e.responseText,
      	});
      	view.add(label);
      },
      onerror : function(e) {
      },
      timeout : 5000  // in milliseconds
    });
    client.open("GET", url);    
    client.send();
  }

  // Create our main window
  var win = Ti.UI.createWindow({
    title: 'Détail de la mission',
    backgroundColor: 'white',
    fullscreen: false    
  });  
  
  view = Ti.UI.createView();
  win.add(view);
  win.addEventListener('open', function() {
    refreshData();
  }); 

  return win;
}

//make constructor function the public component interface
module.exports = MissionWindow;
