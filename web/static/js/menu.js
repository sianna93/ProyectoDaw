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
  //document.getElementById('a_iniciar_ruta').addEventListener('click',F_iniciaruta, false);
  //document.getElementById('a_misrutas').addEventListener('click',F_misrutas, false);



    $(".img_noti_class").click(function()
    {
      $('.boxdiv').remove();
      //$('.listas_notificaciones').remove();
      $('.btn_si_class').remove();
      $('.btn_no_class').remove();
      $('.boxdiv').remove();
      $('.notificationContainer').append("<div id='notificationTitle'>Notifications</div><div id='notificationsBody' class='notifications' style='overflow:auto;'></div><div id='notificationFooter'><a href='#'>See All</a></div>")
      $("#notificationContainer").fadeToggle(300);
      $("#notification_count").fadeOut("slow");

      $.ajax({
         type: "GET",
         url:'/filtro_pendiente/',
         async: true,
         dataType:"Json",
         contenType:"application/Json; charset=utf-8",
         success: function(peticiones){
             $.each(peticiones,function(pe,peticion){
                 
                   $("#notificationsBody").append("<div class = 'boxdiv'><p class='listas_notificaciones' id='"+peticion.id+"' style='height:20px; widht:20px'>"+peticion.persona_peticion+":"+peticion.comentario+"</p>"+
                   "<button id='"+peticion.id+"' class='btn_si_class'  text= 'Llevame!' style= 'height:20px; widht:7px;margin: 15px auto;position:relative;top:-20px;font-size:10px'> si</button>"+
                   "<button id='"+peticion.id+"' class='btn_no_class'  text= 'Llevame!' style= 'height:20px; widht:7px;margin: 5px;position:relative;top:-20px;font-size:10px'> No</button></div>");
                 
                 $(".btn_si_class").click(function()
                 {


                   var id = $(this).attr("id");
                   var csrf =  $('input[name="csrfmiddlewaretoken"]').val();
                   var estado = "Aceptado"
                   $.ajax({
                       type: "POST",
                       url:'/cambiar/',
                       data: {'id_p':id,'estado_p':estado,'csrfmiddlewaretoken':csrf },
                       success: function(){
                        swal({   title: 'Exito!',   text: 'La peticion ha sido enviada con exito',   timer: 2000 });
                     },
                       error: function(e){
                       swal({   title: 'Error!',   text: 'Error al intentar guardar peticion',   timer: 2000 });
                     }
                   });


                 });
                 $(".btn_no_class").click(function()
                 {
                    var id = $(this).attr("id");
                    var csrf =  $('input[name="csrfmiddlewaretoken"]').val();
                    var estado = "Negado"
                    $.ajax({
                        type: "POST",
                        url:'/cambiar/',
                        data: {'id_p':id,'estado_p':estado,'csrfmiddlewaretoken':csrf },
                        success: function(){
                         swal({   title: 'Exito!',   text: 'La peticion ha sido enviada con exito',   timer: 2000 });
                      },
                        error: function(e){
                        swal({   title: 'Error!',   text: 'Error al intentar guardar peticion',   timer: 2000 });
                      }
                    });

                 });

             });

           },
           error: function(data){
            // console.log(data.responseText);
             swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
           }
       });




      $.ajax({
        type: "GET",
        url:'/filtro_rutas/',
        async: true,
        dataType:"Json",
        contenType:"application/Json; charset=utf-8",
        success: function(routes_f){
              $.each(routes_f,function(rf,route_f){
                    $("#notificationsBody").append("<div class = 'boxdiv'><p class='listas_notificaciones' style='height:20px; widht:20px'>El usuario"+route_f.fk_user+"  Ha creado una nueva ruta "+route_f.origen+"-"+route_f.destino+"</p><div>");
              });

        },
        error: function(data){
         // console.log(data.responseText);
          swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
        }
       });


      $.ajax({
        type: "GET",
        url:'/todosPeticiones/',
        async: true,
        dataType:"Json",
        contenType:"application/Json; charset=utf-8",
        success: function(peticiones){
              $.each(peticiones,function(p,peticion){
                console.log(peticion.persona_peticion+""+""+peticion.pet_estado);
                  $.ajax({
                   type: "GET",
                   url:'/Rutas/',
                   async: true,
                   dataType:"Json",
                   contenType:"application/Json; charset=utf-8",
                   success: function(routes){
                         $.each(routes,function(rf,route){
                           if(route.id==peticion.pet_ruta){
                             if(peticion.pet_estado=="Aceptado"){
                               $("#notificationsBody").append("<div class = 'boxdiv'><p class='listas_notificaciones' style='height:20px; widht:20px'>El usuario  "+route.fk_user+"  ha Aceptado su solicitud de la ruta "+route.origen+"-"+route.destino+"</p><div>");
                             }else if (peticion.pet_estado=="Negado") {
                               console.log("ingrese negado")
                              $("#notificationsBody").append("<div class = 'boxdiv'><p class='listas_notificaciones' style='height:20px; widht:20px'>El usuario  "+route.fk_user+"  ha Negado su solicitud de la ruta "+route.origen+"-"+route.destino+"</p><div>");
                             }

                           }
                         });

                   },
                   error: function(data){
                    // console.log(data.responseText);
                     swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
                   }
                  });
              });
        },
        error: function(data){
         // console.log(data.responseText);
          swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
        }
       });
      return false;
    });

    //Document Click hiding the popup
    $(document).click(function()
    {
      $("#notificationContainer").hide();
    });

    //Popup on click
    $("#notificationContainer").click(function()
    {
      return false;
    });

    document.getElementById('a_iniciar_ruta').addEventListener('click',F_iniciaruta, false);
    document.getElementById('a_misrutas').addEventListener('click',F_misrutas, false);


}
//Variables de inicializacion para las rutas
var list_puntos= [];
var list_ini_fin=[];
var inicio,fin;

