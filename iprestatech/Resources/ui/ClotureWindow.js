// Application Window Component Constructor
function ClotureWindow(missionID) {    
  var osname = Ti.Platform.osname;

  // Create our main window
  var self = Ti.UI.createWindow({
      // If no image desired, you can remove this line and set the backgroundColor instead.
      //backgroundImage : '/images/background.png',
      backgroundColor: 'white',
      modal : true,
      exitOnClose : false,


  });

  var view = Titanium.UI.createView({
    layout: "vertical"
  });

  var picker = Ti.UI.createPicker({
    top:50
  });

  var data = [];
  data[0]=Ti.UI.createPickerRow({title:'Mission réalisé'});
  data[1]=Ti.UI.createPickerRow({title:'Mission réalisé avec changement d\'horaire'});
  data[2]=Ti.UI.createPickerRow({title:'Mission annulée'});
  
  picker.add(data);
  picker.selectionIndicator = true;

  view.add(picker);

  var label = Ti.UI.createLabel({ text: "Commentaire : " });
  view.add(label);
  var comment = Ti.UI.createTextArea({
    textAlign: 'left',
    value: "",
    height : 70, width: 250
  });
  view.add(comment);
  
  var piece = Ti.UI.createSwitch({
    titleOn:'Pièce à remplacer',
    titleOff:'Pièce à remplacer',
    value:true
  });
  win.add(piece);
  var pieceText = Ti.UI.createTextField({
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED    
  });
  win.add(pieceText);
  var inter = Ti.UI.createSwitch({
    titleOn:'Seconde intervention à caller',
    titleOff:'Seconde intervention à caller',
    value:true
  });
  win.add(inter);
  


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
    var url = "http://somegec.appliserv.fr/api/scloture_mission.json?api="+Ti.App.Properties.getString('apikey');
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
      suivi: suiviID, 
      etat: picker.getValue(),
      comment: comment.getValue(),  
      inter: inter.getValue(),
      piece: piece.getValue(),
      pieceText: pieceText.getValue()
      });  
  });
  view.add(button);
  
  return self;
}

//make constructor function the public component interface
module.exports = ClotureWindow;
