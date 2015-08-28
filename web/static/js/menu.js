/*************************************************************

  Integrantes:
  Sianna Puente
  Janina Costa
  Stephany Quimba
  Kleber Díaz

  Funciones para el menu y página pincipal de la página
 **************************************************************/
function initialize() {
  document.getElementById('a_cuenta').addEventListener('click',F_cuenta, false);
  document.getElementById('a_siguiendo').addEventListener('click',F_siguiendo, false);
  document.getElementById('a_seguidores').addEventListener('click',F_seguidores, false);
  document.getElementById('a_buscar').addEventListener('click',F_buscar, false);//BUSCAR
  document.getElementById('a_iniciar_ruta').addEventListener('click',F_iniciaruta, false);
  document.getElementById('a_misrutas').addEventListener('click',F_misrutas, false);
  F_cerrar();

}

//Función para el botón panel
function F_cerrar(){
  // var ancho=100%;
  $(document).ready(function(){
    $("#a_close").on( "click", function() {
    $('#panel-derecho').hide(); //oculto mediante id
    $('#map-canvas').width('100%');
    });
  });
}

/*INICIO CUENTA*/
//Función para el botón de MICuenta


  //cuentaPrueba


function F_cuenta(evt){
  eliminar_todo();
  document.getElementById('map-canvas').style.width = "70%";
  $('#panel-derecho').show();
  document.getElementById('panel-derecho').style.visibility="visible";
  crear_cabecera('seccion_cuenta', 'header_panel', 'labelpanel', 'MI CUENTA');

  var usuario, car="",contseg=0, contsig=0;
  //Se hace la llamada ajax del json para el user autenticado
  $.ajax({
    type: "GET",
    url:'/cuenta/',
    async: true,
    dataType:"Json",
    contenType:"application/Json; charset=utf-8",
    success: function(user){
          //console.log(user)
          usuario= user.first_name+" "+user.last_name;
          cargarComponentes_Cuenta('#seccion_cuenta', usuario, user.username ,'seguidores','0', 'seguidos','0',"");
          //Si tiene o no carro
           $.ajax({
            type: "GET",
            url:'/datos/',
            async: true,
            dataType:"Json",
            contenType:"application/Json; charset=utf-8",
            success: function(personas){
                  $.each(personas,function(p,persona){
                    if(user.id==persona.fk_user_id){
                      if(persona.is_carro=='True'){
                        car = 'Si tiene carro'
                        $('#carro').text(car);
                      }
                      else if(persona.is_carro=='False'){
                        car = 'No tiene carro'
                        $('#carro').text(car);
                      }
                    }
                  });

            },
            error: function(data){
              console.log(data.responseText);
              swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
            }
          });

          //Numeros de siguiendos
           $.ajax({
            type: "GET",
            url:'/siguiendos/',
            async: true,
            dataType:"Json",
            contenType:"application/Json; charset=utf-8",
            success: function(siguiendos){
              list_siguiendos=siguiendos;
              contsig=list_siguiendos.length;
              $('#numseguidos').text(contsig);
              console.log("numsiguiendos: "+ contsig);

            },
            error: function(data){
              console.log(data.responseText);
              swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
            }
          });

          //Numeros de siguidores
          $.ajax({
            type: "GET",
            url:'/seguidores/',
            async: true,
            dataType:"Json",
            contenType:"application/Json; charset=utf-8",
            success: function(seguidores){
              list_seguidores=seguidores;
              contseg=list_seguidores.length;
              $('#numseguidores').text(contseg);
              console.log("numseguidores: "+ contseg);

            },
            error: function(data){
              console.log(data.responseText);
              swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
            }
          });
    },
    error: function(data){
      console.log(data.responseText);
      swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
    }
  });
}


/*FIN CUENTA*/

