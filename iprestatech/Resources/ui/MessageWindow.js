
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
  }
  // Create our main window
  var win = Ti.UI.createWindow({
    title: 'Liste des messages',
    backgroundColor: 'white',
    exitOnClose: true,
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
      }
    }
  });  
  
  win.add(view);
  win.addEventListener('open', function() {
    refreshData();
  }); 


  var service;
  var intent = Titanium.Android.createServiceIntent({
      url: 'posservice.js'
  });
  service = Titanium.Android.createService(intent);
  service.start();  

  win.addEventListener("close", function() {
    Ti.Geolocation.removeEventListener('location', function() {});
    service.stop();
  });

  return win;
}

//make constructor function the public component interface
module.exports = MessageWindow;