//Función para el botón cerrar sesión
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
            //  console.log("numsiguiendos: "+ contsig);

            },
            error: function(data){
            //  console.log(data.responseText);
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
            //  console.log("numseguidores: "+ contseg);

            },
            error: function(data){
              //console.log(data.responseText);
              swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
            }
          });
    },
    error: function(data){
    //  console.log(data.responseText);
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
  $('.list_seg').css({'overflow':'auto','height':'520px'});

  $.ajax({
    type: "GET",
    url:'/siguiendos/',
    async: true,
    dataType:"Json",
    contenType:"application/Json; charset=utf-8",
    success: function(seguidores){
        $.each(seguidores,function(i,seg){
          //console.log(seguidores);
        //  console.log(seg.siguiendo);
          $.ajax({
            type: "GET",
            url:'/usuarios/',
            async: true,
            dataType:"Json",
            contenType:"application/Json; charset=utf-8",
            success: function(usuarios){
              $.each(usuarios,function(i,usuario){
                estado ="siguiendo";

                if(usuario.username==seg.seguidor){
                  user=usuario.first_name + " " + usuario.last_name;
                  crear_presentancion_usuario('#seccion_siguiendo', user,usuario.username, 'primary', "Siguiendo");
                }
              });
              eventos_presentacion();
            },
            error: function(data){
              //console.log(data.responseText);
              swal({  title: 'Error!!',   text: 'No existe el usuario',   timer: 2000 });
            }
          });

        });
    },
    error: function(data){
    //  console.log(data.responseText);
      swal({  title: 'Error!',   text: 'Inicie sesion',   timer: 2000 });
    }
  });
 //$('#seccion_siguiendo').css({'overflow':'auto'});
  //añadir_eventos();
}