//Función para el botón seguidos / siguiendo
function F_siguiendo(evt) {
  eliminar_todo();
  document.getElementById('map-canvas').style.width = "70%";
  $('#panel-derecho').show();
  document.getElementById('panel-derecho').style.visibility="visible";
  crear_cabecera('seccion_siguiendo', 'header_panel', 'labelpanel', 'SIGUIENDO');

  $.ajax({
    type: "GET",
    url:'/siguiendos/',
    async: true,
    dataType:"Json",
    contenType:"application/Json; charset=utf-8",
    success: function(seguidores){
        $.each(seguidores,function(i,seg){
          //console.log(seguidores);
          console.log(seg.siguiendo);
          $.ajax({
            type: "GET",
            url:'/usuarios/',
            async: true,
            dataType:"Json",
            contenType:"application/Json; charset=utf-8",
            success: function(usuarios){
              $.each(usuarios,function(i,usuario){

                if(usuario.username==seg.seguidor){
                  user=usuario.first_name + " " + usuario.last_name;
                  crear_presentancion_usuario('#seccion_siguiendo', user,usuario.username, 'primary', 'Siguiendo');
                }
              })
            },
            error: function(data){
              console.log(data.responseText);
              swal({  title: 'Error!!',   text: 'No existe el usuario',   timer: 2000 });
            }
          });

        });
    },
    error: function(data){
      console.log(data.responseText);
      swal({  title: 'Error!',   text: 'Inicie sesion',   timer: 2000 });
    }
  });

  añadir_eventos();
}



//Función para el botón seguidores
function F_seguidores(evt) {
  eliminar_todo();
  document.getElementById('map-canvas').style.width = "70%";
  $('#panel-derecho').show();
  document.getElementById('panel-derecho').style.visibility="visible";
  crear_cabecera('seccion_seguidores', 'header_panel', 'labelpanel', 'SEGUIDORES');


  $.ajax({
    type: "GET",
    url:'/seguidores/',
    async: true,
    dataType:"Json",
    contenType:"application/Json; charset=utf-8",
    success: function(seguidores){
        $.each(seguidores,function(i,seg){
          //console.log(seguidores);
          console.log(seg.seguidor);
          $.ajax({
            type: "GET",
            url:'/usuarios/',
            async: true,
            dataType:"Json",
            contenType:"application/Json; charset=utf-8",
            success: function(usuarios){
              $.each(usuarios,function(i,usuario){

                if(usuario.username==seg.siguiendo){
                  user=usuario.first_name + " " + usuario.last_name;
                  crear_presentancion_usuario('#seccion_seguidores', user,usuario.username, 'primary', 'Siguiendo');
                }
              })
            },
            error: function(data){
              console.log(data.responseText);
              swal({  title: 'Error!',   text: 'Errooor',   timer: 2000 });
            }
          });


        });


    },
    error: function(data){
      console.log(data.responseText);
      swal({  title: 'Error!',   text: 'Errooor',   timer: 2000 });
    }
  });
  //cargarDatosSeguidores();
  añadir_eventos();
}

