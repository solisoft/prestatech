document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
//

function getCoords() {
  navigator.geolocation.getCurrentPosition(function(position) {
    document.getElementById("pos").innerHTML = document.getElementById("pos").innerHTML + "<br/>" + Date() + " : " + position.coords.latitude + "," +position.coords.longitude;
  });
}
function onDeviceReady() {
  setInterval(function() {
    getCoords();
  }, 60000);
  getCoords();
}