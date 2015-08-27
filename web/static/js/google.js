var map;
var waypts = [];
var start;
var end;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var puntos= [];
var punto = [];

///<reference path="js/google-maps-3-vs-1-0.js/>
function initialize() {
    cargarMapa();
    F_cerrar();

    guardarRuta_Puntos(puntos);

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
          #
          #Kimba donde dice sianna pon el nombre de usuario al crear la ruta
          #
          #

          var contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">Ruta</h1>'+
              '<div id="bodyContent">'+
              '<p><b>Creado por : Sianna </b></p>'+
              '</div>'+
              '</div>';

          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
            //Agrega un unevo marcador en el mapa
            var marker = new google.maps.Marker({
               position: event.latLng, tittle: '#', draggable: false, map: map
            });

            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });

            if (start == null) {
                start = event.latLng;
                console.log(start.lat());
                punto.push(start.lat());
                punto.push(start.lng());
                puntos.push(punto);
                console.log(puntos[0][0].valueOf());
                //guardarPuntos(start.lat(),start.lng());
                return;
            }
            else if (end == null) {
                end =  event.latLng;
                puntos.push(end.lat());
                console.log(puntos.toString());
                //guardarPuntos(end.lat(),end.lng());
                return;
            }
            else {
                waypts.push({
                    location: end, stopover: false
                });
                end =  event.latLng;
                console.log("start-2");
                puntos.push(end.lat());
                console.log(puntos.toString());
                //guardarPuntos(end.lat(),end.lng());
                //alert("start2");

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

function guardarPuntos(latitude,longitude){
    var csrf =  $('input[name="csrfmiddlewaretoken"]').val();
    $.ajax({
        type: "POST",
        url:'/coordenadas',
        data: {'coord_lat':latitude,'coord_long':longitude,'csrfmiddlewaretoken':csrf },
        success: function(){
         swal({   title: 'Exito!',   text: 'La ruta ha sido registrada con exito',   timer: 2000 });
      },
        error: function(e){
        console.log(e)
        swal({   title: 'Error!',   text: 'Error al intentar guardar ruta',   timer: 2000 });
      }
    });
}

function guardarRuta_Puntos(puntosC){
    $("#btn_Guardar_coord").click(function (puntosC) {
        //for (var p in puntos){
            //guardarPuntos(p.lat(),p.lng());
          //  swal({   title: 'Error!',   text: p,   timer: 2000 });
        //}
        swal({   title: 'Error!',   text: "nada",   timer: 2000 });
        console.log(puntosC.toString());
    });




}