function getSiguiendos(){
  /*if (document.getElementsByTagName("cuerpo_presentacion_class")) {
    var o = document.getElementsByTagName("cuerpo_presentacion_class");
    o.parentNode.removeChild(o);
  }*/

  $( ".cuerpo_presentacion_class" ).remove();

  $.ajax({
    type: "GET",
    url:'/siguiendos/',
    async: true,
    dataType:"Json",
    contenType:"application/Json; charset=utf-8",
    success: function(seguidores){
        $.each(seguidores,function(i,seg){

          $.ajax({
            type: "GET",
            url:'/usuarios/',
            async: true,
            dataType:"Json",
            contenType:"application/Json; charset=utf-8",
            success: function(usuarios){
              $.each(usuarios,function(i,usuario){
                estado ="siguiendo";

                if(usuario.username==seg.seguidor){
                  user=usuario.first_name + " " + usuario.last_name;
                  crear_presentancion_usuario('#seccion_siguiendo', user,usuario.username, 'primary', "Siguiendo");
                }
              })
            },
            error: function(data){

              swal({  title: 'Error!!',   text: 'No existe el usuario',   timer: 2000 });
            }
          });

        });
    },
    error: function(data){

      swal({  title: 'Error!',   text: 'Inicie sesion',   timer: 2000 });
    }
  });
}



//Función para el botón seguidores
function F_seguidores(evt) {
  eliminar_todo();
  document.getElementById('map-canvas').style.width = "70%";
  $('#panel-derecho').show();
  document.getElementById('panel-derecho').style.visibility="visible";
  crear_cabecera('seccion_seguidores', 'header_panel', 'labelpanel', 'SEGUIDORES');
  $('.list_seg').css({'overflow':'auto','height':'520px'});

  $.ajax({
    type: "GET",
    url:'/seguidores/',
    async: true,
    dataType:"Json",
    contenType:"application/Json; charset=utf-8",
    success: function(seguidores){
        $.each(seguidores,function(i,seg){

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

                  crear_presentancion_usuario('#seccion_seguidores', user,usuario.username, 'primary', "Seguir");
                }
              });
              eventos_presentacion();
            },
            error: function(data){

              swal({  title: 'Error!',   text: 'Errooor',   timer: 2000 });
            }
          });


        });


    },
    error: function(data){

      swal({  title: 'Error!',   text: 'Errooor',   timer: 2000 });
    }
  });

  //$('#seccion_seguidores').css({'overflow':'auto'});
  //cargarDatosSeguidores();
  //añadir_eventos();
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
      //  console.log(bsq);
        $.ajax({
            url:'/filtrarNombres/',
            dataType:"json",
            contenType:"application/Json; charset=utf-8",
            data: {q: request.term},
            success: function(data){

              $.each(data,function(i,usuario){
                lista.push(usuario.username);
              });

              response(lista);

            },

            error: function(data){

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
      //  console.log("por aqui");
      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });


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
	          crear_presentancion_usuario('#seccion_buscar', user,usuario.username, 'primary', 'Seguir');
	        }
	      })

	    },
	    error: function(data){

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
  document.getElementById('txtvalidar').addEventListener('click',autocomplete_busqueda, false); //llama a la funcion que autocompleta el nombre del usuasario


}

//Función para el botón iniciar ruta
function F_iniciaruta(evt) {
  eliminar_todo();
  document.getElementById('map-canvas').style.width = "70%";
  $('#panel-derecho').show();
  document.getElementById('panel-derecho').style.visibility="visible";
  crear_cabecera('seccion_ruta', 'header_panel', 'labelpanel', 'INICIAR RUTA');
  //validado para los que tienen carro
  $.ajax({
    type: "GET",
    url:'/cuenta/',
    async: true,
    dataType:"Json",
    contenType:"application/Json; charset=utf-8",
    success: function(user){

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
                         cargarComponentes_Ruta('#seccion_ruta');
                      }
                      else if(persona.is_carro=='False'){

                      }
                    }
                  });

            },
            error: function(data){

              swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
            }
          });
    }
  });
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
  })),$('<div>',{
    class: 'list_seg'
    //style: "overflow: auto; height: 520px"

  })).hide().appendTo('#panel-derecho').fadeIn('slow');


}


