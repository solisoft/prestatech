
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
    backgroundColor: 'blue',
    fullscreen: false,
    activity : {
      onCreateOptionsMenu : function(e) {
        var menu = e.menu;
        var m1 = menu.add({ title : 'Rafraîchir les données' });
        m1.setIcon(Titanium.Android.R.drawable.ic_menu_refresh);
        m1.addEventListener('click', function(e) {
          refreshData();
          menu.close();
        });
      }
    }
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