function autocomplete_busqueda(){

    function log( message ) {
      $( "<div>" ).text( message ).prependTo( "#log" );
      $( "#log" ).scrollTop( 0 );
    }
    var lista=[];
    var bsq = document.getElementById("txtvalidar").value;
    $( "#txtvalidar" ).autocomplete({

      source: function( request, response ) {
        //bsq= this.value;
        console.log(bsq);
        $.ajax({

            url:'/filtrarNombres/',
            dataType:"json",
            contenType:"application/Json; charset=utf-8",
            data: {q: request.term},
            success: function(data){
              console.log(data);
              console.log(request);
              //$.each(usuarios,function(i,usuario){

              //});
              $.each(data,function(i,usuario){
                lista.push(usuario.username);
              });
              console.log(lista);
              response(lista);

            },
            /*success: function(usuarios){
              $.each(usuarios,function(i,usuario){
                console.log("json");
                if(usuario.name==bsq){
                  user=usuario.name + " " + usuario.apellido;
                  response(user);
                  //log(user);
                  //crear_presentancion_usuario('#', user,usuario.username, 'primary', 'Siguiendo');
                }
              });
              */
            //},
            error: function(data){
              console.log(data.responseText);
              swal({  title: 'Error!',   text: 'Errooor',   timer: 2000 });
            }
          });
      },
      minLength: 1,
      select: function( event, ui ) {
        log( ui.item ?
          ui.item.username:
          "Nothing selected, input was " + this.value);
        //log( "hola");
        console.log("por aqui");
      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });
    //alert("click");

}


//funcion que toma los datos de la persona a buscar (del json) y los presenta en el panel derecho
function mostrar_busqueda() {

	ELIMINAR("cuerpo_presentacion");

	var busqueda = document.getElementById("txtvalidar").value;
	$.ajax({
	    type: "GET",
	    url:'/usuarios/',
	    async: true,
	    dataType:"Json",
	    contenType:"application/Json; charset=utf-8",
	    success: function(usuarios){
	      $.each(usuarios,function(i,usuario){

	        if(usuario.username==busqueda){
	          user=usuario.first_name + " " + usuario.last_name;
	          crear_presentancion_usuario('#seccion_buscar', user,usuario.username, 'primary', 'Siguiendo');
	        }
	      })

	    },
	    error: function(data){
	      console.log(data.responseText);
	      swal({  title: 'Error!!',   text: 'No existe el usuario',   timer: 2000 });
	    }
	  });
}



//Función para el botón buscar amigos
function F_buscar(evt) {
  eliminar_todo();
  document.getElementById('map-canvas').style.width = "70%";
  $('#panel-derecho').show();
  document.getElementById('panel-derecho').style.visibility="visible";
  crear_cabecera('seccion_buscar', 'header_panel', 'labelpanel', 'BUSCAR');
  cargarComponentes_Buscar('#seccion_buscar');

  document.getElementById('button_buscar').addEventListener('click',mostrar_busqueda, false);
  document.getElementById('txtvalidar').addEventListener('click',autocomplete_busqueda, false); //autocompletar campo

}

//Función para el botón iniciar ruta
function F_iniciaruta(evt) {
  eliminar_todo();
  document.getElementById('map-canvas').style.width = "70%";
  $('#panel-derecho').show();
  document.getElementById('panel-derecho').style.visibility="visible";
  crear_cabecera('seccion_ruta', 'header_panel', 'labelpanel', 'INICIAR RUTA');
  cargarComponentes_Ruta('#seccion_ruta');

  //Guardar ruta
  //addNodes("xml/rutas.xml","ruta");
  guardar();
}

//Función para el botón misRutas
//Mis Rutas: lista que me presentará todas las rutas que he guardado
function F_misrutas(evt){
  eliminar_todo();
  $('#panel-derecho').show();
  document.getElementById('map-canvas').style.width = "70%";
  document.getElementById('map-canvas').style.transform = "-100px";
  document.getElementById('panel-derecho').style.visibility="visible";
  crear_cabecera('seccion_misrutas', 'header_panel', 'labelpanel', 'MIS RUTAS');
  cargarComponentes_MisRutas('#seccion_misrutas');
}

//función que limpia el panel derecho de cada una de las opciones del botón derecho
//cada vez que aplasto un diferente botón del menú
function ELIMINAR(id){
  if (document.getElementById(id)) {
    var o = document.getElementById(id);
    o.parentNode.removeChild(o);
  }
}

//limpia todas las opciones aplastada del menu
function eliminar_todo(){
  ELIMINAR("seccion_cuenta");
  ELIMINAR("seccion_siguiendo");
  ELIMINAR("seccion_seguidores");
  ELIMINAR("seccion_buscar");
  ELIMINAR("seccion_misrutas");
  ELIMINAR("seccion_ruta");

}

//crea la cabecera del panel derecho en el que ambiará eltitulo del panel según
//los botones del menu que seleccione
function crear_cabecera(seccion,header,label,textlabel){
  $("<div>", {
    id: seccion
  }).append($('<div>', {
    id: header

  }).append($('<label>',{
    id : label,
    text: textlabel,
    style: "text-align:center;width:100%;position: relative;top: -10px;"
  }))).hide().appendTo('#panel-derecho').fadeIn('slow');

}

//crea cada cada tarjeta de presentacion
function crear_presentancion_usuario(seccion,nombre,id,typeButton, txtButton){
  $("<div>" ,{
    id : 'cuerpo_presentacion'
  }).append($('<div>',{
    id: 'panel-primary',
    class : 'panel panel-primary'
  }).append($('<div>',{
    id: 'panel-body',
    class : 'panel-body'
  }).append($('<img>',{
    id: 'presentacion_imagen',
    src : '/static/imagenes/car1.png'
  }),$('<div>',{
    id:"presentacion_cuerpo_body"
  }).append($('<a>',{
    class:'presentacionNombre',
    id:'presentacion_bodynombre',
    href:'#',
    title: 'Ver Perfil'
  }).append($('<span>',{
    class: 'presentacionTextNombre',
    text: nombre
  })),$('<label>',{
    id:'presentacion_bodyID',
    text:id
  })),$('<div>',{
    class : ' center-block '
  }).append($('<button>',{
    id:'button_seguir',
    class : 'btn btn-'+ typeButton+' center-block',
    text:txtButton
  }))))).hide().appendTo(seccion).fadeIn('slow');
}


/*INICIO DEL CONTENIDO CUENTA*/

//Crea dinamicamente la estructura del contenido de MiCuenta
function cargarComponentes_Cuenta(seccion, nombreCuenta, nombreUsuario, seguidores,numseguidores,seguidos,numseguidos,carro){
  $("<div>",{
    id:'cuerpo_cuenta',
    style:"padding:80px;"
  }).append($('<label>',{
    id: 'nombreCuenta',
    text:nombreCuenta
  }),$('<img>',{
    id: 'presentacion_imagenCuenta',
    src : '/static/imagenes/Icon-user.png',
    style:"width:120px;height:130px;margin-left:30%;position:relative;top:20px"
  }),$("<div>",{
    id:'datos_cuenta',
    style:"padding:0px;"
  }).append($('<label>',{
    id: 'nombreUsuario',
    text: nombreUsuario
  }),$('<label>',{
    id: 'numseguidores' ,
    text: numseguidores,
    onMouseover: "this.style.color='yellow'"
      ,onMouseout: "this.style.color='#fff'"
  }),$('<label>',{
    id: 'seguidores',
    text: seguidores
  }),$('<label>',{
    id: 'numseguidos',
    text:numseguidos,
    onMouseover: "this.style.color='yellow'"
      ,onMouseout: "this.style.color='#fff'"
  }),$('<label>',{
    id: 'seguidos',
    text:seguidos
  }),$('<label>',{
    id: 'carro',
    text:carro
  }))

  ).hide().appendTo(seccion).fadeIn('slow');
}

/*fin cuenta*/


//Crea dinamicamente la estructura del contenido de BuscarAmigos
function cargarComponentes_Buscar(seccion){
  var csrf =  $('input[name="csrfmiddlewaretoken"]').val();
  var token ="<input type='hidden' name='csrfmiddlewaretoken' value='"+csrf+"' />";
  $("<div>",{
    class: 'ui-widget',
    id: 'cuerpo_buscar'
  }).append($('<input>',{
    type:'text',
    name:'txtBuscar',
    class:'txtBuscar',
    id:'txtvalidar',
    placeholder:'Buscar Amigo',
    style:"width:85%; margin:10px 20px;",
           onkeypress:"return soloLetras(event)",
           onblur:"limpia()",
           onKeyDown: "return limitar(event,this.value,30)"
  }),$('<img>',{
    id: 'button_buscar',
    src : '/static/imagenes/icon_buscar.png',

  }),$('<div>',{
    id:'log',
    text: '',
    class:'ui-widget-content'
  })

  ).hide().appendTo(seccion).fadeIn('slow');
  }




//Crea dinamicamente la estructura del contenido de Buscar
function crear_presentacion_Busqueda(seccion, nombreCuenta, nombreUsuario, seguidores,numseguidores,seguidos,numseguidos,carro){
  $("<div>",{
    id:'cuerpo_busqueda',
    style:"padding:80px;"
  }).append($('<label>',{
    id: 'nombreCuenta',
    text:nombreCuenta
  }),$("<div>",{
    id:'datos_busqueda',
    style:"padding:0px;"
  }).append($('<label>',{
    id: 'nombreUsuario',
    text: nombreUsuario
  }),$('<label>',{
    id: 'numseguidores' ,
    text: numseguidores,
    onMouseover: "this.style.color='yellow'"
      ,onMouseout: "this.style.color='#fff'"
  }),$('<label>',{
    id: 'seguidores',
    text: seguidores
  }),$('<label>',{
    id: 'numseguidos',
    text:numseguidos,
    onMouseover: "this.style.color='yellow'"
      ,onMouseout: "this.style.color='#fff'"
  }),$('<label>',{
    id: 'seguidos',
    text:seguidos
  }),$('<label>',{
    id: 'carro',
    text:carro
  }))

  ).hide().appendTo(seccion).fadeIn('slow');
}

//funciones de validar solo letras y longitud de los campos de texto
function limitar(e, contenido, caracteres)
{
  // obtenemos la tecla pulsada
  var unicode=e.keyCode? e.keyCode : e.charCode;
  // Permitimos las siguientes teclas:
  // 8 backspace
  // 46 suprimir
  // 13 enter
  // 9 tabulador
  // 37 izquierda
  // 39 derecha
  // 38 subir
  // 40 bajar
  if(unicode==8 || unicode==46 || unicode==13 || unicode==9 || unicode==37 || unicode==39 || unicode==38 || unicode==40)
    return true;
  // Si ha superado el limite de caracteres devolvemos false
  if(contenido.length>=caracteres)
    return false;
  return true;
}

//Validaciones para solo aceptar letras
function soloLetras(e) {
  key = e.keyCode || e.which;
  tecla = String.fromCharCode(key).toLowerCase();
  letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
  especiales = [8, 37, 39, 46];

  tecla_especial = false
    for(var i in especiales) {
      if(key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }
  if(letras.indexOf(tecla) == -1 && !tecla_especial)
    return false;
}
//limpia los campos de textos
function limpia() {
  var val = document.getElementById("txtvalidar").value;
  var tam = val.length;
  for(i = 0; i < tam; i++) {
    if(!isNaN(val[i]))
      document.getElementById("txtvalidar").value = '';
  }
}
//Crea dinamicamente la estructura del RuTAS
function cargarComponentes_Ruta(seccion){
  var csrf =  $('input[name="csrfmiddlewaretoken"]').val();
  var token ="<input type='hidden' name='csrfmiddlewaretoken' value='"+csrf+"' />";
  $("<div>",{
    id:'cuerpo_ruta',
    style:"padding:20px"
  }).append($('<img>',{
    id: 'img_car_panel_ruta',
    src:'/static/imagenes/car1.png',
    style:"width:310px;height:160px"
  }),$('<input>',{
    type: 'hidden',
    name: 'csrfmiddlewaretoken',
    value: csrf
  }),$('<div>',{
    action : "ruta" ,
    method:"post"
  }).append($('<h4>',{
    id:'label_origen_ruta',
    text:'Origen'
  }),$('<input>',{
    id:'input_origen_ruta',
    type:'text',
    name:'txtOrigen',
    id:'start',
    placeholder:'Origen',
    onchange:'calcRoute();',
    required:'true'
  }),$('<h4>',{
    id:'label_destino_ruta',
    text:'Destino'
  }),$('<input>',{
    id:'input_destino_ruta',
    type:'text',
    name:'txtDestino',
    id:'end',
    placeholder:'Destino',
    onchange:'calcRoute();',
    required:'true'
  }),$('<h4>',{
    id:'label_fecha_ruta',
    text:'Fecha'
  }),$('<input>',{
    id:'input_fecha_ruta',
    type:'date',
    name:'txtFecha',
    required:'true'
  }),$('<button>',{
    id: 'btn_guardar',
    class:'btn btn-primary center-block',
    text:'Guardar Ruta'
  }),$('<button>',{
    id: 'btn_Guardar_coord',
    class: 'btn btn-primary center-block',
    text:'Guardar Puntos'
  }))).hide().appendTo(seccion).fadeIn('slow');

/*
  $("#btn_guardar").click(function () {
    FB.ui({
      method: 'feed',
      link: 'https://developers.facebook.com/docs/',
      caption: 'An example caption',
    }, function(response){});

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
    	data: {'txtOrigen':start,'txtDestino':end,'csrfmiddlewaretoken':csrf },
    	success: function(){
         swal({   title: 'Exito!',   text: 'La ruta ha sido registrada con exito',   timer: 2000 });
      },
    	error: function(){
        swal({   title: 'Error!',   text: 'Error al intentar guardad ruta',   timer: 2000 });
      }
    });
  });*/
}

/////////////////////////////////////////////////////////
//FUNCIONES NECESARIAS PARA GUARDAR
////////////////////////////////////////////////////////
function addNodes(xmlDoc,node){
  //xmlDoc=loadXMLDoc(xml);

  newNode=xmlDoc.createElement(node);

  //Tomo el tamaño de cantidad de nodos hay
  var lenght_node=xmlDoc.getElementsByTagName(node).length;

  x=xmlDoc.documentElement;
  y=xmlDoc.getElementsByTagName(node)[0];

  x.insertBefore(newNode,y);
  // alert(xmlDoc.getElementsByTagName(node).length);
}

function appendChild(xmlDoc,node,child){
  //xmlDoc=loadXMLDoc(xml);

  newel=xmlDoc.createElement(child);

  //Tomo el tamaño de cantidad de nodos hay
  var lenght_node=xmlDoc.getElementsByTagName(node).length;

  x=xmlDoc.getElementsByTagName(node)[0];
  x.appendChild(newel);
}

function insertDatos(xmlDoc,node,child,dato){
  //xmlDoc=loadXMLDoc(xml);

  x=xmlDoc.getElementsByTagName(node)[0].getElementsByTagName(child)[0].childNodes[0];

  x.insertData(0,dato);
}
function guardar(){
  var xml = '/xml/rutas.xml';
  xmlDoc = loadXMLDoc('../../templates/rutas.xml');
  var node = "ruta";
  var id = "id_usuario";
  var origen = "origen";
  var destino = "destino";

  addNodes( xmlDoc, node);
  var length =xmlDoc.getElementsByTagName("ruta").length-2;
  //alert(xmlDoc.getElementsByTagName("ruta").length);
  appendChild( xmlDoc, node, id);
  appendChild( xmlDoc, node, origen);
  appendChild( xmlDoc, node, destino);

  insertDatos( xmlDoc,node, id, "sppuente");
  insertDatos( xmlDoc,node, origen, "FIEC ESPOL");
  insertDatos( xmlDoc,node, destino, "Mapasingue Guayaquil");


  var rutas=xmlDoc.getElementsByTagName("ruta");

  for (var i = 0; i < rutas.length; i++) {
    id_usuario = rutas[i].getElementsByTagName("id_usuario")[0].childNodes[0].nodeValue;
    origen = rutas[i].getElementsByTagName("origen")[0].childNodes[0].nodeValue;
    destino = rutas[i].getElementsByTagName("destino")[0].childNodes[0].nodeValue;
    // alert(i + "  "+origen);
    //$("#ListaRutas").append("<li><a class='linkRuta' title= 'Trazar Ruta' href='#' ><span id="+rutas.length-1+" class='miRuta'>"+origen+"-"+destino+ "</span></a></li>");
  }

}

function guardarRuta(start, end){
  xmlDoc=loadXMLDoc('/xml/rutas.xml');
  origen=xmlDoc.createElement("origen");

  //ruta=xmlDoc.documentElement;
  ruta=xmlDoc.getElementsByTagName("ruta")[0];
  ruta.appendChild(origen);

}
////////////////////////////////////////////////////////
////////// *FIN* ///////////////////////////////////////
///////////////////////////////////////////////////////////
function calcRoute() {
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

/*lista de rutas que tengo guardadas*/
function cargarComponentes_MisRutas(seccion){
  $("<div>", {
    id: 'cuerpo_misrutas'
  }).append($('<label>', {
    text: "Hoy"
  }),$('<ol>',{
    id:'ListaRutas'
  })).hide().appendTo(seccion).fadeIn('slow');

  //cargarRutas();

  $.ajax({
    type: "GET",
    url:'/misRutas/',
    async: true,
    dataType:"Json",
    contenType:"application/Json; charset=utf-8",
    success: function(rutas){

      $.each(rutas,function(i,ruta){
        console.log(ruta.origen);
        origen=ruta.origen;
        destino=ruta.destino;
        $("#ListaRutas").append("<li><a class='linkRuta' title= 'Trazar Ruta' href='#' ><span id="+i+" class='miRuta'>"+origen+"-"+destino+ "</span></a></li>");

      })


    },
    error: function(data){
      console.log(data.responseText);
      swal({  title: 'Error!',   text: 'Errooor',   timer: 2000 });
    }
  });

  $(".miRuta").click(function (e) {
    var id_ruta = e.target.id;
    var ruta = $('#' + id_ruta + '').text().split('-');
    var origen = ruta[0];
    var destino = ruta[1];
    swal({  title: 'Error!',   text: origen,   timer: 2000 });
    calcRoute2(origen, destino);
  });
}

function loadXMLDoc(filename)
{
  if (window.XMLHttpRequest)
  {
    xhttp=new XMLHttpRequest();
  }
  else // code for IE5 and IE6
  {
    xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.open("GET",filename,false);
  xhttp.send();
  return xhttp.responseXML;
}

/*abre el archivo xml, lee las rutas guardadas y las presenta*/
function cargarRutas(){
  xmlDoc = loadXMLDoc('../../templates/xml/rutas.xml');
  // Obtenemos todos los nodos denominados foro del archivo xml
  var rutas=xmlDoc.getElementsByTagName("ruta");
  // Hacemos un bucle por todos los elementos foro
  for (var i = 0; i < rutas.length; i++) {
    // Del elemento foro, obtenemos del primer elemento denominado "titulo"
    // el valor del primer elemento interno
    id_usuario = rutas[i].getElementsByTagName("id_usuario")[0].childNodes[0].nodeValue;
    origen = rutas[i].getElementsByTagName("origen")[0].childNodes[0].nodeValue;
    destino = rutas[i].getElementsByTagName("destino")[0].childNodes[0].nodeValue;
    $("#ListaRutas").append("<li><a class='linkRuta' title= 'Trazar Ruta' href='#' ><span id="+i+" class='miRuta'>"+origen+"-"+destino+ "</span></a></li>");
  }
}

function calcRoute2(uno,dos) {
  var start = uno;
  var end = dos;
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
}

function añadir_eventos(){
  //var elements = document.getElementsByTagName('presentacionNombre');//.addEventListener('click',perfil_usuario, false);
  $('.presentacionNombre').on("click",perfil_usuario);
  // $('#button_seguir').on("click", boton_seguir);
  $('.btn btn-primary center-block').on("click", boton_seguir);
  $('.btn btn-primary center-block')
}


//Abre un modal con la informacion del los seguidores / seguidos
function perfil_usuario(evt){

  //muestro mi modal
  //$('#myModal_usuario').modal('show')  ;
  //$('.modal-title').text('PERFIL');


  $('.presentacionTextNombre').click(function (e) {
    var target_nombre = $(this).text();

    //alert(target_nombre);
    xmlDoc = loadXMLDoc('../../templates/xml/usuarios.xml');
    var usuarios = xmlDoc.getElementsByTagName("usuario");
    for (var i = 0; i < usuarios.length; i++) {
      categoria = xmlDoc.getElementsByTagName("usuario")[i].getAttributeNode("categoria").nodeValue;
      nombre = usuarios[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;

      id = usuarios[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;

      img = usuarios[i].getElementsByTagName("imagen")[0].childNodes[0].nodeValue;
      if (nombre == target_nombre) {
        //alert(nombre);
        ELIMINAR("cuerpo_cuenta");
        //muestro mi modal
        $('#myModal_usuario').modal('show');
        // $('.modal-title').text('PERFIL');
        cargarComponentes_Cuenta(".modal-body", nombre, id, 'seguidores', '0', 'seguidos', '0', 'Si tiene carro');
        $('#modal_usuario').css({ 'width': '440px', 'height': '400px' });
        $('#cuerpo_cuenta').css({ 'width': '100%', 'height': '390px', 'padding': '0', 'background': 'none' });
        $('#presentacion_imagenCuenta').css({ 'width': '120px', 'height': '130px', 'margin-left': '40%', 'margin-top': '0' });
        $('#datos_cuenta').css({ 'width': '100%', 'vertical-aling': 'center' });
        $('#cuerpo_cuenta').append($('<button>', {
          id:"btn_llevame",
          text: "Llevame!",
          style: 'margin: 0 auto;position:relative;top:80px;left:226px;font-size:20px'
        }));

      }


    }

  });




}

//Boton cambia cada vez que se da click, cambia de seguir a siguiendo
function boton_seguir(e){
  // var primary=document.getElementById('button_seguir');

  alert("click");
  if (e.target.class=='btn btn-primary center-block'){
    e.target.class = 'btn btn-info center-block';
    e.target.text = "Seguir+";
    //alert("click");
  }
  else{
    e.target.class = 'btn btn-primary center-block';
    e.target.text = "Siguiendo";
  }
}
//Extrae de los XML la informacion de los seguidores
function cargarDatosSeguidores(){
  if (window.XMLHttpRequest)
  {
    // Objeto para IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  }else{
    // Objeto para IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

  // Abrimos el archivo que esta alojado en el servidor cd_catalog.xml
  xmlhttp.open("GET",'../../templates/xml/usuarios.xml',false);
  xmlhttp.send();

  // Obtenemos un objeto XMLDocument con el contenido del archivo xml del servidor
  xmlDoc=xmlhttp.responseXML;

  // Obtenemos todos los nodos denominados foro del archivo xml
  var usuarios=xmlDoc.getElementsByTagName("usuario");


  // Hacemos un bucle por todos los elementos foro
  for(var i=0;i<usuarios.length;i++)
  {
    // Del elemento foro, obtenemos del primer elemento denominado "titulo"
    // el valor del primer elemento interno
    categoria=xmlDoc.getElementsByTagName("usuario")[i].getAttributeNode("categoria").nodeValue;
    nombre = usuarios[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;

    id = usuarios[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;

    img = usuarios[i].getElementsByTagName("imagen")[0].childNodes[0].nodeValue;

    if (categoria == "seguidor") {
      crear_presentancion_usuario('#seccion_seguidores', nombre, id, 'primary', 'Siguiendo');
    }
    if (categoria == "siguiendo") {
      crear_presentancion_usuario('#seccion_siguiendo', nombre, id, 'primary', 'Siguiendo');
    }
  }
}
google.maps.event.addDomListener(window, 'load', initialize);