//crea cada cada tarjeta de presentacion
function crear_presentancion_usuario(seccion,nombre,id,typeButton, txtButton){
  $("<div>" ,{
    id : 'cuerpo_presentacion',
    class: 'cuerpo_presentacion_class'
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
    text: nombre,
    value: id
  })),$('<label>',{
    id:'presentacion_bodyID',
    class: 'label_user',
    text:id
  })),$('<div>',{
    value: id,
    class: 'click_button'
  }).append($('<div>',{
    class : ' center-block '
  })).append($('<button>',{
    id:'button_seguir',
    class : 'btn btn-'+ typeButton+' center-block',
    text:txtButton,
    name : 'botones__seguir'
  }))))).hide().appendTo(".list_seg").fadeIn('slow');

}

function eventos_presentacion(){


  $('.click_button').click(function () {
    if ($(this).text()=='Siguiendo'){
      //$(this).text('Seguir+');
      //$(this).class('btn btn-primary center-block');
      //alert("click");
    }
    else{
      //e.target.class = 'btn btn-primary center-block';
      //$(this).text('Siguiendo');
      //$(this).class('btn btn-primary center-block');
    }

    //var csrf =  $('input[name="csrfmiddlewaretoken"]').val();

    //labelText = $('.label_user').text();
    labelText = $(this).attr('value');
    var lbl = $('#button_seguir').text();

    //alert(labelText);

    existe =0;

    //PARA LOS QUE YO ESTOY SIGUIENDO
    $.ajax({
      type: "GET",
      url:'/siguiendos/',
      async: true,
      dataType:"Json",
      contenType:"application/Json; charset=utf-8",
      success: function(siguiendos){
        $.each(siguiendos,function(i,sig){
          if(sig.seguidor==labelText){
            existe = existe + 1;
          }
        })
        if (existe >= 1){
              dejar_de_seguir(labelText);
              //swal({  title: 'Error!!',   text: 'Ya lo estas siguiendo',   timer: 2000 });



        }else if(existe < 1){
              $(".click_button").attr('value', 'Nuevo Texto');

              //console.log("michu");
              seguir(labelText);

        }
      },

      error: function(data){
      //  console.log(data.responseText);
        swal({  title: 'Error!!',   text: 'dsfdfdf',   timer: 2000 });
      }
    });

  });
/*
funcion que crea un modal donde se presenta los datos de los seguidores


*/
list_puntos= [];
list_ini_fin=[];
inicio,fin;
  $('.presentacionTextNombre').click(function (e) {
    var label_username=$(this).attr("value");
    var usuario, car="",contseg=0, contsig=0;
        ELIMINAR("cuerpo_cuenta");
        //aqui esta el ajax
        //muestro mi modal

        $('#cuerpo_cuenta').remove();
        $('#myModal_usuario').modal('show');
        cargarComponentes_Cuenta(".modal-body", '','', 'seguidores', contseg, 'seguidos', contsig, car);
        $('#modal_usuario').css({ 'width': '440px', 'height': '400px' });
        //$('#cuerpo_cuenta').css({ 'width': '100%', 'height': '390px', 'padding': '0', 'background': 'none' });
        $('#nombreCuenta').css({'position':'relative','top':'-70px'});
        $('#presentacion_imagenCuenta').css({ 'position':'relative','top':'-90px','width': '120px', 'height': '130px', 'margin-left': '40%', 'margin-top': '0' });
        $('#datos_cuenta').css({ 'width': '100%', 'vertical-aling': 'center' });
        var entre = 0;
        $.ajax({
          type: "GET",
          url:'/usuarios/',
          async: true,
          dataType:"Json",
          contenType:"application/Json; charset=utf-8",
          success: function(users){
            $.each(users,function(i,user){
                //console.log(user)
                //console.log("hooooooooooooooooollallalalalalal",label_username);
                //console.log("estoy comparando "+user.username + label_username);
                if(user.username==label_username){
                //  entre = entre + 1;
                  //console.log(entre);
                //  console.log("si entre",user.username);
                  usuario= user.first_name+" "+user.last_name;
                  $('.nombreCuentaclass').text(usuario);
                  $('.nombreUsuarioclass').text(user.username);
                //  console.log(usuario);
                  //cargarComponentes_Cuenta('#seccion_cuenta', usuario, user.username ,'seguidores','0', 'seguidos','0',"");
                  //Si tiene o no carro
                   $.ajax({
                    type: "GET",
                    url:'/datos/',
                    async: true,
                    dataType:"Json",
                    contenType:"application/Json; charset=utf-8",
                    success: function(personas){
                          $.each(personas,function(p,persona){

                          //  console.log("aqui las personas",personas);
                          //  console.log("",user.id,"   ",persona.fk_user_id);
                            if(user.id==persona.fk_user_id){
                            //  console.log("si entre a carro");
                              if(persona.is_carro=='True'){
                                car = 'Si tiene carro'
                                $('.carroclass').text(car);
                              //  console.log("carro ahorraaa "+ car);
                              }
                              else if(persona.is_carro=='False'){
                                car = 'No tiene carro'
                                $('.carroclass').text(car);
                              //  console.log("carro ahorraaa "+ car);
                              }
                            }
                          });

                    },
                    error: function(data){
                      //console.log(data.responseText);
                      swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
                    }
                  });

                  //Numeros de siguiendos
                   $.ajax({
                    type: "GET",
                    url:'/todosSeguidores/',
                    async: true,
                    dataType:"Json",
                    contenType:"application/Json; charset=utf-8",
                    success: function(siguiendos){
                      //console.log("si entre " ,siguiendos , "usuario: ", user.username);
                      list_siguiendos=[];
                      $.each(siguiendos,function(p,seguido){
                        if(seguido.seguidor==user.username){
                          list_siguiendos.push(seguido);
                          contsig=list_siguiendos.length;
                          $('.numseguidosclass').text(contsig);
                          //console.log("numsiguiendos: ahorraaa "+ contsig);
                        }
                      });
                    },
                    error: function(data){
                    //  console.log(data.responseText);
                      swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
                    }
                  });

                  //Numeros de siguidores
                  $.ajax({
                    type: "GET",
                    url:'/todosSeguidores/',
                    async: true,
                    dataType:"Json",
                    contenType:"application/Json; charset=utf-8",
                    success: function(seguidores){
                      list_siguiendos=[];
                      $.each(seguidores,function(p,seguidor){
                        if(seguidor.siguiendo==user.username){
                          list_siguiendos.push(seguidor);
                          contseg=list_siguiendos.length;
                          $('.numseguidoresclass').text(contseg);
                          //console.log("contseg numseguidores: "+ contseg);
                        }
                      });

                    },
                    error: function(data){
                      //console.log(data.responseText);
                      swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
                    }
                  });

                }
            });
          },
          error: function(data){
          //  console.log(data.responseText);
            swal({  title: 'Error!',   text: 'Error',   timer: 2000 });
          }
        });


        //$('.class_cuenta').append("<button id='btn_llevame' text= 'Llevame!' style= 'margin: 0 auto;position:relative;top:80px;left:226px;font-size:20px'> LLEVAME</button>");
        /*
        var label=$(this).attr("value");
        $('.class_cuenta').append($('<div>',{
          id:'div_listas_rutas',
          style:'position:relative;top:57px;overflow:auto;width:400px;height:200px'
        }).append($('<ol>',{
          id:'ListaRutas_seg',
          class :'ListaRutas_seg_class'
        })));
        */
        
        $.ajax({
          type: "GET",
          url:'/Ruta_usuarios',
          data: {username: label_username},
          dataType:"json",
          contentType:"application/json; charset=utf-8",
          success: function(rutas){

            $('.list_class').remove();
            $('.class_cuenta').append($('<div>',{
              class:'list_class',
              id:'div_listas_rutas',
              style:'position:relative;top:57px;overflow:auto;width:400px;height:200px'
            }).append($('<ol>',{
              id:'ListaRutas_seg',
              class :'ListaRutas_seg_class'
            })));
            $.each(rutas,function(i,ruta){
                origen=ruta.origen;
                destino=ruta.destino;
                $(".ListaRutas_seg_class").append("<li class='rutaslistas'><a class='linkRuta' title= 'Trazar Ruta' href='#' style='clear:both;color:white' ><span id="+ruta.id+" class='miRuta'>"+origen+"-"+destino+ "</span></a></li>"+
                "<button id='btn_llevame' class='btn_llevame_class' value="+ruta.id+" text= 'Llevame!' style= 'height:20px; widht:20px;margin: 0 auto;position:relative;top:-20px;left:200px;font-size:10px'> LLEVAME</button>");
                                
            });

            $(".miRuta").click(function (e) {
                  var id_ruta = e.target.id;

                  var start_lt,start_lg,end_lt,end_lg;


                  //Se leen las rutas
                  $.ajax({
                    type: "GET",
                    url:'/Rutas/',
                    async: true,
                    dataType:"Json",
                    contenType:"application/Json; charset=utf-8",
                    success: function(rutas){

                    $.each(rutas,function(i,ruta){
                      if(ruta.id==id_ruta){
                        start_lt=ruta.origen_lt;
                        start_lg=ruta.origen_lg;
                        end_lt=ruta.destino_lt;
                        end_lg=ruta.destino_lg;
                        //Nuevo posiciones
                        inicio=new google.maps.LatLng(start_lt,start_lg);
                        fin=new google.maps.LatLng(end_lt,end_lg);
                        //Se guarda en una lista
                        list_ini_fin=[start_lt,start_lg,end_lt,end_lg]
                        //list_ini_fin.push({lt:end_lt, lg: end_lg});

                        //console.log("Inicio funcion calcular ruta");
                        //calcRoute2(inicio.lat(),inicio.lng(),fin.lat(),fin.lng());
                      }//Fin del if
                    })


                  },
                    error: function(data){
                      swal({  title: 'Error!',   text: 'Errooor al leer Rutas',   timer: 2000 });
                    }
                  });
                  $.ajax({
                    type: "GET",
                    url:'/coordenadas/',
                    async: true,
                    dataType:"Json",
                    contenType:"application/Json; charset=utf-8",
                    success: function(puntos){

                      $.each(puntos,function(i,punto){
                        if(punto.fk_ruta==id_ruta){
                          latitude=punto.latitude;
                          longitude=punto.longitude;
                          p = new google.maps.LatLng(latitude,longitude);
                          list_puntos.push({location: p, stopover: false});

                        }

                      });
                    },
                    error: function(data){
                      swal({  title: 'Error!',   text: 'Errooor al leer coordenadas',   timer: 2000 });
                    }
                  });

                  calcRoute2();

                });

            $('.btn_llevame_class').click(function (e) {
              labelRuta= $(this).attr('value');
              var csrf =  $('input[name="csrfmiddlewaretoken"]').val();
              var idruta = labelRuta;
              var estadop = "Pendiente"
              $.ajax({
                  type: "POST",
                  url:'/guardarPeticion',
                  data: {'comentario':"Hola me podrias llevar!",'glongitud':'0','glatitud':'0','gruta':idruta,'pestado':estadop,'csrfmiddlewaretoken':csrf },
                  success: function(){
                   swal({   title: 'Exito!',   text: 'La peticion ha sido enviada con exito',   timer: 2000 });
                },
                  error: function(e){
                  swal({   title: 'Error!',   text: 'Error al intentar guardar peticion',   timer: 2000 });
                }
              });
            });


          },
          error: function(data){
            swal({  title: 'Error!',   text: 'Errooor',   timer: 2000 });
          }
        });

  });


}

