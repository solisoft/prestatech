
function DashboardWindow() {    
  var osname = Ti.Platform.osname;
  var view = Ti.UI.createTableView({});

  var refreshData = function() {
    var url = "http://somegec.appliserv.fr/api/dashboard.json?api="+Ti.App.Properties.getString('apikey');
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
            text:moment(e.date).calendar(),
            left:10, top: 50, right: 10,
            width: Ti.UI.SIZE, height: 30,
            textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT
          });
          row.add(label);
          row.add(espace);
          row.add(date);
          row.addEventListener("click", function(e) {
            //alert("You're talking to me? (" + e+")");
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
    title: 'Liste des missions',
    backgroundColor: 'white',
    modal: true
    
  });  
  
  win.add(view);
  win.addEventListener('open', function() {
    refreshData();
  }); 

  var activity = win.activity;

  activity.onCreateOptionsMenu = function(e){
    var menu = e.menu;
    var menuItem = menu.add({ 
      title: "Item 1", 
      showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
    });
    menuItem.addEventListener("click", function(e) {
      Ti.API.debug("I was clicked");
    });
  };

  return win;
}

//make constructor function the public component interface
module.exports = DashboardWindow;
