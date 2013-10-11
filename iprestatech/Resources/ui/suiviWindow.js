
function suiviWindow(missionID, suiviID) {    
  var osname = Ti.Platform.osname;
  var view;

  // Create our main window
  var win = Ti.UI.createWindow({
    title: 'Détail de la mission',
    backgroundColor: 'white',
    fullscreen: false 
  });  
  
  view = Ti.UI.createScrollView({ layout: 'vertical'});
  
  var web = Titanium.UI.createWebView({
    url: "http://somegec.appliserv.fr/api/signature?api="+Ti.App.Properties.getString('apikey')+"id="+missionID,
    height: 300,
    width: Ti.UI.FILL
  });
  if(suiviID == 2) view.add(web);

  
  // Adrresse
  var label = Ti.UI.createLabel({ text: "Commentaire : " });
  view.add(label);
  var comment = Ti.UI.createTextArea({
    textAlign: 'left',
    value: "",
    height : 70, width: 250
  });
  view.add(comment);
  var button = Titanium.UI.createButton({
   title: 'Envoyer'     
  });

  button.addEventListener('click',function(e)
  {
    var url = "http://somegec.appliserv.fr/api/save_suivi.json?api="+Ti.App.Properties.getString('apikey');
    //alert(url);
    var client = Ti.Network.createHTTPClient({
      onload : function(e) {
        win.close();
      },
      onerror : function(e) {
      },
      timeout : 5000  // in milliseconds
    });
    client.open("POST", url);    
    client.send({ 
      mission: missionID,
      
      comment: comment.getValue(),  
      });  
  });
  view.add(button);
  
  win.add(view);
  win.addEventListener('open', function() {
    
  }); 
  
  
  
  return win;
}

//make constructor function the public component interface
module.exports = suiviWindow;
