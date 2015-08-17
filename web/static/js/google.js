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


        google.maps.event.addListener(map, 'click', function (event) {
            //Agrega un unevo marcador en el mapa
            var marker = new google.maps.Marker({
               position: event.latLng, tittle: '#', draggable: true, map: map
            });

            if (start == null) {
                start = event.latLng;
                return;
            }
            else if (end == null) {
                end =  event.latLng;                           
                return;
            }
            else {
                waypts.push({
                    location: end, stopover: false
                });
                end =  event.latLng;

            }

            var request = {
                origin: start, destination: end, waypoints: waypts, optimizeWaypoints: true, travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        });

   });
}