//FUNCION QUE DEJE DE SEGUIR A UN SEGUID

//buscar el label y comparar el nombre regresarlo
//hacer con post el delete//mandar ese valor al views
/*var cleanFollowers = function(){
  //$('div followers').empty(); &&
};*/
function dejar_de_seguir(labelText){
    var csrf =  $('input[name="csrfmiddlewaretoken"]').val();
    $.ajax({
      type : "POST",
      url:'/noseguir',
      data: {'seguidor':labelText,'csrfmiddlewaretoken':csrf },
      success: function(){
         swal({   title: 'Exito!',   text: 'Se ha eliminado con Exito',   timer: 2000 });
         getSiguiendos();
      },
      error: function(){
        //swal({   title: 'Error!',   text: 'Error al dejar Seguir',   timer: 2000 });
      }

    });
}





//
/*INICIO DEL CONTENIDO CUENTA*/

//Crea dinamicamente la estructura del contenido de MiCuenta
function cargarComponentes_Cuenta(seccion, nombreCuenta, nombreUsuario, seguidores,numseguidores,seguidos,numseguidos,carro){
  $("<div>",{
    class: 'class_cuenta',
    id:'cuerpo_cuenta',
    style:"padding:80px;"
  }).append($('<label>',{
    id: 'nombreCuenta',
    class : 'nombreCuentaclass',
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
    class : 'nombreUsuarioclass',
    text: nombreUsuario
  }),$('<label>',{
    id: 'numseguidores' ,
    class: 'numseguidoresclass',
    text: numseguidores,
    onMouseover: "this.style.color='yellow'"
      ,onMouseout: "this.style.color='#fff'"
  }),$('<label>',{
    id: 'seguidores',
    text: seguidores
  }),$('<label>',{
    id: 'numseguidos',
    class: 'numseguidosclass',
    text:numseguidos,
    onMouseover: "this.style.color='yellow'"
      ,onMouseout: "this.style.color='#fff'"
  }),$('<label>',{
    id: 'seguidos',
    text:seguidos
  }),$('<label>',{
    id: 'carro',
    class: 'carroclass',
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
    //onchange:'calcRoute();',
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
    //onchange:'calcRoute();',
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

}

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


//Variables necesarias para trazar ruta
/*var list_puntos= [];
var list_ini_fin=[];
var inicio,fin;*/
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
  list_puntos= [];
  list_ini_fin=[];
  inicio,fin;
  $.ajax({
    type: "GET",
    url:'/misRutas/',
    async: true,
    dataType:"Json",
    contenType:"application/Json; charset=utf-8",
    success: function(rutas){

      $.each(rutas,function(i,ruta){
        origen=ruta.origen;
        destino=ruta.destino;
        $("#ListaRutas").append("<li><a class='linkRuta' title= 'Trazar Ruta' href='#' ><span id="+ruta.id+" class='miRuta'>"+origen+"-"+destino+ "</span></a></li>");
        //Se realiza el evento al seleccionar ruta
        $(".miRuta").click(function (e) {
          var id_ruta = e.target.id;

          var start_lt,start_lg,end_lt,end_lg;


          //Se leen las rutas
          $.ajax({
            type: "GET",
            url:'/Rutas/',
            async: true,
            dataType:"Json",
            contenType:"application/Json; charset=utf-8",
            success: function(rutas){

            $.each(rutas,function(i,ruta){
              if(ruta.id==id_ruta){
                start_lt=ruta.origen_lt;
                start_lg=ruta.origen_lg;
                end_lt=ruta.destino_lt;
                end_lg=ruta.destino_lg;
                //Nuevo posiciones
                inicio=new google.maps.LatLng(start_lt,start_lg);
                fin=new google.maps.LatLng(end_lt,end_lg);
                //Se guarda en una lista
                list_ini_fin=[start_lt,start_lg,end_lt,end_lg]
                //list_ini_fin.push({lt:end_lt, lg: end_lg});

                //console.log("Inicio funcion calcular ruta");
                //calcRoute2(inicio.lat(),inicio.lng(),fin.lat(),fin.lng());
              }//Fin del if
            })


          },
            error: function(data){
              swal({  title: 'Error!',   text: 'Errooor al leer Rutas',   timer: 2000 });
            }
          });
          $.ajax({
            type: "GET",
            url:'/coordenadas/',
            async: true,
            dataType:"Json",
            contenType:"application/Json; charset=utf-8",
            success: function(puntos){

              $.each(puntos,function(i,punto){
                if(punto.fk_ruta==id_ruta){
                  latitude=punto.latitude;
                  longitude=punto.longitude;
                  p = new google.maps.LatLng(latitude,longitude);
                  list_puntos.push({location: p, stopover: false});

                }

              });
            },
            error: function(data){
              swal({  title: 'Error!',   text: 'Errooor al leer coordenadas',   timer: 2000 });
            }
          });

          calcRoute2();
          //console.log("Inicio funcion calcular ruta");
          //calcRoute2(inicio.lat(),inicio.lng(),fin.lat(),fin.lng());

          //var ruta = $('#' + id_ruta + '').text().split('-');
          //var origen = ruta[0];
          //var destino = ruta[1];
          //swal({  title: 'Error!',   text: origen,   timer: 2000 });
          //calcRoute2(origen, destino);

        });

      })


    },
    error: function(data){
      //console.log(data.responseText);
      swal({  title: 'Error!',   text: 'Errooor',   timer: 2000 });
    }
  });




}

function calcRoute2() {
   /*var pos_espol = new google.maps.LatLng(-2.146104, -79.965814);
   var mapOptions = {
            zoom: 17,
            center: pos_espol
        }

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  console.log("s_lat: ", orig_lat)
  var marker = new google.maps.Marker({
      position: new google.maps.LatLng(orig_lat, orig_lng), tittle: '#', draggable: false, map: map
  });*/
  var puntoA = list_ini_fin[0];
  var puntoB = list_ini_fin[1];
  var puntoC = list_ini_fin[2];
  var puntoD = list_ini_fin[3];
  //var pltA=puntoA['lt'];
  //var plgA=puntoA['lg'];
  //var pltB=puntoB['lt'];
  //var plgB=puntoB['lg'];
  //var start= new google.maps.LatLng(parseFloat(pltA),parseFloat(plgA));
  //var end= new google.maps.LatLng(parseFloat(pltB),parseFloat(plgB));
  var start= new google.maps.LatLng(parseFloat(puntoA),parseFloat(puntoB));
  var end= new google.maps.LatLng(parseFloat(puntoC),parseFloat(puntoD));

  //console.log("inicio: ",start,"fin: ", end ,"lista: ",list_ini_fin);
  var request = {
    origin: start,
    destination: end,
    waypoints: list_puntos,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        //console.log(request);
        directionsDisplay.setDirections(response);
      }
  });

  list_ini_fin=[];
  list_puntos=[];
}

function añadir_eventos(){
  //var elements = document.getElementsByTagName('presentacionNombre');//.addEventListener('click',perfil_usuario, false);
  $('.presentacionNombre').on("click",perfil_usuario);
  // $('#button_seguir').on("click", boton_seguir);
  $('.btn btn-primary center-block').on("click", boton_seguir);

}



//Boton cambia cada vez que se da click, cambia de seguir a siguiendo
function boton_seguir(e){
  // var primary=document.getElementById('button_seguir');

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


function seguir(seguidor_a){
    var csrf =  $('input[name="csrfmiddlewaretoken"]').val();
    $.ajax({
      type : "POST",
      url:'/seguir',
      data: {'seguidor':seguidor_a,'csrfmiddlewaretoken':csrf },
      success: function(){
         swal({   title: 'Exito!',   text: 'Se ha seguido con Exito',   timer: 2000 });
      },
      error: function(){
        swal({   title: 'Error!',   text: 'Error al Seguir',   timer: 2000 });
      }

    });

}

google.maps.event.addDomListener(window, 'load', initialize);
//window.addEventListener('load', initialize, true);