
function NewMissionAnticipeeFormWindow(userID) {    
  var osname = Ti.Platform.osname;
  var view;
  
  var user_id = userID.split("####")[0];
  var user_nom = userID.split("####")[1];
  var user_adresse = userID.split("####")[2];
  var user_cp = userID.split("####")[3];
  var user_ville = userID.split("####")[4];
  
  // Create our main window
  var win = Ti.UI.createWindow({
    title: 'Création d\'une mission anticipée',
    backgroundColor: 'white',
    fullscreen: false    
  });  
  var scrollView = Ti.UI.createScrollView({
    contentWidth: 'auto',
    contentHeight: 'auto'
  });
  view = Ti.UI.createView({
    layout: 'vertical'
  });
  var label = Ti.UI.createLabel({ text: "Client sélectionné : " });
  view.add(label);
  label = Ti.UI.createLabel({ color: '#000000', text: user_nom });
  view.add(label);
  
  label = Ti.UI.createLabel({ text: "Espace : " });
  view.add(label);
  var picker_list_espaces = Ti.UI.createPicker({});
  data = [];
  _.each(list_espaces, function(e, i) {

    data[i] = Ti.UI.createPickerRow({title: e[1] });    
  });
  if(data.length > 0) picker_list_espaces.add(data);
  picker_list_espaces.selectionIndicator = true;
  view.add(picker_list_espaces);

  

  label = Ti.UI.createLabel({ text: "Prestation : " });
  view.add(label);
  
  var picker_list_prestations = Ti.UI.createPicker({});
  data = [];
  //alert(list_prestations.length);
  
  _.each(list_prestations, function(e, i) {
    data[i] = Ti.UI.createPickerRow({title: e[1] });    
  });
  if(data.length > 0) picker_list_prestations.add(data);
  picker_list_prestations.selectionIndicator = true;
  view.add(picker_list_prestations);
  
  // Commentaires
  label = Ti.UI.createLabel({ text: "Commentaires : " });
  view.add(label);
  var commentaires = Ti.UI.createTextArea({
    textAlign: 'left',
    value: '',
    height : 70, width: 250
  });
  view.add(commentaires);
  
  // Adrresse
  label = Ti.UI.createLabel({ text: "Adresse : " });
  view.add(label);
  var lieu = Ti.UI.createTextArea({
    textAlign: 'left',
    value: user_adresse,
    height : 70, width: 250
  });
  view.add(lieu);
  
  label = Ti.UI.createLabel({ text: "Ville : " });
  view.add(label);
  var ville = Ti.UI.createTextField({
     value: user_ville, width: 250
  });
  view.add(ville);
  label = Ti.UI.createLabel({ text: "Code Postal : " });
  view.add(label);
  var cp = Ti.UI.createTextField({
     value: user_cp, width: 250
  });
  view.add(cp);
  
  // Date
  label = Ti.UI.createLabel({ text: "Date réalisation : " });
  view.add(label);
  var date_real = Ti.UI.createPicker({
    type:Ti.UI.PICKER_TYPE_DATE,
    value: new Date(),
  });
  
  view.add(date_real);
  
  // Types Prestations
  var picker_prestations = Ti.UI.createPicker({});
  label = Ti.UI.createLabel({ text: "Type de prestation : " });
  view.add(label);
  var picker_prestations = Ti.UI.createPicker({});
  data = [];
  //alert(type_prestations.length);
  _.each(type_prestations, function(e, i) {
    data[i] = Ti.UI.createPickerRow({title: e[1] });
  });
  if(data.length > 0)  picker_prestations.add(data);
  picker_prestations.selectionIndicator = true;
  view.add(picker_prestations);

  
  label = Ti.UI.createLabel({ text: "Mode de règlement : " });
  view.add(label);
  
  var picker_mode_reglements = Ti.UI.createPicker({});
  data = [];
  _.each(mode_reglements, function(e, i) {
    data[i]=Ti.UI.createPickerRow({title: e[1] });
  });
  if(data.length > 0)  picker_mode_reglements.add(data);
  picker_mode_reglements.selectionIndicator = true;
  view.add(picker_mode_reglements);
 
  var button = Titanium.UI.createButton({
   title: 'Créer la mission anticipée'     
  });
  button.addEventListener('click',function(e)
  {
    var url = "http://somegec.appliserv.fr/api/save_ma.json?api="+Ti.App.Properties.getString('apikey');
    //alert(url);
    var client = Ti.Network.createHTTPClient({
      onload : function(e) {
        win.close();
        var mission = require('ui/MissionWindow');
        new mission(this.responseText).open();
      },
      onerror : function(e) {
        alert("Erreur !");
      },
      timeout : 5000  // in milliseconds
    });
    client.open("POST", url);    
    client.send({ 
      abonne: user_id, 
      prestation: picker_list_prestations.getValue(),  
      adresse: lieu.getValue(),
      cp: cp.getValue(),
      ville: ville.getValue(),
      commentaires: commentaires.getValue(),
      mode_reglement: picker_mode_reglements.getSelectedRow(0).title,  
      type_prestation: picker_prestations.getSelectedRow(0).title,
      list_prestation: picker_list_prestations.getSelectedRow(0).title,
      date_real: date_real.getValue(),
      espace: picker_list_espaces.getSelectedRow(0).title
    });  
  });
  view.add(button);
  scrollView.add(view);
  win.add(scrollView);
  
  win.addEventListener('open', function() {
    //refreshData();
  });


  return win;
}

//make constructor function the public component interface
module.exports = NewMissionAnticipeeFormWindow;
