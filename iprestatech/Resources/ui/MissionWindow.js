
function MissionWindow(missionID) {    
  var osname = Ti.Platform.osname;
  var view;
  var scrollView = Ti.UI.createScrollView({
    contentWidth: 'auto',
    contentHeight: 'auto'
  });
  
  var refreshData = function() {
    var url = "http://somegec.appliserv.fr/api/mission.json?id="+missionID+"&api="+Ti.App.Properties.getString('apikey');
    var client = Ti.Network.createHTTPClient({
      onload : function(e) {
      	var json = JSON.parse(this.responseText);
      	
      	// Ici ajouter les infos dynamiquement
      	var label = Ti.UI.createLabel({ title: "Information Client" });
      	win.add(label);
      	label = Ti.UI.createLabel({ title: json.nom, color: "#000000" });
        win.add(label);
        
        label = Ti.UI.createLabel({ title: "Liste des suivis" });
        win.add(label);
        
        _.each(json.suivis, function(suivi) {
          label = Ti.UI.createLabel({ title: suivi });
          win.add(label);
        });
      	
      	var button1 = Titanium.UI.createButton({ title: 'Prise en charge' });
        button1.addEventListener('click',function(e) {
          var nw = require('ui/suiviWindow');
          new nw().open(missionID, 1);
        });
        view.add(button1);
        var button2 = Titanium.UI.createButton({ title: 'Validation et signature abonné' });
        button2.addEventListener('click',function(e) {
          var nw = require('ui/suiviWindow');
          new nw().open(missionID, 2);
        });
        view.add(button2);
        var button3 = Titanium.UI.createButton({ title: 'Valider et clore la mission' });
        button3.addEventListener('click',function(e) {
          var nw = require('ui/suiviWindow');
          new nw().open(missionID, 3);
        });
        view.add(button3);
        var button4 = Titanium.UI.createButton({ title: 'Ajouter un message' });
        button4.addEventListener('click',function(e) {
          var nw = require('ui/suiviWindow');
          new nw().open(missionID, 4);
        });
        view.add(button4);

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
  
  view = Ti.UI.createView({
    layout: 'vertical'   
  });
  scrollView.add(view);
  win.add(scrollView);
  
  win.addEventListener('open', function() {
    refreshData();
  }); 

  return win;
}

//make constructor function the public component interface
module.exports = MissionWindow;
