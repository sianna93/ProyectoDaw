var map;
var waypts = [];
var start;
var end;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var puntos= [];
var markers=[];

///<reference path="js/google-maps-3-vs-1-0.js/>
function initialize() {
    cargarMapa();

}



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

              var usuario;
              $.ajax({
                type: "GET",
                url:'/cuenta/',
                async: true,
                dataType:"Json",
                contenType:"application/Json; charset=utf-8",
                success: function(user){
                      usuario= user.first_name+" "+user.last_name;
                      var contentString = '<div id="content">'+
                      '<div id="siteNotice">'+
                      '</div>'+
                      '<h1 id="firstHeading" class="firstHeading">Ruta</h1>'+
                      '<div id="bodyContent">'+
                      '<p><b>Creado por : ' + usuario +'</b></p>'+
                      '</div>'+
                      '</div>';

                      var infowindow = new google.maps.InfoWindow({
                        content: contentString
                      });
                        //Agrega un unevo marcador en el mapa
                        var marker = new google.maps.Marker({
                           position: event.latLng, tittle: '#', draggable: false, map: map
                        });
                        markers.push(marker);
                        //marker
                        
                        marker.addListener('click', function() {
                          infowindow.open(map, marker);
                          
                          console.log(infowindow.getContent());
                        });

                        if (start == null) {
                            start = event.latLng;
                            //console.log(start.lat());
                            //punto.push(start.lat());
                            //punto.push(start.lng());
                            //puntos.push(punto);
                            //console.log(puntos[0][0].valueOf());
                            //guardarPuntos(start.lat(),start.lng());
                            puntos.push({lt: start.lat(), lg: start.lng()});

                            return;
                        }
                        else if (end == null) {
                            end =  event.latLng;
                            //puntos.push(end.lat());
                            //console.log(puntos.toString());
                            //guardarPuntos(end.lat(),end.lng());
                            //guardarRutas(start.lat(), start.lng(), end.lat(), end.lng());
                            puntos.push({lt: end.lat(), lg: end.lng()});
                            return;
                        }
                        else {
                            waypts.push({
                                location: end, stopover: false
                            });

                            end =  event.latLng;
                            puntos.push({lt: end.lat(), lg: end.lng()});

                            console.log('yo soy el string' + puntos.toString());
                        }


                        var request = {
                            origin: start, destination: end, waypoints: waypts, optimizeWaypoints: true, travelMode: google.maps.TravelMode.DRIVING

                        };

                        directionsService.route(request, function (response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                              //console.log(request);
                              directionsDisplay.setDirections(response);
                            }
                        });


                          //guardarRutas(start.lat(), start.lng(), end.lat(), end.lng());
                        $("#btn_Guardar_coord").click(function () {
                            console.log("Mi start",start.lat());
                            console.log("Mi end",end.lat());
                            //alert("diste click");
                            var p_start= puntos[0];
                            var p_end= puntos[puntos.length-1];
                            //console.log("start: "+ p_start['lt']);
                            guardarRutas(p_start['lt'], p_start['lg'], p_end['lt'], p_end['lg']);
                            //guardarRutas(start.lat(), start.lng(),end.lat(), end.lng());
                            var i;
                            //recorriendo la lista de puntos y guardando la lat y lon
                            for (i=1; i<puntos.length-1; i++){
                              var punto = puntos[i];
                              var plt=punto['lt'];
                              var plg=punto['lg'];
                              guardarPuntos(plt,plg);
                              console.log('puntos' + plt + plg);
                            }

                            //swal({   title: 'Exito!',   text: "ruta guardada",   timer: 2000 });
                            console.log(puntos);
                            console.log(waypts);
                            setMapOnAll(null);
                            //directionsDisplay.setMap(null);
                            end=null;
                            start = null;
                            puntos=[];
                            waypts=[];


                        });
                        $("#a_iniciar_ruta").click(function(){
                            setMapOnAll(null);
                           //directionsDisplay.setMap(null);
                            end=null;
                            start = null;
                            puntos=[];
                            waypts=[];
                        });

                },
                error: function(data){
                  console.log(data.responseText);
                  swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
                }
              });



        });
   });
}

function guardarPuntos(latitude,longitude){
    var csrf =  $('input[name="csrfmiddlewaretoken"]').val();
    $.ajax({
        type: "POST",
        url:'/saveCoordenadas',
        data: {'coord_lat':latitude,'coord_long':longitude,'csrfmiddlewaretoken':csrf },
        success: function(){
         //swal({   title: 'Exito!',   text: 'La ruta ha sido registrada con exito',   timer: 2000 });
      },
        error: function(e){
        console.log(e)
        swal({   title: 'Error!',   text: 'Error al intentar guardar puntos',   timer: 2000 });
      }
    });
}

function guardarRutas(orig_lat, orig_lng, dest_lat, dest_lng){



    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    //eliminar_todo();
    //crear_cabecera('seccion_misrutas', 'header_panel', 'labelpanel', 'MIS RUTAS');
    //cargarComponentes_MisRutas('#seccion_misrutas');
    //guardarRuta(start, end);
    console.log(start);

    var csrf =  $('input[name="csrfmiddlewaretoken"]').val();
    $.ajax({
      type: "POST",
      url:'/ruta',
      data: {'txtOrigen':start,'txtDestino':end,'origLat': orig_lat,'origLng': orig_lng,'dstgLat': dest_lat,'dstgLng': dest_lng,'csrfmiddlewaretoken':csrf },
      success: function(){
         swal({   title: 'Exito!',   text: 'La ruta ha sido registrada con exito',   timer: 2000 });
      },
      error: function(){
        swal({   title: 'Error!',   text: 'Error al intentar guardar ruta',   timer: 2000 });
      }
    });
    FB.ui({
          method: 'feed',
          link: 'https://developers.facebook.com/docs/',
          caption: 'An example caption',
        }, function(response){});

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

function setMapOnAll(map){
  for (var i=0;i<markers.length; i++){
    markers[i].setMap(map);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
