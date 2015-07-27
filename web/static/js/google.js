var map;
var waypts = [];
var start;
var end;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

///<reference path="js/google-maps-3-vs-1-0.js/>
function initialize() {
    cargarMapa();
    F_cerrar();

    
}

google.maps.event.addDomListener(window, 'load', initialize);

function cargarMapa(){
    directionsDisplay = new google.maps.DirectionsRenderer();
    navigator.geolocation.getCurrentPosition(function (position) {
        var espol = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var pos_espol = new google.maps.LatLng(-2.146104, -79.965814);
       
        var mapOptions = {
            zoom: 17,
            center: pos_espol
        }

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        directionsDisplay.setMap(map);

        var marker = new google.maps.Marker({
             position: new google.maps.LatLng(-2.146104, -79.965814), title: 'YO :D', map: map, animation: google.maps.Animation.BOUNCE
    
        });

        
   });
}




