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
    //document.getElementById('a_close').addEventListener('click',F_cerrar, false);
}

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
function F_cuenta(evt){
    eliminar_todo();
    document.getElementById('map-canvas').style.width = "70%";
    $('#panel-derecho').show();
    document.getElementById('panel-derecho').style.visibility="visible";
    crear_cabecera('seccion_cuenta', 'header_panel', 'labelpanel', 'MI CUENTA');
    cargarComponentes_Cuenta('#seccion_cuenta', 'Janina Costa', 'jlcosta', 'seguidores','0', 'seguidos','0','Si tiene carro');
}
/*FIN CUENTA*/

//Función para el botón seguidos / siguiendo
function F_siguiendo(evt) {
    eliminar_todo();
    document.getElementById('map-canvas').style.width = "70%";
    $('#panel-derecho').show();
    document.getElementById('panel-derecho').style.visibility="visible";
    crear_cabecera('seccion_siguiendo', 'header_panel', 'labelpanel', 'SIGUIENDO');
    cargarDatosSeguidores();
    //document.getElementById('presentacion_bodynombre').addEventListener('click',perfil_usuario, false);
    //document.getElementById('button_seguir').addEventListener('click',boton_seguir, false);
    añadir_eventos(); 
}

//Función para el botón seguidores
function F_seguidores(evt) {
    eliminar_todo();
    document.getElementById('map-canvas').style.width = "70%";
    $('#panel-derecho').show();
    document.getElementById('panel-derecho').style.visibility="visible";
    crear_cabecera('seccion_seguidores', 'header_panel', 'labelpanel', 'SEGUIDORES');
    cargarDatosSeguidores();
    añadir_eventos(); 
}

//Función para el botón buscar amigos
function F_buscar(evt) {
   eliminar_todo();
    document.getElementById('map-canvas').style.width = "70%";
    $('#panel-derecho').show();
    document.getElementById('panel-derecho').style.visibility="visible";
    crear_cabecera('seccion_buscar', 'header_panel', 'labelpanel', 'BUSCAR');
    cargarComponentes_Buscar('#seccion_buscar');
    cargarDatosSeguidores();
    document.getElementById('presentacion_bodynombre').addEventListener('click',perfil_usuario, false);
    document.getElementById('button_seguir').addEventListener('click',boton_seguir, false); 
}

//Función para el botón iniciar ruta
function F_iniciaruta(evt) {
    eliminar_todo();
    document.getElementById('map-canvas').style.width = "70%";
    $('#panel-derecho').show();
    document.getElementById('panel-derecho').style.visibility="visible";
    crear_cabecera('seccion_ruta', 'header_panel', 'labelpanel', 'INICIAR RUTA');
    //cargarComponentes_Ruta('#seccion_ruta');

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

//crea cada cada tarjeta de presentacion para los 
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
    $("<div>",{
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
        onKeyDown: "return limitar(event,this.value,10)"
    })).hide().appendTo(seccion).fadeIn('slow');
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
    $("<div>",{
	    id:'cuerpo_ruta',
        style:"padding:20px"
    }).append($('<img>',{
	    id: 'img_car_panel_ruta',
	    src:'/static/imagenes/car1.png',
        style:"width:350px;height:200px"
    }),$('<form>',{
	//action : "ruta" ,
	//method:"post"
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
    }))).hide().appendTo(seccion).fadeIn('slow');
    /*$("#btn_guardar").click(function () {
        var start = document.getElementById("start").value;
        var end = document.getElementById("end").value;
        eliminar_todo();
        crear_cabecera('seccion_misrutas', 'header_panel', 'labelpanel', 'MIS RUTAS');
        cargarComponentes_MisRutas('#seccion_misrutas');

        guardarRuta(start, end);
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

    cargarRutas();
    $(".miRuta").click(function (e) {
        var id_ruta = e.target.id;
        var ruta = $('#' + id_ruta + '').text().split('-');
        var origen = ruta[0];
        var destino = ruta[1];
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
