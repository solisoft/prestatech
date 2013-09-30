
function MessageWindow() {    
  var osname = Ti.Platform.osname;
  var view = Ti.UI.createTableView({});

  var refreshData = function() {
    var url = "http://somegec.appliserv.fr/api/messages.json?api="+Ti.App.Properties.getString('apikey');
    var client = Ti.Network.createHTTPClient({
      onload : function(e) {
        //alert(this.responseText);
        var json = JSON.parse(this.responseText); 
        var data = [];
        _.each(json, function(e, i) {
          var row = Ti.UI.createTableViewRow({
            selectedBackgroundColor:'white',
            rowIndex: e.id,
            hasChild: true           
          });
          var label = Ti.UI.createLabel({
            color:'#576996',
            font:{fontFamily:'Arial', fontSize: 16, fontWeight:'bold'},
            text:e.client,
            left:10, top: 10,
            width: Ti.UI.SIZE, height: 30
          });
          var espace = Ti.UI.createLabel({
            color:'#000',
            font:{fontFamily:'Arial', fontSize: 14},
            text:e.espace,
            left:10, top: 30,
            width: Ti.UI.SIZE, height: 30, right: 10,
            textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
          });
          var date = Ti.UI.createLabel({
            color:'#000',
            font:{fontFamily:'Arial', fontSize: 14},
            text: moment(e.date).format("LLL"),
            left:10, top: 50, right: 10,
            width: Ti.UI.SIZE, height: 30,
            textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
          });
          var nom = Ti.UI.createLabel({
            color:'#000',
            font:{fontFamily:'Arial', fontSize: 16, fontWeight:'bold'},
            text:e.nom,
            left:10, top: 10, right: 10,
            width: Ti.UI.SIZE
          });
          var commentaire = Ti.UI.createLabel({
            color:'#000',
            font:{fontFamily:'Arial', fontSize: 14},
            text:e.commentaire,
            left:10, top: 80, right: 10,
            width: Ti.UI.SIZE
          });

          //row.add(label);
          row.add(espace);
          row.add(date);
          row.add(nom);
          row.add(commentaire);          

          row.addEventListener("click", function(e) {
            var mission = require('ui/MissionWindow');
            new mission(this.rowIndex).open();
          })
          data.push(row);
        });
        view.setData(data);
      },
      onerror : function(e) {
       Ti.API.debug(e.error);
      },
      timeout : 5000  // in milliseconds

    });
    client.open("GET", url);    
    client.send();
    
    var url2 = "http://somegec.appliserv.fr/api/type_accompagnements.json?api="+Ti.App.Properties.getString('apikey');
    //alert(url);
    var client2 = Ti.Network.createHTTPClient({
      onload : function(e) {
        type_accompagnements = JSON.parse(this.responseText);
      },
      onerror : function(e) {
      },
      timeout : 5000  // in milliseconds
    });
    client2.open("GET", url2);    
    client2.send();
    var url3 = "http://somegec.appliserv.fr/api/type_prestations.json?api="+Ti.App.Properties.getString('apikey');
    //alert(url);
    var client3 = Ti.Network.createHTTPClient({
      onload : function(e) {
        type_prestations = JSON.parse(this.responseText);
      },
      onerror : function(e) {
      },
      timeout : 5000  // in milliseconds
    });
    client3.open("GET", url3);    
    client3.send();  
    var url4 = "http://somegec.appliserv.fr/api/list_prestations.json?api="+Ti.App.Properties.getString('apikey');
    //alert(url);
    var client4 = Ti.Network.createHTTPClient({
      onload : function(e) {
        list_prestations = JSON.parse(this.responseText);
      },
      onerror : function(e) {
      },
      timeout : 5000  // in milliseconds
    });
    client4.open("GET", url4);    
    client4.send();  
    var url5 = "http://somegec.appliserv.fr/api/mode_reglements.json?api="+Ti.App.Properties.getString('apikey');
    //alert(url);
    var client5 = Ti.Network.createHTTPClient({
      onload : function(e) {
        mode_reglements = JSON.parse(this.responseText);
      },
      onerror : function(e) {
      },
      timeout : 5000  // in milliseconds
    });
    client5.open("GET", url5);    
    client5.send();  
    var url6 = "http://somegec.appliserv.fr/api/list_espaces.json?api="+Ti.App.Properties.getString('apikey');
    //alert(url);
    var client6 = Ti.Network.createHTTPClient({
      onload : function(e) {
        list_espaces = JSON.parse(this.responseText);
      },
      onerror : function(e) {
      },
      timeout : 5000  // in milliseconds
    });
    client6.open("GET", url6);
    client6.send();
  }
  // Create our main window
  var win = Ti.UI.createWindow({
    title: 'Liste des messages',
    backgroundColor: 'white',
    exitOnClose: false,
    modal: true,
    activity : {
      onCreateOptionsMenu : function(e) {
        var menu = e.menu;
        var m1 = menu.add({ title : 'Rafraîchir les données' });
        m1.setIcon(Titanium.Android.R.drawable.ic_menu_refresh);
        m1.addEventListener('click', function(e) {
          refreshData();
          menu.close();
        });  
        var m2 = menu.add({ title : 'Liste des missions' });
        m2.addEventListener('click', function(e) {
          var dw = require('ui/DashboardWindow');
          new dw().open();
          menu.close();
        });            
        var m2 = menu.add({ title : 'Créer mission anticipée' });
        m2.addEventListener('click', function(e) {
          var nw = require('ui/NewMissionAnticipeeWindow');
          new nw().open();
          menu.close();
        });
        var m3 = menu.add({ title : 'Scanner QrCode' });
        m3.addEventListener('click', function(e) {
          openScanner();
          menu.close();
        });            
        var m5 = menu.add({title: "Calendrier"});
        m5.addEventListener('click', function(e) {
          var dw = require('ui/CalendarWindow');
          new dw().open();
          menu.close();
        });            
        
        var m4 = menu.add({title: "Déconnexion"});
        m4.addEventListener('click', function(e) {
          var dw = require('ui/SessionWindow');
          new dw().open();
          menu.close();
        });            
                    
        
      }
    }
  });  
  
  win.add(view);
  win.addEventListener('open', function() {
    refreshData();
  }); 

  win.addEventListener('android:back', function (e) {
    // Do nothing ;)
  });

  var service;
  var intent = Titanium.Android.createServiceIntent({
      url: 'posservice.js'
  });
  service = Titanium.Android.createService(intent);
  service.start();  

  win.addEventListener("close", function() {
    //Ti.Geolocation.removeEventListener('location', function() {});
    //service.stop();
  });

  return win;
}

//make constructor function the public component interface
module.exports = MessageWindow;
