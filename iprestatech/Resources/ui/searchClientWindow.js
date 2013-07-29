
function searchClientWindow(json) {    
  var osname = Ti.Platform.osname;
  var view = Ti.UI.createTableView({});

  
  // Create our main window
  var win = Ti.UI.createWindow({
    title: 'Résultat de la recherche',
    backgroundColor: 'white',
    modal: true
    
  });  
  
  win.add(view);
  win.addEventListener('open', function() {
    //refreshData();
    //alert(JSON.stringify(json));
    var data = [];
    _.each(json, function(e, i) {
      var row = Ti.UI.createTableViewRow({
        selectedBackgroundColor:'white',
        rowIndex: e.id + "####" + e.nom + "####" + e.adresse + "####" + e.cp + "####" + e.ville,
        hasChild: true,   
        height: 50        
      });
      var label = Ti.UI.createLabel({
        color:'#576996',
        font:{fontFamily:'Arial', fontSize: 16, fontWeight:'bold'},
        text:e.nom,
        width: Ti.UI.SIZE, height: 30
      });
      row.add(label);
      row.addEventListener("click", function(e) {
        //alert("You're talking to me? (" + this.rowIndex +")");
        var mission = require('ui/NewMissionAnticipeeFormWindow');
        new mission(this.rowIndex).open();
        win.close();
      })
      data.push(row);
    });    
    view.setData(data); 
  }); 

  return win;
}

//make constructor function the public component interface
module.exports = searchClientWindow;
