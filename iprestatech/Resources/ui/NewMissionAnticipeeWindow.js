
function NewMissionAnticipeeWindow() {    
  var osname = Ti.Platform.osname;
  var view;

  var refreshData = function() {
    
  }
  // Create our main window
  var win = Ti.UI.createWindow({
    title: 'Création d\'une mission anticipée',
    backgroundColor: 'white',
    fullscreen: false,
    layout: 'vertical'    
  });  
  
  view = Ti.UI.createView();
  var label = Ti.UI.createLabel({
    text: "Recherche d'un client :",
    top: 10
  });
  view.add(label);
  var search = Ti.UI.createTextField({
     width: 250,
     top: 50
  });
  var clients = Ti.UI.createLabel({
    text: "",
    top: 70
  });
  view.add(label);
  
  
  search.addEventListener("return", function() {
    clients.text = "Recherche en cours ... ";
    var url = "http://somegec.appliserv.fr/api/search_clients.json?search="+search.getValue()+"&api="+Ti.App.Properties.getString('apikey');
    //alert(url);
    var client = Ti.Network.createHTTPClient({
      onload : function(e) {
        win.close();
        clients.text = "";
        var json = JSON.parse(this.responseText);   
        var sc = require('ui/searchClientWindow');
        new sc(json).open();
      },
      onerror : function(e) {
        label.text = "Désolé, une erreur s'est produite !"
      },
      timeout : 5000  // in milliseconds
    });
    client.open("GET", url);    
    client.send();  
  });
  
  view.add(search);

  
  win.add(view);
  
  win.addEventListener('open', function() {
    //refreshData();
    search.focus();
  });


  return win;
}

//make constructor function the public component interface
module.exports = NewMissionAnticipeeWindow;
